import type { ButtonProps } from '@nextui-org/react'

export enum FrequencyEnumf {
  Yearly = 'yearly',
  Quarterly = 'quarterly'
}
export enum FrequencyEnum {
  Yearly = 'yearly',
  Monthly = 'monthly'
}
export enum TiersEnum {
  Free = 'free',
  Pro = 'pro',
  Team = 'team'
}

export type Frequency = {
  key: FrequencyEnum
  label: string
  priceSuffix: string
}

export type Tier = {
  key: TiersEnum
  title: string
  price:
    | {
        [FrequencyEnum.Yearly]: string
        [FrequencyEnum.Monthly]: string
      }
    | string
  priceSuffix?: string
  href: string
  description?: string
  mostPopular?: boolean
  featured?: boolean
  features?: string[]
  buttonText: string
  buttonColor?: ButtonProps['color']
  buttonVariant: ButtonProps['variant']
}