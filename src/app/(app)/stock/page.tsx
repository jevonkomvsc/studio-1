'use client';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockProducts } from '@/lib/mock-data';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function StockPage() {
    const [products, setProducts] = useState<Product[]>(mockProducts);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);

    const getImage = (id: string) => {
        const img = PlaceHolderImages.find(p => p.id === id);
        return {
            imageUrl: img?.imageUrl || 'https://picsum.photos/seed/fallback/600/400',
            imageHint: img?.imageHint || 'placeholder',
        }
    }

    const handleSaveProduct = () => {
        if (currentProduct) {
            if (currentProduct.product_id) {
                // Update
                setProducts(products.map(p => p.product_id === currentProduct.product_id ? { ...p, ...currentProduct } as Product : p));
            } else {
                // Create
                const newProduct: Product = {
                    product_id: `prod-${Date.now()}`,
                    vendor_id: 'user-2',
                    name: currentProduct.name || 'Produk Baru',
                    stock: Number(currentProduct.stock) || 0,
                    unit: currentProduct.unit || 'unit',
                    contract_price: Number(currentProduct.contract_price) || 0,
                    ...getImage(currentProduct.name?.toLowerCase().split(' ')[0] || 'rice')
                };
                setProducts([...products, newProduct]);
            }
            setIsDialogOpen(false);
            setCurrentProduct(null);
        }
    };

    const handleEdit = (product: Product) => {
        setCurrentProduct(product);
        setIsDialogOpen(true);
    };

    const handleDelete = (productId: string) => {
        setProducts(products.filter(p => p.product_id !== productId));
    };

    const handleAddNew = () => {
        setCurrentProduct({});
        setIsDialogOpen(true);
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Manajemen Stok & Harga</CardTitle>
                    <CardDescription>Atur ketersediaan dan harga kontrak bahan pokok Anda.</CardDescription>
                </div>
                <Button onClick={handleAddNew}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Tambah Produk
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                                <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Nama Produk</TableHead>
                            <TableHead>Stok</TableHead>
                            <TableHead className="hidden md:table-cell">Harga Kontrak</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.product_id}>
                                <TableCell className="hidden sm:table-cell">
                                    <Image
                                        alt={product.name}
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        src={product.imageUrl}
                                        width="64"
                                        data-ai-hint={product.imageHint}
                                    />
                                </TableCell>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{product.stock} {product.unit}</Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.contract_price)} / {product.unit}
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Toggle menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onSelect={() => handleEdit(product)}>Edit</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => handleDelete(product.product_id)}>Hapus</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{currentProduct?.product_id ? 'Edit Produk' : 'Tambah Produk Baru'}</DialogTitle>
                        <DialogDescription>
                           {currentProduct?.product_id ? 'Ubah detail produk Anda.' : 'Masukkan detail produk bahan pokok yang akan Anda tawarkan dengan skema kontrak.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nama
                            </Label>
                            <Input id="name" value={currentProduct?.name || ''} onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })} placeholder="Beras Premium" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="stock" className="text-right">
                                Stok
                            </Label>
                            <Input id="stock" type="number" value={currentProduct?.stock || ''} onChange={(e) => setCurrentProduct({ ...currentProduct, stock: Number(e.target.value) })} placeholder="500" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="unit" className="text-right">
                                Unit
                            </Label>
                            <Input id="unit" value={currentProduct?.unit || ''} onChange={(e) => setCurrentProduct({ ...currentProduct, unit: e.target.value })} placeholder="ton" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Harga Kontrak
                            </Label>
                            <Input id="price" type="number" value={currentProduct?.contract_price || ''} onChange={(e) => setCurrentProduct({ ...currentProduct, contract_price: Number(e.target.value) })} placeholder="12000000" className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSaveProduct} type="submit">Simpan Produk</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
}
