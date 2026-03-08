import React from 'react'

export default function ShowCaseSection() {
  return (
    <section className="relative px-6 py-20 md:px-12 lg:px-20 bg-gradient-to-br from-[#FF4B6E]/5 to-[#FF8FA3]/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#FF4B6E] font-semibold text-sm uppercase tracking-wider">Interactive Demo</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 mt-2">
              See How It{' '}
              <span className="bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] bg-clip-text text-transparent">
                Works
              </span>
            </h2>

            <div className="space-y-6">
              {featuresShowcase.map((item, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${activeFeature === index
                    ? 'bg-white dark:bg-gray-800 shadow-xl scale-105'
                    : 'hover:bg-white/50 dark:hover:bg-gray-800/50'
                    }`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`text-4xl bg-gradient-to-br ${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white`}>
                      {item.image}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 dark:text-white">{item.title}</h3>
                      <p className="text-[#777777] dark:text-gray-400">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 aspect-square flex items-center justify-center">
              <div className="text-8xl animate-float">
                {featuresShowcase[activeFeature].image}
              </div>

              {/* Animated rings */}
              <div className="absolute inset-0 border-2 border-[#FF4B6E]/20 rounded-3xl animate-ping-slow" />
              <div className="absolute inset-4 border-2 border-[#FF8FA3]/20 rounded-3xl animate-ping-slower" />
            </div>

            {/* Feature points */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] text-white px-6 py-3 rounded-full shadow-xl">
              <span className="font-bold">✨ New Feature</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
