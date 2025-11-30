'use client';
import * as React from 'react';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Sparkles,
  FileText,
  Package,
  ShoppingCart,
  Building,
  User,
  Settings,
} from 'lucide-react';
import { Logo } from '@/components/icons';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { UserRole } from '@/lib/types';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

export const AppContext = React.createContext<AppContextType | null>(null);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const [role, setRole] = React.useState<UserRole>('buyer');

  return (
    <AppContext.Provider value={{ role, setRole }}>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
                <Logo className="size-5 fill-primary" />
              </Button>
              <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
                <Logo className="size-6 text-primary" />
                <h1 className="text-lg font-bold font-headline text-primary">
                  Halal Hub
                </h1>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard')}
                  tooltip="Dashboard"
                >
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/recommendations')}
                  tooltip="AI Recommendations"
                >
                  <Link href="/recommendations">
                    <Sparkles />
                    <span>AI Recommendations</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/certification')}
                  tooltip="Certification"
                >
                  <Link href="/certification">
                    <FileText />
                    <span>Sertifikasi</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/contracts')}
                  tooltip="Contracts"
                >
                  <Link href="/contracts">
                    <Package />
                    <span>Kontrak Saya</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/market')}
                  tooltip="Marketplace"
                >
                  <Link href="/market">
                    <ShoppingCart />
                    <span>Marketplace</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {role === 'vendor' && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/stock')}
                    tooltip="My Stock"
                  >
                    <Link href="/stock">
                      <Building />
                      <span>Stok Saya</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="group-data-[collapsible=icon]:hidden">
            <Separator className="mb-2" />
            <div className="flex items-center gap-2 p-2">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/150?u=adi.s@example.com" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Adi Saputra</span>
                <span className="text-xs text-muted-foreground">
                  {role === 'buyer' ? 'UMKM Buyer' : 'Vendor'}
                </span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 items-center justify-between border-b bg-card p-2 px-4 md:h-14">
            <SidebarTrigger />
            <h2 className="text-lg font-semibold md:text-xl font-headline">
              {pathname.split('/').pop()?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Dashboard'}
            </h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Link href="/login">
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AppContext.Provider>
  );
}
