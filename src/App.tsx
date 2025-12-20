import { Route, Switch, Redirect, useLocation } from "wouter";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import MobileFixedToggles from "./components/MobileFixedToggles";
import MobileDropdownBackdrop from "./components/MobileDropdownBackdrop";
import ResponsiveToolbar from "./components/ResponsiveToolbar";
import { DropdownProvider } from "./contexts/DropdownContext";
import { useEffect, lazy, Suspense, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { PremiumBackground } from "./components/PremiumBackground";
import "./i18n";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Trade = lazy(() => import("./pages/Trade"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const SUPPORTED_LANGS = ["en", "ar", "ckb"];

interface LanguageWrapperProps {
  lang: string;
  children: ReactNode;
}

function LanguageWrapper({ lang, children }: LanguageWrapperProps) {
  const { i18n } = useTranslation();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (SUPPORTED_LANGS.includes(lang)) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
    } else {
      // If invalid language in URL, redirect to default or saved language
      const savedLang = localStorage.getItem("kj-language") || "en";
      const targetLang = SUPPORTED_LANGS.includes(savedLang) ? savedLang : "en";
      setLocation(`/${targetLang}`);
    }
  }, [lang, i18n, setLocation]);

  return <>{children}</>;
}

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Update HTML lang and dir attributes when language changes
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === "ar" || i18n.language === "ckb" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="kj-theme">
          <DropdownProvider>
            <div className="min-h-screen font-sans antialiased relative">
              <PremiumBackground />
              <Suspense fallback={<PageLoader />}>
                <Switch>
                  {/* Redirect root to default language */}
                  <Route path="/">
                    <Redirect to="/en" />
                  </Route>

                  {/* Language-prefixed routes */}
                  <Route path="/:lang">
                    {(params) => (
                      <LanguageWrapper lang={params.lang}>
                        <Home />
                      </LanguageWrapper>
                    )}
                  </Route>

                  <Route path="/:lang/trade">
                    {(params) => (
                      <LanguageWrapper lang={params.lang}>
                        <Trade />
                      </LanguageWrapper>
                    )}
                  </Route>

                  {/* Fallback for routes without lang prefix */}
                  <Route path="/trade">
                    <Redirect to="/en/trade" />
                  </Route>

                  <Route component={NotFound} />
                </Switch>
              </Suspense>
            </div>
            <MobileDropdownBackdrop />
            <MobileFixedToggles />
            <ResponsiveToolbar />
            <Toaster />
          </DropdownProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;