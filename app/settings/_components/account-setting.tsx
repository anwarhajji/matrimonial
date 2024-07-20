'use client'

import { useDropdownStore } from '@/store/dropdown'
import { PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from '@/components/ui/command'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { countries } from '@/app/settings/_components/data/countries'

import states from '@/data/states.json'

import { StateProps, type CountryProps } from '@/store/types'
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Input,
  Select,
  SelectItem,
  Spacer
} from '@nextui-org/react'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCurrentUser } from '@/hooks/user-current-user'
import { ProfileACCOUNTSchema } from '@/schemas'
import { ActionAccoutUser } from '@/actions/settingAccount'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField
} from '@/components/ui/form'
import { useQuery } from '@tanstack/react-query'
import { UserProfile } from '@prisma/client'
import { getUserProfileById } from '@/data/user'
import React from 'react'
import {
  incomeOptions,
  maritalStatusOptions,
  religionOptions,
  smokingHabitsOptions,
  drinkingHabitsOptions,
  occupationOptions,
  educationOptions,
  travelPreferencesOptions,
  AutocompleteOption,
  weightOptions,
  heightOptions
} from '@/data/dataAuto'
import { lowerCase, sentenceCase } from '@/store/utils'
import { Popover } from '@/components/ui/popover'
import { ChevronsUpDown } from 'lucide-react'
export const dynamic = 'force-dynamic'

interface AccountSettingCardProps {
  className?: string
}
export interface StatecityProps {
  code2: string
  name: string
  states: StateProps2[]
}

export interface StateProps2 {
  code: string
  name: string
}

