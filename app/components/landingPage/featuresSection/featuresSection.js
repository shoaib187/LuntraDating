import { ChevronRight } from 'lucide-react'
import React from 'react'

export default function FeaturesSection() {
  return (
    <section id="features" className="relative px-6 py-20 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#FF4B6E] font-semibold text-sm uppercase tracking-wider">Features</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 mt-2">
            Why Choose <span className="bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] bg-clip-text text-transparent">Luntra?</span>
          </h2>
          <p className="text-xl text-[#777777] dark:text-gray-300 max-w-2xl mx-auto">
            We've built the features that matter most for finding genuine connections in the digital age
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-white dark:bg-gray-800 rounded-3xl border border-[#F0F0F0] dark:border-gray-700 hover:border-[#FF4B6E]/30 dark:hover:border-[#FF8FA3]/30 hover:shadow-2xl transition-all duration-300 animate-fade-in-up relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

              <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold mb-3 dark:text-white">{feature.title}</h3>
              <p className="text-[#777777] dark:text-gray-400 leading-relaxed mb-4">{feature.description}</p>

              <div className="flex items-center text-[#FF4B6E] dark:text-[#FF8FA3] font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Feature highlight number */}
              <div className="absolute top-4 right-4 text-4xl font-bold text-gray-100 dark:text-gray-700 opacity-50">
                {(index + 1).toString().padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
