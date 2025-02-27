"use client"

import React from 'react'
import  AuthForm  from "@/components/AuthForm"
import { signUpSchema } from "@/lib/validations"
import { signUp } from '@/lib/actions/auth'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const page = () => {

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-slate-100 p-6 md:p-10 dark:bg-slate-800">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <div className={cn("flex flex-col gap-6")}>
                    <Card className="shadow-lg">
                        <CardHeader className="text-center">
                        <CardTitle className=" font-bold items-center justify-center font-sans">
                            <div className="text-4xl font-bold flex items-center justify-center font-sans gap-1">
                            <Image
                            src="/logo.png"
                            alt="logo"
                            width={40}
                            height={40}
                            />
                            <p className="text-red-600">Grand</p>
                            <p className="text-blue-600">Mortar</p>
                            </div>

                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border mt-4">
                            </div>
                        </CardTitle>
                        </CardHeader>
                        <CardContent>
                        <AuthForm 
                            type="SIGN_UP"
                            schema={signUpSchema}
                            defaultValues={{
                              name: "",
                              email: "",
                              password: "",
                            }}
                            onSubmit={signUp}
                          />
                          
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
  )
}
export default page