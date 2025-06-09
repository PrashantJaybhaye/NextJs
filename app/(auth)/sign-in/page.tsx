'use client'

import AuthForm from '@/components/AuthForm'
import { SignInSchema } from '@/lib/validations'
import React from 'react'

const page = () => (
  <AuthForm
    type='SIGN_IN'
    schema={SignInSchema}
    defaultValues={{
      email: '',
      password: ''
    }}
    onSubmit={() => { }}
  />
)

export default page