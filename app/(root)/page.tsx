import React from "react";

import {
  DollarSign,
  Package,
  ShoppingCart,
} from "lucide-react";
import { Separator } from "@/components/ui/separator"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface AnalyticsCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
}
  
const AnalyticsCard = ({ title, value, icon: Icon, color }: AnalyticsCardProps) => (
	<div
		className={`bg-gray-800 rounded-lg p-6 shadow-lg overflow-hidden relative ${color}`}
	>
		<div className='flex items-center justify-between'>
			<div className='z-10'>
				<p className='mb-1 text-sm font-semibold text-blue-300'>{title}</p>
				<h3 className='text-3xl font-bold text-white'>{value}</h3>
			</div>
		</div>
		<div className='absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900 opacity-30' />
		<div className='absolute text-blue-800 opacity-50 -bottom-4 -right-4'>
			<Icon className='w-32 h-32' />
		</div>
	</div>
);

export default function Home() {
  return (
    <>
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <span className="font-bold text-2xl font-sans text-black/90">Dashboard</span>
      </div>
    </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4">
        <div className='grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3'>
          {/* <AnalyticsCard
            title='Total Users'
            value={analyticsData.users.toLocaleString()}
            icon={Users}
            color='from-blue-500 to-teal-700'
          /> */}
          <AnalyticsCard
            title='Total Produk'
            value={"5"}
            icon={Package}
            color='from-blue-500 to-green-700'
          />
          <AnalyticsCard
            title='Total Piutang'
            value={`Rp`}
            icon={ShoppingCart}
            color='from-blue-500 to-cyan-700'
          />
          <AnalyticsCard
            title='Total Pendapatan'
            value={`Rp`}
            icon={DollarSign}
            color='from-blue-500 to-lime-700'
          />
          </div>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-slate-100/50 md:min-h-min dark:bg-slate-800/50">
        </div>
      </div>
    </>
  );
}
