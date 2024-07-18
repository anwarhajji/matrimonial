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

import { Step2Schema } from '@/schemas'
//import {actionprofil} from "@/actions/action-profil-form";

//POPOVER 1

import { actionStep2 } from '@/actions/action-step2'
import useStepStore from '@/store/useStepStore'
import { toast } from 'sonner'
import {
  educationOptions,
  heightOptions,
  incomeOptions,
  occupationOptions,
  smokingHabitsOptions,
  weightOptions
} from '@/data/dataAuto'
import SubmitButton from './SubmitButton'

interface CountryDropdownProps {
  disabled?: boolean
}

//POPOVER FIN

const inter = Inter({ subsets: ['latin'] })
type Input = z.infer<typeof Step2Schema>
interface Popup1Props {
  onOpenChange: (open: boolean) => void
}

const Step2: React.FC<Popup1Props> = ({ onOpenChange }) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const { setStep } = useStepStore()
  const form = useForm<Input>({
    resolver: zodResolver(Step2Schema),
    defaultValues: {
      height: '',
      weight: '',
      education: '',
      income: ''
      //smokinghabits: ''
    }
  })

  function onSubmit(data: Input) {
    setIsLoading(true)

    console.log('submititttttttttttt in on sumit:    ', data)
    actionStep2(data).then(() => {
      setIsLoading(false)
    })
    setStep(4)

    toast.success('Professional INFOS UPDATED SUCCESSFULLY', {
      description: ' CONTINUE WITH STEP 3'
    })

    setTimeout(() => onOpenChange(false), 2000)
    return { success: 'success form' }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative space-y-4 overflow-x-hidden"
        >
          {/* heigh*/}

          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                {/*   <FormLabel className="text-white font-semibold dark:text-slate-300 dark:font-bold">
                  your Height (in cm)
                </FormLabel> */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the interval of height" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white dark:bg-slate-800 ">
                    {heightOptions.map((range) => (
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
                <FormDescription className="text-slate-700">
                  chose your heigh to help the algorithm find your perfect match{' '}
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          {/* weight */}
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                {/*                 <FormLabel className="text-white font-semibold dark:text-slate-300 dark:font-bold">
                  Your Weight (in kg)
                </FormLabel> */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the interval of weight" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white dark:bg-slate-800">
                    {weightOptions.map((range) => (
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
                <FormDescription className="text-slate-700">
                  chose your weight to help the algorithm find your perfect
                  match{' '}
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* education*/}

          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem>
                {/*   <FormLabel className="text-white font-semibold dark:text-slate-300 dark:font-bold">
                  Education Levels
                </FormLabel> */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white dark:bg-slate-800">
                    {educationOptions.map((range) => (
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
                <FormDescription className="text-slate-700">
                  chose your education level to help the algorithm find your
                  perfect match{' '}
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* income*/}
          <FormField
            control={form.control}
            name="income"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel className="text-white font-semibold dark:text-slate-300 dark:font-bold">
                  Select rmyour income level
                </FormLabel> */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your income level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white dark:bg-slate-800">
                    {incomeOptions.map((range) => (
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
                <FormDescription className="text-slate-700">
                  chose your income level to help the algorithm find your
                  perfect match{' '}
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <SubmitButton isLoading={isLoading}>Send</SubmitButton>
        </form>
      </Form>
    </div>
  )
}
export default Step2
