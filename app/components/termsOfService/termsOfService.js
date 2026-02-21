'use client';

import React from 'react';
import { Heart, Scale, ShieldAlert, Ban, Gavel, ArrowLeft, Zap } from 'lucide-react';
import Link from 'next/link';

export default function TermsOfService() {
  const lastUpdated = "February 21, 2026";

  const summaries = [
    {
      icon: <Scale className="w-6 h-6 text-[#FF4B6E]" />,
      title: "The Basics",
      text: "You must be at least 18 years old to use Luntra. One account per person, please keep your login details secure."
    },
    {
      icon: <Ban className="w-6 h-6 text-[#FFB347]" />,
      title: "Zero Tolerance",
      text: "We have a strict policy against harassment, fake profiles, and hate speech. Be kind or be banned."
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-[#6C5CE7]" />,
      title: "Your Safety",
      text: "While we verify profiles, always use caution when meeting someone in person. You are responsible for your offline safety."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF5F7] text-[#1E1E1E]">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF4B6E]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFB347]/5 rounded-full blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="relative z-50 px-6 py-6 border-b border-[#FF4B6E]/10 bg-white/60 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Heart className="w-6 h-6 text-[#FF4B6E] fill-[#FF4B6E]" />
            <span className="text-xl font-bold bg-gradient-to-r from-[#FF4B6E] to-[#FFB347] bg-clip-text text-transparent">
              Luntra
            </span>
          </Link>
          <Link href="/signup" className="text-sm font-bold text-[#FF4B6E] hover:opacity-80 transition-opacity">
            Agree & Join
          </Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-[#777777] hover:text-[#FF4B6E] transition-colors mb-6 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Terms of <span className="text-[#FF4B6E]">Service</span>
          </h1>
          <p className="text-[#777777]">
            Please read these terms carefully before using Luntra. <br />
            Effective Date: {lastUpdated}
          </p>
        </div>

        {/* TL;DR Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {summaries.map((s, i) => (
            <div key={i} className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-white shadow-sm">
              <div className="w-10 h-10 bg-[#FFF5F7] rounded-xl flex items-center justify-center mb-4">
                {s.icon}
              </div>
              <h3 className="font-bold mb-2">{s.title}</h3>
              <p className="text-xs text-[#777777] leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>

        {/* Legal Text */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-[#F0F0F0] space-y-10 text-[#555555] leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-[#1E1E1E] mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#FFB347]" /> 1. Eligibility
            </h2>
            <p>
              By creating an account on Luntra, you represent and warrant that you are at least 18 years old,
              legally capable of entering into a binding contract, and have never been convicted of a
              felony or any crime involving violence or sexual misconduct.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E1E1E] mb-4 flex items-center gap-2">
              <Gavel className="w-5 h-5 text-[#FF4B6E]" /> 2. User Conduct
            </h2>
            <p className="mb-4">You agree not to use the Service to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Impersionate any person or entity.</li>
              <li>Stalk, bully, or harass any other user.</li>
              <li>Post any content that is hate speech, threatening, or pornographic.</li>
              <li>Use the app for any commercial or advertising purposes without our consent.</li>
            </ul>
          </section>

          <section className="p-6 rounded-2xl bg-[#FFF5F7] border border-[#FF4B6E]/10">
            <h2 className="text-xl font-bold text-[#FF4B6E] mb-2">3. Limitation of Liability</h2>
            <p className="text-sm">
              Luntra provides a platform for people to connect. We do not conduct criminal background
              checks on our users. <strong>Interaction with other users is at your own risk.</strong>
              Luntra is not responsible for the conduct of any user on or off of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E1E1E] mb-4">4. Premium Subscriptions</h2>
            <p>
              Payments for Luntra Premium or VIP are processed via third-party stores (Apple App Store or Google Play).
              Subscriptions auto-renew unless canceled at least 24 hours before the end of the current period.
              Refunds are subject to the policies of the respective app stores.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1E1E1E] mb-4">5. Termination</h2>
            <p>
              We reserve the right to investigate and, if necessary, terminate your account without a refund
              if you have violated these Terms, misused the Service, or behaved in a way that we regard
              as inappropriate or unlawful.
            </p>
          </section>

        </div>

        {/* Footer Contact */}
        <div className="mt-12 text-center text-[#AAAAAA] text-sm">
          <p>Questions about our Terms? <Link href="/contact" className="text-[#FF4B6E] font-bold hover:underline">Contact Legal Team</Link></p>
        </div>
      </main>
    </div>
  );
}