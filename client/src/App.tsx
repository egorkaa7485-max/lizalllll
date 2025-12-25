import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import SubmitGift from "@/pages/SubmitGift";
import Donations from "@/pages/Donations";
import TelegramSubscription from "@/pages/TelegramSubscription";
import AdminDashboard from "@/pages/AdminDashboard";
import { Navbar } from "@/components/Navbar";

function Router() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/submit" component={SubmitGift} />
        <Route path="/donations" component={Donations} />
        <Route path="/telegram-subscription" component={TelegramSubscription} />
        <Route path="/Lizka_Lychshay061172" component={AdminDashboard} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
