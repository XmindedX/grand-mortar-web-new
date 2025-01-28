import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { ReactNode } from 'react';
import Dashboard from '@/components/Dashboard';

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect('/login');

  return (
    <main className="">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </main>
  )
}

export default layout