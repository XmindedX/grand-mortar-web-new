import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { ReactNode } from 'react';

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
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