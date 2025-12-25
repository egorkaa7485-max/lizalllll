import { useWishlist } from "@/hooks/use-wishlist";
import { WishlistItemCard } from "@/components/WishlistItemCard";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Gift, Heart } from "lucide-react";

export default function Home() {
  const { data: wishlist, isLoading } = useWishlist();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-secondary/30 pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/50">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/80 backdrop-blur-sm border border-white text-primary text-sm font-medium shadow-sm">
              Welcome to my world ✨
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-foreground mb-6 leading-tight">
              Gifts for <span className="text-primary italic">Lisa Belle</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              "A gift consists not in what is done or given, but in the intention of the giver or doer." 
              Explore my wishlist and if you'd like to send a little joy, I'd be forever grateful.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/submit">
                <Button size="lg" className="rounded-full px-8 h-14 text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all bg-primary hover:bg-primary/90">
                  <Gift className="mr-2 w-5 h-5" />
                  Send a Gift
                </Button>
              </Link>
              <a href="#wishlist">
                <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg bg-white/50 border-white hover:bg-white text-foreground shadow-sm">
                  View Wishlist
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Wishlist Section */}
      <div id="wishlist" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <Heart className="w-8 h-8 text-primary mx-auto mb-4 fill-current/20" />
          <h2 className="text-3xl md:text-4xl font-serif text-foreground">My Wishlist</h2>
          <p className="mt-3 text-muted-foreground">Things I'm currently dreaming about</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-96 animate-pulse border border-border/50" />
            ))}
          </div>
        ) : wishlist?.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-border">
            <p className="text-muted-foreground text-lg">The wishlist is currently empty.</p>
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
