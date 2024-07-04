'use client'

import states from '@/data/states.json'

import { type StateProps } from '@/store/types'

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
import { toast } from 'sonner'

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
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
//import { useToast } from '@/components/ui/use-toast'
import { Step1Schema } from '@/schemas'
//import {actionprofil} from "@/actions/action-profil-form";
import { redirect } from 'next/navigation'
import { Popover } from '@/components/ui/popover'

//POPOVER 1

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { lowerCase, sentenceCase } from '@/store/utils'
import countries from '@/data/countries.json'
import { Check, ChevronsUpDown } from 'lucide-react'

import { type CountryProps } from '@/store/types'
import { useDropdownStore } from '@/store/dropdown' //useDropdownStore from "@/store/dropdown";
import { actionStep1 } from '@/actions/action-step1'
import useStepStore from '@/store/useStepStore'
//useStepStore from '@/store/useStepStore'

interface CountryDropdownProps {
  disabled?: boolean
}

//POPOVER FIN

const inter = Inter({ subsets: ['latin'] })
type Input = z.infer<typeof Step1Schema>

const Step1 = () => {
  const { setStep } = useStepStore()
  // const router = useRouter()

  const { stateValue, openStateDropdown, setOpenStateDropdown, setStateValue } =
    useDropdownStore()

  const SD = states as StateProps[]

  const {
    countryValue,
    setCountryValue,
    openCountryDropdown,
    setOpenCountryDropdown
  } = useDropdownStore()
  const C = countries as CountryProps[]
  const S = SD.filter(
    (state) => state.country_name === sentenceCase(countryValue)
  )

  //const { toast } = useToast()

  const form = useForm<Input>({
    resolver: zodResolver(Step1Schema),
    defaultValues: {
      city: '',
      country: '',
      height: '',
      weight: ''
    }
  })

  function onSubmit(data: Input) {
    //console.log('submititttttttttttt in on sumit:    ', data)
    actionStep1(data)
    setStep(2)
    //router.push('/step2')

    //alert(JSON.stringify(data, null, 4))
    toast.success('PERSONAL INFOS UPDATED SUCCESSFULLY', {
      description: ' CONTINUE WITH STEP 2'
    })
    return { success: 'success form' }

    // redirect('/')
  }

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="center text-2xl">
            Personal Information
          </CardTitle>
          <CardDescription>Start the journey with us today.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative space-y-4 overflow-x-hidden"
            >
              {/* country*/}

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>country</FormLabel>
                    <FormControl>
                      <Popover
                        //onValueChange={field.onChange}
                        //defaultValue={field.value}
                        open={openCountryDropdown}
                        onOpenChange={setOpenCountryDropdown}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openCountryDropdown}
                            className="w-full justify-between rounded-[6px] border !border-[#27272a] !bg-[#0f0f11] hover:!bg-[#0f0f11] focus:!bg-[#0f0f11] focus:!outline-none focus:!ring-2 focus:!ring-[#0f0f11] focus:!ring-offset-2 focus:!ring-offset-[#0f0f11]"
                            // disabled={disabled}
                          >
                            <span>
                              {countryValue ? (
                                <div className="flex items-end gap-2">
                                  <span>
                                    {
                                      countries.find(
                                        (country) =>
                                          lowerCase(country.name) ===
                                          countryValue
                                      )?.emoji
                                    }
                                  </span>
                                  <span>
                                    {
                                      countries.find(
                                        (country) =>
                                          lowerCase(country.name) ===
                                          countryValue
                                      )?.name
                                    }
                                  </span>
                                </div>
                              ) : (
                                <span>Select Country...</span>
                              )}
                            </span>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-slate-700 w-[300px] rounded-[6px] border border-[#27272a] p-0">
                          <Command>
                            <CommandInput placeholder="Search country..." />
                            <CommandList>
                              <CommandEmpty>No country found.</CommandEmpty>
                              <CommandGroup>
                                <ScrollArea className="h-[300px] w-full">
                                  {C.map((country) => (
                                    <CommandItem
                                      key={country.id}
                                      value={lowerCase(country.name)}
                                      onSelect={(currentValue) => {
                                        setCountryValue(
                                          currentValue ===
                                            lowerCase(country.name)
                                            ? currentValue
                                            : ''
                                        )
                                        field.value = lowerCase(currentValue)
                                        console.log(field.value)
                                        form.setValue('country', currentValue, {
                                          shouldValidate: true
                                        })
                                        form.setFocus('country')

                                        setOpenCountryDropdown(false)
                                      }}
                                      className="flex cursor-pointer items-center justify-between text-xs hover:!bg-[#27272a] hover:!text-white"
                                    >
                                      <div className="flex items-end gap-2">
                                        <span>{country.emoji}</span>
                                        <span className="">{country.name}</span>
                                      </div>
                                      <Check
                                        className={cn(
                                          'mr-2 h-4 w-4',
                                          countryValue ===
                                            lowerCase(country.name)
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                  <ScrollBar orientation="vertical" />
                                </ScrollArea>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* city */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>city</FormLabel>
                    <FormControl>
                      <Popover
                        open={openStateDropdown}
                        onOpenChange={setOpenStateDropdown}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openStateDropdown}
                            className="w-full cursor-pointer justify-between rounded-[6px] border !border-[#27272a] !bg-[#0f0f11] hover:!bg-[#0f0f11] focus:!bg-[#0f0f11] focus:!outline-none focus:!ring-2 focus:!ring-[#0f0f11] focus:!ring-offset-2 focus:!ring-offset-[#0f0f11] disabled:!cursor-not-allowed disabled:!opacity-50"
                            disabled={!countryValue || S.length === 0}
                          >
                            {stateValue ? (
                              <div className="flex items-end gap-2">
                                <span>
                                  {
                                    S.find(
                                      (state) =>
                                        lowerCase(state.name) === stateValue
                                    )?.name
                                  }
                                </span>
                              </div>
                            ) : (
                              <span>Select State...</span>
                            )}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-slate-600 w-[300px] rounded-[6px] border border-[#27272a] p-0">
                          <Command>
                            <CommandInput placeholder="Search state..." />

                            <CommandList>
                              <CommandEmpty>No state found.</CommandEmpty>
                              <CommandGroup>
                                <ScrollArea className="h-[300px] w-full">
                                  {S.map((state) => (
                                    <CommandItem
                                      key={state.id}
                                      value={lowerCase(state.name)}
                                      onSelect={(currentValue) => {
                                        setStateValue(
                                          currentValue === lowerCase(state.name)
                                            ? currentValue
                                            : ''
                                        )

                                        field.value = lowerCase(currentValue)
                                        console.log(field.value)
                                        form.setValue('city', currentValue, {
                                          shouldValidate: true
                                        })
                                        form.setFocus('city')
                                        console.log('city', currentValue)
                                        setOpenStateDropdown(false)
                                      }}
                                      className="flex cursor-pointer items-center justify-between text-xs hover:!bg-[#27272a] hover:!text-white"
                                    >
                                      <div className="flex items-end gap-2">
                                        <span className="">{state.name}</span>
                                      </div>
                                      <Check
                                        className={cn(
                                          'mr-2 h-4 w-4',
                                          stateValue === lowerCase(state.name)
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                  <ScrollBar orientation="vertical" />
                                </ScrollArea>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>your Height</FormLabel>
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
                        <SelectItem value="short">
                          {' '}
                          Below 5&apos;5&quot; (Below 165 cm)
                        </SelectItem>
                        <SelectItem value="average">
                          5&apos;5&quot; - 5&apos;9&quot; (165 cm - 175 cm)
                        </SelectItem>
                        <SelectItem value="aboveaverage">
                          5&apos;10&quot; - 6&apos;0&quot; (178 cm - 183 cm)
                        </SelectItem>
                        <SelectItem value="tall">
                          Above 6&apos;0&quot; (Above 183 cm)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      chose your heigh to help the algorithm find your perfect
                      match{' '}
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
                    <FormLabel>your Weight</FormLabel>
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
                        {' '}
                        <SelectItem value="underweight">
                          Below 50 kg (Below 110 lbs)
                        </SelectItem>
                        <SelectItem value="normal">
                          55 kg - 75 kg (121 lbs - 165 lbs)
                        </SelectItem>
                        <SelectItem value="overweight">
                          75 kg - 86 kg (165 lbs - 189 lbs)
                        </SelectItem>
                        <SelectItem value="strong">
                          Above 86 kg (Above 189 lbs)
                        </SelectItem>
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
export default Step1
