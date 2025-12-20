import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { i18n } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent relative overflow-hidden">

      <div className="text-center space-y-6 relative z-10 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl p-12 rounded-3xl border border-white/20 dark:border-gray-800/50 shadow-2xl">
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Page Not Found</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-md">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link href={`/${i18n.language}`}>
          <Button size="lg" className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg transition-all">
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
}