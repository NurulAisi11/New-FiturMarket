
"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import {
  ShoppingCart,
  ArrowLeft,
  Tag,
  Star,
  Minus,
  Plus,
  MessageSquare,
  Globe,
  Layers,
  Factory,
  ShieldCheck,
  ChevronsUpDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/product-card";
import { ChatSheet } from "@/components/chat-sheet";
import { StockIndicator } from "@/components/stock-indicator";
import { VariantSelector } from "@/lib/variant-selector";
import { Product, Review } from "@/lib/types";
import { addViewedProduct } from "@/app/ai/actions";
import { getReviews } from "@/app/reviews/actions";
import { ReviewForm } from "@/components/review-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(product.moq || 1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    addViewedProduct({ id: product.id, category: product.category });
  }, [product.id, product.category]);

  useEffect(() => {
    async function fetchReviews() {
        const { reviews: fetchedReviews, error } = await getReviews(product.id);
        if (fetchedReviews) {
            setReviews(fetchedReviews as Review[]);
        }
    }
    fetchReviews();
  }, [product.id]);

  const { totalReviews, averageRating } = useMemo(() => {
    const total = reviews.length;
    if (total === 0) return { totalReviews: 0, averageRating: 0 };
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return { totalReviews: total, averageRating: sum / total };
  }, [reviews]);

  useMemo(() => {
    const defaultOptions: Record<string, string> = {};
    if (product.variants) {
      product.variants.forEach((variant) => {
        if (variant.options.length > 0) {
          defaultOptions[variant.type] = variant.options[0].value;
        }
      });
    }
    setSelectedOptions(defaultOptions);
  }, [product.variants]);

  const { pricePerUnit, totalPrice } = useMemo(() => {
    let price = product.price;
    if (product.wholesale_pricing && product.wholesale_pricing.length > 0) {
      const sortedTiers = [...product.wholesale_pricing].sort(
        (a, b) => b.min_quantity - a.min_quantity
      );
      for (const tier of sortedTiers) {
        if (quantity >= tier.min_quantity) {
          price = tier.price_per_unit;
          break;
        }
      }
    }
    return { pricePerUnit: price, totalPrice: price * quantity };
  }, [quantity, product]);

  const handleOptionChange = (variantType: string, optionValue: string) => {
    setSelectedOptions((prev) => ({ ...prev, [variantType]: optionValue }));
  };

  const handleAddToCart = () => {
    addToCart({ ...product, price: pricePerUnit }, quantity);
    setQuantity(product.moq || 1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <ChatSheet product={product} isOpen={isChatOpen} onOpenChange={setIsChatOpen} />
        <div className="container flex h-16 items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Kembali</span>
          </Button>
          <h1 className="ml-4 font-semibold text-lg">{product.name}</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="relative aspect-square">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-lg shadow-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="flex flex-col">
            <div className="flex-grow">
              <div className="flex items-center gap-4 mb-2">
                <Badge variant="secondary" className="text-sm">
                  <Tag className="mr-1 h-3 w-3" />
                  {product.category}
                </Badge>
                <StockIndicator stock={product.stock} />
              </div>
              <div className="flex items-center gap-2 mb-4">
                {totalReviews > 0 && (
                  <>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.round(averageRating)
                              ? "fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({totalReviews} ulasan)
                    </span>
                  </>
                )}
              </div>
              <p className="text-muted-foreground text-base mb-6">
                {product.description}
              </p>
            </div>

            {product.wholesale_pricing && product.wholesale_pricing.length > 0 && (
                <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Harga Grosir</h3>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Minimal Kuantitas</TableHead>
                            <TableHead className="text-right">Harga per Unit</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {product.wholesale_pricing.map((tier, index) => (
                            <TableRow key={index}>
                                <TableCell>{tier.min_quantity}</TableCell>
                                <TableCell className="text-right">{formatPrice(tier.price_per_unit)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </div>
            )}

            {product.qualityPassport && (
              <Collapsible className="mb-6">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    <h3 className="text-lg font-semibold text-primary flex items-center">
                      The Making Of: A Quality Passport
                    </h3>
                    <ChevronsUpDown className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 p-4 border rounded-md">
                  <div className="flex items-start gap-4">
                    <Globe className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary/80" />
                    <div>
                      <p className="font-medium text-foreground">Asal</p>
                      <p>{product.qualityPassport.origin}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Layers className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary/80" />
                    <div>
                      <p className="font-medium text-foreground">
                        Material Unggulan
                      </p>
                      <ul className="list-disc list-inside">
                        {product.qualityPassport.materials.map(
                          (material, index) => (
                            <li key={index}>{material}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Factory className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary/80" />
                    <div>
                      <p className="font-medium text-foreground">
                        Proses Manufaktur
                      </p>
                      <p>{product.qualityPassport.manufacturingProcess}</p>
                    </div>
                  </div>
                  {product.qualityPassport.certifications && product.qualityPassport.certifications.length > 0 && (
                    <div className="flex items-start gap-4">
                        <ShieldCheck className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary/80" />
                        <div>
                            <p className="font-medium text-foreground">Sertifikasi</p>
                            <ul className="list-disc list-inside">
                                {product.qualityPassport.certifications.map(
                                    (certification, index) => (
                                        <li key={index}>{certification}</li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>
            )}

            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <VariantSelector
                  variants={product.variants}
                  selectedVariants={selectedOptions}
                  onVariantChange={handleOptionChange}
                />
              </div>
            )}

            <Separator className="my-6" />

            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-2xl font-bold text-primary">{formatPrice(totalPrice)}</p>
                        <p className="text-sm text-muted-foreground">{formatPrice(pricePerUnit)} / unit</p>
                    </div>
                    <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(product.moq || 1, quantity - 1))}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-semibold w-10 text-center">
                        {quantity}
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                    </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Minimum Order Quantity (MOQ): {product.moq || 1}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-lg py-7"
                  onClick={() => setIsChatOpen(true)}
                >
                  <MessageSquare className="mr-3 h-6 w-6" />
                  Chat Toko
                </Button>
                <Button
                  size="lg"
                  className="w-full text-lg py-7"
                  onClick={handleAddToCart}
                  disabled={quantity < (product.moq || 1)}
                >
                  <ShoppingCart className="mr-3 h-6 w-6" />
                  Tambah ke Keranjang ({quantity})
                </Button>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-16 sm:mt-24">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Ulasan Pelanggan ({totalReviews})</h2>
            <div className="space-y-8">
              {reviews.map((review) => (
                <div key={review.id} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0 text-center sm:text-left">
                    <p className="font-semibold">{review.user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-1 mb-2 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
        </section>

        <section className="mt-16 sm:mt-24">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Tulis Ulasan Anda</h2>
          <ReviewForm productId={product.id} />
        </section>

        {relatedProducts.length > 0 && (
          <section className="mt-16 sm:mt-24">
            <h2 className="text-2xl font-bold tracking-tight mb-8">
              Anda Mungkin Juga Suka
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 md:px-6 py-6 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} FiturMarket. Seluruh hak
            dilindungi.
          </p>
        </div>
      </footer>
    </div>
  );
}