/* const AccountSetting = React.forwardRef<
  HTMLDivElement,
  AccountSettingCardProps
>(({ className, ...props }, ref) */
const AccountSetting = () => {
  const dbUser = useCurrentUser()

  const [loading, setLoading] = React.useState(true)

  const [profil, setProfile] = React.useState<UserProfile | undefined>(
    undefined
  )

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
  const S = SD.filter((state) => state.country_code === countryValue)
  console.log('State array', S)
  console.log('countryValue', countryValue)

  const [isPending, startTransition] = React.useTransition()
  const [error, setError] = React.useState<string | undefined>('')
  const [success, setSuccess] = React.useState<string | undefined>('')
  //const [selectedValue, setSelectedValue] = React.useState('MA')
  const [cityValue, setCityValue] = React.useState<string | null | undefined>(
    ''
  )
  const [religion, setReligion] = React.useState<string | null | undefined>('')
  const [education, setEducation] = React.useState<string | null | undefined>(
    ''
  )
  const [occupation, setOccupation] = React.useState<string | null | undefined>(
    ''
  )
  const [occupation2, setOccupation2] = React.useState<
    string | null | undefined
  >('')
  const [income, setIncome] = React.useState<string | null | undefined>('')
  const [smokingHabits, setSmokingHabits] = React.useState<
    string | null | undefined
  >('')
  const [drinkingHabits, setDrinkingHabits] = React.useState<
    string | null | undefined
  >('')
  const [travelPreferences, setTravelPreferences] = React.useState<
    string | null | undefined
  >('')
  const [maritalStatus, setMaritalStatus] = React.useState<
    string | null | undefined
  >('')
  const [weight, setWeight] = React.useState<string | null | undefined>('')

  const [height, setHeigh] = React.useState<string | null | undefined>('')

  const form = useForm<z.infer<typeof ProfileACCOUNTSchema>>({
    resolver: zodResolver(ProfileACCOUNTSchema),
    defaultValues: {
      country: profil?.country!,
      height: profil?.height!,
      weight: profil?.weight!,
      city: profil?.city!,
      religion: profil?.religion!,
      occupation: profil?.occupation!
    }
  })

  console.log('country value:', countryValue)

  const {
    data: profileData,
    error: profileError,
    isLoading: isProfileLoading
  } = useQuery({
    queryKey: ['profile', dbUser?.id],
    queryFn: () => getUserProfileById(dbUser?.id!)
  })

  React.useEffect(() => {
    if (profileData) {
      setProfile(profileData)
      setCountryValue(profileData.country!)
      setCityValue(profileData.city!)
      setStateValue(profileData.city!)
      setOccupation2(profileData.occupation!)
      setOccupation(profileData.occupation!)
      setReligion(profileData.religion!)
      setEducation(profileData.education!)
      setIncome(profileData.income!)
      setSmokingHabits(profileData.smokinghabits!)
      setDrinkingHabits(profileData.drinkinghabits!)
      setTravelPreferences(profileData.travelpreferences!)
      setMaritalStatus(profileData.maritalstatus!)
      setWeight(profileData.weight!)
      setHeigh(profileData.height!)
    }
    if (!isProfileLoading) {
      setLoading(false)
    }
  }, [profileData, isProfileLoading])

  if (loading) {
    return <div>Loading...</div>
  }

  if (profileError) {
    return <div>Error loading data</div>
  }

  const onSubmit = (values: z.infer<typeof ProfileACCOUNTSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      console.log('dataaaa', values)
      ActionAccoutUser(values).then((data) => {
        setError(data.error)
        //setSuccess(data.success)
        //setSuccess(data.success)
        //form.reset()
      })
      toast.success('PERSONAL INFOS UPDATED SUCCESSFULLY', {
        description: 'Personal infos updated successfully'
      })

      //Console.log('valueeeeeeeeeee', values)
      alert(JSON.stringify(values))
    })
  }

  interface City {
    id: number
    name: string
    country_id: number
    country_code: string
    country_name: string
    state_code: string
    type: string | null
    latitude: string
    longitude: string
  }

  const handleReligionChange = (value: any) => {
    if (value) {
      setReligion(value)
      form.setValue('religion', value)
    }
  }

  const handleMaritalStatusChange = (value: any) => {
    if (value) {
      setMaritalStatus(value)
      form.setValue('maritalstatus', value)
    }
  }

  const handleEducationChange = (value: any) => {
    if (value) {
      setEducation(value)
      form.setValue('education', value)
    }
  }

  const handleOccupationChange = (value: any) => {
    if (value) {
      setOccupation(value)
      form.setValue('occupation', value)
    }
  }

  const handleIncomeChange = (value: any) => {
    if (value) {
      setIncome(value)
      form.setValue('income', value)
    }
  }

  const handleSmokingHabitsChange = (value: any) => {
    if (value) {
      setSmokingHabits(value)
      form.setValue('smokinghabits', value)
    }
  }

  const handleDrinkingHabitsChange = (value: any) => {
    if (value) {
      setDrinkingHabits(value)
      form.setValue('drinkinghabits', value)
    }
  }

  const handleTravelPreferencesChange = (value: any) => {
    if (value) {
      setTravelPreferences(value)
      form.setValue('travelpreferences', value)
    }
  }
  const hadleWeightChange = (value: any) => {
    if (value) {
      setWeight(value)
      form.setValue('weight', value)
    }
  }

  const hadleHeightChange = (value: any) => {
    if (value) {
      setHeigh(value)
      form.setValue('height', value)
    }
  }
  return (
    <div className=" gap-3 p-2 overflow-y-auto max-w-xl pb-20  ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Spacer y={2} />
          <div>
            <Spacer y={2} />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
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
                          // className="w-full justify-between rounded-[6px] border !border-[#27272a] !bg-[#0f0f11] hover:!bg-[#0f0f11] focus:!bg-[#0f0f11] focus:!outline-none focus:!ring-2 focus:!ring-[#0f0f11] focus:!ring-offset-2 focus:!ring-offset-[#0f0f11]"
                          className="w-full justify-between rounded-[6px] border"
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
              render={({ field }) => {
                const { error } = useFormField()
                return (
                  <Input
                    {...field}
                    label="City"
                    labelPlacement="outside"
                    defaultValue={cityValue!}
                    placeholder="Enter your city"
                    type="text"
                    autoComplete="address-level2"
                    name="city"
                    /*  classNames={{
                      input: [
                        'bg-[#0f0f11]',
                        'text-white',
                        'placeholder:text-gray-400'
                      ],
                      innerWrapper: 'bg-[#0f0f11]',
                      inputWrapper: [
                        'shadow-xl',
                        'bg-[#0f0f11]',
                        'hover:bg-[#0f0f11]',
                        'group-data-[focused=true]:bg-[#0f0f11]',
                        '!cursor-text',
                        'border-[#27272a]'
                      ]
                    }} */
                    // You can add error handling here
                    isInvalid={!!error}
                    errorMessage={error?.message}
                  />
                )
              }}
            />

            {/* City */}
            {/* 
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => {
                // const { error } = useFormField()
                return (
                  <Autocomplete
                    defaultItems={countries}
                    //defaultItems={SelectedCi}
                    defaultSelectedKey={selectedCityValue!}
                    label="city"
                    labelPlacement="outside"
                    placeholder="Select city"
                    showScrollIndicators={false}
                    selectedKey={selectedCityValue!}
                    // inputValue={selectedCityValue!}
                    //onInput
                    onSelectionChange={handleCityChange}
                    //onInputCapture={handleSelectionChange}
                    {...field}
                  >
                    {(item) => (
                      <AutocompleteItem key={item.name} value={item.id}>
                        {item.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )
              }}
            /> */}
          </div>
          {/*weight*/}
          <Spacer y={2} />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => {
              const { error } = useFormField()
              return (
                <Autocomplete
                  defaultItems={weightOptions}
                  defaultSelectedKey={weight!}
                  label="Weight"
                  labelPlacement="outside"
                  placeholder="Select weight"
                  showScrollIndicators={false}
                  selectedKey={weight!}
                  //inputValue={inputValue}

                  onSelectionChange={hadleWeightChange}
                  {...field}
                >
                  {(item) => (
                    <AutocompleteItem key={item.value} value={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )
            }}
          />
          <Spacer y={2} />
          {/* Height */}
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => {
              const { error } = useFormField()
              return (
                <Autocomplete
                  defaultItems={heightOptions}
                  defaultSelectedKey={height!}
                  label="Height"
                  labelPlacement="outside"
                  placeholder="Select height"
                  showScrollIndicators={false}
                  selectedKey={height!}
                  //inputValue={inputValue}

                  onSelectionChange={hadleHeightChange}
                  {...field}
                >
                  {(item) => (
                    <AutocompleteItem key={item.value} value={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )
            }}
          />
          <Spacer y={2} />
          {/* Religion */}
          <FormField
            control={form.control}
            name="religion"
            render={({ field }) => {
              return (
                <Autocomplete
                  defaultItems={religionOptions}
                  defaultSelectedKey={religion!}
                  label="Religion"
                  labelPlacement="outside"
                  placeholder="Select religion"
                  showScrollIndicators={false}
                  selectedKey={religion!}
                  onSelectionChange={handleReligionChange}
                  {...field}
                >
                  {(item) => (
                    <AutocompleteItem key={item.value} value={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )
            }}
          />
          <Spacer y={2} />
          {/* Education */}
          <FormField
            control={form.control}
            name="education"
            render={({ field }) => {
              return (
                <Autocomplete
                  defaultItems={educationOptions}
                  defaultSelectedKey={education!}
                  label="Education"
                  labelPlacement="outside"
                  placeholder="Select education level"
                  showScrollIndicators={false}
                  selectedKey={education!}
                  onSelectionChange={handleEducationChange}
                  {...field}
                >
                  {(item) => (
                    <AutocompleteItem key={item.value} value={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )
            }}
          />
          <Spacer y={2} />
          {/* Occupation */}
          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => {
              return (
                <Autocomplete
                  defaultItems={occupationOptions}
                  //defaultSelectedKey={occupation2!}
                  defaultSelectedKey={occupation!}
                  label="Occupation"
                  labelPlacement="outside"
                  placeholder="Select occupation"
                  showScrollIndicators={false}
                  selectedKey={occupation!}
                  onSelectionChange={handleOccupationChange}
                  {...field}
                >
                  {(item) => (
                    <AutocompleteItem key={item.value} value={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )
            }}
          />
          <Spacer y={2} />
          {/* Income */}
          <FormField
            control={form.control}
            name="income"
            render={({ field }) => {
              return (
                <Autocomplete
                  defaultItems={incomeOptions}
                  defaultSelectedKey={profileData?.income!}
                  label="Income"
                  labelPlacement="outside"
                  placeholder="Select income range"
                  showScrollIndicators={false}
                  selectedKey={income!}
                  onSelectionChange={handleIncomeChange}
                  {...field}
                >
                  {(item) => (
                    <AutocompleteItem key={item.value} value={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )
            }}
          />{' '}
          <Spacer y={2} />
          {/* Smoking Habits */}
          <FormField
            control={form.control}
            name="smokinghabits"
            render={({ field }) => {
              return (
                <Autocomplete
                  defaultItems={smokingHabitsOptions}
                  defaultSelectedKey={smokingHabits!}
                  label="Smoking Habits"
                  labelPlacement="outside"
                  placeholder="Select smoking habit"
                  showScrollIndicators={false}
                  selectedKey={smokingHabits!}
                  onSelectionChange={handleSmokingHabitsChange}
                  {...field}
                >
                  {(item) => (
                    <AutocompleteItem key={item.value} value={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )
            }}
          />
          <Spacer y={2} />
          {/* Drinking Habits */}
          <FormField
            control={form.control}
            name="drinkinghabits"
            render={({ field }) => {
              return (
                <Autocomplete
                  defaultItems={drinkingHabitsOptions}
                  defaultSelectedKey={drinkingHabits!}
                  label="Drinking Habits"
                  labelPlacement="outside"
                  placeholder="Select drinking habit"
                  showScrollIndicators={false}
                  selectedKey={drinkingHabits!}
                  onSelectionChange={handleDrinkingHabitsChange}
                  {...field}
                >
                  {(item) => (
                    <AutocompleteItem key={item.value} value={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )
            }}
          />{' '}
          <Spacer y={2} />
          {/* Travel Preferences */}
          <FormField
            control={form.control}
            name="travelpreferences"
            render={({ field }) => {
              return (
                <Autocomplete
                  defaultItems={travelPreferencesOptions}
                  defaultSelectedKey={travelPreferences!}
                  label="Travel Preferences"
                  labelPlacement="outside"
                  placeholder="Select travel preference"
                  showScrollIndicators={false}
                  selectedKey={travelPreferences!}
                  onSelectionChange={handleTravelPreferencesChange}
                  {...field}
                >
                  {(item) => (
                    <AutocompleteItem key={item.value} value={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )
            }}
          />{' '}
          <Spacer y={2} />
          {/* Marital Status */}
          <FormField
            control={form.control}
            name="maritalstatus"
            render={({ field }) => {
              return (
                <Autocomplete
                  defaultItems={maritalStatusOptions}
                  defaultSelectedKey={maritalStatus!}
                  label="Marital Status"
                  labelPlacement="outside"
                  placeholder="Select marital status"
                  showScrollIndicators={false}
                  selectedKey={maritalStatus!}
                  onSelectionChange={handleMaritalStatusChange}
                  {...field}
                >
                  {(item) => (
                    <AutocompleteItem key={item.value} value={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )
            }}
          />{' '}
          <Spacer y={2} />
          <Button color="primary" type="submit" isDisabled={isPending}>
            Update Account
          </Button>
        </form>
      </Form>
    </div>
  )
}
export default AccountSetting
