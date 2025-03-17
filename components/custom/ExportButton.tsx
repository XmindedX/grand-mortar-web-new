"use client";

import { FaFileExport } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { utils, writeFile } from "xlsx";

interface ExportButtonProps {
  data: any[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ data }) => {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("Tidak ada data untuk diekspor.");
      return;
    }

    // Dapatkan bulan dan tahun saat ini
    const now = new Date();
    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const currentMonth = monthNames[now.getMonth()];
    const currentYear = now.getFullYear();
    const title = `Daftar Pesanan - ${currentMonth} ${currentYear}`;

    // Data untuk Excel
    const sheetData = [
      [title], // Judul
      [
        "ID Transaksi", "Pembeli", "No. HP", "Email", "Alamat",
        "Kota", "Provinsi", "Kode Pos", "Total Harga", "Piutang",
        "Status", "Tanggal Pemesanan"
      ], // Header
      ...data.map((item) => [
        item.trxId || "-",
        item.customer || "-",
        item.number || "-",
        item.email || "-",
        item.address || "-",
        item.city || "-",
        item.province || "-",
        item.postalCode || "-",
        item.total ? item.total.toLocaleString("id-ID", { style: "currency", currency: "IDR" }) : "Rp 0",
        item.piutang ? item.piutang.toLocaleString("id-ID", { style: "currency", currency: "IDR" }) : "Rp 0",
        item.status || "-",
        item.createdAt ? new Date(item.createdAt).toLocaleDateString("id-ID") : "-",
      ]),
    ];

    // Buat worksheet dan workbook
    const worksheet = utils.aoa_to_sheet(sheetData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Pesanan");

    // Set lebar kolom agar lebih rapih
    worksheet["!cols"] = [
      { wch: 15 }, { wch: 20 }, { wch: 13 }, { wch: 25 }, { wch: 50 },
      { wch: 15 }, { wch: 15 }, { wch: 10 }, { wch: 18 }, { wch: 18 },
      { wch: 15 }, { wch: 15 }
    ];

    // Simpan file dengan nama yang sesuai
    const fileName = `Daftar_Pesanan_${currentMonth}_${currentYear}.xlsx`;
    writeFile(workbook, fileName);
  };

  return (
    <Button variant="default" size="sm" onClick={handleExport}>
      <FaFileExport className="mr-2" />
      Export
    </Button>
  );
};

export default ExportButton;
