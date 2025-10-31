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
    <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Advanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 right-5 sm:right-20 w-48 h-48 sm:w-80 sm:h-80 bg-gradient-to-br from-gold/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-5 sm:left-20 w-40 h-40 sm:w-64 sm:h-64 bg-gradient-to-tl from-blue-500/20 to-purple-500/20 rounded-full blur-2xl" style={{ animation: "bounce 4s ease-in-out infinite" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Header */}
        <ScrollAnimated animation="fadeInUp" className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className="inline-block mb-3 sm:mb-4 px-4 py-2 bg-gradient-to-r from-gold/20 to-blue-600/20 rounded-full">
            <span className="text-xs sm:text-sm font-semibold text-gold">💬 Let's Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4 sm:mb-6 leading-tight">
            <span className="gradient-text">{t("get_in_touch")}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            {t("contact_intro")}
          </p>
        </ScrollAnimated>

        {/* Feature Cards */}
        <ScrollAnimated animation="fadeInUp" delay={200} className="mb-10 sm:mb-12 lg:mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-3 sm:p-4 lg:p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800 border-2 border-transparent hover:border-gold group">
                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 mx-auto mb-2 sm:mb-3 text-gold group-hover:scale-110 transition-transform" />
                <h4 className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 dark:text-white mb-1">{feature.title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">{feature.description}</p>
              </Card>
            ))}
          </div>
        </ScrollAnimated>
        
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16">
          {/* Enhanced Contact Form */}
          <ScrollAnimated animation="slideInLeft" delay={400}>
            <Card className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-2xl sm:rounded-3xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-blue-500 to-purple-500"></div>
              <CardContent className="p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <div className="bg-gradient-to-br from-gold to-yellow-500 rounded-xl sm:rounded-2xl p-2 sm:p-3">
                    <Send className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold gradient-text">
                    {t("send_me_a_message")}
                  </h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300">{t("full_name")}</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="mt-2 h-11 sm:h-12 text-sm sm:text-base transition-all duration-300 focus:ring-2 focus:ring-gold/50 border-2 hover:border-gold/30 rounded-xl"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300">{t("email_address")}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="mt-2 h-11 sm:h-12 text-sm sm:text-base transition-all duration-300 focus:ring-2 focus:ring-gold/50 border-2 hover:border-gold/30 rounded-xl"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300">{t("subject")}</Label>
                    <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                      <SelectTrigger className="mt-2 h-11 sm:h-12 text-sm sm:text-base transition-all duration-300 focus:ring-2 focus:ring-gold/50 border-2 hover:border-gold/30 rounded-xl">
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
                  
                  <div>
                    <Label htmlFor="message" className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300">{t("message")}</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="Tell me about your trading goals..."
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                      className="mt-2 text-sm sm:text-base resize-none transition-all duration-300 focus:ring-2 focus:ring-gold/50 border-2 hover:border-gold/30 rounded-xl"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full h-12 sm:h-14 bg-gradient-to-r from-gold via-yellow-500 to-gold hover:from-yellow-600 hover:via-gold hover:to-yellow-600 text-black text-base sm:text-lg font-bold transition-all duration-300 transform shadow-xl hover:shadow-2xl hover:scale-105 rounded-xl"
                  >
                    <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    {contactMutation.isPending ? t("sending") : t("send_message")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </ScrollAnimated>
          
          {/* Enhanced Contact Information */}
          <ScrollAnimated animation="slideInRight" delay={600}>
            <div className="space-y-6 sm:space-y-8">
              {/* Contact Methods */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-gold to-yellow-500 rounded-full"></div>
                  {t("contact_information")}
                </h3>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5">
                  {contactMethods.map((method, index) => (
                    <ScrollAnimated 
                      key={index}
                      animation="scaleIn" 
                      delay={index * 100}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <Card className="relative p-4 sm:p-5 hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-gold rounded-2xl">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className={`bg-gradient-to-br ${method.color} rounded-xl sm:rounded-2xl w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                            <method.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-1 ${method.hoverColor} transition-colors`}>
                              {method.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">{method.value}</p>
                          </div>
                        </div>
                      </Card>
                    </ScrollAnimated>
                  ))}
                </div>
              </div>
              
              {/* Quick Action Buttons */}
              <ScrollAnimated animation="scaleIn" delay={800}>
                <Card className="bg-gradient-to-br from-gold/10 via-blue-500/5 to-purple-500/10 border-2 border-gold/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300 rounded-2xl sm:rounded-3xl overflow-hidden">
                  <CardContent className="p-5 sm:p-6 lg:p-8">
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-gold" />
                      {t("quick_actions")}
                    </h4>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <Button 
                        asChild
                        className="w-full h-12 sm:h-14 justify-between bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm sm:text-base transition-all duration-300 hover:shadow-xl hover:scale-105 rounded-xl"
                      >
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          <span className="flex items-center">
                            <Phone className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="truncate">{t("message_on_whatsapp")}</span>
                          </span>
                          <ExternalLink className="h-4 w-4 flex-shrink-0" />
                        </a>
                      </Button>
                      
                      <Button 
                        asChild
                        className="w-full h-12 sm:h-14 justify-between bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm sm:text-base transition-all duration-300 hover:shadow-xl hover:scale-105 rounded-xl"
                      >
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          <span className="flex items-center">
                            <MessageCircle className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="truncate">{t("join_telegram_channel")}</span>
                          </span>
                          <ExternalLink className="h-4 w-4 flex-shrink-0" />
                        </a>
                      </Button>
                      
                      <Button 
                        onClick={handleScrollToCourses}
                        className="w-full h-12 sm:h-14 justify-between bg-gradient-to-r from-gold via-yellow-500 to-gold hover:from-yellow-600 hover:via-gold hover:to-yellow-600 text-black text-sm sm:text-base font-bold transition-all duration-300 hover:shadow-xl hover:scale-105 rounded-xl"
                      >
                        <span className="flex items-center">
                          <GraduationCap className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                          <span className="truncate">{t("browse_courses")}</span>
                        </span>
                        <ArrowRight className="h-4 w-4 flex-shrink-0" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimated>
              
              {/* Response Time Card */}
              <ScrollAnimated animation="zoomIn" delay={1000}>
                <Card className="text-center bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl sm:rounded-3xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-blue-500 to-purple-500"></div>
                  <CardContent className="p-6 sm:p-8">
                    <div className="bg-gradient-to-br from-gold/20 to-yellow-500/20 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <Clock className="text-gold text-2xl sm:text-3xl animate-pulse" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                      {t("quick_response_time")}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t("response_time_description")}
                    </p>
                    <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-gold font-semibold">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Available 24/7</span>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimated>
            </div>
          </ScrollAnimated>
        </div>
      </div>
    </section>
  );
}