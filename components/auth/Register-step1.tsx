'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useFormSteps } from '@/store/profilstore'

//import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { GoogleSchema } from '@/schemas'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCurrentUser } from '@/hooks/user-current-user'
import { FormError } from '@/components/Form-Error'
import { FormSuccess } from '@/components/Form-Success'
import { registeractionstep1 } from '@/actions/registerstep1'

const Step1 = () => {
  const user = useCurrentUser()
  console.log('user ', user)
  const isprofilcomplete = user?.profilcomplete as boolean

  const { step1, togleStep1 } = useFormSteps()

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const { update } = useSession()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof GoogleSchema>>({
    resolver: zodResolver(GoogleSchema),
    defaultValues: {
      fullname: undefined,
      age: 0,
      username: undefined,
      profilcomplete: false,

      gender: undefined

      //isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    }
  })

  const onSubmit = (values: z.infer<typeof GoogleSchema>) => {
    startTransition(() => {
      registeractionstep1(values)
        .then((data) => {
          if (data.error) {
            setError(data.error)
          }

          if (data.success) {
            update()
            setSuccess(data.success)
            console.log('before step1', step1)
            //togleStep1()
            console.log('after step1', step1)
            form.reset()
          }
        })
        .catch(() => setError('Something went wrong!'))
    })
  }
  // const renderedValues = form.watch()
  return (
    <Card className="w-[600px]">
      <>
        <CardHeader>
          <p className="text-2xl font-semibold text-center">
            ➡️ Personal Details Registration 💕
          </p>
        </CardHeader>
        {!isprofilcomplete ? (
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>userName</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            // {...form.register('username')}
                            placeholder="John Doe"
                            disabled={isPending}
                            className="bg-zinc-700 text-slate-100"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GENDER</FormLabel>
                        <Select
                          disabled={isPending}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                className="bg-zinc-700"
                                placeholder="Select YOUR GENDER"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-zinc-700 text-slate-100">
                            <SelectItem value={'MEN'}>MEN</SelectItem>
                            <SelectItem value={'WOMEN'}>WOMEN</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>YOUR FULL NAME</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="John Doe"
                            disabled={isPending}
                            className="bg-zinc-700 text-slate-100"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>your age</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="33"
                            disabled={isPending}
                            className="bg-zinc-700 text-slate-100"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />

                <Button
                  disabled={isPending}
                  type="submit"
                  className="p-[3px] relative font-semibold w-full bg-transparent"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[7.5px] w-full" />
                  <div className="px-8 py-2  w-full bg-zinc-800 rounded-[5px] relative group transition duration-200 text-white hover:bg-transparent text-lg">
                    Register NEXT &rarr;
                  </div>
                </Button>
              </form>
            </Form>
          </CardContent>
        ) : (
          <div>step1 complete</div>
        )}
      </>
    </Card>
  )
}

export default Step1
