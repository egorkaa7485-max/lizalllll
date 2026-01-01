import { useAuth } from "@/hooks/use-auth";
import { useSubmissions } from "@/hooks/use-submissions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Profile() {
  const { user } = useAuth();
  const { data: submissions } = useSubmissions();
  const [telegramUserId, setTelegramUserId] = useState("");
  const [telegramAvatar, setTelegramAvatar] = useState<string | null>(null);
  const [loadingAvatar, setLoadingAvatar] = useState(false);

  const fetchTelegramAvatar = async () => {
    if (!telegramUserId) return;

    setLoadingAvatar(true);
    try {
      const response = await fetch(`/api/telegram-avatar/${telegramUserId}`);
      const data = await response.json();
      setTelegramAvatar(data.avatarUrl);
    } catch (error) {
      console.error('Error fetching Telegram avatar:', error);
    } finally {
      setLoadingAvatar(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-400 to-pink-900 flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p>Please log in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-400 to-pink-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={telegramAvatar || user.profileImageUrl || undefined} />
                <AvatarFallback className="text-2xl">
                  {(user.firstName || user.email || "U").charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{user.firstName || user.email || "User"}</CardTitle>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <Label htmlFor="telegram-user-id">Telegram User ID</Label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    id="telegram-user-id"
                    type="number"
                    placeholder="Введите ваш Telegram User ID"
                    value={telegramUserId}
                    onChange={(e) => setTelegramUserId(e.target.value)}
                  />
                  <Button onClick={fetchTelegramAvatar} disabled={loadingAvatar}>
                    {loadingAvatar ? "Загрузка..." : "Получить аватар"}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Узнать свой User ID можно в боте @userinfobot
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Orders/Submissions */}
        <Card>
          <CardHeader>
            <CardTitle>Мои заказы</CardTitle>
          </CardHeader>
          <CardContent>
            {submissions && submissions.length > 0 ? (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{submission.senderName} {submission.senderSurname}</p>
                      <p className="text-sm text-muted-foreground">Заказ от {new Date(submission.createdAt || '').toLocaleDateString()}</p>
                    </div>
                    <Badge variant={submission.status === 'approved' ? 'default' : 'secondary'}>
                      {submission.status === 'approved' ? 'Одобрено' : 'В обработке'}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">У вас пока нет заказов.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
