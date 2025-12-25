import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Check, Send } from "lucide-react";

export default function TelegramSubscription() {
  const plans = [
    { duration: "1 месяц", price: "500Р", description: "Пробный доступ к контенту" },
    { duration: "3 месяца", price: "1500Р", description: "Оптимальный выбор", popular: true },
    { duration: "6 месяцев", price: "2750Р", description: "Выгодное предложение" },
    { duration: "12 месяцев", price: "5000Р", description: "Максимальный доступ" },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-serif text-foreground mb-4">Закрытый ТГК Liza Belle 18+</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Выбери подходящий тариф и получи доступ к эксклюзивному контенту, 
            который я публикую только для своих самых преданных подписчиков. 💖
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.duration}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`relative h-full flex flex-col border-white/50 bg-white/80 backdrop-blur transition-all hover:shadow-xl ${plan.popular ? 'border-primary shadow-lg scale-105 z-10' : 'hover-elevate'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                    Популярно
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl font-serif">{plan.duration}</CardTitle>
                  <div className="text-3xl font-bold text-primary mt-2">{plan.price}</div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4">
                  <p className="text-xs text-muted-foreground text-center mb-4">{plan.description}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span>Эксклюзивный контент</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span>Личные блоги</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span>Общение в чате</span>
                    </li>
                  </ul>
                  <Button className="w-full rounded-full" variant={plan.popular ? "default" : "outline"}>
                    <Link href="/donations" className="w-full h-full flex items-center justify-center">
                      Выбрать
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/">
            <Button variant="link" className="text-muted-foreground hover:text-primary">
              Вернуться на главную
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
