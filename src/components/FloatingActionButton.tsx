import { useState } from 'react';
import { Button } from './ui/button';
import { MessageCircle, Phone, Mail, GraduationCap, X, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function FloatingActionButton() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: MessageCircle,
      label: t('telegram'),
      color: 'bg-blue-500 hover:bg-blue-600',
      href: '#',
    },
    {
      icon: Phone,
      label: t('whatsapp'),
      color: 'bg-green-500 hover:bg-green-600',
      href: '#',
    },
    {
      icon: Mail,
      label: t('email'),
      color: 'bg-gray-600 hover:bg-gray-700',
      onClick: () => {
        const element = document.querySelector('#contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
      },
    },
    {
      icon: GraduationCap,
      label: t('courses'),
      color: 'bg-gold hover:bg-gold-dark text-black',
      onClick: () => {
        const element = document.querySelector('#courses');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
      },
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action buttons */}
      <div className={`flex flex-col-reverse gap-3 mb-3 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {actions.map((action, index) => (
          <div
            key={action.label}
            className="flex items-center gap-3 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {action.label}
              </span>
            </div>
            <Button
              size="icon"
              className={`${action.color} rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}
              onClick={action.onClick}
              asChild={action.href ? true : false}
            >
              {action.href ? (
                <a href={action.href} target="_blank" rel="noopener noreferrer">
                  <action.icon className="h-5 w-5" />
                </a>
              ) : (
                <action.icon className="h-5 w-5" />
              )}
            </Button>
          </div>
        ))}
      </div>

      {/* Main FAB button */}
      <Button
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-gold hover:bg-gold-dark text-black rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse-glow ${
          isOpen ? 'rotate-45' : 'rotate-0'
        } w-16 h-16 relative z-10`}
      >
        {isOpen ? (
          <X className="h-7 w-7" />
        ) : (
          <Plus className="h-7 w-7" />
        )}
      </Button>
    </div>
  );
}