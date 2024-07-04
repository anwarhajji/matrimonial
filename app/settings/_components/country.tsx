'use client'

import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Avatar,
  Input,
  Autocomplete,
  AutocompleteItem,
  CardFooter,
  Tabs,
  Tab,
  Spacer
} from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { countries } from '../_components/data/countries'

export default function Country() {
  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader className="relative flex h-[100px] flex-col justify-end overflow-visible bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400">
        <Avatar
          className="h-20 w-20 translate-y-12 "
          src="https://i.pravatar.cc/150?u=a04258114e29026708c"
        />
      </CardHeader>
      <CardBody className="p-4">
        <div className="pb-4 pt-6">
          <p className="text-large font-medium">Radify Icons Set</p>
          <p className="max-w-[90%] text-small text-default-400">
            500+ icons in 6 styles, SVG and Figma files, and more.
          </p>
        </div>
        <Tabs>
          <Tab key="one-time-payment" title="One-time payment" />
          <Tab key="subscription" title="Subscription" />
        </Tabs>
        <Spacer y={2} />
        <form className="px-2 py-4" onSubmit={(e) => e.preventDefault()}>
          <fieldset className="mt-4">
            <legend className="pb-1.5 text-small font-medium">
              Billing address
            </legend>
            <Autocomplete
              defaultItems={countries}
              label="Country"
              labelPlacement="outside"
              placeholder="Select country"
              showScrollIndicators={false}
            >
              {(item) => (
                <AutocompleteItem
                  key={item.iso2}
                  startContent={
                    <Avatar
                      alt="Country Flag"
                      className="h-6 w-6"
                      src={`https://flagcdn.com/${item.iso2.toLowerCase()}.svg`}
                    />
                  }
                  value={item.iso2}
                >
                  {item.name}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <Spacer y={2} />
            <div className="flex gap-2">
              <Input labelPlacement="outside" placeholder="ZIP Code" />
              <Input labelPlacement="outside" placeholder="State" />
            </div>
          </fieldset>
          <Spacer y={4} />
          <Button fullWidth color="secondary" size="lg" type="submit">
            Pay $49.00
          </Button>
        </form>
      </CardBody>
      <CardFooter className="items-center justify-center gap-1 pb-5">
        <Icon
          className="text-default-300"
          icon="solar:shield-check-bold"
          width={20}
        />
        <p className="text-small text-default-300">
          Payments are secure and encrypted.
        </p>
      </CardFooter>
    </Card>
  )
}
