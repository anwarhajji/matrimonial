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
  incomeOptions,
  occupationOptions,
  smokingHabitsOptions
} from '@/data/dataAuto'

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
  const { setStep } = useStepStore()
  const form = useForm<Input>({
    resolver: zodResolver(Step2Schema),
    defaultValues: {
      education: '',
      occupation: '',
      income: '',
      smokinghabits: ''
    }
  })

  function onSubmit(data: Input) {
    console.log('submititttttttttttt in on sumit:    ', data)
    actionStep2(data)
    setStep(3)

    toast.success('Professional INFOS UPDATED SUCCESSFULLY', {
      description: ' CONTINUE WITH STEP 3'
    })

    setTimeout(() => onOpenChange(false), 3000)
    return { success: 'success form' }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative space-y-4 overflow-x-hidden"
        >
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

          {/* occupation*/}

          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>your occupation or work </FormLabel>
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
                    {occupationOptions.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  chose your occupation to help the algorithm find your perfect
                  match{' '}
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

          {/* smokinghabits */}
          <FormField
            control={form.control}
            name="smokinghabits"
            render={({ field }) => (
              <FormItem>
                <FormLabel> do you smoke ? </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                  {/* <SelectContent className="bg-slate-700">
                    {' '}
                    <SelectItem value="nonSmoker">Non-Smoker</SelectItem>
                    <SelectItem value="occasionalSmoker">
                      Occasional Smoker
                    </SelectItem>
                    <SelectItem value="regularSmoker">
                      Regular Smoker
                    </SelectItem>
                  </SelectContent> */}
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
    </div>
  )
}
export default Step2
