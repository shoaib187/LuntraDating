'use client';

import React from 'react';
import { Heart, Mail, Lock, ArrowRight, Chrome, Github, Fingerprint } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#FFF5F7] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#FF4B6E]/10 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#FFB347]/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-[440px] relative z-10">
        {/* Logo Area */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="relative">
              <Heart className="w-10 h-10 text-[#FF4B6E] fill-[#FF4B6E] group-hover:scale-110 transition-transform" />
              <Fingerprint className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-[#FF4B6E] to-[#FFB347] bg-clip-text text-transparent">
              Luntra
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-[#1E1E1E]">Welcome Back</h1>
          <p className="text-[#777777] mt-2">Ready to find your next connection?</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-[#FF4B6E]/5 border border-white">
          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-white border border-[#F0F0F0] hover:bg-slate-50 transition-all font-semibold text-sm shadow-sm active:scale-95">
              <Chrome className="w-4 h-4 text-[#EA4335]" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-white border border-[#F0F0F0] hover:bg-slate-50 transition-all font-semibold text-sm shadow-sm active:scale-95">
              <Github className="w-4 h-4" />
              GitHub
            </button>
          </div>

          <div className="relative flex items-center mb-8">
            <div className="flex-grow border-t border-[#F0F0F0]"></div>
            <span className="flex-shrink mx-4 text-[#AAAAAA] text-[10px] uppercase tracking-[0.2em] font-black">Or with email</span>
            <div className="flex-grow border-t border-[#F0F0F0]"></div>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label className="text-xs font-black text-[#1E1E1E] uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#AAAAAA] group-focus-within:text-[#FF4B6E] transition-colors" />
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-[#FFF5F7]/50 border border-[#F0F0F0] focus:ring-4 focus:ring-[#FF4B6E]/10 focus:border-[#FF4B6E] transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black text-[#1E1E1E] uppercase tracking-wider">Password</label>
                <Link href="/forgot-password" size-sm className="text-xs font-bold text-[#FF4B6E] hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#AAAAAA] group-focus-within:text-[#FF4B6E] transition-colors" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-[#FFF5F7]/50 border border-[#F0F0F0] focus:ring-4 focus:ring-[#FF4B6E]/10 focus:border-[#FF4B6E] transition-all outline-none"
                />
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl shadow-[#FF4B6E]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
              Sign In
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Bottom Link */}
          <div className="mt-8 text-center">
            <p className="text-[#777777] text-sm">
              New to Luntra? <Link href="/signup" className="text-[#FF4B6E] font-bold hover:underline">Create an account</Link>
            </p>
          </div>
        </div>

        {/* Support Link */}
        <p className="text-center mt-8 text-xs text-[#AAAAAA]">
          Having trouble? <Link href="/contact" className="hover:text-[#FF4B6E] underline underline-offset-4">Contact Support</Link>
        </p>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}