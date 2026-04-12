// components/sections/testimonials-section.tsx
'use client'

import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO, TechFlow Solutions',
    content: 'EngiHub transformed how we hire engineers. The verification process saved us countless hours of screening.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Lead Engineer, Freelance',
    content: 'As an engineer, finding quality clients used to be hard. EngiHub connected me with amazing SMEs in Australia.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    name: 'Emma Watson',
    role: 'Founder, EcoBuild UK',
    content: 'The platform is intuitive and the support team is fantastic. Highly recommend for any growing business.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Trusted by Businesses & Engineers
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of satisfied users who found success on EngiHub
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-xl"
            >
              <Quote className="h-8 w-8 text-blue-500 mb-4 opacity-50" />
              <p className="text-gray-700 mb-4 italic">{testimonial.content}</p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}