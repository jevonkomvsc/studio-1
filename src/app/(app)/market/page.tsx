'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Check, Shield, Zap, Gem } from 'lucide-react';

const services = [
  {
    title: 'Layanan Prioritas',
    price: 'Rp 2.500.000',
    description: 'Percepat proses sertifikasi Anda dengan bantuan ahli kami.',
    features: [
      'Konsultasi awal & peninjauan dokumen',
      'Bantuan pengisian formulir & submit dokumen',
      'Antrian prioritas untuk audit',
      'Update progres mingguan',
    ],
    isPopular: true,
    icon: Zap
  },
  {
    title: 'Pendampingan Penuh',
    price: 'Rp 5.000.000',
    description: 'Serahkan semua urusan sertifikasi kepada kami dari awal hingga akhir.',
    features: [
      'Semua fitur Layanan Prioritas',
      'Pendampingan saat audit lapangan',
      'Koordinasi dengan lab & LPPOM MUI',
      'Jaminan sertifikat terbit atau uang kembali',
    ],
    isPopular: false,
    icon: Shield
  },
  {
    title: 'Layanan V.I.P',
    price: 'Rp 10.000.000',
    description: 'Solusi lengkap tanpa repot. Kami urus semuanya dari A-Z, Anda tinggal terima beres.',
    features: [
        'Semua fitur Pendampingan Penuh',
        'Pengurusan Izin Edar (jika diperlukan)',
        'Desain kemasan berlogo Halal',
        'Konsultasi pasca-sertifikasi selama 6 bulan',
    ],
    isPopular: false,
    icon: Gem
  }
];

export default function MarketPage() {
  const { toast } = useToast();

  const handleSelectService = (serviceTitle: string) => {
    toast({
      title: 'Layanan Dipilih!',
      description: `Anda telah memilih ${serviceTitle}. Tim kami akan segera menghubungi Anda.`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline md:text-4xl">
          Tidak Punya Waktu Mengurus Sertifikasi?
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Berdasarkan data kami, 89% UMKM merasa kesulitan meluangkan waktu untuk proses sertifikasi. Biarkan kami yang membantu Anda. Fokus pada bisnis Anda, kami urus sertifikasinya.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <Card
            key={index}
            className={`flex flex-col ${
              service.isPopular ? 'border-primary ring-2 ring-primary shadow-lg' : ''
            }`}
          >
            {service.isPopular && (
              <div className="py-2 px-4 bg-primary text-primary-foreground text-sm font-semibold text-center rounded-t-lg">
                Paling Populer
              </div>
            )}
            <CardHeader className="items-center text-center">
              <CardTitle className="text-2xl">{service.title}</CardTitle>
              <p className="text-3xl font-bold font-headline text-primary">
                {service.price}
              </p>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-5 h-5 mr-3 text-green-500 shrink-0 mt-1" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={service.isPopular ? 'default' : 'outline'}
                onClick={() => handleSelectService(service.title)}
              >
                <service.icon className="mr-2"/>
                Pilih Layanan Ini
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
