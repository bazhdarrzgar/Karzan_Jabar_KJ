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
import { Mail, Phone, MessageCircle, Clock, ExternalLink, ArrowRight, GraduationCap, MapPin, Send, CheckCircle, Users, Zap, Globe, Sparkles, TrendingUp, Award, Shield } from "lucide-react";
import { ScrollAnimated } from "../../hooks/use-scroll-animation";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "contact@kjcompany.com",
    color: "from-amber-400 via-yellow-500 to-orange-500",
    bgGlow: "bg-amber-500/20",
    description: "Drop us a message anytime"
  },
  {
    icon: Phone,
    title: "WhatsApp",
    value: "+1 (555) 123-4567",
    color: "from-emerald-400 via-green-500 to-teal-500",
    bgGlow: "bg-green-500/20",
    description: "Chat with us directly"
  },
  {
    icon: MessageCircle,
    title: "Telegram",
    value: "@KJTrading",
    color: "from-sky-400 via-blue-500 to-indigo-500",
    bgGlow: "bg-blue-500/20",
    description: "Join our trading community"
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Kurdistan Region",
    color: "from-fuchsia-400 via-purple-500 to-pink-500",
    bgGlow: "bg-purple-500/20",
    description: "Our regional office"
  }
];

const features = [
  {
    icon: Shield,
    title: "Verified Expert",
    description: "Certified trading professional",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Users,
    title: "1000+ Students",
    description: "Join our growing community",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Zap,
    title: "Fast Response",
    description: "Reply within 24 hours",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    icon: Globe,
    title: "Global Support",
    description: "Multiple languages available",
    gradient: "from-green-500 to-emerald-500"
  }
];

const trustBadges = [
  { icon: Award, text: "5+ Years Experience" },
  { icon: CheckCircle, text: "95% Success Rate" },
  { icon: TrendingUp, text: "Expert Analysis" }
];

