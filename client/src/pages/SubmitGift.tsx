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
          <h2 className="text-3xl font-serif text-foreground mb-4">Thank You!</h2>
          <p className="text-muted-foreground mb-8">
            Your gift submission has been received. Lisa Belle will review the details soon. 
            Your kindness means the world!
          </p>
          <Button 
            onClick={() => window.location.href = "/"}
            className="w-full rounded-full"
          >
            Return Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-foreground mb-4">Send a Gift</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Please fill out the details below. You'll need to upload the QR code for your order 
            and proof of payment so we can verify and collect your generous gift.
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
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} className="rounded-xl bg-secondary/20 border-border/50 focus:bg-white transition-colors h-12" />
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
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} className="rounded-xl bg-secondary/20 border-border/50 focus:bg-white transition-colors h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* QR Code Upload */}
                    <FormField
                      control={form.control}
                      name="qrCodePath"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Order QR Code</FormLabel>
                          <FormControl>
                            <div className="space-y-3">
                              <div className="border-2 border-dashed border-input rounded-xl p-4 text-center hover:bg-secondary/10 transition-colors">
                                {field.value ? (
                                  <div className="relative aspect-square w-24 mx-auto rounded-lg overflow-hidden bg-secondary/20">
                                    <img src={field.value} alt="QR Code" className="w-full h-full object-cover" />
                                  </div>
                                ) : (
                                  <div className="text-sm text-muted-foreground py-4">No file selected</div>
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
                                Upload QR Photo
                              </ObjectUploader>
                            </div>
                          </FormControl>
                          <FormDescription>Photo of the pickup QR code</FormDescription>
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
                          <FormLabel>Payment Proof</FormLabel>
                          <FormControl>
                            <div className="space-y-3">
                              <div className="border-2 border-dashed border-input rounded-xl p-4 text-center hover:bg-secondary/10 transition-colors">
                                {field.value ? (
                                  <div className="relative aspect-square w-24 mx-auto rounded-lg overflow-hidden bg-secondary/20">
                                    <img src={field.value} alt="Proof" className="w-full h-full object-cover" />
                                  </div>
                                ) : (
                                  <div className="text-sm text-muted-foreground py-4">No file selected</div>
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
                                Upload Receipt
                              </ObjectUploader>
                            </div>
                          </FormControl>
                          <FormDescription>Screenshot of payment confirmation</FormDescription>
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
                    {isPending ? "Submitting..." : "Send Gift Details"}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>

          {/* Sidebar - Pickup Points */}
          <div className="lg:col-span-1">
            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 sticky top-24">
              <h3 className="font-serif text-xl font-medium text-foreground mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                Pickup Points
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Please select one of these locations for delivery when ordering your gift.
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
                  <p className="text-sm text-muted-foreground italic">No pickup points listed yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
