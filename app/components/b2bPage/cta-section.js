// components/sections/cta-section.tsx
'use client'

import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from './button'

export function CTASection() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 text-center shadow-2xl"
        >
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join EngiHub today and connect with the best engineering talent in Australia and UK
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl text-lg px-8">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book a Demo
                </Button>
              </Link>
            </div>
            <p className="text-blue-100 text-sm mt-6">
              No credit card required • Free 14-day trial • Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}