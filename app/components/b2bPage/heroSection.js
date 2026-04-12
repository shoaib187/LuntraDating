// components/sections/hero-section.tsx
'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, Users, Briefcase, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from './button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-8"
          >
            <Globe className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              Trusted by SMEs across Australia & UK
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent"
          >
            Connect with Top
            <br />
            Engineering Talent
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
          >
            The premier B2B platform connecting Australian & UK SMEs with verified
            engineers. Post jobs, find talent, and grow your business.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/for-businesses">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-200 text-lg px-8">
                Post a Job
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/for-engineers">
              <Button size="lg" variant="outline" className="border-2 text-lg px-8 hover:border-blue-600 hover:text-blue-600 transition-all duration-200">
                Find Work
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-3xl font-bold text-gray-900">
                <Users className="h-8 w-8 text-blue-600" />
                <span>500+</span>
              </div>
              <p className="text-gray-600 mt-2">Verified Engineers</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-3xl font-bold text-gray-900">
                <Briefcase className="h-8 w-8 text-blue-600" />
                <span>200+</span>
              </div>
              <p className="text-gray-600 mt-2">SMEs Registered</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-3xl font-bold text-gray-900">
                <CheckCircle className="h-8 w-8 text-blue-600" />
                <span>95%</span>
              </div>
              <p className="text-gray-600 mt-2">Success Rate</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}