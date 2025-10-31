import { Route, Switch } from "wouter";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import MobileFixedToggles from "./components/MobileFixedToggles";
import MobileDropdownBackdrop from "./components/MobileDropdownBackdrop";
import ResponsiveToolbar from "./components/ResponsiveToolbar";
import { DropdownProvider } from "./contexts/DropdownContext";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import "./i18n";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="kj-theme">
        <DropdownProvider>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Switch>
              <Route path="/" component={Home} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <MobileDropdownBackdrop />
          <MobileFixedToggles />
          <ResponsiveToolbar />
          <Toaster />
        </DropdownProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;