'use client';

import React from 'react';
import { Heart, Sparkles, MessageCircle, Quote, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const stories = [
  {
    couple: "Sarah & James",
    duration: "2 years together",
    tags: ["Engaged", "Travelers"],
    image: "👩🏽‍🤝‍👨🏻",
    story: "We matched on a Tuesday, met for coffee on Wednesday, and by Friday we knew. Luntra's focus on deep interests helped us skip the small talk and dive straight into our shared love for vintage vinyl.",
    location: "Brooklyn, NY"
  },
  {
    couple: "Marcus & David",
    duration: "18 months together",
    tags: ["Foodies", "Dog Parents"],
    image: "👨🏿‍🤝‍👨🏼",
    story: "I was about to give up on dating apps until Marcus messaged me about my favorite ramen spot. It turns out he lived three blocks away for five years and we never met until Luntra.",
    location: "Austin, TX"
  },
  {
    couple: "Priya & Alex",
    duration: "3 years together",
    tags: ["Married", "Gamers"],
    image: "👩🏾‍🤝‍👨🏻",
    story: "The 'Smart Matching' wasn't kidding. Our compatibility score was 98%, and three years later, we're married with a golden retriever. Luntra really does find your person.",
    location: "Seattle, WA"
  },
  {
    couple: "Elena & Sophie",
    duration: "1 year together",
    tags: ["Art Lovers"],
    image: "👩🏼‍🤝‍👩🏻",
    story: "We bonded over a conversation starter about obscure 90s cinema. Luntra makes it so easy to find people who actually share your niche passions.",
    location: "London, UK"
  }
];

export default function SuccessStories() {
  return (
    <div className="min-h-screen bg-[#FFF5F7] text-[#1E1E1E]">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#FF4B6E]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#FFB347]/10 rounded-full blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="relative z-50 px-6 py-6 bg-white/50 backdrop-blur-md border-b border-[#FF4B6E]/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Heart className="w-8 h-8 text-[#FF4B6E] fill-[#FF4B6E] group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#FF4B6E] to-[#FFB347] bg-clip-text text-transparent">
              Luntra
            </span>
          </Link>
          <button className="bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg transition-all">
            Join Luntra
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative z-10 pt-20 pb-12 px-6 text-center">
        <div className="inline-block mb-4 bg-white px-4 py-2 rounded-full shadow-sm border border-[#FF4B6E]/10">
          <span className="flex items-center gap-2 text-[#FF4B6E] font-bold text-sm">
            <Sparkles className="w-4 h-4" /> 500,000+ Matches and Counting
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Real Stories, <br />
          <span className="bg-gradient-to-r from-[#FF4B6E] via-[#FF8FA3] to-[#FFB347] bg-clip-text text-transparent">
            Real Connections
          </span>
        </h1>
        <p className="text-xl text-[#777777] max-w-2xl mx-auto leading-relaxed">
          The best part of our job is hearing from you. Explore the journeys of couples who found their forever on Luntra.
        </p>
      </header>

      {/* Stories Grid */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className="group bg-white rounded-[2.5rem] p-8 border border-[#F0F0F0] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Visual Representation */}
                <div className="shrink-0 w-full md:w-48 aspect-square bg-gradient-to-br from-[#FFF5F7] to-[#FFB347]/10 rounded-3xl flex items-center justify-center text-7xl shadow-inner relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {story.image}
                  <div className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-lg">
                    <Heart className="w-4 h-4 text-[#FF4B6E] fill-[#FF4B6E]" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {story.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 bg-[#FF4B6E]/5 text-[#FF4B6E] rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-2xl font-bold">{story.couple}</h2>
                  <div className="flex items-center gap-2 text-sm font-medium text-[#777777]">
                    <MessageCircle className="w-4 h-4 text-[#FFB347]" />
                    {story.duration} • {story.location}
                  </div>

                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[#FF4B6E]/10 rotate-180" />
                    <p className="text-[#555555] leading-relaxed relative z-10 italic">
                      {story.story}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Bottom */}
        <div className="mt-24 text-center">
          <div className="bg-[#1E1E1E] rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
            {/* Background design inside CTA */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF4B6E]/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFB347]/10 rounded-full blur-[80px]" />

            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Ready to write your <br /> own success story?
              </h2>
              <p className="text-white/70 text-lg max-w-xl mx-auto">
                Join our community today and start meeting people who share your vibe, your values, and your vision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all flex items-center gap-2 shadow-xl shadow-[#FF4B6E]/20">
                  Get Started for Free
                  <ArrowRight className="w-5 h-5" />
                </button>
                <Link href="/contact" className="text-white font-semibold hover:text-[#FFB347] transition-colors">
                  Share Your Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-12 border-t border-[#FF4B6E]/5 text-center text-[#AAAAAA] text-sm">
        <p>© 2026 Luntra Dating. Every connection is a new beginning.</p>
      </footer>
    </div>
  );
}