import React from 'react'

export default function Partners() {
  return (
    <section className="relative px-6 py-12 md:px-12 lg:px-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-[#777777] dark:text-gray-400 mb-8">Trusted by leading companies</p>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
          {partners.map((partner, index) => (
            <div key={index} className="text-2xl font-bold text-gray-400 dark:text-gray-600 hover:text-[#FF4B6E] dark:hover:text-[#FF8FA3] transition-colors">
              {partner.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
