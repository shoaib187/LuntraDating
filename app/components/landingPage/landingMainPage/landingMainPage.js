'use client';

import { useState, useEffect } from 'react';
import {
  Heart, Sparkles, Users, Shield, MessageCircle, Zap, ArrowRight,
  Star, Check, Globe, Award, Clock, Camera, Video, Music, Coffee,
  Compass, ChevronRight, Phone, Mail, MapPin, Instagram, Twitter,
  Facebook, Linkedin, Moon, Sun, Palette, Rocket, Target, Gift,
  Trophy, Crown, Diamond, Gem, ThumbsUp, Smile, HeartHandshake,
  Flame, Leaf, TreePine, Waves, Mountain, Cloud,
  Flag
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LandingMainPage() {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const testimonials = [
    {
      name: "Sarah & James",
      image: "👩🏽‍🤝‍👨🏻",
      text: "We matched in March and got engaged in December. Never thought an app could change my life like this!",
      location: "New York, NY",
      yearsTogether: "2 years",
      matchScore: "98%"
    },
    {
      name: "Marcus & David",
      image: "👨🏿‍🤝‍👨🏼",
      text: "Finally, an app that gets it right. Real connections, real conversations, real love.",
      location: "Austin, TX",
      yearsTogether: "1 year",
      matchScore: "95%"
    },
    {
      name: "Priya & Alex",
      image: "👩🏾‍🤝‍👨🏻",
      text: "Three years strong! We bonded over our shared love of hiking and terrible puns.",
      location: "Seattle, WA",
      yearsTogether: "3 years",
      matchScore: "99%"
    },
    {
      name: "Michael & David",
      image: "👨🏻‍🤝‍👨🏿",
      text: "We found each other during the pandemic. Now we're planning our wedding!",
      location: "Chicago, IL",
      yearsTogether: "2 years",
      matchScore: "97%"
    },
    {
      name: "Emma & Olivia",
      image: "👩🏼‍🤝‍👩🏻",
      text: "From first message to moving in together in 8 months. Thank you Luntra!",
      location: "Portland, OR",
      yearsTogether: "1.5 years",
      matchScore: "96%"
    }
  ];

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Smart Matching",
      description: "Our AI algorithm learns what matters to you and suggests compatible matches with 95% accuracy",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified Profiles",
      description: "Every profile is verified through multiple steps to ensure authentic, real connections",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Smart Conversations",
      description: "AI-powered conversation starters that go beyond 'hey' to build meaningful connections",
      gradient: "from-purple-500 to-violet-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Video Dating",
      description: "Virtual dates with built-in icebreakers and activities to make connections stronger",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Events",
      description: "Exclusive virtual and in-person events for Luntra members to meet naturally",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <HeartHandshake className="w-6 h-6" />,
      title: "Relationship Coaching",
      description: "Expert advice and resources to help you navigate your dating journey",
      gradient: "from-red-500 to-pink-500"
    }
  ];

  const stats = [
    { number: "2.5M+", label: "Active Users", icon: <Users className="w-5 h-5" /> },
    { number: "500K+", label: "Success Stories", icon: <Trophy className="w-5 h-5" /> },
    { number: "4.9★", label: "App Rating", icon: <Star className="w-5 h-5 fill-current" /> },
    { number: "150+", label: "Countries", icon: <Globe className="w-5 h-5" /> },
    { number: "50M+", label: "Messages Daily", icon: <MessageCircle className="w-5 h-5" /> },
    { number: "98%", label: "Satisfaction Rate", icon: <ThumbsUp className="w-5 h-5" /> }
  ];

  const featuresShowcase = [
    {
      title: "AI-Powered Compatibility",
      description: "Our advanced algorithm analyzes personality traits, interests, and values to find your perfect match.",
      image: "🧠",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Video First Dates",
      description: "Get to know your matches safely with our integrated video chat feature before meeting in person.",
      image: "📹",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Interest-Based Communities",
      description: "Join groups based on your hobbies and meet like-minded people organically.",
      image: "🎯",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Safety First",
      description: "24/7 moderation, photo verification, and safety features to ensure a secure dating experience.",
      image: "🛡️",
      color: "from-red-500 to-orange-500"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Create Your Profile",
      description: "Tell us about yourself, your interests, and what you're looking for in a partner.",
      icon: <Users className="w-8 h-8" />
    },
    {
      step: "2",
      title: "Get Matched",
      description: "Our AI finds compatible matches based on your preferences and behavior.",
      icon: <Sparkles className="w-8 h-8" />
    },
    {
      step: "3",
      title: "Start Connecting",
      description: "Break the ice with smart conversation starters and fun activities.",
      icon: <MessageCircle className="w-8 h-8" />
    },
    {
      step: "4",
      title: "Meet & Fall in Love",
      description: "Take it to the next level with virtual or in-person dates.",
      icon: <HeartHandshake className="w-8 h-8" />
    }
  ];

  const events = [
    {
      title: "Virtual Wine Tasting",
      date: "March 15, 2024",
      attendees: "234 going",
      image: "🍷",
      host: "Sommelier Sarah"
    },
    {
      title: "Hiking Adventure Club",
      date: "March 20, 2024",
      attendees: "156 going",
      image: "🥾",
      host: "Mountain Guide Mike"
    },
    {
      title: "Cooking Together Online",
      date: "March 25, 2024",
      attendees: "312 going",
      image: "👨‍🍳",
      host: "Chef Antonio"
    },
    {
      title: "Book Lovers Meetup",
      date: "March 28, 2024",
      attendees: "189 going",
      image: "📚",
      host: "Librarian Lisa"
    }
  ];

  const safetyFeatures = [
    {
      title: "Photo Verification",
      description: "All profiles require photo verification to ensure authenticity",
      icon: <Camera className="w-5 h-5" />
    },
    {
      title: "24/7 Moderation",
      description: "Our team actively monitors for inappropriate behavior",
      icon: <Shield className="w-5 h-5" />
    },
    {
      title: "Emergency Support",
      description: "Quick access to safety resources and support",
      icon: <Phone className="w-5 h-5" />
    },
    {
      title: "Block & Report",
      description: "Easy tools to manage your experience",
      icon: <Flag className="w-5 h-5" />
    }
  ];

  const blogPosts = [
    {
      title: "10 First Date Ideas That Actually Work",
      excerpt: "Make your first meeting memorable with these creative date ideas...",
      author: "Dr. Sarah Chen",
      date: "Mar 10, 2024",
      readTime: "5 min read",
      category: "Dating Tips"
    },
    {
      title: "How to Spot Red Flags Early",
      excerpt: "Learn the warning signs and protect your heart while dating...",
      author: "Marcus Williams",
      date: "Mar 8, 2024",
      readTime: "7 min read",
      category: "Safety"
    },
    {
      title: "The Science of Attraction",
      excerpt: "What really draws people together? Science has the answers...",
      author: "Dr. Emily Parker",
      date: "Mar 5, 2024",
      readTime: "6 min read",
      category: "Science"
    }
  ];

  const faqs = [
    {
      question: "How does the matching algorithm work?",
      answer: "Our AI analyzes personality traits, interests, values, and behavior patterns to find compatible matches."
    },
    {
      question: "Is Luntra really free?",
      answer: "Yes! Basic features are free forever. Premium features are optional for enhanced experience."
    },
    {
      question: "How do you verify profiles?",
      answer: "We use multi-step verification including photo verification, social media linking, and manual review."
    },
    {
      question: "What makes Luntra different?",
      answer: "Focus on meaningful connections over endless swiping, with community events and relationship coaching."
    }
  ];

  const partners = [
    { name: "Forbes", logo: "F" },
    { name: "TechCrunch", logo: "T" },
    { name: "The Verge", logo: "V" },
    { name: "Wired", logo: "W" },
    { name: "Business Insider", logo: "BI" },
    { name: "CNN", logo: "CNN" }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-[#FFF5F7] via-white to-[#FFF0F5] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-[#1E1E1E] dark:text-white overflow-x-hidden transition-colors duration-300">
        {/* Animated background particles */}
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

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
        >
          {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>

        {/* Navigation */}
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

        {/* Hero Section */}
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

        {/* Partners Section */}
        <section className="relative px-6 py-12 md:px-12 lg:px-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-[#777777] dark:text-gray-400 mb-8">Trusted by leading companies</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
              {partners.map((partner, index) => (
                <div key={index} className="text-2xl font-bold text-gray-400 dark:text-gray-600 hover:text-[#FF4B6E] dark:hover:text-[#FF8FA3] transition-colors">
                  {partner.logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="relative px-6 py-20 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#FF4B6E] font-semibold text-sm uppercase tracking-wider">Features</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 mt-2">
                Why Choose <span className="bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] bg-clip-text text-transparent">Luntra?</span>
              </h2>
              <p className="text-xl text-[#777777] dark:text-gray-300 max-w-2xl mx-auto">
                We've built the features that matter most for finding genuine connections in the digital age
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-8 bg-white dark:bg-gray-800 rounded-3xl border border-[#F0F0F0] dark:border-gray-700 hover:border-[#FF4B6E]/30 dark:hover:border-[#FF8FA3]/30 hover:shadow-2xl transition-all duration-300 animate-fade-in-up relative overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-3 dark:text-white">{feature.title}</h3>
                  <p className="text-[#777777] dark:text-gray-400 leading-relaxed mb-4">{feature.description}</p>

                  <div className="flex items-center text-[#FF4B6E] dark:text-[#FF8FA3] font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Feature highlight number */}
                  <div className="absolute top-4 right-4 text-4xl font-bold text-gray-100 dark:text-gray-700 opacity-50">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Feature Showcase */}
        <section className="relative px-6 py-20 md:px-12 lg:px-20 bg-gradient-to-br from-[#FF4B6E]/5 to-[#FF8FA3]/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#FF4B6E] font-semibold text-sm uppercase tracking-wider">Interactive Demo</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 mt-2">
                  See How It{' '}
                  <span className="bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] bg-clip-text text-transparent">
                    Works
                  </span>
                </h2>

                <div className="space-y-6">
                  {featuresShowcase.map((item, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${activeFeature === index
                        ? 'bg-white dark:bg-gray-800 shadow-xl scale-105'
                        : 'hover:bg-white/50 dark:hover:bg-gray-800/50'
                        }`}
                      onMouseEnter={() => setActiveFeature(index)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`text-4xl bg-gradient-to-br ${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white`}>
                          {item.image}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2 dark:text-white">{item.title}</h3>
                          <p className="text-[#777777] dark:text-gray-400">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 aspect-square flex items-center justify-center">
                  <div className="text-8xl animate-float">
                    {featuresShowcase[activeFeature].image}
                  </div>

                  {/* Animated rings */}
                  <div className="absolute inset-0 border-2 border-[#FF4B6E]/20 rounded-3xl animate-ping-slow" />
                  <div className="absolute inset-4 border-2 border-[#FF8FA3]/20 rounded-3xl animate-ping-slower" />
                </div>

                {/* Feature points */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] text-white px-6 py-3 rounded-full shadow-xl">
                  <span className="font-bold">✨ New Feature</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="relative px-6 py-20 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#FF4B6E] font-semibold text-sm uppercase tracking-wider">Simple Process</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 mt-2">
                How{' '}
                <span className="bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] bg-clip-text text-transparent">
                  Luntra
                </span>{' '}
                Works
              </h2>
              <p className="text-xl text-[#777777] dark:text-gray-300 max-w-2xl mx-auto">
                Four simple steps to find your perfect match
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] transform -translate-y-1/2" />

              {howItWorks.map((item, index) => (
                <div key={index} className="relative group">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center relative z-10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                      {item.icon}
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#FF4B6E] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold mb-2 dark:text-white">{item.title}</h3>
                    <p className="text-sm text-[#777777] dark:text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Counter */}
        <section className="relative px-6 py-20 md:px-12 lg:px-20 bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">
                    {stat.number}
                  </div>
                  <div className="text-sm opacity-90 flex items-center justify-center gap-1">
                    {stat.icon}
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section id="stories" className="relative px-6 py-20 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#FF4B6E] font-semibold text-sm uppercase tracking-wider">Love Stories</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 mt-2">
                Real Stories,{' '}
                <span className="bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] bg-clip-text text-transparent">
                  Real Love
                </span>
              </h2>
              <p className="text-xl text-[#777777] dark:text-gray-300">
                Over 500,000 couples have found their match on Luntra
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF4B6E]/10 to-[#FFB347]/10 rounded-full blur-3xl" />

                {/* Success counter */}
                <div className="absolute top-8 left-8 bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] text-white px-4 py-2 rounded-full text-sm font-bold">
                  ⭐ Success Story #{String(activeTestimonial + 1).padStart(3, '0')}
                </div>

                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-500 ${index === activeTestimonial
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 absolute inset-0 translate-x-8 pointer-events-none'
                      }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="text-7xl mb-6 animate-float">{testimonial.image}</div>

                      <div className="flex gap-4 mb-6">
                        <div className="bg-[#FF4B6E]/10 text-[#FF4B6E] px-4 py-2 rounded-full text-sm">
                          💑 {testimonial.yearsTogether}
                        </div>
                        <div className="bg-[#28C76F]/10 text-[#28C76F] px-4 py-2 rounded-full text-sm">
                          ⚡ {testimonial.matchScore} Match
                        </div>
                      </div>

                      <p className="text-2xl md:text-3xl font-medium mb-6 leading-relaxed text-[#1E1E1E] dark:text-white">
                        "{testimonial.text}"
                      </p>

                      <div className="mb-4">
                        <div className="font-bold text-lg text-[#FF4B6E]">{testimonial.name}</div>
                        <div className="text-[#777777] dark:text-gray-400 flex items-center gap-1 justify-center">
                          <MapPin className="w-4 h-4" />
                          {testimonial.location}
                        </div>
                      </div>

                      {/* Rating stars */}
                      <div className="flex gap-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex gap-2 mt-8 justify-center">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`transition-all ${index === activeTestimonial
                        ? 'bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] w-8 h-3'
                        : 'bg-[#FF4B6E]/30 w-3 h-3 hover:bg-[#FF4B6E]/50'
                        } rounded-full`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="relative px-6 py-20 md:px-12 lg:px-20 bg-gradient-to-br from-[#FFF5F7] to-white dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#FF4B6E] font-semibold text-sm uppercase tracking-wider">Community</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 mt-2">
                Upcoming{' '}
                <span className="bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] bg-clip-text text-transparent">
                  Events
                </span>
              </h2>
              <p className="text-xl text-[#777777] dark:text-gray-300">
                Join our community events and meet people naturally
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="group bg-white dark:bg-gray-800 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {event.image}
                  </div>
                  <h3 className="text-lg font-bold mb-2 dark:text-white">{event.title}</h3>
                  <div className="space-y-2 text-sm text-[#777777] dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {event.attendees}
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Hosted by {event.host}
                    </div>
                  </div>
                  <button className="text-[#FF4B6E] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Join Event <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="bg-white dark:bg-gray-800 text-[#FF4B6E] dark:text-[#FF8FA3] px-8 py-3 rounded-full font-semibold border-2 border-[#FF4B6E]/20 hover:border-[#FF4B6E] transition-all">
                View All Events
              </button>
            </div>
          </div>
        </section>

        {/* Safety Section */}
        <section className="relative px-6 py-20 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#FF4B6E] font-semibold text-sm uppercase tracking-wider">Safety First</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 mt-2">
                  Your{' '}
                  <span className="bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] bg-clip-text text-transparent">
                    Safety
                  </span>{' '}
                  Is Our Priority
                </h2>
                <p className="text-lg text-[#777777] dark:text-gray-300 mb-8">
                  We've implemented industry-leading safety features to ensure you can focus on finding love, worry-free.
                </p>

                <div className="grid grid-cols-2 gap-6">
                  {safetyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#FF4B6E]/10 rounded-lg flex items-center justify-center text-[#FF4B6E]">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 dark:text-white">{feature.title}</h4>
                        <p className="text-sm text-[#777777] dark:text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-[#28C76F]/10 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <Shield className="w-8 h-8 text-[#28C76F]" />
                    <div>
                      <h4 className="font-bold mb-1 dark:text-white">100% Verified Profiles</h4>
                      <p className="text-sm text-[#777777] dark:text-gray-400">
                        Every profile goes through our rigorous verification process to ensure authenticity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="/images/safety.jpg"
                  width={600}
                  height={400}
                  alt="Safety"
                  className="rounded-3xl shadow-2xl"
                />

                {/* Floating safety badges */}
                <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl animate-float">
                  <Shield className="w-8 h-8 text-[#28C76F]" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl animate-float-delayed">
                  <Check className="w-8 h-8 text-[#FF4B6E]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="relative px-6 py-20 md:px-12 lg:px-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#FF4B6E] font-semibold text-sm uppercase tracking-wider">Blog</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 mt-2">
                Latest{' '}
                <span className="bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] bg-clip-text text-transparent">
                  Articles
                </span>
              </h2>
              <p className="text-xl text-[#777777] dark:text-gray-300">
                Dating tips, advice, and success stories
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                >
                  <div className="bg-gradient-to-br from-[#FF4B6E]/10 to-[#FF8FA3]/10 rounded-2xl h-48 mb-4 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
                    📝
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#FF4B6E] bg-[#FF4B6E]/10 px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-[#777777] dark:text-gray-400">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#FF4B6E] transition-colors dark:text-white">
                    {post.title}
                  </h3>
                  <p className="text-[#777777] dark:text-gray-400 text-sm mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#777777] dark:text-gray-400">
                      By {post.author}
                    </span>
                    <span className="text-sm text-[#777777] dark:text-gray-400">
                      {post.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="text-[#FF4B6E] font-semibold flex items-center gap-2 mx-auto group">
                Read All Articles
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative px-6 py-20 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#FF4B6E] font-semibold text-sm uppercase tracking-wider">FAQ</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 mt-2">
                Frequently Asked{' '}
                <span className="bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 cursor-pointer group hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold dark:text-white">{faq.question}</h3>
                    <ChevronRight className="w-5 h-5 text-[#FF4B6E] group-hover:rotate-90 transition-transform" />
                  </div>
                  <p className="text-[#777777] dark:text-gray-400 mt-2 text-sm">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="relative px-6 py-20 md:px-12 lg:px-20 bg-gradient-to-br from-[#FFF5F7] to-white dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#FF4B6E] font-semibold text-sm uppercase tracking-wider">Pricing</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 mt-2">
                Choose Your{' '}
                <span className="bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] bg-clip-text text-transparent">
                  Plan
                </span>
              </h2>
              <p className="text-xl text-[#777777] dark:text-gray-300">
                Start for free, upgrade when you're ready for more features
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Free Plan */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border-2 border-[#F0F0F0] dark:border-gray-700 hover:border-[#FF4B6E]/30 transition-all group">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 dark:text-white">Free</h3>
                  <div className="text-4xl font-bold dark:text-white">$0<span className="text-lg text-[#777777] dark:text-gray-400 font-normal">/month</span></div>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-[#777777] dark:text-gray-400">
                    <Check className="w-5 h-5 text-[#28C76F]" />
                    <span>10 likes per day</span>
                  </li>
                  <li className="flex items-center gap-3 text-[#777777] dark:text-gray-400">
                    <Check className="w-5 h-5 text-[#28C76F]" />
                    <span>Basic matching algorithm</span>
                  </li>
                  <li className="flex items-center gap-3 text-[#777777] dark:text-gray-400">
                    <Check className="w-5 h-5 text-[#28C76F]" />
                    <span>Send up to 50 messages</span>
                  </li>
                  <li className="flex items-center gap-3 text-[#777777] dark:text-gray-400 opacity-50">
                    <Check className="w-5 h-5" />
                    <span>See who liked you</span>
                  </li>
                </ul>

                <button className="w-full bg-[#FF4B6E]/10 text-[#FF4B6E] py-3 rounded-full font-semibold hover:bg-[#FF4B6E]/20 transition-all">
                  Get Started
                </button>
              </div>

              {/* Premium Plan */}
              <div className="bg-gradient-to-br from-[#FF4B6E] to-[#FF8FA3] rounded-3xl p-8 text-white transform scale-105 shadow-2xl relative group hover:scale-110 transition-all duration-300">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFB347] text-[#1E1E1E] px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular 🔥
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Premium</h3>
                  <div className="text-4xl font-bold">$19<span className="text-lg font-normal opacity-90">/month</span></div>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5" />
                    <span>Unlimited likes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5" />
                    <span>Advanced AI matching</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5" />
                    <span>Unlimited messages</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5" />
                    <span>See who liked you</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5" />
                    <span>Boost your profile weekly</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5" />
                    <span>Video chat with matches</span>
                  </li>
                </ul>

                <button className="w-full bg-white text-[#FF4B6E] py-3 rounded-full font-semibold hover:shadow-lg transition-all group-hover:scale-105">
                  Get Premium
                </button>
              </div>

              {/* VIP Plan */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border-2 border-[#F0F0F0] dark:border-gray-700 hover:border-[#FF4B6E]/30 transition-all group">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 dark:text-white flex items-center gap-2">
                    VIP <Crown className="w-5 h-5 text-[#FFB347]" />
                  </h3>
                  <div className="text-4xl font-bold dark:text-white">$39<span className="text-lg text-[#777777] dark:text-gray-400 font-normal">/month</span></div>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-[#777777] dark:text-gray-400">
                    <Check className="w-5 h-5 text-[#28C76F]" />
                    <span>Everything in Premium</span>
                  </li>
                  <li className="flex items-center gap-3 text-[#777777] dark:text-gray-400">
                    <Check className="w-5 h-5 text-[#28C76F]" />
                    <span>Priority matching</span>
                  </li>
                  <li className="flex items-center gap-3 text-[#777777] dark:text-gray-400">
                    <Check className="w-5 h-5 text-[#28C76F]" />
                    <span>Profile verification badge</span>
                  </li>
                  <li className="flex items-center gap-3 text-[#777777] dark:text-gray-400">
                    <Check className="w-5 h-5 text-[#28C76F]" />
                    <span>1-on-1 relationship coaching</span>
                  </li>
                  <li className="flex items-center gap-3 text-[#777777] dark:text-gray-400">
                    <Check className="w-5 h-5 text-[#28C76F]" />
                    <span>Exclusive event access</span>
                  </li>
                </ul>

                <button className="w-full bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all group-hover:scale-105">
                  Get VIP
                </button>
              </div>
            </div>

            {/* Money back guarantee */}
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-lg">
                <Shield className="w-5 h-5 text-[#28C76F]" />
                <span className="text-sm font-medium dark:text-white">30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </section>

        {/* Download App Section */}
        <section className="relative px-6 py-20 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] rounded-3xl p-12 md:p-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />

              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-white">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Download the Luntra App
                  </h2>
                  <p className="text-xl opacity-90 mb-8">
                    Find love on the go with our mobile app. Available on iOS and Android.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <button className="bg-black text-white px-8 py-3 rounded-xl flex items-center gap-3 hover:scale-105 transition-transform">
                      <div className="text-2xl">🍎</div>
                      <div className="text-left">
                        <div className="text-xs">Download on the</div>
                        <div className="text-lg font-semibold">App Store</div>
                      </div>
                    </button>

                    <button className="bg-black text-white px-8 py-3 rounded-xl flex items-center gap-3 hover:scale-105 transition-transform">
                      <div className="text-2xl">📱</div>
                      <div className="text-left">
                        <div className="text-xs">Get it on</div>
                        <div className="text-lg font-semibold">Google Play</div>
                      </div>
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mt-8">
                    <div className="flex -space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white" />
                      ))}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm opacity-90">Rated 4.9 by 100K+ users</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="w-64 h-64 mx-auto relative">
                    <div className="absolute inset-0 bg-white/20 rounded-3xl rotate-6 animate-float" />
                    <div className="absolute inset-0 bg-white/20 rounded-3xl -rotate-6 animate-float-delayed" />
                    <div className="absolute inset-0 bg-white rounded-3xl flex items-center justify-center text-6xl shadow-2xl">
                      📱
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative px-6 py-20 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-[#FF4B6E] to-[#FF8FA3] rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />

              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Your Love Story Starts Here
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Join millions of people finding meaningful connections every day. Your perfect match is waiting.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => router.push('/sign-up')}
                    className="group bg-white text-[#FF4B6E] px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-2"
                  >
                    Create Free Account
                    <Heart className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                  </button>

                  <button className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                    Learn More
                  </button>
                </div>

                {/* Trust indicators */}
                <div className="flex items-center justify-center gap-6 mt-8 text-white/80">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Cancel anytime</span>
                  </div>
                </div>
              </div>

              {/* Floating hearts animation */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform" />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative px-6 py-12 md:px-12 lg:px-20 bg-[#1E1E1E] dark:bg-gray-950 text-white">
          <div className="max-w-7xl mx-auto">
            {/* Newsletter */}
            <div className="border-b border-white/10 pb-12 mb-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
                  <p className="text-[#AAAAAA]">Get dating tips and success stories in your inbox</p>
                </div>
                <div className="flex gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-white/10 rounded-full text-white placeholder:text-[#AAAAAA] focus:outline-none focus:ring-2 focus:ring-[#FF4B6E]"
                  />
                  <button className="bg-gradient-to-r from-[#FF4B6E] to-[#FF8FA3] px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Footer links */}
            <div className="grid md:grid-cols-5 gap-8 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-6 h-6 text-[#FF4B6E] fill-[#FF4B6E]" />
                  <span className="text-xl font-bold">Luntra</span>
                </div>
                <p className="text-[#AAAAAA] mb-4">
                  Building meaningful connections, one match at a time. Join our community of love-seekers today.
                </p>
                <div className="flex gap-4">
                  {[Instagram, Twitter, Facebook, Linkedin].map((Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF4B6E] transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-[#AAAAAA]">
                  <li><Link href="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                  <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
                  <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">Support</h4>
                <ul className="space-y-2 text-[#AAAAAA]">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Community Guidelines</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">Legal</h4>
                <ul className="space-y-2 text-[#AAAAAA]">
                  <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[#AAAAAA] text-sm">
              <p>&copy; 2026 Luntra. All rights reserved. Made with ❤️ for everyone seeking love.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
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
          
          @keyframes float-slow {
            0%, 100% { transform: translateY(0px) rotate(-3deg); }
            50% { transform: translateY(-10px) rotate(-3deg); }
          }
          
          @keyframes float-random {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-10px) translateX(-10px); }
            75% { transform: translateY(-30px) translateX(5px); }
          }
          
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
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
          
          @keyframes scroll {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(15px); opacity: 0; }
          }
          
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes ping-slow {
            0% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.2); opacity: 0.1; }
            100% { transform: scale(1.4); opacity: 0; }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .animate-float-delayed {
            animation: float-delayed 8s ease-in-out infinite;
          }
          
          .animate-float-slow {
            animation: float-slow 10s ease-in-out infinite;
          }
          
          .animate-float-random {
            animation: float-random 15s ease-in-out infinite;
          }
          
          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }
          
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 0.6s ease-out forwards;
            opacity: 0;
          }
          
          .animate-bounce-subtle {
            animation: bounce-subtle 2s ease-in-out infinite;
          }
          
          .animate-scroll {
            animation: scroll 1.5s ease-in-out infinite;
          }
          
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 4s ease infinite;
          }
          
          .animate-ping-slow {
            animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
          
          .animate-ping-slower {
            animation: ping-slow 4s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
          
          .animation-delay-200 {
            animation-delay: 200ms;
          }
          
          .animation-delay-500 {
            animation-delay: 500ms;
          }
          
          .animation-delay-1000 {
            animation-delay: 1000ms;
          }
        `}</style>
      </div>
    </div>
  );
}
