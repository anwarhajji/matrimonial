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
import { maritalStatusOptions, petsOptions } from '@/data/dataAuto'

interface CountryDropdownProps {
  disabled?: boolean
}

//POPOVER FIN

const inter = Inter({ subsets: ['latin'] })
type Input = z.infer<typeof Step4Schema>

interface Popup1Props {
  onOpenChange: (open: boolean) => void
}
const Step4: React.FC<Popup1Props> = ({ onOpenChange }) => {
  const { setStep } = useStepStore()

  const form = useForm<Input>({
    resolver: zodResolver(Step4Schema),
    defaultValues: {
      kids: '',
      pets: '',
      maritalstatus: ''
    }
  })

  function onSubmit(data: Input) {
    console.log('submititttttttttttt in on sumit:    ', data)
    actionStep4(data)
    setStep(7)

    toast.success('Additional Details UPDATED SUCCESSFULLY', {
      description: ' PROFIL INFOS COMPLETED SUCCESSFULLY'
    })

    setTimeout(() => onOpenChange(false), 2000)

    return { success: 'success form' }
  }

  return (
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
              <FormLabel className="text-white">do you have kids</FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="do you have kids" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white dark:bg-slate-800">
                  <SelectItem
                    className="hover:bg-slate-500 dark:hover:bg-slate-600"
                    value="NO"
                  >
                    {' '}
                    NO
                  </SelectItem>
                  <SelectItem
                    className="hover:bg-slate-500 dark:hover:bg-slate-600"
                    value="YES"
                  >
                    YES{' '}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-black">
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
              <FormLabel className="text-white">
                {' '}
                do you have any pet ?
              </FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="do you have any pet ?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white dark:bg-slate-800">
                  {petsOptions.map((range) => (
                    <SelectItem
                      className="hover:bg-slate-500 dark:hover:bg-slate-600"
                      key={range.value}
                      value={range.value}
                    >
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {/* matrimonial */}
        <FormField
          control={form.control}
          name="maritalstatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                your status MATRIMONIAL
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="your status matrimonial" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white dark:bg-slate-800">
                  {maritalStatusOptions.map((range) => (
                    <SelectItem
                      className="hover:bg-slate-500 dark:hover:bg-slate-600"
                      key={range.value}
                      value={range.value}
                    >
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
  )
}
export default Step4
