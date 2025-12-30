
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/ui/star-rating";
import { addReview } from "@/app/reviews/actions";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  rating: z.number().min(1, { message: "Rating is required." }),
  comment: z.string().min(10, { message: "Comment must be at least 10 characters." }),
});

interface ReviewFormProps {
  productId: string;
}

export function ReviewForm({ productId }: ReviewFormProps) {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await addReview(productId, values.rating, values.comment);

    if (result.error) {
      toast({
        title: "Gagal Menambahkan Ulasan",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Ulasan Berhasil Ditambahkan",
      });
      form.reset();
      setRating(0);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <StarRating
                  rating={field.value}
                  setRating={(value) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ulasan</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us more about your experience..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Mengirim..." : "Kirim Ulasan"}
        </Button>
      </form>
    </Form>
  );
}
