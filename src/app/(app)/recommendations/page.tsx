'use client';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getRecommendations } from './actions';
import type { RecommendHalalVendorsOutput } from '@/ai/flows/recommend-halal-vendors';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  requirements: z.string().min(20, {
    message: 'Jelaskan kebutuhan Anda setidaknya 20 karakter.',
  }),
  preferences: z.string().optional(),
});

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<RecommendHalalVendorsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requirements: '',
      preferences: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    const result = await getRecommendations(values);
    
    if (result.success) {
      setRecommendations(result.data);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-accent" />
            Rekomendasi Vendor Cerdas
          </CardTitle>
          <CardDescription>
            Biarkan AI kami membantu Anda menemukan vendor sertifikasi halal terbaik yang sesuai dengan kebutuhan unik UMKM Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kebutuhan Sertifikasi</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Contoh: Saya memiliki usaha katering rumahan di Jakarta Selatan, produk utama nasi boks dengan lauk ayam. Saya butuh sertifikasi halal untuk bisa masuk ke pelanggan korporat."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Jelaskan tentang bisnis, produk, dan target pasar Anda.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferensi Tambahan (Opsional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Contoh: Saya mencari vendor dengan biaya terjangkau dan bisa konsultasi online."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Sebutkan jika ada preferensi lokasi, harga, atau layanan.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menganalisa...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Dapatkan Rekomendasi
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {isLoading && (
        <div className="mt-8 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className='h-6 bg-muted rounded-md animate-pulse w-1/2'></CardTitle>
                    <CardDescription className='h-4 bg-muted rounded-md animate-pulse w-3/4'></CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className='h-4 bg-muted rounded-md animate-pulse w-full'></div>
                    <div className='h-4 bg-muted rounded-md animate-pulse w-full'></div>
                    <div className='h-4 bg-muted rounded-md animate-pulse w-2/3'></div>
                </CardContent>
            </Card>
        </div>
      )}

      {error && (
        <Card className="mt-8 border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Terjadi Kesalahan</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      )}

      {recommendations && (
        <div className="mt-8">
            <h3 className="text-2xl font-headline font-bold mb-4">Hasil Rekomendasi</h3>
            <div className="space-y-4">
            {recommendations.map((rec, index) => (
                <Card key={index} className="overflow-hidden">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>{rec.vendorName}</span>
                        <div className="flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full bg-accent/80 text-accent-foreground">
                            <Star className="w-4 h-4 text-accent-foreground" />
                            <span>Top Pick</span>
                        </div>
                    </CardTitle>
                    <CardDescription>{rec.vendorDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Skor Kecocokan</span>
                            <span className="text-sm font-bold text-primary">{rec.suitabilityScore}%</span>
                        </div>
                        <Progress value={rec.suitabilityScore} aria-label={`${rec.suitabilityScore}% match`} />
                    </div>
                    <div>
                        <h4 className="font-semibold mb-1">Alasan:</h4>
                        <p className="text-sm text-muted-foreground">{rec.rationale}</p>
                    </div>
                </CardContent>
                <div className="p-6 pt-0">
                    <Button className="w-full">Hubungi Vendor Ini</Button>
                </div>
                </Card>
            ))}
            </div>
        </div>
      )}
    </div>
  );
}
