'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { GoogleSchema1 } from '@/schemas'
import { useSession } from 'next-auth/react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { registeractionpop1 } from '@/actions/ActionRegisterpop1'
import { SuccessAlert } from './SuccessAlert'

interface Popup1Props {
  onOpenChange: (open: boolean) => void
}

const Popup1: React.FC<Popup1Props> = ({ onOpenChange }) => {
  const [successSnippet2, setSuccessSnippet2] = useState(null)
  const [successSnippet, setSuccessSnippet] = useState<{
    title: string
    description: string
    fields: Array<{ label: string; value: string | number | boolean }>
  } | null>(null)

  const { update } = useSession()
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof GoogleSchema1>>({
    resolver: zodResolver(GoogleSchema1),
    defaultValues: {
      fullname: '',
      age: 0,
      username: '',
      gender: undefined
    }
  })

  const onSubmit = async (values: z.infer<typeof GoogleSchema1>) => {
    try {
      const result = await registeractionpop1(values)
      console.log('result', result.snippet)

      if (result.success) {
        update()
        form.reset()
        //setSuccessSnippet2(result.snippet)
        setSuccessSnippet(result.snippet)
        console.log('result', result.snippet)

        // You might want to keep the modal open to show the success message
        // or close it after a delay
        setTimeout(() => onOpenChange(false), 3000)
        // onOpenChange(false) // Close the modal only on success
      } else {
        // Handle error without closing the modal
        setError(result.error || 'An error occurred')
        // If the error is specifically about the username, you can set an error on the username field
        if (result.error?.toLowerCase().includes('username')) {
          form.setError('username', { type: 'manual', message: result.error })
        }
      }
    } catch (error) {
      setError('An unexpected error occurred')
    }
  }

  return (
    <Form {...form}>
      {successSnippet && (
        <SuccessAlert
          title={successSnippet.title}
          description={successSnippet.description}
          fields={successSnippet.fields}
        />
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MEN">Men</SelectItem>
                  <SelectItem value="WOMEN">Women</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default Popup1
