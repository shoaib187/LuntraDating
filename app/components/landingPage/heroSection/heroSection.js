import { ArrowRight, Heart, MapPin, Sparkles, Star, Video } from 'lucide-react'
import React from 'react'
import { Image } from 'react-native'

export default function HeroSection() {
  return (
    <section className="relative px-6 py-20 md:px-12 lg:px-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-block group">
              <div className="bg-gradient-to-r from-[#FF4B6E]/10 to-[#FF8FA3]/10 text-[#FF4B6E] px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 animate-bounce-subtle border border-[#FF4B6E]/20">
                <Star className="w-4 h-4 fill-current animate-spin-slow" />
                <span className="bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] bg-clip-text text-transparent font-bold">
                  Join 2.5M+ people finding love
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Find Your
              <span className="block bg-gradient-to-r from-[#FF4B6E] via-[#FF8FA3] to-[#FFB347] bg-clip-text text-transparent animate-gradient">
                Perfect Match
              </span>
            </h1>

            <p className="text-xl text-[#777777] dark:text-gray-300 leading-relaxed max-w-lg">
              Stop swiping endlessly. Start connecting meaningfully.
              Real people, real conversations, real relationships.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push('/sign-up')}
                className="group bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 relative overflow-hidden"
              >
                <span className="relative z-10">Start Your Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF8FA3] to-[#FF4B6E] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="group bg-white dark:bg-gray-800 text-[#FF4B6E] dark:text-[#FF8FA3] px-8 py-4 rounded-full font-semibold text-lg border-2 border-[#F0F0F0] dark:border-gray-700 hover:border-[#FF4B6E] dark:hover:border-[#FF8FA3] hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <Video className="w-5 h-5" />
                Watch How It Works
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-4">
              {stats.slice(0, 3).map((stat, index) => (
                <div
                  key={index}
                  className="animate-fade-in-up group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                    {stat.number}
                  </div>
                  <div className="text-sm text-[#777777] dark:text-gray-400 flex items-center gap-1">
                    {stat.icon}
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] flex items-center justify-center text-white text-xs border-2 border-white dark:border-gray-800"
                  >
                    {['S', 'J', 'M', 'P', 'A'][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#777777] dark:text-gray-400">
                <span className="font-bold text-[#FF4B6E]">500+</span> couples found love today
              </p>
            </div>
          </div>

          {/* Hero Image/Illustration Area */}
          <div className="relative animate-fade-in-up animation-delay-200">
            <div className="relative aspect-square max-w-xl mx-auto">
              {/* Animated profile cards */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Card 1 */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 animate-float transform rotate-[-8deg] group hover:z-10 transition-all duration-300">
                    <div className="w-full h-64 bg-gradient-to-br from-[#FF4B6E]/30 to-[#FFB347]/30 rounded-2xl mb-4 overflow-hidden relative">
                      <Image
                        src={'/images/img15.jpg'}
                        width={1000}
                        height={1000}
                        alt="Profile 1"
                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                      />
                      <div className="absolute top-2 right-2 bg-green-500 w-3 h-3 rounded-full border-2 border-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-1 dark:text-white">Emma, 28</h3>
                    <p className="text-[#777777] dark:text-gray-400 text-sm mb-3 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> San Francisco, CA
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="bg-[#FF4B6E]/10 text-[#FF4B6E] px-3 py-1 rounded-full text-xs">Adventure</span>
                      <span className="bg-[#FFB347]/10 text-[#FFB347] px-3 py-1 rounded-full text-xs">Creative</span>
                      <span className="bg-[#6C5CE7]/10 text-[#6C5CE7] px-3 py-1 rounded-full text-xs">Travel</span>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="absolute bottom-0 right-0 w-72 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 animate-float-delayed transform rotate-[8deg] group hover:z-10 transition-all duration-300">
                    <div className="w-full h-64 bg-gradient-to-br from-[#FFB347]/30 to-[#6C5CE7]/30 rounded-2xl mb-4 overflow-hidden">
                      <Image
                        src={'/images/img25.jpg'}
                        width={1000}
                        height={1000}
                        alt="Profile 2"
                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                      />
                      <div className="absolute top-2 right-2 bg-green-500 w-3 h-3 rounded-full border-2 border-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-1 dark:text-white">Alex, 30</h3>
                    <p className="text-[#777777] dark:text-gray-400 text-sm mb-3 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Austin, TX
                    </p>
                    <div className="flex gap-2">
                      <span className="bg-[#6C5CE7]/10 text-[#6C5CE7] px-3 py-1 rounded-full text-xs">Music</span>
                      <span className="bg-[#FF4B6E]/10 text-[#FF4B6E] px-3 py-1 rounded-full text-xs">Cooking</span>
                      <span className="bg-[#28C76F]/10 text-[#28C76F] px-3 py-1 rounded-full text-xs">Fitness</span>
                    </div>
                  </div>

                  {/* Card 3 - New */}
                  <div className="absolute top-1/2 left-0 w-64 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 animate-float-slow transform -rotate-3 group hover:z-10 transition-all duration-300">
                    <div className="w-full h-56 bg-gradient-to-br from-[#28C76F]/30 to-[#00C9A7]/30 rounded-2xl mb-4 overflow-hidden">
                      <Image
                        src={'/images/img35.jpg'}
                        width={1000}
                        height={1000}
                        alt="Profile 3"
                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                      />
                    </div>
                    <h3 className="text-lg font-bold mb-1 dark:text-white">Sophia, 26</h3>
                    <p className="text-[#777777] dark:text-gray-400 text-xs mb-2">Yoga & Meditation 🧘</p>
                  </div>

                  {/* Floating hearts and sparkles */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Heart className="w-16 h-16 text-[#FF4B6E] fill-[#FF4B6E] animate-pulse-slow" />
                    <Sparkles className="w-6 h-6 text-[#FFB347] absolute -top-2 -right-2 animate-spin-slow" />
                  </div>

                  {/* Floating badges */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce-subtle">
                    Match of the Day 💖
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#FF4B6E] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#FF4B6E] rounded-full mt-2 animate-scroll" />
          </div>
        </div>
      </div>
    </section>
  )
}
