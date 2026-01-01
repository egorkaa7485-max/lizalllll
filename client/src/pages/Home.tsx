import { useWishlist } from "@/hooks/use-wishlist";
import { WishlistItemCard } from "@/components/WishlistItemCard";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Gift, Heart } from "lucide-react";
import sakuraGif from "/sacura.gif";

const HomeContent = () => {
  const { data: wishlist, isLoading } = useWishlist();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-300 to-pink-500 pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/50" style={{backgroundImage: 'url(/200w.gif)', backgroundSize: '50%', backgroundPosition: '-30% 10%', backgroundRepeat: 'no-repeat'}}>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              position: 'relative',
              padding: '0.5rem',
              borderRadius: '100vmax',
              isolation: 'isolate',
              backgroundColor: 'rgb(255 255 255 / 25%)',
              color: 'rgb(255 255 255 / 90%)',
              textShadow: '0 2px 4px rgb(0 0 0 / 10%)',
              fontSize: '1.25rem',
              boxShadow: '0 6px 6px rgb(0 0 0 / 20%), 0 0 20px rgb(0 0 0 / 10%)',
              textAlign: 'center',
              userSelect: 'none',
              cursor: 'grab',
              marginBottom: '1rem'
            }}>
              <div style={{
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: 'inherit',
                backdropFilter: 'blur(3px)',
                filter: 'url(#glass-distortion)',
                zIndex: -1
              }} />
              <div style={{
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: 'inherit',
                boxShadow: 'inset 2px 2px 1px 0 rgb(255 255 255 / 50%), inset -1px -1px 1px 1px rgb(255 255 255 / 50%)'
              }} />
              <h1
                className="text-4xl md:text-5xl font-serif text-foreground mb-2 leading-tight mt-2"
                style={{ position: 'relative', zIndex: 1 }}
              >
                Gifts for <span className="text-primary italic">Elizaveta Belle</span>
              </h1>
            </div>

            <div style={{
              position: 'relative',
              padding: '1rem',
              borderRadius: '2rem',
              isolation: 'isolate',
              backgroundColor: 'rgb(255 255 255 / 25%)',
              color: 'rgb(255 255 255 / 90%)',
              textShadow: '0 2px 4px rgb(0 0 0 / 10%)',
              fontSize: '1.125rem',
              boxShadow: '0 6px 6px rgb(0 0 0 / 20%), 0 0 20px rgb(0 0 0 / 10%)',
              textAlign: 'center',
              userSelect: 'none',
              cursor: 'grab',
              marginBottom: '1rem',
              maxWidth: '32rem',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              <div style={{
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: 'inherit',
                backdropFilter: 'blur(3px)',
                filter: 'url(#glass-distortion)',
                zIndex: -1
              }} />
              <div style={{
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: 'inherit',
                boxShadow: 'inset 2px 2px 1px 0 rgb(255 255 255 / 50%), inset -1px -1px 1px 1px rgb(255 255 255 / 50%)'
              }} />
              <p className="text-lg md:text-xl text-foreground font-semibold leading-relaxed" style={{ position: 'relative', zIndex: 1, margin: 0, textShadow: '0 1px 2px rgb(0 0 0 / 20%)', fontWeight: '900' }}>
                Привет, дорогой подписчик! Уже сейчас хочу сказать тебе „спасибо“ за твоё желание порадовать меня. Мне очень приятно
                <img src="/smyshaushaesykot.gif" alt="smyshaushaesykot" style={{ display: 'inline', marginLeft: '10px', width: '30px', height: '30px' }} />
              </p>
            </div>
            
            <div className="mt-16 flex flex-col items-center gap-4 w-full max-w-sm mx-auto px-4">
              {/* Action Buttons - Stacked from biggest to smallest */}
              <Link href="/submit" className="w-full">
                <Button size="lg" className="w-full rounded-full h-14 text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all bg-primary hover:bg-primary/90">
                  <Gift className="mr-2 w-5 h-5" />
                  Отправить подарок
                </Button>
              </Link>

              <a href="#wishlist" className="w-full">
                <Button variant="outline" size="default" className="w-full rounded-full h-11 bg-white/50 border-white hover:bg-white text-foreground shadow-sm">
                  Посмотреть список
                </Button>
              </a>

              {/* Currency Button - Now at the bottom */}
              <Link href="/donations" className="mt-2">
                <Button 
                  size="icon" 
                  className="w-14 h-14 rounded-full text-2xl shadow-[0_4px_20px_rgba(var(--primary),0.4)] hover:shadow-[0_6px_25px_rgba(var(--primary),0.6)] transition-all bg-primary hover:bg-primary/90"
                >
                  ₽
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute top-[50%] right-0 w-[50%] h-[50%] bg-cover bg-no-repeat" style={{ backgroundImage: 'url(/gggggg.gif)', transform: 'scaleX(-1)', backgroundPosition: 'right' }} />
        </div>
      </div>

      {/* Wishlist Section */}
      <div id="wishlist" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-gray-500/20 to-gray-700/20">
        <div className="text-center mb-16">
          <Heart className="w-8 h-8 text-primary mx-auto mb-4 fill-current/20" />
          <h2 className="text-3xl md:text-4xl font-serif text-foreground" style={{ color: 'white' }}>Мой список желаний</h2>
          <p className="mt-3 italic font-bold text-lg" style={{ color: '#58414D' }}>Вещи, о которых я сейчас мечтаю</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-96 animate-pulse border border-border/50" />
            ))}
          </div>
        ) : wishlist?.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-border">
            <p className="text-muted-foreground text-lg">Список желаний пуст.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist?.map((item) => (
              <WishlistItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const LiquidGlassFilter = () => (
  <svg xmlns="http://www.w3.org/2000/svg" role="presentation" style={{ display: 'none' }}>
    <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
      <feTurbulence type="fractalNoise" baseFrequency="0.001 0.005" numOctaves="1" seed="17" result="turbulence"/>
      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
      </feComponentTransfer>
      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
      <feSpecularLighting in="softMap" surfaceScale="5" specularConstant="1" specularExponent="100" lighting-color="white" result="specLight">
        <fePointLight x="-200" y="-200" z="300" />
      </feSpecularLighting>
      <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />
      <feDisplacementMap in="SourceGraphic" in2="softMap" scale="200" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>
);

export default function Home() {
  return (
    <>
      <LiquidGlassFilter />
      <HomeContent />
    </>
  );
}
