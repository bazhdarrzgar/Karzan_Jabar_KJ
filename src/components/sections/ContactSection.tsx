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
import { Mail, Phone, MessageCircle, Clock, ExternalLink, ArrowRight, GraduationCap } from "lucide-react";
import { ScrollAnimated } from "../../hooks/use-scroll-animation";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

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
    <section id="contact" className="py-24 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-purple-500/5 rounded-full blur-xl animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollAnimated animation="fadeInUp" className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold font-heading mb-8 hover:scale-105 transition-transform duration-300">
            <span className="gradient-text">{t("get_in_touch")}</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {t("contact_intro")}
          </p>
        </ScrollAnimated>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Enhanced Contact Form */}
          <ScrollAnimated animation="slideInLeft" delay={200}>
            <Card className="glass-effect card-hover-lift bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <CardContent className="p-10">
                <h3 className="text-3xl font-bold gradient-text mb-8">
                  {t("send_me_a_message")}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <ScrollAnimated animation="fadeInUp" delay={100}>
                    <Label htmlFor="name">{t("full_name")}</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-gold/50 hover:scale-102"
                    />
                  </ScrollAnimated>
                  
                  <ScrollAnimated animation="fadeInUp" delay={200}>
                    <Label htmlFor="email">{t("email_address")}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-gold/50 hover:scale-102"
                    />
                  </ScrollAnimated>
                  
                  <ScrollAnimated animation="fadeInUp" delay={300}>
                    <Label htmlFor="subject">{t("subject")}</Label>
                    <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                      <SelectTrigger className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-gold/50 hover:scale-102">
                        <SelectValue placeholder={t("select_subject")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="course">{t("trading_course_inquiry")}</SelectItem>
                        <SelectItem value="partnership">{t("justmarkets_partnership")}</SelectItem>
                        <SelectItem value="consultation">{t("private_consultation")}</SelectItem>
                        <SelectItem value="other">{t("other")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </ScrollAnimated>
                  
                  <ScrollAnimated animation="fadeInUp" delay={400}>
                    <Label htmlFor="message">{t("message")}</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                      className="mt-2 resize-none transition-all duration-300 focus:ring-2 focus:ring-gold/50 hover:scale-102"
                    />
                  </ScrollAnimated>
                  
                  <ScrollAnimated animation="fadeInUp" delay={500}>
                    <Button 
                      type="submit"
                      disabled={contactMutation.isPending}
                      className="w-full bg-gold hover:bg-gold-dark text-black font-semibold transition-all duration-300 transform shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      {contactMutation.isPending ? t("sending") : t("send_message")}
                    </Button>
                  </ScrollAnimated>
                </form>
              </CardContent>
            </Card>
          </ScrollAnimated>
          
          {/* Enhanced Contact Information */}
          <ScrollAnimated animation="slideInRight" delay={400}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t("contact_information")}</h3>
                
                <div className="space-y-6">
                  <ScrollAnimated animation="slideInRight" delay={100} className="flex items-start group hover:translate-x-2 transition-transform">
                    <div className="bg-gold rounded-full w-12 h-12 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-xl">
                      <Mail className="text-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-gold transition-colors">{t("email")}</h4>
                      <p className="text-gray-600 dark:text-gray-300">contact@kjcompany.com</p>
                    </div>
                  </ScrollAnimated>
                  
                  <ScrollAnimated animation="slideInRight" delay={200} className="flex items-start group hover:translate-x-2 transition-transform">
                    <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-xl">
                      <Phone className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-green-500 transition-colors">{t("whatsapp")}</h4>
                      <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                    </div>
                  </ScrollAnimated>
                  
                  <ScrollAnimated animation="slideInRight" delay={300} className="flex items-start group hover:translate-x-2 transition-transform">
                    <div className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-xl">
                      <MessageCircle className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-500 transition-colors">{t("telegram")}</h4>
                      <p className="text-gray-600 dark:text-gray-300">@KJTrading</p>
                    </div>
                  </ScrollAnimated>
                </div>
              </div>
              
              {/* Enhanced Quick Action Buttons */}
              <ScrollAnimated animation="scaleIn" delay={600}>
                <Card className="bg-gradient-to-br from-gold/10 to-gold/5 border-gold/20 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {t("quick_actions")}
                    </h4>
                    
                    <div className="space-y-3">
                      <ScrollAnimated animation="slideInLeft" delay={100}>
                        <Button 
                          asChild
                          className="w-full justify-between bg-green-500 hover:bg-green-600 text-white transition-all duration-300 hover:shadow-lg hover:scale-102"
                        >
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <span className="flex items-center">
                              <Phone className="mr-3 h-4 w-4" />
                              {t("message_on_whatsapp")}
                            </span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </ScrollAnimated>
                      
                      <ScrollAnimated animation="slideInLeft" delay={200}>
                        <Button 
                          asChild
                          className="w-full justify-between bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 hover:shadow-lg hover:scale-102"
                        >
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <span className="flex items-center">
                              <MessageCircle className="mr-3 h-4 w-4" />
                              {t("join_telegram_channel")}
                            </span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </ScrollAnimated>
                      
                      <ScrollAnimated animation="slideInLeft" delay={300}>
                        <Button 
                          onClick={handleScrollToCourses}
                          className="w-full justify-between bg-gold hover:bg-gold-dark text-black transition-all duration-300 hover:shadow-lg hover:scale-102"
                        >
                          <span className="flex items-center">
                            <GraduationCap className="mr-3 h-4 w-4" />
                            {t("browse_courses")}
                          </span>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </ScrollAnimated>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimated>
              
              {/* Enhanced Response Time Card */}
              <ScrollAnimated animation="zoomIn" delay={800}>
                <Card className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <Clock className="text-gold text-3xl mb-3 mx-auto animate-pulse" />
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {t("quick_response_time")}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t("response_time_description")}
                    </p>
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