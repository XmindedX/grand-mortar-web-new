import React, { ReactNode } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const layout = async ({ children }: { children: ReactNode }) => {

    const session = await auth();

    if (session) redirect('/');

    return (
        <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-slate-100 p-6 md:p-10 dark:bg-slate-800">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <div className={cn("flex flex-col gap-6")}>
                    <Card className="shadow-lg">
                        <CardHeader className="text-center">
                        <CardTitle className=" font-bold items-center justify-center font-sans">
                            <div className="text-4xl font-bold flex items-center justify-center font-sans gap-1">
                            <img src="./logo.png" alt="" className="w-12 h-12 mt-1" />
                            <p className="text-red-600">Grand</p>
                            <p className="text-blue-600">Mortar</p>
                            </div>

                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border mt-4">
                            </div>
                            
                            {/* <div className="text-xl flex items-center justify-center font-sans ">
                            <span>Login</span>
                            </div> */}
                        </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {children}
                        {/* <form>
                            <div className="grid gap-1">
                            <div className="flex flex-col gap-4">
                            </div>
                            
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="example@gmail.com"
                                    required
                                />
                                </div>
                                <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password" placeholder="********" required />
                                </div>
                                <Button type="submit" className="w-full">
                                Login
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Belum punya akun? {""}
                                <a href="/sign-up" className="underline underline-offset-4">
                                Daftar
                                </a>
                            </div>
                            </div>
                        </form> */}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    )
}

export default layout