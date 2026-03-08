import React from 'react'

export default function HowItWorks() {
  return (
    <section className="relative px-6 py-20 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#FF4B6E] font-semibold text-sm uppercase tracking-wider">Simple Process</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 mt-2">
            How{' '}
            <span className="bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] bg-clip-text text-transparent">
              Luntra
            </span>{' '}
            Works
          </h2>
          <p className="text-xl text-[#777777] dark:text-gray-300 max-w-2xl mx-auto">
            Four simple steps to find your perfect match
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] transform -translate-y-1/2" />

          {howItWorks.map((item, index) => (
            <div key={index} className="relative group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center relative z-10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  {item.icon}
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#FF4B6E] text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2 dark:text-white">{item.title}</h3>
                <p className="text-sm text-[#777777] dark:text-gray-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
