import { Heart, Link, Sparkles } from 'lucide-react'
import React from 'react'

export default function Header() {
  return (
    <nav className="relative z-50 px-6 py-6 md:px-12 lg:px-20 backdrop-blur-md bg-white/30 dark:bg-gray-900/30 sticky top-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="relative">
            <Heart className="w-8 h-8 text-[#FF4B6E] fill-[#FF4B6E] group-hover:scale-110 transition-transform" />
            <Sparkles className="w-4 h-4 text-[#FFB347] absolute -top-1 -right-1 group-hover:rotate-12 transition-transform" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] bg-clip-text text-transparent">
            Luntra
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Stories', 'Events', 'Pricing', 'Blog'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[#777777] dark:text-gray-300 hover:text-[#FF4B6E] dark:hover:text-[#FF8FA3] transition-colors font-medium relative group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/sign-in')}
            className="text-[#777777] dark:text-gray-300 hover:text-[#FF4B6E] dark:hover:text-[#FF8FA3] transition-colors font-medium"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push('/sign-up')}
            className="bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all hover:shadow-[#FF4B6E]/25"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}
