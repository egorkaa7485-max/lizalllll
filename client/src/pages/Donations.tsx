import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { SiDonationalerts } from "react-icons/si";
import { FaPaypal, FaBitcoin } from "react-icons/fa";
import qrCodeImage from "@assets/panel-711364234-image-0605f462-2767-4cdd-afac-e483324861b7_1766695976511.jpg";

export default function Donations() {
  const cryptoAddress = "TQVdDwiFN3ZCSXEEE9WUbX4qVdBsC7zEaJ";

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-background">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-serif text-foreground mb-4">Донатики</h1>
          <p className="text-muted-foreground">
            Если ты хочешь поддержать меня и моё творчество, ты можешь сделать это здесь. 
            Буду очень благодарна за любую поддержку! 💖
          </p>
        </motion.div>

        <div className="grid gap-6">
          <Card className="overflow-hidden hover-elevate transition-all border-white/50 bg-white/80 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl">
                    <SiDonationalerts />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-medium text-lg">DonationAlerts</h3>
                    <p className="text-sm text-muted-foreground text-balance">Самый популярный способ поддержки</p>
                  </div>
                </div>
                <Button asChild className="rounded-full w-full sm:w-auto">
                  <a href="https://www.donationalerts.com/r/elizaveta_belle" target="_blank" rel="noopener noreferrer">
                    Поддержать
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover-elevate transition-all border-white/50 bg-white/80 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
                    <FaPaypal />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-medium text-lg">DonatePay</h3>
                    <p className="text-sm text-muted-foreground">Быстро и удобно</p>
                  </div>
                </div>
                <Button asChild variant="outline" className="rounded-full w-full sm:w-auto">
                  <a href="https://new.donatepay.ru/@1151512" target="_blank" rel="noopener noreferrer">
                    Поддержать
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-white/50 bg-white/80 backdrop-blur">
            <CardContent className="p-6">
              <div className="space-y-6 text-center">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-2xl">
                    <FaBitcoin />
                  </div>
                  <h3 className="font-medium text-lg">Крипта (USDT TRC20)</h3>
                </div>
                
                <div className="relative group max-w-[280px] mx-auto">
                  <img 
                    src={qrCodeImage} 
                    alt="Crypto QR Code" 
                    className="w-full h-auto rounded-2xl shadow-md border-4 border-white"
                  />
                </div>

                <div className="bg-secondary/30 p-4 rounded-xl break-all">
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Адрес кошелька</p>
                  <code className="text-sm font-mono text-foreground font-bold">{cryptoAddress}</code>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2 w-full text-xs h-8"
                    onClick={() => navigator.clipboard.writeText(cryptoAddress)}
                  >
                    Копировать адрес
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
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
