'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField
} from '@/components/ui/form'
import { LoginSchema } from '@/schemas'
import { login } from '@/actions/login'
import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'

import { FormSuccess } from '../Form-Success'
import { FormError } from '../Form-Error'
import { Button, Checkbox, Input, Link } from '@nextui-org/react'
import { MailIcon } from 'lucide-react'
import { EyeSlashFilledIcon } from '@/app/reg/_components/EyeSlashFilledIcon'
import { EyeFilledIcon } from '@/app/reg/_components/EyeFilledIcon'
import { Social } from './Social'
import React from 'react'
FormError
export const LoginFormUI = () => {
  const searchParams = useSearchParams()
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : ''

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 p-2 sm:p-4 lg:p-8">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <p className="pb-2 text-xl font-medium">Sign In</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  const { error } = useFormField()

                  return (
                    <Input
                      isRequired
                      label="Email"
                      type="email"
                      disabled={isPending}
                      placeholder="Enter your email"
                      variant="bordered"
                      startContent={
                        <MailIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      errorMessage={error?.message}
                      isInvalid={!!error?.message}
                      endContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">
                            @gmail.com
                          </span>
                        </div>
                      }
                      {...field}
                    />
                  )
                }}
              />
              <div className="flex items-center justify-between px-1 py-2">
                <Checkbox name="remember" size="sm">
                  Remember me
                </Checkbox>
                <Link className="text-default-500" href="/auth/reset" size="sm">
                  Forgot password?
                </Link>
              </div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  const { error } = useFormField()
                  const [isVisible, setIsVisible] = React.useState(false)

                  const toggleVisibility = () => setIsVisible(!isVisible)

                  return (
                    <Input
                      isRequired
                      label="Password"
                      disabled={isPending}
                      placeholder="Enter your password"
                      variant="bordered"
                      errorMessage={error?.message}
                      isInvalid={!!error?.message}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      type={isVisible ? 'text' : 'password'}
                      {...field}
                    />
                  )
                }}
              />
            </div>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button color="primary" type="submit" isDisabled={isPending}>
              Sign In
            </Button>
            <Social />
          </form>
        </Form>
        <p className="text-center text-small">
          Need to create an account?&nbsp;
          <Link href="/auth/register" size="sm">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
