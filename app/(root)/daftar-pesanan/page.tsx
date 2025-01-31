'use client'

import { columns, ITable } from '@/components/custom/table/columns-pesanan'
import { DataTable } from '@/components/custom/table/data-table'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { FaFileExport } from "react-icons/fa6";
import { CalendarCheck, Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import React from "react";

import { Separator } from "@/components/ui/separator"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"

const page = () => {

  const [date, setDate] = useState<Date>()
  const [mainDate, setMainDate] = useState<Date>()

  const data: ITable[] = [
      {
          id: '200257',
          pembeli: {
              image: '/images/avatar.svg',
              name: 'Jerome Bell',
          },
          sales_id: '#200257',
          category: 'Workforce Management',
          location: 'Lafayette, California',
          date: 'Mar 31, 2024',
          status: 'done',
      },
      {
          id: '#526587',
          pembeli: {
              image: '/images/avatar-two.svg',
              name: 'Victoria Alonso',
          },
          sales_id: '#526587',
          category: 'Quality Monitoring',
          location: 'Kent, Utah',
          date: 'Mar 29, 2024',
          status: 'pending',
      },
      {
          id: '#696589',
          pembeli: {
              image: '/images/avatar-three.svg',
              name: 'Arlene McCoy',
          },
          sales_id: '#696589',
          category: 'CTI and Screen Pop',
          location: 'Corona, Michigan',
          date: 'Mar 20, 2024',
          status: 'cancelled',
      },
      {
          id: '#256584',
          pembeli: {
              image: '/images/avatar-four.svg',
              name: 'Grace Hopper',
          },
          sales_id: '#256584',
          category: 'Queue Callback',
          location: 'Corona, Michigan',
          date: 'Feb 20, 2024',
          status: 'pending',
      },
      {
          id: '#105986',
          pembeli: {
              image: '/images/avatar-six.svg',
              name: 'Darrell Steward',
          },
          sales_id: '#105986',
          category: 'Mobile Customer Care',
          location: 'Great Falls, Maryland',
          date: 'Feb 16, 2024',
          status: 'done',
      },
      {
          id: '#526534',
          pembeli: {
              image: '/images/avatar-seven.svg',
              name: 'Elizabeth Feinler',
          },
          sales_id: '#526534',
          category: 'Sidekick',
          location: 'Pasadena, Oklahoma',
          date: 'Jan 28, 2024',
          status: 'pending',
      },
      {
          id: '#526584',
          pembeli: {
              image: '/images/avatar-eight.svg',
              name: 'Courtney Henry',
          },
          sales_id: '#526584',
          category: 'Web Callback',
          location: 'Lafayette, California',
          date: 'Jan 28, 2024',
          status: 'pending',
      },
      {
          id: '#526589',
          pembeli: {
              image: '/images/avatar-nine.svg',
              name: 'Radia Perlman',
          },
          sales_id: '#526589',
          category: 'Agent Scripting',
          location: 'Stockton, New Hampshire',
          date: 'Jan 22, 2024',
          status: 'pending',
      },
      {
          id: '#526587',
          pembeli: {
              image: '/images/avatar-ten.svg',
              name: 'Jane Cooper',
          },
          sales_id: '#526587',
          category: 'Skills-based Routing',
          location: 'Portland, Illinois',
          date: 'Jan 18, 2013',
          status: 'done',
      },
      {
          id: '#200257',
          pembeli: {
              image: '/images/avatar-eleven.svg',
              name: 'Barbara Liskov',
          },
          sales_id: '#200257',
          category: 'UC Integrations',
          location: 'Syracuse, Connecticut',
          date: 'Jan 7, 2024',
          status: 'done',
      },
      {
          id: '#200287',
          pembeli: {
              image: '/images/avatar-eleven.svg',
              name: 'Barbara Liskov',
          },
          sales_id: '#200257',
          category: 'UC Integrations',
          location: 'Syracuse, Connecticut',
          date: 'Jan 7, 2024',
          status: 'done',
      },
      {
        id: '200257',
        pembeli: {
            image: '/images/avatar.svg',
            name: 'Jerome Bell',
        },
        sales_id: '#200257',
        category: 'Workforce Management',
        location: 'Lafayette, California',
        date: 'Mar 31, 2024',
        status: 'done',
    },
    {
        id: '#526587',
        pembeli: {
            image: '/images/avatar-two.svg',
            name: 'Victoria Alonso',
        },
        sales_id: '#526587',
        category: 'Quality Monitoring',
        location: 'Kent, Utah',
        date: 'Mar 29, 2024',
        status: 'pending',
    },
    {
        id: '#696589',
        pembeli: {
            image: '/images/avatar-three.svg',
            name: 'Arlene McCoy',
        },
        sales_id: '#696589',
        category: 'CTI and Screen Pop',
        location: 'Corona, Michigan',
        date: 'Mar 20, 2024',
        status: 'cancelled',
    },
    {
        id: '#256584',
        pembeli: {
            image: '/images/avatar-four.svg',
            name: 'Grace Hopper',
        },
        sales_id: '#256584',
        category: 'Queue Callback',
        location: 'Corona, Michigan',
        date: 'Feb 20, 2024',
        status: 'pending',
    },
    {
        id: '#105986',
        pembeli: {
            image: '/images/avatar-six.svg',
            name: 'Darrell Steward',
        },
        sales_id: '#105986',
        category: 'Mobile Customer Care',
        location: 'Great Falls, Maryland',
        date: 'Feb 16, 2024',
        status: 'done',
    },
    {
        id: '#526534',
        pembeli: {
            image: '/images/avatar-seven.svg',
            name: 'Elizabeth Feinler',
        },
        sales_id: '#526534',
        category: 'Sidekick',
        location: 'Pasadena, Oklahoma',
        date: 'Jan 28, 2024',
        status: 'pending',
    },
    {
        id: '#526584',
        pembeli: {
            image: '/images/avatar-eight.svg',
            name: 'Courtney Henry',
        },
        sales_id: '#526584',
        category: 'Web Callback',
        location: 'Lafayette, California',
        date: 'Jan 28, 2024',
        status: 'pending',
    },
    {
        id: '#526589',
        pembeli: {
            image: '/images/avatar-nine.svg',
            name: 'Radia Perlman',
        },
        sales_id: '#526589',
        category: 'Agent Scripting',
        location: 'Stockton, New Hampshire',
        date: 'Jan 22, 2024',
        status: 'pending',
    },
    {
        id: '#526587',
        pembeli: {
            image: '/images/avatar-ten.svg',
            name: 'Jane Cooper',
        },
        sales_id: '#526587',
        category: 'Skills-based Routing',
        location: 'Portland, Illinois',
        date: 'Jan 18, 2013',
        status: 'done',
    },
    {
        id: '#200257',
        pembeli: {
            image: '/images/avatar-eleven.svg',
            name: 'Barbara Liskov',
        },
        sales_id: '#200257',
        category: 'UC Integrations',
        location: 'Syracuse, Connecticut',
        date: 'Jan 7, 2024',
        status: 'done',
    },
    {
        id: '#200287',
        pembeli: {
            image: '/images/avatar-eleven.svg',
            name: 'Barbara Liskov',
        },
        sales_id: '#200257',
        category: 'UC Integrations',
        location: 'Syracuse, Connecticut',
        date: 'Jan 7, 2024',
        status: 'done',
    },
  ]

  return (
    <>
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <span className="font-bold text-2xl font-sans text-black/90">Daftar Pesanan</span>
      </div>
    </header>
    <div className="space-y-4 ml-3 mr-3">
            <div className="min-h-[calc(100vh_-_160px)] w-full ">
                <div className="flex items-center justify-between gap-4 overflow-x-auto rounded-t-lg bg-white px-5 py-[17px]">
                    <div className="flex items-center gap-2.5">
                        <Button
                            type="button"
                            variant={'outline'}
                            className="bg-light-theme ring-0"
                        >
                            All
                        </Button>
                        <div className="flex items-center gap-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        type="button"
                                        variant={'outline-general'}
                                    >
                                        <CalendarCheck />
                                        {date ? (
                                            format(date, 'PP')
                                        ) : (
                                            <span>Start date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="!w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <span className="text-xs font-medium text-gray-700">
                                To
                            </span>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        type="button"
                                        variant={'outline-general'}
                                    >
                                        <CalendarCheck />
                                        {mainDate ? (
                                            format(mainDate, 'PPP')
                                        ) : (
                                            <span>End date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="!w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={mainDate}
                                        onSelect={setMainDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <div id="search-table"></div>

                        <Link href="/" target="_blank">
                            <Button
                            variant={'default'}
                            size ={'sm'}
                            >
                                <FaFileExport />
                                Export
                            </Button>
                        </Link>
                        <Link href="/daftar-pesanan/new">
                            <Button
                            variant={'default'}
                            size ={'sm'}
                            className=''
                            >
                                <Plus />
                                Buat Pesanan Baru
                            </Button>
                        </Link>
                    </div>
                </div>

                <DataTable columns={columns} data={data} filterField="name"/>
            </div>
        </div>
    </>
  )
}

export default page