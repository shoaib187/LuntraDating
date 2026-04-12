// components/sections/pricing-section.tsx
'use client'

import { Check, Crown } from 'lucide-react'
import Link from 'next/link'
import { Button } from './button';
import { motion } from 'framer-motion'

const plans = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'Perfect for getting started',
    features: [
      'Post up to 3 jobs',
      'Basic matching',
      'Email support',
      'Standard verification',
      '7-day job posting',
    ],
    buttonText: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    price: '£49',
    period: '/month',
    description: 'For growing businesses',
    features: [
      'Unlimited job posts',
      'Priority matching',
      'Priority support',
      'Verified engineer access',
      'Analytics dashboard',
      'API access',
      '30-day job posting',
    ],
    buttonText: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Dedicated account manager',
      'Custom integration',
      'SLA guarantee',
      'White-label solution',
      'Advanced security',
      'Team training',
      'Unlimited everything',
    ],
    buttonText: 'Contact Sales',
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-8 ${plan.popular
                ? 'bg-gradient-to-b from-blue-600 to-purple-600 text-white shadow-2xl scale-105'
                : 'bg-white shadow-lg hover:shadow-xl'
                } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Crown className="h-4 w-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-sm">{plan.period}</span>}
                </div>
                <p className={`mt-2 ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className={`h-5 w-5 ${plan.popular ? 'text-blue-200' : 'text-green-500'}`} />
                    <span className={plan.popular ? 'text-white' : 'text-gray-700'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.name === 'Enterprise' ? '/contact' : '/signup'}>
                <Button
                  className={`w-full ${plan.popular
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                    }`}
                >
                  {plan.buttonText}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          *All prices in GBP (£) or AUD ($). No hidden fees. Cancel anytime.
        </p>
      </div>
    </section>
  )
}