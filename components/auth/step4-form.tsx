'use client'

import { PhoneInput, getPhoneData } from '@/components/phone-input'

import { Inter } from 'next/font/google'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Step4Schema } from '@/schemas'
//import {actionprofil} from "@/actions/action-profil-form";
import { redirect } from 'next/navigation'

import { actionStep4 } from '@/actions/action-step4'
import useStepStore from '@/store/useStepStore'
import { toast } from 'sonner'

interface CountryDropdownProps {
  disabled?: boolean
}

//POPOVER FIN

const inter = Inter({ subsets: ['latin'] })
type Input = z.infer<typeof Step4Schema>

const Step4 = () => {
  const { setStep } = useStepStore()

  const form = useForm<Input>({
    resolver: zodResolver(Step4Schema),
    defaultValues: {
      kids: '',
      pets: '',
      phonenumber: ''
    }
  })

  function onSubmit(data: Input) {
    console.log('submititttttttttttt in on sumit:    ', data)
    actionStep4(data)
    setStep(5)

    toast.success('Additional Details UPDATED SUCCESSFULLY', {
      description: ' PROFIL INFOS COMPLETED SUCCESSFULLY'
    })

    return { success: 'success form' }
  }

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="center text-2xl">Additional Details</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative space-y-4 overflow-x-hidden"
            >
              {/* kids */}
              <FormField
                control={form.control}
                name="kids"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>do you have kids</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="do you have kids" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-slate-700">
                        <SelectItem value="NO"> NO</SelectItem>
                        <SelectItem value="YES">YES </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select YES if you have kids
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              {/* pets */}
              <FormField
                control={form.control}
                name="pets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> do you have any pet ?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="do you have any pet ?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-slate-700">
                        {' '}
                        <SelectItem value="none">
                          No, I dont have pets
                        </SelectItem>
                        <SelectItem value="dontlike">
                          I dont like animals
                        </SelectItem>
                        <SelectItem value="dogs">Dogs</SelectItem>
                        <SelectItem value="cats">Cats</SelectItem>
                        <SelectItem value="birds">Birds</SelectItem>
                        <SelectItem value="fish">Fish</SelectItem>
                        <SelectItem value="reptiles">Reptiles</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      chose your religion details{' '}
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phonenumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <PhoneInput className="bg-slate-900" {...field} />
                    </FormControl>
                    <FormDescription>
                      your phone number is confidential the others will not be
                      able to see it
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Button
                // disabled={isPending}
                type="submit"
                className="p-[3px] relative font-semibold w-full bg-transparent"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[7.5px] w-full" />
                <div className="px-8 py-2  w-full bg-zinc-800 rounded-[5px] relative group transition duration-200 text-white hover:bg-transparent text-lg">
                  Next step &rarr;
                </div>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
export default Step4
