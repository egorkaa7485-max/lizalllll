import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Gift, Home, Shield, LogOut } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location === path ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-700/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/profile">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                <span className="text-primary font-semibold">E</span>
              </div>
            </div>
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/" className={`${isActive("/")} transition-colors duration-200 flex items-center gap-2`}>
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Главная</span>
            </Link>
            
            <Link href="/submit" className={`${isActive("/submit")} transition-colors duration-200 flex items-center gap-2`}>
              <Gift className="w-4 h-4" />
              <span className="hidden sm:inline">Отправить подарок</span>
            </Link>

            {user && (
              <Link href="/admin" className={`${isActive("/admin")} transition-colors duration-200 flex items-center gap-2`}>
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Админка</span>
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
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // Simulate Telegram login for testing
                  const testData = {
                    id: 123456789,
                    first_name: "Тест",
                    last_name: "Пользователь",
                    username: "testuser",
                    photo_url: "https://via.placeholder.com/200x200?text=Test+Avatar"
                  };

                  fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(testData),
                  })
                  .then(response => response.json())
                  .then(data => {
                    if (data.success) {
                      window.location.reload();
                    } else {
                      alert('Ошибка авторизации');
                    }
                  })
                  .catch(error => {
                    console.error('Login error:', error);
                    alert('Ошибка сети');
                  });
                }}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                🚀 Войти
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
