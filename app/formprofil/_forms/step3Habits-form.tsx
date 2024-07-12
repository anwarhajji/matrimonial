'use client'

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

import { Step3Schema } from '@/schemas'
//import {actionprofil} from "@/actions/action-profil-form";
import { redirect, useRouter } from 'next/navigation'

//POPOVER 1

import useStepStore from '@/store/useStepStore'

import { actionStep3 } from '@/actions/action-step3'
import { toast } from 'sonner'
import {
  drinkingHabitsOptions,
  religionOptions,
  smokingHabitsOptions,
  travelPreferencesOptions
} from '@/data/dataAuto'
interface CountryDropdownProps {
  disabled?: boolean
}

//POPOVER FIN

const inter = Inter({ subsets: ['latin'] })
type Input = z.infer<typeof Step3Schema>

interface Popup1Props {
  onOpenChange: (open: boolean) => void
}
const Step3: React.FC<Popup1Props> = ({ onOpenChange }) => {
  const { setStep } = useStepStore()

  const form = useForm<Input>({
    resolver: zodResolver(Step3Schema),
    defaultValues: {
      drinkinghabits: '',
      religion: '',
      travelpreferences: '',
      smokinghabits: ''
    }
  })
  const router = useRouter()
  function onSubmit(data: Input) {
    console.log('submititttttttttttt in on sumit:    ', data)
    actionStep3(data)
    setStep(5)
    toast.success('Lifestyle Preferences UPDATED SUCCESSFULLY', {
      description: ' CONTINUE WITH STEP 4'
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
        {/* travel preference */}
        <FormField
          control={form.control}
          name="travelpreferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel> what is your travel preference ?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your travel preferences " />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-slate-700">
                  {travelPreferencesOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>{' '}
              </Select>
              <FormDescription>
                chose your travel preference details{' '}
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* drinkinghabits */}
        <FormField
          control={form.control}
          name="drinkinghabits"
          render={({ field }) => (
            <FormItem>
              <FormLabel> do you drink ? </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="do you drink ?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-slate-700">
                  {drinkingHabitsOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                chose do you smoke ? smoking habits{' '}
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* religion */}
        <FormField
          control={form.control}
          name="religion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Religion</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select religion details" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-slate-700">
                  {religionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>chose your religion details </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* smokinghabits */}
        <FormField
          control={form.control}
          name="smokinghabits"
          render={({ field }) => (
            <FormItem>
              <FormLabel> do you smoke ? </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="do you smoke ?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-slate-700">
                  {smokingHabitsOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                chose do you smoke ? smoking habits{' '}
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
  )
}
export default Step3
