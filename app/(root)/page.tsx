"use client";
import React from "react";
import { 
  useEffect, 
  useState 
} from "react";
import { 
  LineChart, 
  Line, XAxis, 
  YAxis, CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  BarChart, 
  Bar 
} from "recharts";
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

const formatNumber = (num: number) => {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}M`; // Juta
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}Jt`; // Juta
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}Rb`; // Ribu
  return num.toString();
};

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


export default function Dashboard() {
  const [statistik, setStatistik] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  const [totalProduk, setTotalProduk] = useState<number | null>(null);
  const [totalPiutang, setTotalPiutang] = useState<number | null>(null);
  const [totalHarga, setTotalHarga] = useState<number | null>(null);
  const [loadingProduk, setLoadingProduk] = useState(true);
  const [loadingPiutang, setLoadingPiutang] = useState(true);
  const [loadingHarga, setLoadingHarga] = useState(true);

  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);

  useEffect(() => {
    fetch(`/api/statistik?year=${currentYear}`)
      .then((res) => res.json())
      .then((data) => {
        setStatistik(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [currentYear]);

  useEffect(() => {
    fetch("/api/total-produk")
      .then((res) => res.json())
      .then((data) => {
        setTotalProduk(data.total);
        setLoadingProduk(false);
      })
      .catch(() => setLoadingProduk(false));
  }, []);

  useEffect(() => {
    fetch("/api/total-piutang")
      .then((res) => res.json())
      .then((data) => {
        setTotalPiutang(data.totalPiutang);
        setLoadingPiutang(false);
      })
      .catch(() => setLoadingPiutang(false));
  }, []);

  useEffect(() => {
    setLoadingHarga(true);
    fetch(`/api/total-harga?year=${selectedYear}&month=${selectedMonth}`)
      .then((res) => res.json())
      .then((data) => {
        setTotalHarga(data.totalHarga);
        setLoadingHarga(false);
      })
      .catch(() => setLoadingHarga(false));
  }, [selectedYear, selectedMonth]);

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
        <div className="flex flex-row gap-4 mb-4">
          <select
            className="border px-3 py-2 rounded-lg"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("id-ID", { month: "long" })}
              </option>
            ))}
          </select>

          <select
            className="border px-3 py-2 rounded-lg"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i} value={currentDate.getFullYear() - i}>
                {currentDate.getFullYear() - i}
              </option>
            ))}
          </select>
        </div>

        <div className="grid auto-rows-min gap-4">
          <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3">
            
            <AnalyticsCard
              title="Total Produk"
              value={loadingProduk ? "Loading..." : totalProduk?.toString() || "0"}
              icon={Package}
              color="from-blue-500 to-green-700"
            />

            <AnalyticsCard
              title="Total Piutang"
              value={loadingPiutang ? "Loading..." : `Rp ${totalPiutang?.toLocaleString("id-ID") || "0"}`}
              icon={ShoppingCart}
              color="from-blue-500 to-cyan-700"
            />

            <AnalyticsCard
              title="Total Pendapatan"
              value={loadingHarga ? "Loading..." : `Rp ${totalHarga?.toLocaleString("id-ID") || "0"}`}
              icon={DollarSign}
              color="from-blue-500 to-lime-700"
            />
          </div>
        </div>


        {/* CHART TOTAL PIUTANG */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Total Piutang per Bulan ({currentYear})</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={statistik} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip formatter={(value) => new Intl.NumberFormat("id-ID").format(Number(value))} />
              <Legend />
              <Line type="monotone" dataKey="totalPiutang" stroke="#E53E3E" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* CHART TOTAL PENDAPATAN */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Total Pendapatan per Bulan ({currentYear})</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={statistik} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip formatter={(value) => new Intl.NumberFormat("id-ID").format(Number(value))} />
              <Legend />
              <Line type="monotone" dataKey="totalPendapatan" stroke="#38A169" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-slate-100/50 md:min-h-min dark:bg-slate-800/50">
        </div>
      </div>
    </>
  );
}
