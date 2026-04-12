// components/sections/features-section.tsx
'use client'

import { Shield, Zap, Users, CreditCard, FileCheck, MapPin, Clock, Award } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: Shield,
    title: 'Verified Engineers',
    description: 'All engineers go through rigorous verification including certificate validation and background checks.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Zap,
    title: 'Smart Matching',
    description: 'AI-powered matching based on skills, experience, location, and project requirements.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Users,
    title: 'Dual Role Access',
    description: 'Seamlessly switch between hiring and finding work with role-based dashboards.',
    color: 'from-green-500 to-teal-500',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Multi-currency escrow payments with Stripe integration (GBP & AUD supported).',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: FileCheck,
    title: 'Compliance Ready',
    description: 'Full legal compliance for UK and Australian business regulations.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: MapPin,
    title: 'Location Based',
    description: 'Find talent locally in Australia, UK, or work with remote engineers worldwide.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Clock,
    title: 'Time Zone Smart',
    description: 'Automatic timezone detection and meeting scheduling with Calendly integration.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Award,
    title: 'Quality Assurance',
    description: 'Dedicated support and dispute resolution for all projects.',
    color: 'from-cyan-500 to-blue-500',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Why Choose EngiHub?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to connect, collaborate, and succeed in one powerful platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}