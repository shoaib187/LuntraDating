'use client';

import React, { useState } from 'react';
import { Heart, Send, MessageCircle, ShieldCheck, LifeBuoy, Mail, MapPin, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ContactUs() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: 'Support', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic here (e.g., Formspree, Resend, or your own API)
    setIsSubmitted(true);
  };

  const contactTypes = [
    {
      icon: <LifeBuoy className="w-6 h-6 text-[#FF4B6E]" />,
      title: "Customer Support",
      desc: "Need help with your account or premium subscription?",
      email: "support@luntra.app"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#FFB347]" />,
      title: "Safety & Privacy",
      desc: "Report a concern or ask about your data security.",
      email: "safety@luntra.app"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#6C5CE7]" />,
      title: "Press & Media",
      desc: "Inquiries regarding interviews or brand partnerships.",
      email: "press@luntra.app"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF5F7] text-[#1E1E1E]">
      {/* Decorative Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF4B6E]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFB347]/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-6 bg-white/50 backdrop-blur-md border-b border-[#FF4B6E]/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Heart className="w-8 h-8 text-[#FF4B6E] fill-[#FF4B6E]" />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#FF4B6E] to-[#FFB347] bg-clip-text text-transparent">
              Luntra
            </span>
          </Link>
          <Link href="/" className="text-[#777777] hover:text-[#FF4B6E] font-medium transition-colors">
            Back to App
          </Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left Side: Info */}
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Get in <span className="text-[#FF4B6E]">Touch</span>
              </h1>
              <p className="text-xl text-[#777777] leading-relaxed max-w-md">
                Have questions about Luntra? Whether it is a success story or a support request, our team is here to help.
              </p>
            </div>

            <div className="grid gap-6">
              {contactTypes.map((item, idx) => (
                <div key={idx} className="flex gap-5 p-6 bg-white rounded-3xl border border-[#F0F0F0] shadow-sm hover:shadow-md transition-shadow">
                  <div className="shrink-0 w-12 h-12 bg-[#FFF5F7] rounded-2xl flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-[#777777] text-sm mb-2">{item.desc}</p>
                    <a href={`mailto:${item.email}`} className="text-[#FF4B6E] font-semibold text-sm hover:underline">
                      {item.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 text-[#777777]">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#FF4B6E]" />
                <span className="text-sm font-medium">New York, NY</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#FFB347]" />
                <span className="text-sm font-medium">24/7 Chat Support</span>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-[#FF4B6E]/5 border border-[#F0F0F0] relative">
            {isSubmitted ? (
              <div className="py-20 text-center space-y-6 animate-fade-in">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Send className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold">Message Sent!</h2>
                <p className="text-[#777777]">Thanks for reaching out. A Luntra specialist will get back to you within 24 hours.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-[#FF4B6E] font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1E1E1E] ml-1">Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Emma Watson"
                      className="w-full px-6 py-4 rounded-2xl bg-[#FFF5F7] border-none focus:ring-2 focus:ring-[#FF4B6E] transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1E1E1E] ml-1">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="emma@example.com"
                      className="w-full px-6 py-4 rounded-2xl bg-[#FFF5F7] border-none focus:ring-2 focus:ring-[#FF4B6E] transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1E1E1E] ml-1">Topic</label>
                  <select className="w-full px-6 py-4 rounded-2xl bg-[#FFF5F7] border-none focus:ring-2 focus:ring-[#FF4B6E] transition-all outline-none appearance-none">
                    <option>General Support</option>
                    <option>Billing Inquiry</option>
                    <option>Safety Report</option>
                    <option>Feature Suggestion</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1E1E1E] ml-1">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="How can we help you today?"
                    className="w-full px-6 py-4 rounded-2xl bg-[#FFF5F7] border-none focus:ring-2 focus:ring-[#FF4B6E] transition-all outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  Send Message
                  <Send className="w-5 h-5" />
                </button>

                <p className="text-center text-xs text-[#AAAAAA]">
                  By clicking send, you agree to our <Link href="/privacy" className="underline">Privacy Policy</Link>.
                </p>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}