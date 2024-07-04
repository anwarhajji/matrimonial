// prisma/seed.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Starting seed...')
    await prisma.subscriptionPlan.createMany({
      data: [
        {
          name: '1 Month',
          duration: 'ONE_MONTH',
          basePrice: 10,
          stripePriceId: 'price_1MonthStripeId' // replace with actual Stripe price ID
        },
        {
          name: '3 Months',
          duration: 'THREE_MONTHS',
          basePrice: 25,
          stripePriceId: 'price_3MonthsStripeId' // replace with actual Stripe price ID
        },
        {
          name: '6 Months',
          duration: 'SIX_MONTHS',
          basePrice: 45,
          stripePriceId: 'price_6MonthsStripeId' // replace with actual Stripe price ID
        },
        {
          name: '1 Year',
          duration: 'ONE_YEAR',
          basePrice: 80,
          stripePriceId: 'price_1YearStripeId' // replace with actual Stripe price ID
        }
      ]
    })
    console.log('Seed completed successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
