import React from 'react'

export default function Stats() {
  return (
    <section className="relative px-6 py-20 md:px-12 lg:px-20 bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">
                {stat.number}
              </div>
              <div className="text-sm opacity-90 flex items-center justify-center gap-1">
                {stat.icon}
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
