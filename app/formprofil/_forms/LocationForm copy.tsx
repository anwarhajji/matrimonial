import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Input,
  Spacer
} from '@nextui-org/react'
import { Form, FormField, useFormField } from '@/components/ui/form'
import { useDropdownStore } from '@/store/dropdown'
import countries from '../countries'
import { actionStep1 } from '@/actions/action-step1'
import { toast } from 'sonner'

const LocationSchema = z.object({
  country: z.string(),
  city: z.string()
})

type Input = z.infer<typeof LocationSchema>

interface Popup1Props {
  onOpenChange: (open: boolean) => void
}

const LocationForm: React.FC<Popup1Props> = ({ onOpenChange }) => {
  const { countryValue, setCountryValue } = useDropdownStore()
  const [cityValue, setCityValue] = React.useState('')

  const form = useForm({
    resolver: zodResolver(LocationSchema),
    defaultValues: {
      country: countryValue,
      city: cityValue
    }
  })

  const onSubmit = (values: Input) => {
    console.log(values)
    actionStep1(values)
    //setStep(2)
    //router.push('/step2')

    //alert(JSON.stringify(data, null, 4))
    toast.success('PERSONAL INFOS UPDATED SUCCESSFULLY', {
      description: ' CONTINUE WITH STEP 2'
    })

    setTimeout(() => onOpenChange(false), 2000)
    return { success: 'success form' }
    // Handle form submission
  }
  /* function onSubmit(data: Input) {
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
 */

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="country"
          control={form.control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              defaultItems={countries}
              label="Country"
              labelPlacement="outside"
              placeholder="Select country"
              onSelectionChange={(value) => {
                setCountryValue(value)
                field.onChange(value)
              }}
            >
              {(country) => (
                <AutocompleteItem key={country.code} textValue={country.name}>
                  <div className="flex items-center gap-2">
                    <Avatar
                      alt="Country Flag"
                      className="h-6 w-6"
                      src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                    />
                    <span className="z-10">{country.name}</span>
                  </div>
                </AutocompleteItem>
              )}
            </Autocomplete>
          )}
        />

        <Spacer y={2} />

        <Controller
          name="city"
          control={form.control}
          render={({ field }) => (
            <Input
              {...field}
              label="City"
              labelPlacement="outside"
              placeholder="Enter your city"
              type="text"
              autoComplete="address-level2"
            />
          )}
        />

        <Spacer y={2} />

        <Button type="submit">Update Location</Button>
      </form>
    </Form>
  )
}

export default LocationForm
