import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useToast } from "../../hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../lib/queryClient";
import { Mail, Phone, MessageCircle, MapPin, Send, CheckCircle, Users, Zap, Globe, Sparkles, TrendingUp, Award, Shield } from "lucide-react";
import { ScrollAnimated } from "../../hooks/use-scroll-animation";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// CONTACT details (update these values as needed)
const CONTACT = {
  email: "official.kjcompany@gmail.com",
  whatsapp: {
    kurdish: "+964 7509496464",
    arabic: "+964 7709496464",
  },
  telegram: {
    kurdish: "@KJ_Kurdish",
    arabic: "@KJ_Arabi",
  },
};

const makeWaLink = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
};

const makeTgLink = (value: string) => {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value; // already a URL
  if (/^\+/.test(value) || /^joinchat\//i.test(value)) {
    return `https://t.me/${value}`;
  }
  return `https://t.me/${value.replace(/^@/, "")}`;
};

const waKurdishLink = makeWaLink(CONTACT.whatsapp.kurdish);
const waArabicLink = makeWaLink(CONTACT.whatsapp.arabic);
const tgKurdishLink = makeTgLink(CONTACT.telegram.kurdish);
const tgArabicLink = makeTgLink(CONTACT.telegram.arabic);

const contactMethods = [
  {
    icon: Phone,
    title: "WhatsApp Kurdish",
    value: CONTACT.whatsapp.kurdish,
    link: waKurdishLink,
    color: "from-emerald-400 via-green-500 to-teal-500",
    bgGlow: "bg-green-500/20",
    descriptionKey: "chat_directly"
  },
  {
    icon: Phone,
    title: "WhatsApp Arabic",
    value: CONTACT.whatsapp.arabic,
    link: waArabicLink,
    color: "from-emerald-400 via-green-500 to-teal-500",
    bgGlow: "bg-green-500/20",
    descriptionKey: "chat_directly"
  },
  {
    icon: MessageCircle,
    title: "Telegram Kurdish",
    value: CONTACT.telegram.kurdish,
    link: tgKurdishLink,
    color: "from-sky-400 via-blue-500 to-indigo-500",
    bgGlow: "bg-blue-500/20",
    descriptionKey: "join_trading_community"
  },
  {
    icon: MessageCircle,
    title: "Telegram Arabic",
    value: CONTACT.telegram.arabic,
    link: tgArabicLink,
    color: "from-sky-400 via-blue-500 to-indigo-500",
    bgGlow: "bg-blue-500/20",
    descriptionKey: "join_trading_community"
  },
  {
    icon: Mail,
    title: "Email",
    value: CONTACT.email,
    link: `mailto:${CONTACT.email}`,
    color: "from-blue-400 via-indigo-500 to-purple-500",
    bgGlow: "bg-indigo-500/20",
    descriptionKey: "drop_us_message"
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Kurdistan Region",
    link: "https://maps.app.goo.gl/h4DUk4yBvMSBovJMA",
    color: "from-fuchsia-400 via-purple-500 to-pink-500",
    bgGlow: "bg-purple-500/20",
    descriptionKey: "regional_office"
  }
];

const features = [
  {
    icon: Shield,
    titleKey: "verified_expert",
    descriptionKey: "certified_professional",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Users,
    titleKey: "students_1000_plus",
    descriptionKey: "join_growing_community",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Zap,
    titleKey: "fast_response",
    descriptionKey: "reply_within_24h",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    icon: Globe,
    titleKey: "global_support",
    descriptionKey: "multiple_languages",
    gradient: "from-green-500 to-emerald-500"
  }
];

const trustBadges = [
  { icon: Award, textKey: "years_experience_5_plus" },
  { icon: CheckCircle, textKey: "success_rate_95" },
  { icon: TrendingUp, textKey: "expert_analysis" }
];

