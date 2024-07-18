import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Avatar, Button, Input, Spacer } from '@nextui-org/react'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription
} from '@/components/ui/form'
import { useDropdownStore } from '@/store/dropdown'
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from '@/components/ui/command'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CountryProps } from '@/store/types'
import { countries } from '@/app/settings/_components/data/countries'
import { lowerCase } from '@/store/utils'
import { actionStep1 } from '@/actions/action-step1'
import { toast } from 'sonner'
import { Step1Schema } from '@/schemas'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  heightOptions,
  occupationOptions,
  weightOptions
} from '@/data/dataAuto'
import SubmitButton from './SubmitButton'
import { PhoneInput } from '@/components/phone-input'
import useStepStore from '@/store/useStepStore'

type Input = z.infer<typeof Step1Schema>

interface Popup1Props {
  onOpenChange: (open: boolean) => void
}

const LocationForm: React.FC<Popup1Props> = ({ onOpenChange }) => {
  const { setStep } = useStepStore()
  const {
    countryValue,
    setCountryValue,
    openCountryDropdown,
    setOpenCountryDropdown
  } = useDropdownStore()
  const [cityValue, setCityValue] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm({
    resolver: zodResolver(Step1Schema),
    defaultValues: {
      country: countryValue,
      city: cityValue,
      phonenumber: '',
      occupation: ''
    }
  })

  const C = countries as CountryProps[]
  function onSubmit(data: Input) {
    setIsLoading(true)

    //console.log('submititttttttttttt in on sumit:    ', data)
    actionStep1(data).then(() => {
      setIsLoading(false)
    })
    setStep(3)
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>your occupation or work </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white dark:bg-slate-800">
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white dark:bg-slate-700">
                  {occupationOptions.map((range) => (
                    <SelectItem
                      className="hover:bg-slate-300 dark:hover:bg-slate-600"
                      key={range.value}
                      value={range.value}
                    >
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
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Country</FormLabel>
              <FormControl>
                <Popover
                  open={openCountryDropdown}
                  onOpenChange={setOpenCountryDropdown}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="solid"
                      role="combobox"
                      aria-expanded={openCountryDropdown}
                      //className="w-full justify-between rounded-[6px] border !border-[#27272a] !bg-[#0f0f11] hover:!bg-[#0f0f11] focus:!bg-[#0f0f11] focus:!outline-none focus:!ring-2 focus:!ring-[#0f0f11] focus:!ring-offset-2 focus:!ring-offset-[#0f0f11]"
                      className="w-full justify-between rounded-[6px] bg-white dark:bg-slate-800"
                    >
                      <span>
                        {countryValue ? (
                          <div className="flex items-end gap-2">
                            <Avatar
                              alt="Country Flag"
                              className="h-6 w-6"
                              src={`https://flagcdn.com/${C.find(
                                (country) =>
                                  lowerCase(country.name) === countryValue
                              )?.iso2.toLowerCase()}.svg`}
                            />
                            <span>
                              {
                                C.find(
                                  (country) =>
                                    lowerCase(country.name) === countryValue
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
                  <PopoverContent className="bg-slate-700 w-[300px] rounded-[6px]  p-0">
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
                                    currentValue === lowerCase(country.name)
                                      ? currentValue
                                      : ''
                                  )
                                  field.onChange(lowerCase(currentValue))
                                  form.setValue('country', currentValue, {
                                    shouldValidate: true
                                  })
                                  setOpenCountryDropdown(false)
                                }}
                                className="flex cursor-pointer items-center justify-between text-xs hover:!bg-[#27272a] hover:!text-white"
                              >
                                <div className="flex items-end gap-2">
                                  <Avatar
                                    alt="Country Flag"
                                    className="h-6 w-6"
                                    src={`https://flagcdn.com/${country.iso2.toLowerCase()}.svg`}
                                  />
                                  <span className="">{country.name}</span>
                                </div>
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    countryValue === lowerCase(country.name)
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

        <Spacer y={2} />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Your City</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your city"
                  type="text"
                  autoComplete="address-level2"
                  className="rounded-[6px] bg-white dark:bg-slate-800"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* phonenumber */}
        <FormField
          control={form.control}
          name="phonenumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <PhoneInput
                  className="rounded-[6px] bg-white dark:bg-slate-800"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                your phone number is confidential the others will not be able to
                see it
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {/* occupation*/}

        <Spacer y={2} />

        <SubmitButton isLoading={isLoading}>Send</SubmitButton>
      </form>
    </Form>
  )
}

export default LocationForm
