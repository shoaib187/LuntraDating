import { Heart } from 'lucide-react'
import React from 'react'

export default function Particles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute w-[800px] h-[800px] bg-gradient-to-r from-[#FF4B6E]/20 to-[#FF8FA3]/20 rounded-full blur-3xl animate-float"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          top: '10%',
          left: '5%'
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-[#FFB347]/20 to-[#6C5CE7]/20 rounded-full blur-3xl animate-float-delayed"
        style={{
          transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
          bottom: '10%',
          right: '5%'
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] bg-gradient-to-bl from-[#28C76F]/20 to-[#00C9A7]/20 rounded-full blur-3xl animate-pulse-slow"
        style={{
          transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * -0.015}px)`,
          top: '50%',
          left: '50%'
        }}
      />

      {/* Floating hearts */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float-random"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
            opacity: 0.1
          }}
        >
          <Heart className="w-4 h-4 text-[#FF4B6E]" />
        </div>
      ))}
    </div>
  )
}