export function ContactSection() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { toast } = useToast();

  const handleSendEmail = () => {
    const mailtoLink = `mailto:karzanjabar@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  const contactMutation = useMutation<Response, Error, ContactFormData>({
    mutationFn: (data: ContactFormData) => apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: t("message_sent_successfully"),
        description: t("message_sent_description"),
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: (error: any) => {
      toast({
        title: t("error"),
        description: error.message || t("failed_to_send_message"),
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: t("missing_information"),
        description: t("please_fill_required_fields"),
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-32 bg-transparent relative overflow-hidden">
      {/* Advanced animated background with multiple layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-gold/30 via-amber-500/20 to-yellow-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tl from-blue-500/30 via-purple-500/20 to-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.5) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Hero Header */}
        <ScrollAnimated animation="fadeInUp" className="text-center mb-10 sm:mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-gold/20 via-amber-500/20 to-yellow-500/20 backdrop-blur-sm rounded-full border border-gold/30 shadow-lg">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gold animate-pulse" />
            <span className="text-xs sm:text-sm font-bold bg-gradient-to-r from-gold via-amber-500 to-yellow-600 bg-clip-text text-transparent">{t('start_trading_journey')}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">{t("get_in_touch")}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            {t("contact_intro")}
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mt-6 sm:mt-8">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700 shadow-md">
                <badge.icon className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
                <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">{t(badge.textKey)}</span>
              </div>
            ))}
          </div>
        </ScrollAnimated>

        {/* Enhanced Feature Cards with gradient borders */}
        <ScrollAnimated animation="fadeInUp" delay={200} className="mb-10 sm:mb-14 lg:mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="relative group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110">
                {/* Gradient border effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="absolute inset-[2px] bg-white dark:bg-gray-800 rounded-[calc(0.5rem-2px)]"></div>

                <CardContent className="relative p-4 sm:p-5 lg:p-6 text-center">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500`}>
                    <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h4 className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">{t(feature.titleKey)}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">{t(feature.descriptionKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollAnimated>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
          {/* Enhanced Contact Form - Takes 3 columns */}
          <ScrollAnimated animation="slideInLeft" delay={400} className="lg:col-span-3">
            <Card className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-2xl sm:rounded-3xl">
              {/* Animated gradient border */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-pulse" style={{ animationDelay: '1s' }}></div>

              <CardContent className="p-6 sm:p-8 lg:p-10">
                {/* Form Header with icon */}
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-lg animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 lg:p-4 shadow-xl">
                      <Send className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                      {t("send_me_a_message")}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{t('fill_form_desc')}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                    {/* Full Name Input */}
                    <div className="relative group">
                      <Label htmlFor="name" className="text-sm sm:text-base font-bold text-gray-700 dark:text-gray-300 mb-2 block flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                        {t("full_name")}
                      </Label>
                      <div className="relative">
                        <Input
                          id="name"
                          type="text"
                          dir={i18n.dir()}
                          placeholder={t("contact.form.name_placeholder")}
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          required
                          className="h-12 sm:h-14 text-sm sm:text-base px-6 transition-all duration-300 focus:ring-2 focus:ring-gold/50 border-2 border-gray-200 dark:border-gray-700 hover:border-gold/50 focus:border-gold rounded-xl bg-white dark:bg-gray-800/50 backdrop-blur-sm"
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="relative group">
                      <Label htmlFor="email" className="text-sm sm:text-base font-bold text-gray-700 dark:text-gray-300 mb-2 block flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        {t("email_address")}
                      </Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          dir={i18n.dir()}
                          placeholder={t("contact.form.email_placeholder")}
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          required
                          className="h-12 sm:h-14 text-sm sm:text-base px-6 transition-all duration-300 focus:ring-2 focus:ring-blue-500/50 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500/50 focus:border-blue-500 rounded-xl bg-white dark:bg-gray-800/50 backdrop-blur-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject Select */}
                  <div className="relative group">
                    <Label htmlFor="subject" className="text-sm sm:text-base font-bold text-gray-700 dark:text-gray-300 mb-2 block flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      {t("contact.form.subject")}
                    </Label>
                    <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                      <SelectTrigger dir={i18n.dir()} className="h-12 sm:h-14 px-6 text-sm sm:text-base transition-all duration-300 focus:ring-2 focus:ring-purple-500/50 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500/50 rounded-xl bg-white dark:bg-gray-800/50 backdrop-blur-sm">
                        <SelectValue placeholder={t("contact.form.select_subject_placeholder")} />
                      </SelectTrigger>
                      <SelectContent dir={i18n.dir()}>
                        <SelectItem value="course">{t("contact.subjects.courses")}</SelectItem>
                        <SelectItem value="partnership">{t("contact.subjects.partnership")}</SelectItem>
                        <SelectItem value="consultation">{t("contact.subjects.trading")}</SelectItem>
                        <SelectItem value="other">{t("other")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message Textarea */}
                  <div className="relative group">
                    <Label htmlFor="message" className="text-sm sm:text-base font-bold text-gray-700 dark:text-gray-300 mb-2 block flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-pink-500 rounded-full"></span>
                      {t("contact.form.message")}
                    </Label>
                    <Textarea
                      id="message"
                      rows={6}
                      dir={i18n.dir()}
                      placeholder={t("contact.form.message_placeholder")}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                      className="text-sm sm:text-base resize-none p-6 transition-all duration-300 focus:ring-2 focus:ring-pink-500/50 border-2 border-gray-200 dark:border-gray-700 hover:border-pink-500/50 focus:border-pink-500 rounded-xl bg-white dark:bg-gray-800/50 backdrop-blur-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="relative w-full h-14 sm:h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white text-base sm:text-lg font-bold transition-all duration-300 transform shadow-2xl hover:shadow-3xl hover:scale-105 rounded-xl sm:rounded-2xl overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <Send className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-45 transition-transform duration-300" />
                    {contactMutation.isPending ? t("sending") : t("send_message")}
                  </Button>

                  {/* Privacy notice */}
                  <p className="text-xs sm:text-sm text-center text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                    <span>{t('privacy_notice')}</span>
                  </p>
                </form>
              </CardContent>
            </Card>
          </ScrollAnimated>

          {/* Enhanced Contact Information Sidebar - Takes 2 columns */}
          <ScrollAnimated animation="slideInRight" delay={600} className="lg:col-span-2">
            <div className="space-y-5 sm:space-y-6">
              {/* Contact Methods with enhanced design */}
              <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                <div className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                <CardContent className="p-5 sm:p-6 lg:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-5 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <div className="w-1.5 h-8 bg-gradient-to-b from-gold to-yellow-500 rounded-full"></div>
                    {t("contact_information")}
                  </h3>

                  <div className="space-y-4 sm:space-y-5">
                    {contactMethods.map((method, index) => (
                      <div
                        key={index}
                        className="relative group cursor-pointer"
                        onClick={() => {
                          if (method.title === "Email") {
                            handleSendEmail();
                          } else if (method.link) {
                            window.open(method.link, '_blank');
                          }
                        }}
                      >
                        <div className={`absolute inset-0 ${method.bgGlow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                        <div className="relative bg-white dark:bg-gray-800/50 p-4 sm:p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-transparent group-hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className={`relative bg-gradient-to-br ${method.color} rounded-xl sm:rounded-2xl w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}>
                              {method.title.includes('WhatsApp') ? (
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-white">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                </svg>
                              ) : method.title.includes('Telegram') ? (
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-white">
                                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                </svg>
                              ) : (
                                <method.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-0.5 sm:mb-1">
                                {method.title}
                              </h4>
                              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-semibold truncate">
                                <span dir="ltr">{method.value}</span>
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t(method.descriptionKey)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>


            </div>
          </ScrollAnimated>
        </div>
      </div>
    </section>
  );
}
