'use client';

import React from 'react';
import { Heart, Sparkles, ShieldCheck, Eye, Lock, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  const lastUpdated = "February 21, 2026";

  const sections = [
    {
      id: "collection",
      icon: <Eye className="w-6 h-6 text-[#FF4B6E]" />,
      title: "Data We Collect",
      content: "We collect information you provide directly to us (like your name, photos, and orientation) and data generated automatically (like your location and app usage) to help you find the best matches."
    },
    {
      id: "usage",
      icon: <Sparkles className="w-6 h-6 text-[#FFB347]" />,
      title: "How We Use It",
      content: "Your data powers our Smart Matching algorithm. We use it to show you relevant profiles, verify your identity for safety, and improve the Luntra experience."
    },
    {
      id: "security",
      icon: <ShieldCheck className="w-6 h-6 text-[#6C5CE7]" />,
      title: "Keeping You Safe",
      content: "We use industry-standard encryption to protect your messages and fuzzy-location technology to ensure your exact home address is never revealed to others."
    },
    {
      id: "deletion",
      icon: <Trash2 className="w-6 h-6 text-[#FF4B6E]" />,
      title: "Your Right to Leave",
      content: "Your data belongs to you. You can delete your account at any time within the app settings, and we will purge your personal data from our active databases within 30 days."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF5F7] text-[#1E1E1E] selection:bg-[#FF4B6E]/30">
      {/* Background Decorative Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FF4B6E]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-[#FFB347]/10 rounded-full blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="relative z-50 px-6 py-6 border-b border-[#FF4B6E]/10 bg-white/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Heart className="w-6 h-6 text-[#FF4B6E] fill-[#FF4B6E]" />
            <span className="text-xl font-bold bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] bg-clip-text text-transparent">
              Luntra
            </span>
          </Link>
          <Link href="/" className="text-sm font-semibold text-[#777777] hover:text-[#FF4B6E] flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Privacy <span className="text-[#FF4B6E]">Policy</span>
          </h1>
          <p className="text-[#777777] font-medium">
            Transparent, secure, and focused on your safety. <br />
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {sections.map((section) => (
            <div key={section.id} className="bg-white p-8 rounded-3xl shadow-sm border border-[#F0F0F0] hover:shadow-md transition-shadow">
              <div className="mb-4 bg-[#FFF5F7] w-12 h-12 rounded-2xl flex items-center justify-center">
                {section.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{section.title}</h3>
              <p className="text-[#777777] text-sm leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Content - Standard Legal Prose */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-[#F0F0F0] prose prose-rose max-w-none">
          <h2 className="text-2xl font-bold mb-6">1. Information We Collect</h2>
          <p className="text-[#555555] mb-6">
            To provide the Luntra service, we collect personal information including your name, age,
            photos, and location. We also collect Special Category data such as your dating
            preferences and orientation to help us suggest compatible matches.
          </p>

          <h2 className="text-2xl font-bold mb-6">2. Geolocation</h2>
          <p className="text-[#555555] mb-6">
            Luntra is a location-based app. We collect your GPS coordinates to show you matches nearby.
            However, we use <strong>coordinate fuzzing</strong> to ensure your exact location is never
            visible to other users—they will only see your approximate distance.
          </p>

          <div className="my-10 p-6 rounded-2xl bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] text-white">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              <Lock className="w-5 h-5" /> Our Commitment
            </h3>
            <p className="text-white/90 text-sm">
              We do not sell your personal data to third-party advertisers. We make money through
              Premium subscriptions, not by selling your privacy.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-6">3. Data Retention</h2>
          <p className="text-[#555555] mb-6">
            We keep your personal information only as long as we need it for legitimate business purposes
            and as permitted by applicable law. If you decide to stop using Luntra, you can close your
            account and your profile will no longer be visible to other users.
          </p>
        </div>

        {/* Contact Footer */}
        <div className="mt-16 text-center">
          <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-[#FF4B6E] to-[#FFB347]">
            <div className="bg-[#FFF5F7] px-8 py-4 rounded-full">
              <p className="text-[#777777] text-sm">
                Have questions? Reach out to our Data Officer at{' '}
                <a href="mailto:privacy@luntra.app" className="font-bold text-[#FF4B6E] hover:underline">
                  privacy@luntra.app
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}