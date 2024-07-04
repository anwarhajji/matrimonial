'use client'
import countriesStates from '@/data/countriesStates.json'
import Sstates from '@/data/states.json'
import states from '@/data/states.json'

import { StateProps, type CountryProps } from '@/store/types'
import { useDropdownStore } from '@/store/dropdown'
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
import { debounce } from 'lodash' // Import debounce from lodash

import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCurrentUser } from '@/hooks/user-current-user'
import { ProfileACCOUNTSchema } from '@/schemas'
import { ActionAccoutUser } from '@/actions/settingAccount'
import { Form, FormField, useFormField } from '@/components/ui/form'
import { useQuery } from '@tanstack/react-query'
import { UserProfile } from '@prisma/client'
import { getUserProfileById } from '@/data/user'
import { countries } from '../_components/data/countries'
import { useEffect } from 'react'
import { useDebounce } from '@/hooks/use-debounce'
import React from 'react'
import { useCallback } from 'react'
import {
  incomeOptions,
  maritalStatusOptions,
  religionOptions,
  smokingHabitsOptions,
  drinkingHabitsOptions,
  occupationOptions,
  educationOptions,
  travelPreferencesOptions,
  AutocompleteOption
} from '@/data/dataAuto'
import { lowerCase, sentenceCase } from '@/store/utils'

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
  const [selectedCityValue, setSelectedCityValue] = React.useState<
    string | null | undefined
  >('')

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
  /* const SD = countriesStates as StatecityProps[]
  const S = SD.filter((state) => countriesStates.code2 === selectedValue) */

  const form = useForm<z.infer<typeof ProfileACCOUNTSchema>>({
    resolver: zodResolver(ProfileACCOUNTSchema),
    defaultValues: {
      country: profil?.country!,
      height: profil?.height!,
      city: profil?.city!,
      religion: profil?.religion!,
      occupation: profil?.occupation!
    }
  })

  /* const handleSelectionChange = useCallback(
    debounce((item) => {
      let selectedCity = ''

      if (item) selectedCity = item.toString()!
      console.log('Selected City:', selectedCity)
      console.log('Previous City Value:', selectedCityValue)

      if (selectedCity !== selectedCityValue) {
        console.log('Updating state to:', selectedCity)
        setSelectedCityValue(selectedCity)
        form.setValue('city', selectedCity, { shouldValidate: true })
      }
    }, 300), // Adjust debounce delay as necessary
    [selectedCityValue, form]
  ) */
  console.log('Rendering component with selectedCityValue:', selectedCityValue)
  console.log('country value:', countryValue)
  /*   const handleSelectionChange = useCallback(
    (value: any) => {
      console.log('onSelectionChange called')
      const selectednewcity = value?.toString()
      if (selectednewcity) {
        console.log('Updating selectedCityValue')
        setSelectedCityValue(selectednewcity!)
        console.log('Updating form value')
        form.setValue('city', selectednewcity)
      }
    },
    [setSelectedCityValue, form]
  ) */
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
  //=====================================================
  /*   const ci = Sstates as City[] // assume this is your JSON data

  const getCitiesForCountry = (countryCode: string): City[] => {
    return ci.filter((city) => city.country_code === countryCode)
  } */

  // const SelectedCi = getCitiesForCountry(selectedValue)
  //=====================================================

  // cities array
  /* let cities = [] as StateProps2[]

  const countri = countriesStates.find(
    (countri) => countri.code2 === selectedValue
  )
  if (countri) {
    cities = countri.states.map((state) => ({
      code: state.code,
      name: state.name
    }))
    console.log('Cities', cities)
  } else {
    console.log('Country not found')
  } */
  //=====================================================

  const handleReligionChange = (value: AutocompleteOption['value']) => {
    if (value) {
      setReligion(value)
      form.setValue('religion', value)
    }
  }
  const handleCityChange = (value: StateProps['name']) => {
    if (value) {
      setStateValue(value)
      console.log('Selected City value:', value)
      //setSelectedCityValue(value)
      form.setValue('city', value)
    }
  }
  const handleMaritalStatusChange = (value: AutocompleteOption['value']) => {
    if (value) {
      setMaritalStatus(value)
      form.setValue('maritalstatus', value)
    }
  }

  const handleEducationChange = (value: AutocompleteOption['value']) => {
    if (value) {
      setEducation(value)
      form.setValue('education', value)
    }
  }

  const handleOccupationChange = (value: AutocompleteOption['value']) => {
    if (value) {
      setOccupation(value)
      form.setValue('occupation', value)
    }
  }

  const handleIncomeChange = (value: AutocompleteOption['value']) => {
    if (value) {
      setIncome(value)
      form.setValue('income', value)
    }
  }

  const handleSmokingHabitsChange = (value: AutocompleteOption['value']) => {
    if (value) {
      setSmokingHabits(value)
      form.setValue('smokinghabits', value)
    }
  }

  const handleDrinkingHabitsChange = (value: AutocompleteOption['value']) => {
    if (value) {
      setDrinkingHabits(value)
      form.setValue('drinkinghabits', value)
    }
  }

  const handleTravelPreferencesChange = (
    value: AutocompleteOption['value']
  ) => {
    if (value) {
      setTravelPreferences(value)
      form.setValue('travelpreferences', value)
    }
  }

  return (
    <div
      /* ref={ref} */ className=" gap-3 bg-black p-2 overflow-y-auto max-w-xl pb-20  "
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <p className="text-default-500 text-small">
            <Avatar
              alt="Country Flag"
              className="h-6 w-6"
              src={`https://flagcdn.com/${profileData?.country!.toLowerCase()}.svg`}
            />
          </p>
          <Spacer y={2} />
          {/* Timezone */}
          {/* <section>
            <div>
              <p className="text-base font-medium text-default-700">Timezone</p>
              <p className="mt-1 text-sm font-normal text-default-400">
                Set your current timezone.
              </p>
            </div>
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => {
                const { error } = useFormField()
                return (
                  <Select
                    className="mt-2"
                    defaultSelectedKeys={['utc-3']}
                    {...field}
                  >
                    {timeZoneOptions.map((timeZoneOption) => (
                      <SelectItem
                        key={timeZoneOption.value}
                        value={timeZoneOption.value}
                      >
                        {timeZoneOption.label}
                      </SelectItem>
                    ))}
                  </Select>
                )
              }}
            />
          </section> */}
          <Spacer y={2} />
          <div className="flex gap-2">
            {/* Country */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => {
                const { error } = useFormField()
                return (
                  <Autocomplete
                    defaultItems={C}
                    defaultSelectedKey={countryValue}
                    label="country"
                    labelPlacement="outside"
                    placeholder="Select country"
                    showScrollIndicators={false}
                    selectedKey={countryValue}
                    //inputValue={inputValue}

                    onSelectionChange={(value1) => {
                      const selectedCountry = value1?.toString()

                      if (selectedCountry) {
                        setCountryValue(selectedCountry)
                        //setSelectedValue(selectedCountry)
                        console.log('selected country', selectedCountry)
                        form.setValue('country', selectedCountry, {
                          shouldValidate: true
                        })
                      }
                    }}
                    {...field}
                  >
                    {(country) => (
                      <AutocompleteItem
                        key={country.iso2}
                        startContent={
                          <Avatar
                            alt="Country Flag"
                            className="h-6 w-6"
                            src={`https://flagcdn.com/${country.iso2.toLowerCase()}.svg`}
                          />
                        }
                        //textValue={profil?.country!}
                        value={country.iso2}
                      >
                        {country.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )
              }}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => {
                const { error } = useFormField()
                return (
                  <Autocomplete
                    defaultItems={S}
                    defaultSelectedKey={stateValue!}
                    label="CITY"
                    labelPlacement="outside"
                    placeholder="Select CITY"
                    showScrollIndicators={false}
                    selectedKey={stateValue!}
                    //inputValue={inputValue}

                    onSelectionChange={handleCityChange}
                    {...field}
                  >
                    {(city) => (
                      <AutocompleteItem key={city.id} value={city.name}>
                        {city.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
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
          <Button
            className="mt-4 bg-default-foreground text-background"
            size="sm"
            type="submit"
          >
            Update Account
          </Button>
        </form>
      </Form>
    </div>
  )
}
export default AccountSetting
