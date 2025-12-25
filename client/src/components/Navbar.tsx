import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Gift, Home, Shield, LogOut } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location === path ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="text-2xl font-serif text-primary">Lisa Belle</span>
            </div>
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/" className={`${isActive("/")} transition-colors duration-200 flex items-center gap-2`}>
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            
            <Link href="/submit" className={`${isActive("/submit")} transition-colors duration-200 flex items-center gap-2`}>
              <Gift className="w-4 h-4" />
              <span className="hidden sm:inline">Send Gift</span>
            </Link>

            {user && (
              <Link href="/admin" className={`${isActive("/admin")} transition-colors duration-200 flex items-center gap-2`}>
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}

            {user ? (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => logout()}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
