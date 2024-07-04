'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField
} from '@/components/ui/form'
import { RegisterSchema } from '@/schemas'
import { FormError } from '@/components/Form-Error'
import { FormSuccess } from '@/components/Form-Success'
import { register } from '@/actions/register'
import { useState, useTransition } from 'react'
import { Button, Checkbox, Divider, Input, Link } from '@nextui-org/react'
import { MailIcon } from 'lucide-react'
import React from 'react'
import { EyeSlashFilledIcon } from '@/app/reg/_components/EyeSlashFilledIcon'
import { EyeFilledIcon } from '@/app/reg/_components/EyeFilledIcon'
import { Social } from './Social'

export const RegisterFormUi = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error)
        setSuccess(data.success)
        form.reset()
      })
      //Console.log('valueeeeeeeeeee', values)
      //alert(JSON.stringify(values))
    })
  }
  {
    /* <CardWrapper
      headerTitle="Register"
      showSocial
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
    > */
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 p-2 sm:p-4 lg:p-8">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <p className="pb-2 text-xl font-medium">Sign Up</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div className="space-y-4 top-0 left-0 right-0">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  const { error } = useFormField()
                  return (
                    <Input
                      isRequired
                      label="name"
                      type="text"
                      placeholder="Enter your name"
                      errorMessage={error?.message}
                      isInvalid={!!error?.message}
                      variant="bordered"
                      {...field}
                      disabled={isPending}
                    />
                  )
                }}
              />
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => {
                  const { error } = useFormField()
                  const [isVisible, setIsVisible] = React.useState(false)

                  const toggleVisibility = () => setIsVisible(!isVisible)

                  return (
                    <Input
                      isRequired
                      label="confirmPassword"
                      disabled={isPending}
                      placeholder="Confirm your password"
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
            <FormError message={error} />
            <FormSuccess message={success} />
            {/*  <Button
              disabled={isPending}
              type="submit"
              className="p-[3px] relative font-semibold w-full bg-transparent"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[7.5px] w-full" />
              <div className="px-8 py-2  w-full bg-zinc-800 rounded-[5px] relative group transition duration-200 text-white hover:bg-transparent text-lg">
                Register &rarr;
              </div>
            </Button> */}

            <Checkbox isRequired className="py-4" size="sm">
              I agree with the&nbsp;
              <Link href="#" size="sm">
                Terms
              </Link>
              &nbsp; and&nbsp;
              <Link href="#" size="sm">
                Privacy Policy
              </Link>
            </Checkbox>
            <Button color="primary" type="submit" isDisabled={isPending}>
              Sign Up
            </Button>
          </form>
        </Form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Social />
        </div>
        <p className="text-center text-small">
          Already have an account?&nbsp;
          <Link href="/auth/login" size="sm">
            Log In
          </Link>
        </p>
      </div>
    </div>
  )
}
