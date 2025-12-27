import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useTranslation } from "react-i18next";

const quickLinks = [
  { href: "#about", labelKey: "about_title" },
  { href: "#courses", labelKey: "trading_courses" },
  { href: "#projects", labelKey: "kj_project_title" },
  { href: "#partnership", labelKey: "justmarkets_partnership" },
  { href: "#contact", labelKey: "get_in_touch" }
];

const services = [
  "trading_education",
  "market_analysis",
  "private_consultation",
  "portfolio_management",
  "broker_partnership"
];

const legalLinks = [
  "privacy_policy",
  "terms_of_service",
  "cookie_policy"
];

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const { t } = useTranslation();

  const newsletterMutation = useMutation({
    mutationFn: (email: string) => apiRequest("POST", "/api/newsletter", { email }),
    onSuccess: () => {
      toast({
        title: t("subscribed_successfully"),
        description: t("newsletter_thank_you"),
      });
      setEmail("");
    },
    onError: () => {
      toast({
        title: t("subscription_failed"),
        description: t("newsletter_failed"),
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: t("email_required"),
        description: t("please_enter_email"),
        variant: "destructive",
      });
      return;
    }
    newsletterMutation.mutate(email);
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="text-3xl font-bold text-gold mb-4">KJ Company</div>
            <p className="text-gray-300 mb-6">
              {t("footer_brand_desc")}
            </p>
            <div className="flex space-x-4">
              <a href="https://t.me/KarzanJabar" className="text-gray-400 hover:text-gold transition-colors" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-telegram text-xl"></i>
              </a>
              <a href="https://www.instagram.com/kjcompany_official" className="text-gray-400 hover:text-gold transition-colors" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="https://www.youtube.com/@kjkarzan" className="text-gray-400 hover:text-gold transition-colors" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube text-xl"></i>
              </a>
              <a href="https://www.facebook.com/kjcompany.official" className="text-gray-400 hover:text-gold transition-colors" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("quick_links")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-gray-300 hover:text-gold transition-colors text-left"
                  >
                    {t(link.labelKey)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("services")}</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-300 hover:text-gold transition-colors cursor-pointer">
                    {t(service)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("stay_updated")}</h3>
            <p className="text-gray-300 mb-4">{t("newsletter_desc")}</p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder={t("enter_email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button
                type="submit"
                disabled={newsletterMutation.isPending}
                className="w-full bg-gold hover:bg-gold-dark text-black font-semibold"
              >
                {newsletterMutation.isPending ? t("subscribing") : t("subscribe")}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 mb-4 md:mb-0">
            © 2026 KJ Company. {t("all_rights_reserved")}
          </p>

          <div className="flex space-x-6">
            {legalLinks.map((link) => (
              <button
                key={link}
                className="text-gray-300 hover:text-gold transition-colors text-sm"
              >
                {t(link)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Font Awesome CDN */}
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
    </footer>
  );
}