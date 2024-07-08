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
  FormMessage,
  useFormField
} from '@/components/ui/form'
import { toast } from 'sonner'

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

//import { useToast } from '@/components/ui/use-toast'
import { Step1Schema } from '@/schemas'
//import {actionprofil} from "@/actions/action-profil-form";

//POPOVER 1

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'

import { type CountryProps } from '@/store/types'
import { useDropdownStore } from '@/store/dropdown' //useDropdownStore from "@/store/dropdown";
import { actionStep1 } from '@/actions/action-step1'
import useStepStore from '@/store/useStepStore'
import { heightOptions, weightOptions } from '@/data/dataAuto'
import { Autocomplete, AutocompleteItem, Avatar } from '@nextui-org/react'
import countries, { countryProp } from '../countries'
import { SelectValueContext } from 'react-aria-components'
//useStepStore from '@/store/useStepStore'

interface CountryDropdownProps {
  disabled?: boolean
}

//POPOVER FIN

const inter = Inter({ subsets: ['latin'] })
type Input = z.infer<typeof Step1Schema>
interface Popup1Props {
  onOpenChange: (open: boolean) => void
}

const Step1: React.FC<Popup1Props> = ({ onOpenChange }) => {
  const { setStep } = useStepStore()
  // const router = useRouter()

  /*  const { stateValue, openStateDropdown, setOpenStateDropdown, setStateValue } =
    useDropdownStore()
 */
  //const SD = states as StateProps[]
  const [countryValue, setCountryValue] = React.useState('')

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

    setTimeout(() => onOpenChange(false), 2000)
    return { success: 'success form' }

    // redirect('/')
  }

  return (
    <Form {...form}>
      <form
        autoComplete="on"
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative space-y-4 overflow-x-hidden"
      >
        {/* country*/}

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <Autocomplete
              defaultItems={countries}
              label="Country"
              labelPlacement="outside"
              placeholder="Select country"
              showScrollIndicators={false}
              selectedKey={countryValue}
              onSelectionChange={(value) => {
                const selectedCountry = value?.toString()

                if (selectedCountry) {
                  setCountryValue(selectedCountry)
                  //setSelectedValue(selectedCountry)
                  console.log('selected country', selectedCountry)
                  form.setValue('country', selectedCountry, {
                    shouldValidate: true
                  })
                }
                //field.onChange(value)
                console.log('selected country', selectedCountry)
              }}
              {...field}
            >
              {(country) => (
                <AutocompleteItem
                  key={country.code}
                  startContent={
                    <Avatar
                      alt="Country Flag"
                      className="h-6 w-6"
                      src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                    />
                  }
                  value={country.name}
                >
                  {country.name}
                </AutocompleteItem>
              )}
            </Autocomplete>
          )}
        />
        <p className="text-default-500 text-small">Selected: {countryValue}</p>

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input
                  autoComplete="address-level1"
                  type="text"
                  placeholder="City"
                  {...field}
                  // disabled={!countryValue}
                  className="w-full rounded-[6px] border !border-[#27272a] !bg-[#0f0f11] text-white placeholder-gray-400 focus:!outline-none focus:!ring-2 focus:!ring-[#0f0f11] focus:!ring-offset-2 focus:!ring-offset-[#0f0f11] disabled:!cursor-not-allowed disabled:!opacity-50"
                />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <FormLabel>your Weight</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                chose your weight to help the algorithm find your perfect match{' '}
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
export default Step1
