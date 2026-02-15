'use client';

import { useState, useEffect } from 'react';
import { Heart, Sparkles, Users, Shield, MessageCircle, Zap, ArrowRight, Star, Check } from 'lucide-react';

export default function LandingMainPage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Sarah & James",
      image: "👩🏽‍🤝‍👨🏻",
      text: "We matched in March and got engaged in December. Never thought an app could change my life like this!",
      location: "New York, NY"
    },
    {
      name: "Marcus & David",
      image: "👨🏿‍🤝‍👨🏼",
      text: "Finally, an app that gets it right. Real connections, real conversations, real love.",
      location: "Austin, TX"
    },
    {
      name: "Priya & Alex",
      image: "👩🏾‍🤝‍👨🏻",
      text: "Three years strong! We bonded over our shared love of hiking and terrible puns.",
      location: "Seattle, WA"
    }
  ];

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Smart Matching",
      description: "Our algorithm learns what matters to you and suggests compatible matches"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified Profiles",
      description: "Every profile is verified to ensure authentic connections"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Meaningful Conversations",
      description: "Conversation starters that go beyond 'hey' to build real connections"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Chemistry",
      description: "Video chat before you meet to ensure the spark is real"
    }
  ];

  const stats = [
    { number: "2M+", label: "Active Users" },
    { number: "500K+", label: "Success Stories" },
    { number: "4.8★", label: "App Rating" },
    { number: "50+", label: "Countries" }
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F5] text-[#2D1810] overflow-x-hidden">
      {/* Floating gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#FF6B6B]/20 to-[#FFB88C]/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#FFA07A]/20 to-[#FF8C94]/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-bl from-[#FFB6C1]/15 to-[#FFDAB9]/15 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="relative">
              <Heart className="w-8 h-8 text-[#FF6B6B] fill-[#FF6B6B] group-hover:scale-110 transition-transform" />
              <Sparkles className="w-4 h-4 text-[#FFB88C] absolute -top-1 -right-1 group-hover:rotate-12 transition-transform" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#FF6B6B] to-[#FF8C94] bg-clip-text text-transparent">
              Spark
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[#5D4E46] hover:text-[#FF6B6B] transition-colors font-medium">Features</a>
            <a href="#stories" className="text-[#5D4E46] hover:text-[#FF6B6B] transition-colors font-medium">Success Stories</a>
            <a href="#pricing" className="text-[#5D4E46] hover:text-[#FF6B6B] transition-colors font-medium">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-[#5D4E46] hover:text-[#FF6B6B] transition-colors font-medium">
              Sign In
            </button>
            <button className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8C94] text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 md:px-12 lg:px-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-block">
                <div className="bg-[#FF6B6B]/10 text-[#FF6B6B] px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 animate-bounce-subtle">
                  <Star className="w-4 h-4 fill-current" />
                  Join 2M+ people finding love
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Find Your
                <span className="block bg-gradient-to-r from-[#FF6B6B] via-[#FF8C94] to-[#FFB88C] bg-clip-text text-transparent">
                  Perfect Match
                </span>
              </h1>

              <p className="text-xl text-[#5D4E46] leading-relaxed max-w-lg">
                Stop swiping endlessly. Start connecting meaningfully.
                Real people, real conversations, real relationships.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-gradient-to-r from-[#FF6B6B] to-[#FF8C94] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white text-[#FF6B6B] px-8 py-4 rounded-full font-semibold text-lg border-2 border-[#FF6B6B]/20 hover:border-[#FF6B6B] hover:shadow-lg transition-all">
                  Watch How It Works
                </button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                {stats.slice(0, 3).map((stat, index) => (
                  <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="text-3xl font-bold text-[#FF6B6B]">{stat.number}</div>
                    <div className="text-sm text-[#5D4E46]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image/Illustration Area */}
            <div className="relative animate-fade-in-up animation-delay-200">
              <div className="relative aspect-square max-w-xl mx-auto">
                {/* Animated profile cards */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Card 1 */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 bg-white rounded-3xl shadow-2xl p-6 animate-float transform rotate-[-8deg]">
                      <div className="w-full h-64 bg-gradient-to-br from-[#FF6B6B]/30 to-[#FFB88C]/30 rounded-2xl mb-4 flex items-center justify-center text-6xl">
                        👩🏻‍🦰
                      </div>
                      <h3 className="text-xl font-bold mb-1">Emma, 28</h3>
                      <p className="text-[#5D4E46] text-sm mb-3">Loves hiking & coffee ☕️</p>
                      <div className="flex gap-2">
                        <span className="bg-[#FF6B6B]/10 text-[#FF6B6B] px-3 py-1 rounded-full text-xs">Adventure</span>
                        <span className="bg-[#FFB88C]/10 text-[#FF8C94] px-3 py-1 rounded-full text-xs">Creative</span>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="absolute bottom-0 right-0 w-72 bg-white rounded-3xl shadow-2xl p-6 animate-float-delayed transform rotate-[8deg]">
                      <div className="w-full h-64 bg-gradient-to-br from-[#FFB88C]/30 to-[#FF8C94]/30 rounded-2xl mb-4 flex items-center justify-center text-6xl">
                        👨🏽‍🦱
                      </div>
                      <h3 className="text-xl font-bold mb-1">Alex, 30</h3>
                      <p className="text-[#5D4E46] text-sm mb-3">Foodie & guitarist 🎸</p>
                      <div className="flex gap-2">
                        <span className="bg-[#FFB88C]/10 text-[#FF8C94] px-3 py-1 rounded-full text-xs">Music</span>
                        <span className="bg-[#FF6B6B]/10 text-[#FF6B6B] px-3 py-1 rounded-full text-xs">Cooking</span>
                      </div>
                    </div>

                    {/* Floating hearts */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Heart className="w-16 h-16 text-[#FF6B6B] fill-[#FF6B6B] animate-pulse-slow" />
                      <Sparkles className="w-6 h-6 text-[#FFB88C] absolute -top-2 -right-2 animate-spin-slow" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative px-6 py-20 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8C94] bg-clip-text text-transparent">Spark?</span>
            </h2>
            <p className="text-xl text-[#5D4E46] max-w-2xl mx-auto">
              We've built the features that matter most for finding genuine connections
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-white to-[#FFF9F5] rounded-3xl border border-[#FF6B6B]/10 hover:border-[#FF6B6B]/30 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#FF6B6B] to-[#FF8C94] rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-[#5D4E46] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="stories" className="relative px-6 py-20 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Real Stories, Real Love
            </h2>
            <p className="text-xl text-[#5D4E46]">
              Over 500,000 couples have found their match
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6B6B]/10 to-[#FFB88C]/10 rounded-full blur-3xl" />

              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${index === activeTestimonial ? 'opacity-100 translate-x-0' : 'opacity-0 absolute inset-0 translate-x-8'
                    }`}
                >
                  <div className="text-6xl mb-6">{testimonial.image}</div>
                  <p className="text-2xl md:text-3xl font-medium mb-6 leading-relaxed text-[#2D1810]">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <div className="font-bold text-lg text-[#FF6B6B]">{testimonial.name}</div>
                    <div className="text-[#5D4E46]">{testimonial.location}</div>
                  </div>
                </div>
              ))}

              <div className="flex gap-2 mt-8 justify-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${index === activeTestimonial ? 'bg-[#FF6B6B] w-8' : 'bg-[#FF6B6B]/30'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative px-6 py-20 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-[#5D4E46]">
              Start for free, upgrade when you're ready
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="bg-gradient-to-br from-white to-[#FFF9F5] rounded-3xl p-8 border-2 border-[#FF6B6B]/10">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-[#5D4E46] font-normal">/month</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#FF6B6B]" />
                  <span>10 likes per day</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#FF6B6B]" />
                  <span>Basic matching</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#FF6B6B]" />
                  <span>Send messages</span>
                </li>
              </ul>
              <button className="w-full bg-[#FF6B6B]/10 text-[#FF6B6B] py-3 rounded-full font-semibold hover:bg-[#FF6B6B]/20 transition-all">
                Get Started
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-gradient-to-br from-[#FF6B6B] to-[#FF8C94] rounded-3xl p-8 text-white transform scale-105 shadow-2xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFB88C] text-[#2D1810] px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <div className="text-4xl font-bold mb-6">$19<span className="text-lg font-normal opacity-90">/month</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5" />
                  <span>Unlimited likes</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5" />
                  <span>Advanced matching</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5" />
                  <span>See who liked you</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5" />
                  <span>Boost your profile</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5" />
                  <span>Video chat</span>
                </li>
              </ul>
              <button className="w-full bg-white text-[#FF6B6B] py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                Get Premium
              </button>
            </div>

            {/* VIP Plan */}
            <div className="bg-gradient-to-br from-white to-[#FFF9F5] rounded-3xl p-8 border-2 border-[#FF6B6B]/10">
              <h3 className="text-2xl font-bold mb-2">VIP</h3>
              <div className="text-4xl font-bold mb-6">$39<span className="text-lg text-[#5D4E46] font-normal">/month</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#FF6B6B]" />
                  <span>Everything in Premium</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#FF6B6B]" />
                  <span>Priority matching</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#FF6B6B]" />
                  <span>Profile verification</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#FF6B6B]" />
                  <span>Relationship coaching</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8C94] text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                Get VIP
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-20 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#FF6B6B] to-[#FF8C94] rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Your Love Story Starts Here
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join millions of people finding meaningful connections every day
              </p>
              <button className="bg-white text-[#FF6B6B] px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-2">
                Start Matching Now
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-12 md:px-12 lg:px-20 bg-[#2D1810] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-[#FF6B6B] fill-[#FF6B6B]" />
                <span className="text-xl font-bold">Spark</span>
              </div>
              <p className="text-white/70">
                Building meaningful connections, one match at a time.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-white/70">
            <p>&copy; 2026 Spark. All rights reserved. Made with ❤️ for everyone seeking love.</p>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-8deg); }
          50% { transform: translateY(-20px) rotate(-8deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(8deg); }
          50% { transform: translateY(-15px) rotate(8deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </div>
  );
}