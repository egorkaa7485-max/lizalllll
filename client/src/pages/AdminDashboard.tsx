import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useWishlist, useCreateWishlistItem } from "@/hooks/use-wishlist";
import { usePickupPoints, useCreatePickupPoint, useDeletePickupPoint } from "@/hooks/use-pickup-points";
import { useSubmissions } from "@/hooks/use-submissions";
import { useUpload } from "@/hooks/use-upload";
import { ObjectUploader } from "@/components/ObjectUploader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertWishlistItemSchema, insertPickupPointSchema } from "@shared/schema";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Package, MapPin, List, Upload, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { WishlistItemCard } from "@/components/WishlistItemCard";

export default function AdminDashboard() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login === "I_Love_Egorka7485" && password === "Egorka_lycshiy") {
      setIsAuthorized(true);
    } else {
      alert("Неверный логин или пароль");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-secondary/10">
        <Card className="w-full max-w-md shadow-xl border-white/50 bg-white/80 backdrop-blur">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-primary w-6 h-6" />
            </div>
            <CardTitle className="text-2xl font-serif">Вход в панель</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Логин</label>
                <Input 
                  value={login} 
                  onChange={(e) => setLogin(e.target.value)} 
                  placeholder="Введите логин"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Пароль</label>
                <Input 
                  type="password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Введите пароль"
                  className="rounded-xl"
                />
              </div>
              <Button type="submit" className="w-full rounded-xl h-12">
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { data: wishlist } = useWishlist();
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Панель администратора</h1>
            <p className="text-muted-foreground">Управляйте своим миром, {user?.firstName || "Админ"}</p>
          </div>
        </div>

        <Tabs defaultValue="submissions" className="space-y-8">
          <TabsList className="bg-white p-1 rounded-xl shadow-sm border border-border">
            <TabsTrigger value="submissions" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Package className="w-4 h-4 mr-2" /> Поступления
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <List className="w-4 h-4 mr-2" /> Список желаний
            </TabsTrigger>
            <TabsTrigger value="pickup" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MapPin className="w-4 h-4 mr-2" /> Пункты выдачи
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submissions">
            <SubmissionsTab />
          </TabsContent>
          
          <TabsContent value="wishlist">
            <WishlistTab />
          </TabsContent>
          
          <TabsContent value="pickup">
            <PickupPointsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function SubmissionsTab() {
  const { data: submissions, isLoading } = useSubmissions();

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {submissions?.map((submission) => (
          <Card key={submission.id} className="overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="bg-secondary/20 border-b border-border/40 pb-4">
              <CardTitle className="font-serif text-lg flex justify-between items-center">
                <span>{submission.senderName} {submission.senderSurname}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  submission.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {submission.status.toUpperCase()}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">QR Code</p>
                  <div className="relative aspect-square bg-secondary/10 rounded-lg overflow-hidden border border-border">
                    <a href={submission.qrCodePath} target="_blank" rel="noreferrer" className="cursor-zoom-in">
                      <img src={submission.qrCodePath} alt="QR" className="w-full h-full object-cover" />
                    </a>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Payment Proof</p>
                  <div className="relative aspect-square bg-secondary/10 rounded-lg overflow-hidden border border-border">
                    <a href={submission.paymentProofPath} target="_blank" rel="noreferrer" className="cursor-zoom-in">
                      <img src={submission.paymentProofPath} alt="Proof" className="w-full h-full object-cover" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-xs text-muted-foreground text-right">
                Submitted on {new Date(submission.createdAt!).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {submissions?.length === 0 && (
          <div className="col-span-full py-20 text-center text-muted-foreground bg-white rounded-xl border border-dashed">
            Пока нет поступлений.
          </div>
        )}
      </div>
    </div>
  );
}

function WishlistTab() {
  const { data: wishlist } = useWishlist();
  const { mutate: createItem, isPending } = useCreateWishlistItem();
  const { getUploadParameters } = useUpload();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof insertWishlistItemSchema>>({
    resolver: zodResolver(insertWishlistItemSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
      imagePath: "",
    },
  });

  const onSubmit = (values: z.infer<typeof insertWishlistItemSchema>) => {
    createItem(values, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      }
    });
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full shadow-lg shadow-primary/20">
              <Plus className="w-4 h-4 mr-2" /> Добавить
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Добавить в список желаний</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
                <FormField
                  control={form.control}
                  name="imagePath"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Изображение</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                           {field.value && (
                            <img src={field.value} alt="Preview" className="w-20 h-20 rounded-md object-cover border" />
                           )}
                           <ObjectUploader
                             onGetUploadParameters={getUploadParameters}
                             onComplete={(result) => {
                               if (result.successful[0]) {
                                 field.onChange(result.successful[0].uploadURL);
                               }
                             }}
                             buttonClassName="w-full"
                           >
                             <Upload className="w-4 h-4 mr-2" /> Загрузить фото
                           </ObjectUploader>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Название</FormLabel>
                      <FormControl>
                        <Input placeholder="Chanel Bag" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Описание (необязательно)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Black quilted leather..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ссылка (необязательно)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Добавление..." : "Добавить в список"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist?.map((item) => (
          <WishlistItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function PickupPointsTab() {
  const { data: pickupPoints } = usePickupPoints();
  const { mutate: createPoint, isPending } = useCreatePickupPoint();
  const { mutate: deletePoint } = useDeletePickupPoint();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof insertPickupPointSchema>>({
    resolver: zodResolver(insertPickupPointSchema),
    defaultValues: {
      address: "",
      details: "",
    },
  });

  const onSubmit = (values: z.infer<typeof insertPickupPointSchema>) => {
    createPoint(values, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      }
    });
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full shadow-lg shadow-primary/20">
              <Plus className="w-4 h-4 mr-2" /> Добавить место
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить пункт выдачи</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Адрес</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Дополнительные детали (необязательно)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Leave at reception..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Добавление..." : "Добавить место"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pickupPoints?.map((point) => (
          <motion.div 
            key={point.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between p-4 bg-white rounded-xl border border-border shadow-sm"
          >
            <div>
              <p className="font-medium text-foreground">{point.address}</p>
              {point.details && <p className="text-sm text-muted-foreground">{point.details}</p>}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-destructive hover:bg-destructive/10"
              onClick={() => deletePoint(point.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
