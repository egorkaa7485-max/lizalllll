import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertSubmissionSchema } from "@shared/schema";
import { useCreateSubmission } from "@/hooks/use-submissions";
import { usePickupPoints } from "@/hooks/use-pickup-points";
import { ObjectUploader } from "@/components/ObjectUploader";
import { useUpload } from "@/hooks/use-upload";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, UploadCloud, CheckCircle2 } from "lucide-react";

// Extend schema with client-side requirements if needed, but here we match DB
const formSchema = insertSubmissionSchema;

export default function SubmitGift() {
  const { mutate: submitGift, isPending } = useCreateSubmission();
  const { data: pickupPoints } = usePickupPoints();
  const [submitted, setSubmitted] = useState(false);
  const { getUploadParameters } = useUpload();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senderName: "",
      senderSurname: "",
      message: "",
      qrCodePath: "",
      paymentProofPath: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitGift(values, {
      onSuccess: () => setSubmitted(true),
    });
  }

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-secondary/20">
        <Card className="max-w-md w-full p-8 text-center bg-white/80 backdrop-blur shadow-xl border-white/50">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-serif text-foreground mb-4">Спасибо!</h2>
          <p className="text-muted-foreground mb-8">
            Ваш подарок был получен. <span style={{textShadow: '1px 1px 0px rgba(0,0,0,0.3), 2px 2px 0px rgba(0,0,0,0.2), 3px 3px 0px rgba(0,0,0,0.1)'}}>Elizavet Belle</span> скоро проверит детали.
            Ваша доброта очень важна!
          </p>
          <Button 
            onClick={() => window.location.href = "/"}
            className="w-full rounded-full"
          >
            Вернуться на главную
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-gradient-to-b from-gray-300 to-pink-500">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-foreground mb-4">Отправить подарок</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto whitespace-pre-line">
            пожалуйста, заполни свои данные ниже. Чтобы я могла быстро проверить и с удовольствием забрать твой щедрый подарок, мне нужно будет загрузить QR-код твоего заказа и подтверждение оплаты.
            {"\n\n"}
            Спасибо тебе за заботу и доброту — ты делаешь меня очень счастливой! 💖
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card className="p-6 md:p-8 bg-white border-border shadow-sm">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="senderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Имя</FormLabel>
                          <FormControl>
                            <Input placeholder="Егор" {...field} className="rounded-xl bg-secondary/20 border-border/50 focus:bg-white transition-colors h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="senderSurname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Фамилия</FormLabel>
                          <FormControl>
                            <Input placeholder="фамилия" {...field} className="rounded-xl bg-secondary/20 border-border/50 focus:bg-white transition-colors h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Что вы хотите передать Лизе?</FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            value={field.value || ""}
                            placeholder="Напишите ваше пожелание или сообщение..."
                            className="w-full rounded-xl bg-secondary/20 border-border/50 focus:bg-white transition-colors resize-none h-24 p-3"
                            rows={4}
                          />
                        </FormControl>
                        <FormDescription>Необязательное поле для личного сообщения</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* QR Code Upload */}
                    <FormField
                      control={form.control}
                      name="qrCodePath"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>QR-код заказа</FormLabel>
                          <FormControl>
                            <div className="space-y-3">
                              <div className="border-2 border-dashed border-input rounded-xl p-4 text-center hover:bg-secondary/10 transition-colors">
                                {field.value ? (
                                  <div className="relative aspect-square w-24 mx-auto rounded-lg overflow-hidden bg-secondary/20">
                                    <img src={field.value} alt="QR Code" className="w-full h-full object-cover" />
                                  </div>
                                ) : (
                                  <div className="text-sm text-muted-foreground py-4">Файл не выбран</div>
                                )}
                              </div>
                              <ObjectUploader
                                onGetUploadParameters={getUploadParameters}
                                onComplete={(result) => {
                                  if (result.successful[0]) {
                                    field.onChange(result.successful[0].uploadURL);
                                  }
                                }}
                                buttonClassName="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80"
                              >
                                <UploadCloud className="w-4 h-4 mr-2" />
                                Загрузить фото QR
                              </ObjectUploader>
                            </div>
                          </FormControl>
                          <FormDescription>Фото QR-кода для получения</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Payment Proof Upload */}
                    <FormField
                      control={form.control}
                      name="paymentProofPath"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Подтверждение оплаты</FormLabel>
                          <FormControl>
                            <div className="space-y-3">
                              <div className="border-2 border-dashed border-input rounded-xl p-4 text-center hover:bg-secondary/10 transition-colors">
                                {field.value ? (
                                  <div className="relative aspect-square w-24 mx-auto rounded-lg overflow-hidden bg-secondary/20">
                                    <img src={field.value} alt="Proof" className="w-full h-full object-cover" />
                                  </div>
                                ) : (
                                  <div className="text-sm text-muted-foreground py-4">Файл не выбран</div>
                                )}
                              </div>
                              <ObjectUploader
                                onGetUploadParameters={getUploadParameters}
                                onComplete={(result) => {
                                  if (result.successful[0]) {
                                    field.onChange(result.successful[0].uploadURL);
                                  }
                                }}
                                buttonClassName="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80"
                              >
                                <UploadCloud className="w-4 h-4 mr-2" />
                                Загрузить чек
                              </ObjectUploader>
                            </div>
                          </FormControl>
                          <FormDescription>Скриншот подтверждения оплаты</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full h-12 text-lg rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                  >
                    {isPending ? "Отправка..." : "Отправить детали подарка"}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>

          {/* Sidebar - Pickup Points */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-border/50 sticky top-24">
              <h3 className="font-serif text-xl font-medium text-foreground mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                Пункты выдачи
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Пожалуйста, выберите одно из этих мест для доставки при заказе подарка.
              </p>
              
              <div className="space-y-4">
                {pickupPoints?.map((point) => (
                  <motion.div 
                    key={point.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-4 rounded-xl border border-border shadow-sm"
                  >
                    <p className="font-medium text-foreground">{point.address}</p>
                    {point.details && (
                      <p className="text-sm text-muted-foreground mt-1">{point.details}</p>
                    )}
                  </motion.div>
                ))}
                
                {(!pickupPoints || pickupPoints.length === 0) && (
                  <p className="text-sm text-muted-foreground italic">Пункты выдачи пока не указаны.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
