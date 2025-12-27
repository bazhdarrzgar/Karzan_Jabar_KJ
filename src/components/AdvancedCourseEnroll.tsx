// advanced_course_enroll.tsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";

interface AdvancedCourseEnrollProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdvancedCourseEnroll({ isOpen, onClose }: AdvancedCourseEnrollProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    language: "",
    phone: "",
  });
  const [phoneError, setPhoneError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateIraqiPhoneNumber = (phone: string): boolean => {
    const cleaned = phone.replace(/[\s-]/g, "");
    const patterns = [
      /^\+964(75|77)\d{8}$/,
      /^0(75|77)\d{8}$/,
      /^(75|77)\d{8}$/
    ];
    return patterns.some(pattern => pattern.test(cleaned));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, phone: value });
    if (phoneError && value.length === 0) {
      setPhoneError("");
    }
    if (value.length > 0) {
      const isValid = validateIraqiPhoneNumber(value);
      if (!isValid && value.length >= 10) {
        setPhoneError(t("invalid_iraqi_phone_number") || "Please enter a valid Iraqi phone number (075xxxxxxxx or 077xxxxxxxx)");
      } else if (isValid) {
        setPhoneError("");
      }
    }
  };

  const handlePhoneBlur = () => {
    if (formData.phone.length > 0 && !validateIraqiPhoneNumber(formData.phone)) {
      setPhoneError(t("invalid_iraqi_phone_number") || "Please enter a valid Iraqi phone number (075xxxxxxxx or 077xxxxxxxx)");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateIraqiPhoneNumber(formData.phone)) {
      setPhoneError(t("invalid_iraqi_phone_number") || "Please enter a valid Iraqi phone number (075xxxxxxxx or 077xxxxxxxx)");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          course: t("advanced_course"),
        }),
      });

      if (response.ok) {
        toast({
          title: t("message_sent_successfully"),
          description: t("message_sent_description"),
        });
        onClose();
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error: any) {
      console.error("Error submitting enrollment:", error);
      toast({
        title: t("error"),
        description: error.message || t("failed_to_send_message"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-2 sm:inset-4 md:inset-16 bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl z-[101] overflow-hidden flex flex-col max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800">
              <motion.h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {t("advanced_course_enrollment_title")}
              </motion.h2>
              <motion.button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200">
                <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </motion.button>
            </div>
            <div className="flex-1 overflow-y-auto p-8">
              <p className="mb-6 text-gray-700 dark:text-gray-300 text-lg">
                {t("advanced_course_enrollment_description")}
              </p>
              <form onSubmit={handleSubmit} className="space-y-7">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <label className="block mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">{t("name_label")}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 transition-all duration-200 outline-none shadow-sm hover:shadow-md"
                    placeholder={t("name_placeholder") || "Enter your full name"}
                  />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative">
                  <label className="block mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">{t("preferred_language_label")}</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 transition-all duration-200 outline-none shadow-sm hover:shadow-md flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        {formData.language ? (
                          <>
                            {formData.language === 'english' && <img src="/images/us.png" alt="English" className="w-5 h-3.5 object-cover rounded-sm" />}
                            {formData.language === 'kurdish' && <img src="/images/kurd.png" alt="Kurdish" className="w-5 h-3.5 object-cover rounded-sm" />}
                            {formData.language === 'arabic' && <img src="/images/arabic.png" alt="Arabic" className="w-5 h-3.5 object-cover rounded-sm" />}
                            <span className="capitalize">{formData.language === 'ckb' ? 'کوردی' : formData.language}</span>
                          </>
                        ) : (
                          <span className="text-gray-400">{t("select_language_placeholder") || "Select Language"}</span>
                        )}
                      </span>
                      <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110]" onClick={() => setIsDropdownOpen(false)} />
                          <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ duration: 0.2 }} className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-xl shadow-2xl z-[111] overflow-hidden">
                            <div className="py-1">
                              {[
                                { id: 'english', label: 'English', flag: <img src="/images/us.png" alt="English" className="w-5 h-3.5 object-cover rounded-sm" /> },
                                { id: 'kurdish', label: 'کوردی', flag: <img src="/images/kurd.png" alt="Kurdish" className="w-5 h-3.5 object-cover rounded-sm" /> },
                                { id: 'arabic', label: 'العربية', flag: <img src="/images/arabic.png" alt="Arabic" className="w-5 h-3.5 object-cover rounded-sm" /> }
                              ].map((lang) => (
                                <button
                                  key={lang.id}
                                  type="button"
                                  onClick={() => {
                                    setFormData({ ...formData, language: lang.id });
                                    setIsDropdownOpen(false);
                                  }}
                                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-900 dark:text-gray-100 transition-colors duration-150"
                                >
                                  <span className="flex-shrink-0 w-6 flex justify-center">{lang.flag}</span>
                                  <span className="font-medium">{lang.label}</span>
                                  {formData.language === lang.id && (
                                    <svg className="w-5 h-5 text-blue-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <label className="block mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">{t("phone_number_label")}</label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      onBlur={handlePhoneBlur}
                      required
                      placeholder="750 000 0000"
                      className={`w-full px-4 py-3.5 rounded-xl border-2 ${phoneError ? 'border-red-500 focus:ring-red-500/10' : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500/10'} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 transition-all duration-200 outline-none shadow-sm hover:shadow-md`}
                    />
                  </div>
                  <AnimatePresence>
                    {phoneError && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <p className="mt-2.5 text-sm text-red-500 flex items-start gap-1.5">
                          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                          <span>{phoneError}</span>
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-8 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? t("sending") : t("submit_enrollment")}
                    {!isSubmitting && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
