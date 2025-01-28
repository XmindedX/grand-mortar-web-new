"use client"

import React from 'react'
import  AuthForm  from "@/components/AuthForm"
import { loginSchema } from "@/lib/validations"
import { signInWithCredentials } from '@/lib/actions/auth'

const page = () => {
  return (
        // <FormLogin />
        <AuthForm 
          type="SIGN_IN"
          schema={loginSchema}
          defaultValues={{
            email: "",
            password: "",
          }}
          onSubmit={signInWithCredentials}
        />
  )
}

export default page