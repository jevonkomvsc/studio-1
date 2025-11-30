import type { User, Product, HalalRequest } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Adi Saputra',
    role: 'buyer',
    phone: '081234567890',
    email: 'adi.s@example.com',
    avatar: 'https://i.pravatar.cc/150?u=adi.s@example.com',
  },
  {
    id: 'user-2',
    name: 'Halal Vendor Jaya',
    role: 'vendor',
    phone: '089876543210',
    email: 'info@halalvendorjaya.com',
    avatar: 'https://i.pravatar.cc/150?u=info@halalvendorjaya.com',
  },
];

const getImage = (id: string) => {
    const img = PlaceHolderImages.find(p => p.id === id);
    return {
        imageUrl: img?.imageUrl || 'https://picsum.photos/seed/fallback/600/400',
        imageHint: img?.imageHint || 'placeholder',
    }
}

export const mockProducts: Product[] = [
  {
    product_id: 'prod-1',
    vendor_id: 'user-2',
    name: 'Beras Premium Kontrak 12 Bulan',
    stock: 500,
    unit: 'ton',
    contract_price: 12000000,
    ...getImage('rice'),
  },
  {
    product_id: 'prod-2',
    vendor_id: 'user-2',
    name: 'Cabai Merah Keriting Kontrak 12 Bulan',
    stock: 100,
    unit: 'ton',
    contract_price: 25000000,
    ...getImage('chili'),
  },
  {
    product_id: 'prod-3',
    vendor_id: 'user-2',
    name: 'Minyak Goreng Sawit Kontrak 12 Bulan',
    stock: 1000,
    unit: 'liter',
    contract_price: 15000,
    ...getImage('oil'),
  },
  {
    product_id: 'prod-4',
    vendor_id: 'user-2',
    name: 'Gula Pasir Kristal Kontrak 12 Bulan',
    stock: 800,
    unit: 'kg',
    contract_price: 14000,
    ...getImage('sugar'),
  },
];

export const mockHalalRequests: HalalRequest[] = [
  {
    request_id: 'req-1',
    buyer_id: 'user-1',
    ukmName: 'Warung Nasi Uduk Ibu Siti',
    status: 'processing',
    documents: ['NIB.pdf', 'PIRT.pdf'],
    progress_percent: 45,
    createdAt: '2024-05-10T10:00:00Z',
    vendor_id: 'user-2',
  },
  {
    request_id: 'req-2',
    buyer_id: 'user-3',
    ukmName: 'Katering Sehat Mba Ani',
    status: 'pending',
    documents: [],
    progress_percent: 10,
    createdAt: '2024-05-15T11:30:00Z',
  },
  {
    request_id: 'req-3',
    buyer_id: 'user-4',
    ukmName: 'Bakso Pak Budi',
    status: 'revision',
    documents: ['NIB.pdf', 'PIRT.pdf', 'Komposisi.pdf'],
    progress_percent: 25,
    createdAt: '2024-05-12T09:00:00Z',
  },
];
