// components/sections/how-it-works-section.tsx
'use client'

import { Search, FileText, Users, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const steps = [
  {
    icon: Search,
    title: 'Discover',
    description: 'Browse vetted engineers or post your project requirements',
    color: 'bg-blue-500',
  },
  {
    icon: FileText,
    title: 'Connect',
    description: 'Review proposals, portfolios, and verified credentials',
    color: 'bg-purple-500',
  },
  {
    icon: Users,
    title: 'Collaborate',
    description: 'Work together with secure messaging and project management',
    color: 'bg-green-500',
  },
  {
    icon: CheckCircle,
    title: 'Succeed',
    description: 'Complete projects with secure payments and mutual feedback',
    color: 'bg-orange-500',
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple steps to find the perfect engineering talent for your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 -translate-y-1/2" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative text-center"
            >
              <div className={`${step.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg relative z-10`}>
                <step.icon className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm z-20">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}