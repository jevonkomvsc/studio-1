'use client';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockProducts } from '@/lib/mock-data';
import { Warehouse, Clock, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import type { Product } from '@/lib/types';


export default function MarketPage() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // In a real app, you would fetch this from an API
    // For now, we use mock data and manage it in local state
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(mockProducts);
    }
  }, []);

  const handleCreateContract = (productName: string) => {
    toast({
        title: "Kontrak Dibuat!",
        description: `Kontrak untuk ${productName.split(" Kontrak")[0]} telah berhasil dibuat.`,
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Marketplace Kontrak</h1>
        <p className="text-muted-foreground">Amankan harga bahan pokok Anda selama 12 bulan ke depan.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.product_id} className="flex flex-col">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover rounded-t-lg"
                  data-ai-hint={product.imageHint}
                />
                <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">Harga Tetap</Badge>
              </div>
            </CardHeader>
            <div className='p-6 flex-grow'>
              <CardTitle className="text-xl mb-2">{product.name.split(" Kontrak")[0]}</CardTitle>
              <CardDescription>oleh {product.vendor_id === 'user-2' ? 'Halal Vendor Jaya' : 'Vendor Lain'}</CardDescription>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Warehouse className="w-4 h-4" />
                  <span>Stok Tersedia: {product.stock} {product.unit}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Durasi Kontrak: 12 Bulan</span>
                </div>
              </div>
            </div>
            <CardFooter className="flex-col items-start gap-4">
               <div className="w-full text-left">
                <p className="text-xs text-muted-foreground">Harga per {product.unit}</p>
                <p className="text-2xl font-bold font-headline text-primary">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.contract_price)}
                </p>
              </div>
              <Button className="w-full" onClick={() => handleCreateContract(product.name)}>
                <Package className="w-4 h-4 mr-2" />
                Buat Kontrak
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
