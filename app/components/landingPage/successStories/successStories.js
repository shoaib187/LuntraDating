import { MapPin, Star } from 'lucide-react'
import React from 'react'

export default function SuccessStories() {
  return (
    <section id="stories" className="relative px-6 py-20 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#FF4B6E] font-semibold text-sm uppercase tracking-wider">Love Stories</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 mt-2">
            Real Stories,{' '}
            <span className="bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] bg-clip-text text-transparent">
              Real Love
            </span>
          </h2>
          <p className="text-xl text-[#777777] dark:text-gray-300">
            Over 500,000 couples have found their match on Luntra
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF4B6E]/10 to-[#FFB347]/10 rounded-full blur-3xl" />

            {/* Success counter */}
            <div className="absolute top-8 left-8 bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] text-white px-4 py-2 rounded-full text-sm font-bold">
              ⭐ Success Story #{String(activeTestimonial + 1).padStart(3, '0')}
            </div>

            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${index === activeTestimonial
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 absolute inset-0 translate-x-8 pointer-events-none'
                  }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="text-7xl mb-6 animate-float">{testimonial.image}</div>

                  <div className="flex gap-4 mb-6">
                    <div className="bg-[#FF4B6E]/10 text-[#FF4B6E] px-4 py-2 rounded-full text-sm">
                      💑 {testimonial.yearsTogether}
                    </div>
                    <div className="bg-[#28C76F]/10 text-[#28C76F] px-4 py-2 rounded-full text-sm">
                      ⚡ {testimonial.matchScore} Match
                    </div>
                  </div>

                  <p className="text-2xl md:text-3xl font-medium mb-6 leading-relaxed text-[#1E1E1E] dark:text-white">
                    "{testimonial.text}"
                  </p>

                  <div className="mb-4">
                    <div className="font-bold text-lg text-[#FF4B6E]">{testimonial.name}</div>
                    <div className="text-[#777777] dark:text-gray-400 flex items-center gap-1 justify-center">
                      <MapPin className="w-4 h-4" />
                      {testimonial.location}
                    </div>
                  </div>

                  {/* Rating stars */}
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-2 mt-8 justify-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`transition-all ${index === activeTestimonial
                    ? 'bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] w-8 h-3'
                    : 'bg-[#FF4B6E]/30 w-3 h-3 hover:bg-[#FF4B6E]/50'
                    } rounded-full`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
