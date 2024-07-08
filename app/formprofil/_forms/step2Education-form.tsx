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
    setStep(3)

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
                <FormLabel>your Height (in cm)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the interval of height" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-slate-700">
                    {heightOptions.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
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
                <FormLabel>Your Weight (in kg)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the interval of weight" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-slate-700">
                    {weightOptions.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
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
                <FormLabel>Education Levels</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-slate-700">
                    {educationOptions.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
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
                <FormLabel>Select your income level </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-slate-700">
                    {incomeOptions.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
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
