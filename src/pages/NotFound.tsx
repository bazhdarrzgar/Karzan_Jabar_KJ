import { Link } from "wouter";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-semibold text-foreground">Page Not Found</h2>
        <p className="text-xl text-muted-foreground max-w-md">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button size="lg" className="mt-8">
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
}