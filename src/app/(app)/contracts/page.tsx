import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';

const serviceContracts = [
  {
    id: "KTR-SRV-001",
    umkmName: "Warung Nasi Uduk Ibu Siti",
    serviceName: "Pendampingan Penuh",
    price: 5000000,
    status: "active",
    startDate: new Date("2024-05-10"),
    endDate: new Date("2024-11-10")
  },
  {
    id: "KTR-SRV-002",
    umkmName: "Kue Balok Mang Ujang",
    serviceName: "Layanan V.I.P",
    price: 10000000,
    status: "pending",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-12-01")
  }
];

export default function ContractsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kontrak Layanan Sertifikasi</CardTitle>
        <CardDescription>Kelola dan pantau semua kontrak layanan sertifikasi halal Anda.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>UMKM</TableHead>
              <TableHead>Paket Layanan</TableHead>
              <TableHead>Biaya</TableHead>
              <TableHead>Periode Kontrak</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {serviceContracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell className="font-medium">
                  <div>{contract.umkmName}</div>
                  <div className="text-xs text-muted-foreground">{contract.id}</div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <ShieldCheck className='w-4 h-4 text-primary' />
                    {contract.serviceName}
                  </div>
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(contract.price)}
                </TableCell>
                <TableCell>
                  {format(contract.startDate, "d MMM yyyy")} - {format(contract.endDate, "d MMM yyyy")}
                </TableCell>
                <TableCell>
                  <Badge variant={
                    contract.status === 'active' ? 'default' :
                    contract.status === 'pending' ? 'secondary' :
                    'outline'
                  }>
                    {contract.status === 'active' ? 'Aktif' : 'Menunggu Aktivasi'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Download className="w-4 h-4" />
                    <span className="sr-only">Download Kontrak</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
