'use client'

import { PhoneInput, getPhoneData } from '@/components/phone-input'
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
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { ProfilDetailsSchema } from '@/schemas'
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
import { actionprofil } from '@/actions/action-profil-form'

interface CountryDropdownProps {
  disabled?: boolean
}

//POPOVER FIN

const inter = Inter({ subsets: ['latin'] })
type Input = z.infer<typeof ProfilDetailsSchema>

const ProfilForm = () => {
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

  const { toast } = useToast()
  const [formStep, setFormStep] = React.useState(0)

  const form = useForm<Input>({
    resolver: zodResolver(ProfilDetailsSchema),
    defaultValues: {
      city: '',
      country: '',
      height: '',
      weight: '',
      education: '',
      occupation: '',
      income: '',
      smokinghabits: '',
      drinkinghabits: '',
      religion: '',
      travelpreferences: '',
      maritalstatus: '',
      kids: '',
      pets: '',
      phonenumber: ''
    }
  })

  function onSubmit(data: Input) {
    console.log('submititttttttttttt in on sumit:    ', data)
    actionprofil(data)

    alert(JSON.stringify(data, null, 4))

    console.log(data)
    return { success: 'success form' }

    redirect('/')
  }

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Start the journey with us today.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative space-y-3 overflow-x-hidden"
            >
              {/* form step 0 */}
              <motion.div
                className={cn('space-y-3 ', {
                  hidden:
                    formStep == 1 ||
                    formStep == 2 ||
                    formStep == 3 ||
                    formStep == 4 ||
                    formStep == 5
                })}
                // formStep == 0 -> translateX == 0
                // formStep == 1 -> translateX == '-100%'
                animate={
                  {
                    // translateX: `-${formStep * 100}%`,
                  }
                }
                transition={{
                  ease: 'easeInOut'
                }}
              >
                {/* matrimonial */}
                <FormField
                  control={form.control}
                  name="maritalstatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>your status MATRIMONIAL</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="your status matrimonial" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-700">
                          {['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'].map(
                            (maritalstatus) => {
                              return (
                                <SelectItem
                                  value={maritalstatus.toString()}
                                  key={maritalstatus}
                                >
                                  {maritalstatus}
                                </SelectItem>
                              )
                            }
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
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
                {/* height */}
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
              </motion.div>

              {/* form step 1 */}
              <motion.div
                className={cn('space-y-3', {
                  hidden:
                    formStep == 0 ||
                    formStep == 2 ||
                    formStep == 3 ||
                    formStep == 4 ||
                    formStep == 5
                })}
                // formStep == 0 -> translateX == 0
                // formStep == 1 -> translateX == '-100%'
                animate={
                  {
                    // translateX: `-${formStep * 100}%`,
                  }
                }
                transition={{
                  ease: 'easeInOut'
                }}
              >
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
                        chose your weight to help the algorithm find your
                        perfect match{' '}
                      </FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* phone */}

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
                          {' '}
                          <SelectItem value="nodegree">
                            Some College, No Degree
                          </SelectItem>
                          <SelectItem value="highschool">
                            High School Degree
                          </SelectItem>
                          <SelectItem value="professional">
                            professional certificate or diploma
                          </SelectItem>
                          <SelectItem value="master">
                            Masters Degree or engineering degree
                          </SelectItem>
                          <SelectItem value="doctorate">
                            Doctorate (Ph.D.)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        chose your education level to help the algorithm find
                        your perfect match{' '}
                      </FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* form step 2 */}
              <motion.div
                className={cn('space-y-3', {
                  hidden:
                    formStep == 0 ||
                    formStep == 5 ||
                    formStep == 3 ||
                    formStep == 4 ||
                    formStep == 1
                })}
                // formStep == 0 -> translateX == 0
                // formStep == 1 -> translateX == '-100%'
                animate={
                  {
                    //translateX: `-${formStep * 100}%`,
                  }
                }
                transition={{
                  ease: 'easeInOut'
                }}
              >
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
                          {' '}
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="professional">
                            Professional
                          </SelectItem>
                          <SelectItem value="entrepreneur">
                            Entrepreneur
                          </SelectItem>
                          <SelectItem value="homemaker">Homemaker</SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                          <SelectItem value="unemployed">Unemployed</SelectItem>
                          <SelectItem value="freelancer">Freelancer</SelectItem>
                          <SelectItem value="artist">Artist</SelectItem>
                          <SelectItem value="teacher">
                            Teacher/Educator
                          </SelectItem>
                          <SelectItem value="healthcare">
                            Healthcare Professional
                          </SelectItem>
                          <SelectItem value="engineer">Engineer</SelectItem>
                          <SelectItem value="it">
                            Information Technology (IT) Professional
                          </SelectItem>
                          <SelectItem value="businessowner">
                            Business Owner
                          </SelectItem>
                          <SelectItem value="salesperson">
                            Salesperson
                          </SelectItem>
                          <SelectItem value="manager">
                            Manager/Administrator
                          </SelectItem>
                          <SelectItem value="government">
                            Government Employee
                          </SelectItem>
                          <SelectItem value="lawyer">
                            Lawyer/Legal Professional
                          </SelectItem>
                          <SelectItem value="accountant">
                            Accountant/Financial Professional
                          </SelectItem>
                          <SelectItem value="consultant">Consultant</SelectItem>
                          <SelectItem value="other">Other </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        chose your education level to help the algorithm find
                        your perfect match{' '}
                      </FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

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
                              className="w-[300px] justify-between rounded-[6px] border !border-[#27272a] !bg-[#0f0f11] hover:!bg-[#0f0f11] focus:!bg-[#0f0f11] focus:!outline-none focus:!ring-2 focus:!ring-[#0f0f11] focus:!ring-offset-2 focus:!ring-offset-[#0f0f11]"
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
                                          form.setValue(
                                            'country',
                                            currentValue,
                                            { shouldValidate: true }
                                          )
                                          form.setFocus('country')

                                          setOpenCountryDropdown(false)
                                        }}
                                        className="flex cursor-pointer items-center justify-between text-xs hover:!bg-[#27272a] hover:!text-white"
                                      >
                                        <div className="flex items-end gap-2">
                                          <span>{country.emoji}</span>
                                          <span className="">
                                            {country.name}
                                          </span>
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
                              className="w-[300px] cursor-pointer justify-between rounded-[6px] border !border-[#27272a] !bg-[#0f0f11] hover:!bg-[#0f0f11] focus:!bg-[#0f0f11] focus:!outline-none focus:!ring-2 focus:!ring-[#0f0f11] focus:!ring-offset-2 focus:!ring-offset-[#0f0f11] disabled:!cursor-not-allowed disabled:!opacity-50"
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
                                            currentValue ===
                                              lowerCase(state.name)
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
              </motion.div>

              {/* form steps3 */}
              <motion.div
                className={cn('space-y-3  top-0 left-0 right-0', {
                  hidden:
                    formStep == 0 ||
                    formStep == 1 ||
                    formStep == 4 ||
                    formStep == 2 ||
                    formStep == 5
                })}
                // formStep == 0 -> translateX == 100%
                // formStep == 1 -> translateX == 0
                animate={{
                  translateX: `${100 - 1 * 100}%`
                }}
                style={
                  {
                    //  translateX: `${100 - formStep * 100}%`,
                  }
                }
                transition={{
                  ease: 'easeInOut'
                }}
              >
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
                          {' '}
                          <SelectItem value="under20k">
                            Under $20,000
                          </SelectItem>
                          <SelectItem value="20k-40k">
                            $20,000 - $40,000
                          </SelectItem>
                          <SelectItem value="40k-60k">
                            $40,000 - $60,000
                          </SelectItem>
                          <SelectItem value="60k-80k">
                            $60,000 - $80,000
                          </SelectItem>
                          <SelectItem value="80k-100k">
                            $80,000 - $100,000
                          </SelectItem>
                          <SelectItem value="over100k">
                            Over $100,000
                          </SelectItem>
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
                {/* travel preference */}
                <FormField
                  control={form.control}
                  name="travelpreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> what is your travel preference ?</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your travel preferences " />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-700">
                          {' '}
                          <SelectItem value="beach">Beach</SelectItem>
                          <SelectItem value="mountains">Mountains</SelectItem>
                          <SelectItem value="city">City</SelectItem>
                          <SelectItem value="countryside">
                            Countryside
                          </SelectItem>
                          <SelectItem value="adventure">Adventure</SelectItem>
                          <SelectItem value="cultural">Cultural</SelectItem>
                          <SelectItem value="historical">Historical</SelectItem>
                          <SelectItem value="relaxing">Relaxing</SelectItem>
                          <SelectItem value="solo">Solo Travel</SelectItem>
                          <SelectItem value="group">Group Travel</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        chose your travel preference details{' '}
                      </FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </motion.div>
              {/* form steps4 */}
              <motion.div
                className={cn('space-y-3  top-0 left-0 right-0', {
                  hidden:
                    formStep == 0 ||
                    formStep == 1 ||
                    formStep == 3 ||
                    formStep == 2 ||
                    formStep == 5
                })}
                // formStep == 0 -> translateX == 100%
                // formStep == 1 -> translateX == 0
                animate={{
                  translateX: `${100 - 1 * 100}%`
                }}
                style={
                  {
                    //  translateX: `${100 - formStep * 100}%`,
                  }
                }
                transition={{
                  ease: 'easeInOut'
                }}
              >
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
                          {' '}
                          <SelectItem value="nonSmoker">Non-Smoker</SelectItem>
                          <SelectItem value="occasionalSmoker">
                            Occasional Smoker
                          </SelectItem>
                          <SelectItem value="regularSmoker">
                            Regular Smoker
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        chose do you smoke ? smoking habits{' '}
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="do you drink ?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-700">
                          {' '}
                          <SelectItem value="nonDrinker">
                            Non-Drinker
                          </SelectItem>
                          <SelectItem value="socialDrinker">
                            Social Drinker
                          </SelectItem>
                          <SelectItem value="regularDrinker">
                            Regular Drinker
                          </SelectItem>
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select religion details" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-slate-700">
                          {' '}
                          <SelectItem value="none">No Religion</SelectItem>
                          <SelectItem value="islam">Islam</SelectItem>
                          <SelectItem value="practicing">
                            Practicing Muslim
                          </SelectItem>
                          <SelectItem value="other">Other (Specify)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        chose your religion details{' '}
                      </FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </motion.div>
              {/* SEND  STEP5*/}
              <motion.div
                className={cn('space-y-3  top-0 left-0 right-0', {
                  hidden:
                    formStep == 0 ||
                    formStep == 1 ||
                    formStep == 2 ||
                    formStep == 4 ||
                    formStep == 3
                })}
                // formStep == 0 -> translateX == 100%
                // formStep == 1 -> translateX == 0
                animate={{
                  translateX: `${100 - 1 * 100}%`
                }}
                style={
                  {
                    //  translateX: `${100 - formStep * 100}%`,
                  }
                }
                transition={{
                  ease: 'easeInOut'
                }}
              >
                <div className="flex gap-2"> envoyer le formulaire</div>
              </motion.div>

              <div className="flex gap-2">
                {/* SEND BUTTON  */}

                <Button
                  type="submit"
                  className={cn({
                    hidden:
                      formStep == 0 ||
                      formStep == 1 ||
                      formStep == 2 ||
                      formStep == 4 ||
                      formStep == 3
                  })}
                  onClick={() => {
                    console.log('formState', form.getFieldState('city'))
                    console.log('formState')
                    form.handleSubmit(onSubmit)()
                  }}
                  // disabled={formState.isSubmitting}
                >
                  send form
                </Button>
                {/* FINAL STEP 5  */}

                <Button
                  type="button"
                  variant={'ghost'}
                  className={cn({
                    hidden:
                      formStep == 0 ||
                      formStep == 1 ||
                      formStep == 3 ||
                      formStep == 5 ||
                      formStep == 2
                  })}
                  onClick={() => {
                    form.trigger([
                      'smokinghabits',
                      'drinkinghabits',
                      'religion'
                    ])

                    const smokingState = form.getFieldState('smokinghabits')
                    const drinkingState = form.getFieldState('drinkinghabits')
                    const religionState = form.getFieldState('religion')

                    console.log(
                      'smokingState',
                      !smokingState.isDirty,
                      smokingState.invalid
                    )
                    console.log(
                      'drinkingState',
                      !drinkingState.isDirty,
                      drinkingState.invalid
                    )
                    console.log(
                      'religionState',
                      !religionState.isDirty,
                      religionState.invalid
                    )

                    if (!smokingState.isDirty || smokingState.invalid) return
                    if (!drinkingState.isDirty || drinkingState.invalid) return
                    if (!religionState.isDirty || religionState.invalid) return

                    console.log('on submit validation passed')
                    // form.handleSubmit(onSubmit)();

                    setFormStep(5)
                  }}
                >
                  nextFINAL
                </Button>
                {/* FINAL STEP 4  */}

                <Button
                  type="button"
                  variant={'ghost'}
                  className={cn({
                    hidden:
                      formStep == 0 ||
                      formStep == 1 ||
                      formStep == 4 ||
                      formStep == 5 ||
                      formStep == 2
                  })}
                  onClick={() => {
                    form.trigger(['travelpreferences', 'pets', 'income'])
                    const travelState = form.getFieldState('travelpreferences')
                    const petsState = form.getFieldState('pets')
                    const incomeState = form.getFieldState('income')
                    console.log(
                      'travelState',
                      !travelState.isDirty,
                      travelState.invalid
                    )
                    console.log(
                      'petsState',
                      !petsState.isDirty,
                      petsState.invalid
                    )

                    if (!travelState.isDirty || travelState.invalid) return
                    if (!petsState.isDirty || petsState.invalid) return
                    if (!incomeState.isDirty || incomeState.invalid) return

                    console.log('on submit validation passed')
                    // form.handleSubmit(onSubmit)();

                    setFormStep(4)
                  }}
                >
                  next STEP 4
                </Button>

                {/* NEXT STEP 1  */}

                <Button
                  type="button"
                  variant={'ghost'}
                  className={cn({
                    hidden:
                      formStep == 1 ||
                      formStep == 5 ||
                      formStep == 3 ||
                      formStep == 4 ||
                      formStep == 2
                  })}
                  onClick={() => {
                    form.trigger(['height', 'kids', 'maritalstatus'])

                    const MStatusState = form.getFieldState('maritalstatus')
                    const heightState = form.getFieldState('height')

                    const kidsState = form.getFieldState('kids')
                    console.log(
                      'heightState',
                      heightState.isDirty,
                      heightState.invalid
                    )

                    if (!MStatusState.isDirty || MStatusState.invalid) return
                    if (!heightState.isDirty || heightState.invalid) return
                    if (!kidsState.isDirty || kidsState.invalid) return

                    setFormStep(1)
                  }}
                >
                  Next Step1
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                {/* NEXT STEP 2  */}

                <Button
                  type="button"
                  variant={'ghost'}
                  className={cn({
                    hidden:
                      formStep == 2 ||
                      formStep == 5 ||
                      formStep == 3 ||
                      formStep == 4 ||
                      formStep == 0
                  })}
                  onClick={() => {
                    form.trigger(['phonenumber', 'weight', 'education'])
                    const educationState = form.getFieldState('education')
                    const phoneState = form.getFieldState('phonenumber')
                    const weightState = form.getFieldState('weight')

                    if (!educationState.isDirty || educationState.invalid)
                      return
                    if (!weightState.isDirty || weightState.invalid) return

                    if (!phoneState.isDirty || phoneState.invalid) return

                    setFormStep(2)
                  }}
                >
                  Next Step2
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                {/* NEXT STEP 3 */}
                <Button
                  type="button"
                  variant={'ghost'}
                  className={cn({
                    hidden:
                      formStep == 0 ||
                      formStep == 3 ||
                      formStep == 1 ||
                      formStep == 4 ||
                      formStep == 5
                  })}
                  onClick={() => {
                    // validation

                    form.trigger(['country', 'city', 'occupation'])

                    const countryState = form.getFieldState('country')
                    const cityState = form.getFieldState('city')
                    const occupationState = form.getFieldState('occupation')

                    console.log(
                      'occupation',
                      !occupationState.isDirty,
                      occupationState.invalid
                    )

                    console.log(
                      'country',

                      countryState.invalid
                    )
                    console.log(
                      'city',

                      cityState.invalid
                    )

                    if (!occupationState.isDirty || occupationState.invalid)
                      return

                    if (countryState.invalid) return
                    if (cityState.invalid) return
                    console.log(
                      'occupation',
                      !occupationState.isDirty,
                      occupationState.invalid
                    )

                    setFormStep(3)
                  }}
                >
                  NextStep3
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                {/* GO BACK 1  */}
                <Button
                  type="button"
                  variant={'ghost'}
                  onClick={() => {
                    setFormStep(1)
                  }}
                  className={cn({
                    hidden:
                      formStep == 0 ||
                      formStep == 1 ||
                      formStep == 3 ||
                      formStep == 4 ||
                      formStep == 5
                  })}
                >
                  Go Back step 1
                </Button>
                {/* GO BACK 3"  */}
                <Button
                  type="button"
                  variant={'ghost'}
                  onClick={() => {
                    setFormStep(3)
                  }}
                  className={cn({
                    hidden:
                      formStep == 0 ||
                      formStep == 1 ||
                      formStep == 3 ||
                      formStep == 2 ||
                      formStep == 5
                  })}
                >
                  Go Back 3
                </Button>
                {/* GO BACK 2  */}

                <Button
                  type="button"
                  variant={'ghost'}
                  onClick={() => {
                    setFormStep(2)
                  }}
                  className={cn({
                    hidden:
                      formStep == 0 ||
                      formStep == 1 ||
                      formStep == 2 ||
                      formStep == 4 ||
                      formStep == 5
                  })}
                >
                  Go Back step 2
                </Button>
                {/* GO BACK 0  */}
                <Button
                  type="button"
                  variant={'ghost'}
                  onClick={() => {
                    setFormStep(0)
                  }}
                  className={cn({
                    hidden:
                      formStep == 0 ||
                      formStep == 2 ||
                      formStep == 3 ||
                      formStep == 4 ||
                      formStep == 5
                  })}
                >
                  Go Back
                </Button>
                {/* GO BACK 4  */}
                <Button
                  type="button"
                  variant={'ghost'}
                  onClick={() => {
                    setFormStep(4)
                  }}
                  className={cn({
                    hidden:
                      formStep == 0 ||
                      formStep == 2 ||
                      formStep == 3 ||
                      formStep == 4 ||
                      formStep == 1
                  })}
                >
                  Go Back 4
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
export default ProfilForm
