'use client'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, FormField, useFormField } from '@/components/ui/form'
import { SettingSchema } from '@/schemas'
import { FormError } from '@/components/Form-Error'
import { FormSuccess } from '@/components/Form-Success'
import { useState, useTransition } from 'react'
import { Button, Input } from '@nextui-org/react'
import React from 'react'
import { actionSaveUser } from '@/actions/setting1'
import { toast } from 'sonner'
import { User, UserProfile } from '@prisma/client'

export const SettigStep1 = ({
  user,
  Uprofil
}: {
  user: User
  Uprofil: UserProfile
}) => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      name: user.name!,
      fullname: user.fullname!,
      age: user.age! || 0,
      phonenumber: Uprofil?.phonenumber!
    }
  })

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      console.log('dataaaa', values)
      actionSaveUser(values).then((data) => {
        setError(data.error)
        //setSuccess(data.success)
        //setSuccess(data.success)
        //form.reset()
      })
      toast.success('PERSONAL INFOS UPDATED SUCCESSFULLY', {
        description: ' :)'
      })

      //Console.log('valueeeeeeeeeee', values)
      //alert(JSON.stringify(values))
    })
  }

  return (
    <div className="flex w-full  max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <div className="space-y-4 w-full  top-0 left-0 right-0">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                const { error } = useFormField()
                return (
                  <Input
                    defaultValue={user?.name!}
                    label="name"
                    type="text"
                    placeholder="Enter your name"
                    errorMessage={error?.message}
                    isInvalid={!!error?.message}
                    variant="bordered"
                    disabled={isPending}
                    className="w-full"
                    {...field}
                  />
                )
              }}
            />
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => {
                const { error } = useFormField()

                return (
                  <Input
                    defaultValue={user.fullname!}
                    isRequired
                    label="fullname"
                    type="text"
                    disabled={isPending}
                    placeholder="Enter your fullname"
                    variant="bordered"
                    errorMessage={error?.message}
                    isInvalid={!!error?.message}
                    {...field}
                  />
                )
              }}
            />
            <FormField
              control={form.control}
              name="phonenumber"
              render={({ field }) => {
                const { error } = useFormField()

                return (
                  <Input
                    defaultValue={`${Uprofil?.phonenumber}`}
                    label="phonenumber"
                    type="text"
                    disabled={isPending}
                    placeholder="Enter your phonenumber"
                    variant="bordered"
                    errorMessage={error?.message}
                    isInvalid={!!error?.message}
                    {...field}
                  />
                )
              }}
            />
            {/* <FormField
              control={form.control}
              name="phonenumber"
              render={({ field }) => {
                const { error } = useFormField()

                return (
                  <Input
                    defaultValue={profile?.userId!}
                    //defaultValue={user.age!.toString()}
                    type="text"
                    label="phonenumber"
                    disabled={isPending}
                    placeholder=" your phone number"
                    variant="bordered"
                    errorMessage={error?.message}
                    isInvalid={!!error?.message}
                    {...field}
                  />
                )
              }}
            /> */}

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => {
                const { error } = useFormField()

                return (
                  <Input
                    defaultValue={`${user.age}`}
                    // value={`${user.age}`}
                    //defaultValue={user.age!.toString()}
                    type="text"
                    label="age"
                    disabled={isPending}
                    placeholder=" your age"
                    variant="bordered"
                    errorMessage={error?.message}
                    isInvalid={!!error?.message}
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

          <Button color="primary" type="submit" isDisabled={isPending}>
            Update
          </Button>
        </form>
      </Form>
    </div>
  )
}
function setError(error: string | undefined) {
  throw new Error('Function not implemented.')
}

function setSuccess(success: string | undefined) {
  throw new Error('Function not implemented.')
}