export function ContactSection() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) => apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: t("message_sent_successfully"),
        description: t("message_sent_description"),
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: () => {
      toast({
        title: t("error"),
        description: t("failed_to_send_message"),
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

  const handleScrollToCourses = () => {
    const element = document.querySelector("#courses");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
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
            <span className="text-xs sm:text-sm font-bold bg-gradient-to-r from-gold via-amber-500 to-yellow-600 bg-clip-text text-transparent">Let's Start Your Trading Journey</span>
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
                <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">{badge.text}</span>
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
                  <h4 className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">{feature.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">{feature.description}</p>
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
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gold via-amber-500 to-yellow-500 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              <CardContent className="p-6 sm:p-8 lg:p-10">
                {/* Form Header with icon */}
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold to-yellow-500 rounded-2xl blur-lg animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-gold via-amber-500 to-yellow-500 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 lg:p-4 shadow-xl">
                      <Send className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-black" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                      {t("send_me_a_message")}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Fill out the form below and I'll get back to you</p>
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
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          required
                          className="h-12 sm:h-14 text-sm sm:text-base pl-4 pr-4 transition-all duration-300 focus:ring-2 focus:ring-gold/50 border-2 border-gray-200 dark:border-gray-700 hover:border-gold/50 focus:border-gold rounded-xl bg-white dark:bg-gray-800/50 backdrop-blur-sm"
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
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          required
                          className="h-12 sm:h-14 text-sm sm:text-base pl-4 pr-4 transition-all duration-300 focus:ring-2 focus:ring-blue-500/50 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500/50 focus:border-blue-500 rounded-xl bg-white dark:bg-gray-800/50 backdrop-blur-sm"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Subject Select */}
                  <div className="relative group">
                    <Label htmlFor="subject" className="text-sm sm:text-base font-bold text-gray-700 dark:text-gray-300 mb-2 block flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      {t("subject")}
                    </Label>
                    <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                      <SelectTrigger className="h-12 sm:h-14 text-sm sm:text-base transition-all duration-300 focus:ring-2 focus:ring-purple-500/50 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500/50 rounded-xl bg-white dark:bg-gray-800/50 backdrop-blur-sm">
                        <SelectValue placeholder={t("select_subject")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="course">{t("trading_course_inquiry")}</SelectItem>
                        <SelectItem value="partnership">{t("justmarkets_partnership")}</SelectItem>
                        <SelectItem value="consultation">{t("private_consultation")}</SelectItem>
                        <SelectItem value="other">{t("other")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Message Textarea */}
                  <div className="relative group">
                    <Label htmlFor="message" className="text-sm sm:text-base font-bold text-gray-700 dark:text-gray-300 mb-2 block flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-pink-500 rounded-full"></span>
                      {t("message")}
                    </Label>
                    <Textarea
                      id="message"
                      rows={6}
                      placeholder="Tell me about your trading goals and how I can help you succeed..."
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                      className="text-sm sm:text-base resize-none transition-all duration-300 focus:ring-2 focus:ring-pink-500/50 border-2 border-gray-200 dark:border-gray-700 hover:border-pink-500/50 focus:border-pink-500 rounded-xl bg-white dark:bg-gray-800/50 backdrop-blur-sm"
                    />
                  </div>
                  
                  {/* Submit Button */}
                  <Button 
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="relative w-full h-14 sm:h-16 bg-gradient-to-r from-gold via-amber-500 to-yellow-500 hover:from-yellow-600 hover:via-gold hover:to-amber-600 text-black text-base sm:text-lg font-bold transition-all duration-300 transform shadow-2xl hover:shadow-3xl hover:scale-105 rounded-xl sm:rounded-2xl overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <Send className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-45 transition-transform duration-300" />
                    {contactMutation.isPending ? t("sending") : t("send_message")}
                  </Button>
                  
                  {/* Privacy notice */}
                  <p className="text-xs sm:text-sm text-center text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                    <span>Your information is secure and will never be shared</span>
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
                      >
                        <div className={`absolute inset-0 ${method.bgGlow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                        <div className="relative bg-white dark:bg-gray-800/50 p-4 sm:p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-transparent group-hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className={`relative bg-gradient-to-br ${method.color} rounded-xl sm:rounded-2xl w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}>
                              <method.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-0.5 sm:mb-1">
                                {method.title}
                              </h4>
                              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-semibold truncate">{method.value}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{method.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Quick Actions with enhanced styling */}
              <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-gold/10 via-amber-500/5 to-yellow-500/10 backdrop-blur-sm">
                <div className="h-1.5 bg-gradient-to-r from-gold via-amber-500 to-yellow-500"></div>
                <CardContent className="p-5 sm:p-6 lg:p-8">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-5 sm:mb-6 flex items-center gap-2">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                    {t("quick_actions")}
                  </h4>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <Button 
                      asChild
                      className="w-full h-12 sm:h-14 justify-between bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white text-sm sm:text-base font-bold transition-all duration-300 hover:shadow-xl hover:scale-105 rounded-xl group"
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <span className="flex items-center">
                          <Phone className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform" />
                          <span className="truncate">{t("message_on_whatsapp")}</span>
                        </span>
                        <ExternalLink className="h-4 w-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                    
                    <Button 
                      asChild
                      className="w-full h-12 sm:h-14 justify-between bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 hover:from-blue-600 hover:via-sky-600 hover:to-indigo-600 text-white text-sm sm:text-base font-bold transition-all duration-300 hover:shadow-xl hover:scale-105 rounded-xl group"
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <span className="flex items-center">
                          <MessageCircle className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform" />
                          <span className="truncate">{t("join_telegram_channel")}</span>
                        </span>
                        <ExternalLink className="h-4 w-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                    
                    <Button 
                      onClick={handleScrollToCourses}
                      className="w-full h-12 sm:h-14 justify-between bg-gradient-to-r from-gold via-amber-500 to-yellow-500 hover:from-yellow-600 hover:via-gold hover:to-amber-600 text-black text-sm sm:text-base font-bold transition-all duration-300 hover:shadow-xl hover:scale-105 rounded-xl group"
                    >
                      <span className="flex items-center">
                        <GraduationCap className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform" />
                        <span className="truncate">{t("browse_courses")}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Response Time Card with premium design */}
              <Card className="relative overflow-hidden text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
                <CardContent className="p-6 sm:p-8">
                  <div className="relative inline-block mb-4 sm:mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/30 to-yellow-500/30 rounded-full blur-xl animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-gold via-amber-500 to-yellow-500 rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center shadow-xl">
                      <Clock className="text-black text-3xl sm:text-4xl animate-pulse" />
                    </div>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    {t("quick_response_time")}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                    {t("response_time_description")}
                  </p>
                  <div className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    <span className="text-xs sm:text-sm font-bold text-green-700 dark:text-green-400">Available 24/7</span>
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
