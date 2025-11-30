'use client';

import React, { useContext } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, FilePlus2, PackageSearch, Truck, CheckCircle2, AlertCircle, Clock, ShoppingCart, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { mockHalalRequests, mockProducts } from '@/lib/mock-data';
import type { UserRole } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Badge } from '@/components/ui/badge';
import { AppContext } from '../layout';


const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Stok",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

const BuyerDashboard = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    <Card className="col-span-1 md:col-span-2 lg:col-span-3 bg-gradient-to-r from-primary to-green-700 text-primary-foreground">
      <CardHeader>
        <CardTitle>Selamat Datang, Adi Saputra!</CardTitle>
        <CardDescription className="text-primary-foreground/80">Siap untuk mengelola bisnis Anda ke level selanjutnya?</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 sm:flex-row">
        <Link href="/certification" className='w-full'>
          <Button variant="secondary" className="w-full">
            <FilePlus2 className="mr-2" /> Ajukan Sertifikasi Halal
          </Button>
        </Link>
        <Link href="/market" className='w-full'>
          <Button variant="outline" className="w-full bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
            <PackageSearch className="mr-2" /> Kontrak Bahan Pokok
          </Button>
        </Link>
      </CardContent>
    </Card>

    <Card className="col-span-1 md:col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Progres Sertifikasi Halal</CardTitle>
        <CardDescription>Warung Nasi Uduk Ibu Siti</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Proses Audit</span>
          <span className="text-lg font-bold font-headline">{mockHalalRequests[0].progress_percent}%</span>
        </div>
        <Progress value={mockHalalRequests[0].progress_percent} className="h-3 [&>div]:bg-primary" />
        <p className="mt-2 text-xs text-muted-foreground">Revisi dokumen komposisi bahan diperlukan.</p>
      </CardContent>
      <CardFooter>
        <Link href="/certification" className='w-full'>
          <Button variant="outline" className="w-full">Lihat Detail <ArrowRight className="ml-2" /></Button>
        </Link>
      </CardFooter>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Pengiriman Berikutnya</CardTitle>
        <CardDescription>Jadwal kiriman bahan pokok Anda.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <div className="p-3 rounded-md bg-muted">
          <Truck className="w-8 h-8 text-primary" />
        </div>
        <div>
          <p className="font-semibold">Beras Premium</p>
          <p className="text-sm text-muted-foreground">Estimasi: 3 hari lagi</p>
        </div>
      </CardContent>
       <CardFooter>
        <Link href="/contracts" className='w-full'>
          <Button variant="outline" className="w-full">Lihat Semua Kontrak</Button>
        </Link>
      </CardFooter>
    </Card>
  </div>
);

const VendorDashboard = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    <div className="grid grid-cols-2 col-span-1 gap-6 md:col-span-2 lg:col-span-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Permintaan Sertifikasi</CardTitle>
            <FilePlus2 className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">3 Baru</div>
            <p className="text-xs text-muted-foreground">Membutuhkan review Anda</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Order Kontrak Baru</CardTitle>
            <ShoppingCart className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">+5</div>
            <p className="text-xs text-muted-foreground">Dalam bulan ini</p>
            </CardContent>
        </Card>
    </div>

    <Card className="col-span-1 md:col-span-2 lg:col-span-2">
      <CardHeader>
        <CardTitle>Permintaan Sertifikasi Halal Baru</CardTitle>
        <CardDescription>Kelola permintaan yang masuk dari UKM.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama UKM</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockHalalRequests.slice(0, 3).map(req => (
              <TableRow key={req.request_id}>
                <TableCell className="font-medium">{req.ukmName}</TableCell>
                <TableCell>
                  <Badge variant={
                    req.status === 'pending' ? 'destructive' : req.status === 'revision' ? 'secondary' : 'default'
                  } className={req.status === 'pending' ? 'bg-amber-500' : ''}>
                    {req.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Lihat</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Grafik Stok</CardTitle>
        <CardDescription>Stok produk bahan pokok</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[150px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
       <CardFooter>
        <Link href="/stock" className='w-full'>
          <Button variant="outline" className="w-full">Kelola Stok</Button>
        </Link>
      </CardFooter>
    </Card>
  </div>
);


export default function DashboardPage() {
  const appContext = useContext(AppContext);

  if (!appContext) {
    // or return a loading indicator
    return null;
  }

  const { role, setRole } = appContext;


  return (
    <div className="space-y-6">
      <Tabs value={role} onValueChange={(value) => setRole(value as UserRole)} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-sm mx-auto">
          <TabsTrigger value="buyer">Tampilan Pembeli (UKM)</TabsTrigger>
          <TabsTrigger value="vendor">Tampilan Penjual (Vendor)</TabsTrigger>
        </TabsList>
        <TabsContent value="buyer">
          <BuyerDashboard />
        </TabsContent>
        <TabsContent value="vendor">
          <VendorDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
