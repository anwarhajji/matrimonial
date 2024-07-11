// app/api/create-subscription/route.ts

import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: '2024-06-20'
})

export async function POST(req: NextRequest) {
  try {
    const { userId, planId } = await req.json()

    const user = await db.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const plan = await db.subscriptionPlan.findUnique({
      where: { id: planId }
    })

    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
    }

    const price = user.gender === 'MALE' ? plan.basePrice * 2 : plan.basePrice

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: plan.name
            },
            unit_amount: price * 100 // Stripe expects the amount in cents
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/cancel`
    })

    await db.subscription.create({
      data: {
        userId: user.id,
        planId: plan.id,
        startDate: new Date(),
        endDate: calculateEndDate(plan.duration),
        price
      }
    })

    return NextResponse.json({ sessionId: session.id }, { status: 200 })
  } catch (error) {
    console.error('Error creating subscription:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

function calculateEndDate(duration: string): Date {
  const now = new Date()
  switch (duration) {
    case 'ONE_MONTH':
      return new Date(now.setMonth(now.getMonth() + 1))
    case 'THREE_MONTHS':
      return new Date(now.setMonth(now.getMonth() + 3))
    case 'SIX_MONTHS':
      return new Date(now.setMonth(now.getMonth() + 6))
    case 'ONE_YEAR':
      return new Date(now.setFullYear(now.getFullYear() + 1))
    default:
      throw new Error('Invalid subscription duration')
  }
}
