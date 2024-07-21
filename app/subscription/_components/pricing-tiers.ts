// In pricing-types.ts
export enum FrequencyEnum {
  Yearly = 'yearly',
  Monthly = 'monthly'
}

// In pricing-tiers.ts
export const frequencies = [
  { key: FrequencyEnum.Yearly, name: 'Yearly', priceSuffix: 'yr' },
  { key: FrequencyEnum.Monthly, name: 'Monthly', priceSuffix: 'mo' }
]

export const tiers = [
  /*   {
    key: 'basic',
    title: 'Basic',
    price: { yearly: '$48', monthly: '$5' },
    description: 'For those just starting their journey',
    features: [
      'Create a profile',
      'Browse matches',
      'Send 5 messages per day',
      'Basic search filters'
    ],
    buttonText: 'Get Started',
    buttonVariant: 'flat',
    href: '#',
    priceSuffix: 'user'
  },
 */ {
    key: 'premium',
    title: 'Premium',
    price: { yearly: '$120', monthly: '$20' },
    description: 'For serious s eekers ready to find love',
    features: [
      'All Basic features',
      'Unlimited messaging',
      'Advanced matching algorithm',
      'Profile highlighting',
      'Read receipts',
      'Priority support'
    ],
    buttonText: 'Go Premium',
    buttonVariant: 'solid',
    href: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_LINK, //yearly: process.env.STRIPE_YEARLY_PLAN_LINK,

      yearly: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PLAN_LINK
    },
    priceSuffix: 'user',
    mostPopular: true
  },
  {
    key: 'ultimate',
    title: 'Ultimate',
    price: { yearly: '$192', monthly: '$40' },
    description: 'For those who want the best chance at finding their soulmate',
    features: [
      'All Premium features',
      'Personal matchmaking assistance',
      'Profile review and optimization',
      'Virtual date planning',
      'Relationship coaching sessions',
      'Exclusive events access'
    ],
    buttonText: 'Coming Soon',
    buttonVariant: 'flat',
    href: {
      monthly: '#', //process.env.STRIPE_MONTHLY_PLAN_LINK#, //yearly: process.env.STRIPE_YEARLY_PLAN_LINK,

      yearly: '#'
    },
    priceSuffix: 'user'
  }
]
