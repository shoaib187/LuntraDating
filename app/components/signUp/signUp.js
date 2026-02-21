'use client';

import React, { useState } from 'react';
import { Heart, Sparkles, Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';
import Link from 'next/link';

export default function SignUp() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  return (
    <div className="min-h-screen bg-[#FFF5F7] flex flex-col md:flex-row overflow-hidden">
      {/* Left Side: Branding & Visual (Hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#FF4B6E] to-[#FF8FA3] relative items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

        <div className="relative z-10 max-w-md text-white">
          <div className="mb-8 inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4 text-[#FFB347]" />
            <span className="text-sm font-bold">Your journey starts here</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Find the spark you have been looking for.
          </h1>
          <p className="text-lg text-white/80 mb-12">
            Join over 2 million people who found more than just a match. They found a story.
          </p>

          {/* Floating Preview Card */}
          <div className="bg-white/10 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/20 shadow-2xl animate-float">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-tr from-[#FFB347] to-[#FF4B6E] rounded-full flex items-center justify-center text-2xl">
                ✨
              </div>
              <div>
                <div className="h-3 w-24 bg-white/30 rounded-full mb-2" />
                <div className="h-2 w-16 bg-white/20 rounded-full" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-2 w-full bg-white/20 rounded-full" />
              <div className="h-2 w-5/6 bg-white/20 rounded-full" />
              <div className="h-2 w-4/6 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-20 relative">
        {/* Mobile Decorative Orbs */}
        <div className="md:hidden absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#FF4B6E]/10 rounded-full blur-3xl" />

        <div className="w-full max-w-md space-y-8 relative z-10">
          <div className="text-center md:text-left">
            <Link href="/" className="inline-flex items-center gap-2 mb-8 md:hidden">
              <Heart className="w-8 h-8 text-[#FF4B6E] fill-[#FF4B6E]" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#FF4B6E] to-[#FFB347] bg-clip-text text-transparent">
                Luntra
              </span>
            </Link>
            <h2 className="text-3xl font-extrabold text-[#1E1E1E]">Create Account</h2>
            <p className="text-[#777777] mt-2">Already have an account? <Link href="/login" className="text-[#FF4B6E] font-bold hover:underline">Sign In</Link></p>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white border border-[#F0F0F0] hover:bg-slate-50 transition-all font-medium text-sm shadow-sm">
              <Chrome className="w-4 h-4 text-[#EA4335]" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white border border-[#F0F0F0] hover:bg-slate-50 transition-all font-medium text-sm shadow-sm">
              <Github className="w-4 h-4" />
              GitHub
            </button>
          </div>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-[#F0F0F0]"></div>
            <span className="flex-shrink mx-4 text-[#AAAAAA] text-xs uppercase tracking-widest font-bold">Or Email</span>
            <div className="flex-grow border-t border-[#F0F0F0]"></div>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#1E1E1E] ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#AAAAAA] group-focus-within:text-[#FF4B6E] transition-colors" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-[#F0F0F0] focus:ring-2 focus:ring-[#FF4B6E]/20 focus:border-[#FF4B6E] transition-all outline-none shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#1E1E1E] ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#AAAAAA] group-focus-within:text-[#FF4B6E] transition-colors" />
                <input
                  type="email"
                  placeholder="hello@example.com"
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-[#F0F0F0] focus:ring-2 focus:ring-[#FF4B6E]/20 focus:border-[#FF4B6E] transition-all outline-none shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#1E1E1E] ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#AAAAAA] group-focus-within:text-[#FF4B6E] transition-colors" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-[#F0F0F0] focus:ring-2 focus:ring-[#FF4B6E]/20 focus:border-[#FF4B6E] transition-all outline-none shadow-sm"
                />
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-4 shadow-[#FF4B6E]/20 shadow-lg">
              Create Account
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="text-center text-xs text-[#777777] leading-relaxed">
            By signing up, you agree to our <Link href="/terms" className="text-[#FF4B6E] font-bold">Terms of Service</Link> and <Link href="/privacy" className="text-[#FF4B6E] font-bold">Privacy Policy</Link>.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}