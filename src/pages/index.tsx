import type React from "react"

import Scanner from "@/components/home/scanner"

import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Github,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Play,
  Scan,
  ScanLine,
  Search,
  Shield,
  User,
  X,
  Youtube,
  Zap,
} from "lucide-react"

import { useState } from "react"
import { useAuth } from "@/Context/userContext"
import Image from "next/image"

export default function Home() {
  const [openScanner, setOpenScanner] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user } = useAuth()

  const HandlePush = () => {
    if (!searchInput) return
    window.open(`/search/${searchInput}`, "_blank", "noopener,noreferrer")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      HandlePush()
    }
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <>
      <div className="min-h-screen w-full flex px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-100 justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl"></div>
        </div>

        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <ScanLine className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black text-gray-900">
                  Food
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                    Draft
                  </span>
                </span>
              </div>

              <div className="hidden md:flex items-center gap-8">
                <a href="#"
                  className="text-gray-700 hover:text-emerald-600 font-semibold transition-colors duration-300"
                >
                  Features
                </a>
                <a href="#how-it-works"
                  className="text-gray-700 hover:text-emerald-600 font-semibold transition-colors duration-300"
                >
                  How it Works
                </a>
                <a href="#FAQ"
                  className="text-gray-700 hover:text-emerald-600 font-semibold transition-colors duration-300"
                >
                  FAQ
                </a>
                <button onClick={() => setOpenScanner(true)}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 cursor-pointer rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Try Scanner
                </button>
                {user && 
                <div className="relative cursor-pointer w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  {user?.photoURL ?
                    <Image
                      src={user.photoURL || '/default-avatar.png'}
                      alt={user.displayName || 'User'}
                      width={40}
                      height={40}
                    />
                    :
                    <User size={25} color='black'/>}
                </div>}
              </div>

              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-xl cursor-pointer bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 hover:text-emerald-600 transition-colors duration-300"
                  aria-label="Toggle mobile menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            <div
              className={`md:hidden transition-all duration-300 ease-in-out ${
                mobileMenuOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl mt-4 p-6 shadow-xl border border-white/20">
                <div className="flex flex-col space-y-4">
                  <a href="#"
                    className="text-left text-gray-700 hover:text-emerald-600 font-semibold transition-colors duration-300 py-2 px-4 rounded-xl hover:bg-emerald-50"
                  >
                    Features
                  </a>
                  <a href="#how-it-works"
                    className="text-left text-gray-700 hover:text-emerald-600 font-semibold transition-colors duration-300 py-2 px-4 rounded-xl hover:bg-emerald-50"
                  >
                    How it Works
                  </a>
                  <a href="#FAQ"
                    className="text-left text-gray-700 hover:text-emerald-600 font-semibold transition-colors duration-300 py-2 px-4 rounded-xl hover:bg-emerald-50"
                  >
                    FAQ
                  </a>
                  <button
                    onClick={() => {
                      setOpenScanner(true)
                      setMobileMenuOpen(false)
                    }}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 text-center"
                  >
                    Try Scanner
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex flex-col items-center max-w-6xl w-full relative z-10 pt-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 my-12 lg:my-20">
            <div className="flex-1 text-center lg:text-left">
              <div className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Know What You&apos;re
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600 block">
                  Eating
                </span>
              </div>
              <p className="text-lg sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Scan any food barcode to instantly get detailed nutritional information, ingredients, and personalized
                health insights. Make informed choices for a healthier lifestyle.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-8">
                <button
                  onClick={() => setOpenScanner(true)}
                  className="group relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 px-10 py-5 text-xl font-bold text-white shadow-2xl transition-all duration-300 hover:shadow-emerald-500/25 hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div className="relative flex items-center gap-4">
                    <ScanLine className="w-7 h-7" />
                    Start Scanning
                    <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                  </div>
                </button>
                <a href="#searchSect"
                  className="group px-8 py-5 cursor-pointer text-xl font-bold text-gray-600 hover:text-emerald-600 bg-white/90 backdrop-blur-sm border-2 border-gray-200 hover:border-emerald-300 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <Search className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
                    <span>Search</span>
                  </div>
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 font-bold">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span>No Registration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span>Instant Results</span>
                </div>
              </div>
            </div>

            <div className="w-full max-w-md lg:max-w-sm">
              <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-xl border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <ScanLine className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xl font-bold text-gray-900">Scanning Tips</div>
                </div>
                <div className="space-y-4">
                  {[
                    { icon: "💡", text: "Ensure good lighting conditions" },
                    { icon: "📱", text: "Hold your device steady" },
                    { icon: "🎯", text: "Keep barcode centered in frame" },
                    { icon: "🔍", text: "Move closer for small barcodes" },
                  ].map((tip, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl">
                      <span className="text-lg">{tip.icon}</span>
                      <span className="text-gray-700 font-medium">{tip.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="how-it-works"
        className="w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-gradient-to-br from-white to-gray-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-8">How It Works</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-medium">
              Get detailed food information in just three simple steps
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {[
              {
                step: "01",
                title: "Scan Barcode",
                description: "Point your camera at any food product barcode and let our AI do the work",
                icon: ScanLine,
              },
              {
                step: "02",
                title: "Get Analysis",
                description: "Receive instant detailed nutritional information, ingredients, and health insights",
                icon: Zap,
              },
              {
                step: "03",
                title: "Make Decisions",
                description: "Use personalized recommendations to make healthier food choices",
                icon: Heart,
              },
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-gradient-to-br from-white to-gray-50/50 p-12 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-100 group-hover:border-emerald-200">
                  <div className="flex items-center gap-6 mb-10">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-[2rem] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon className={`w-10 h-10 text-emerald-600`} />
                    </div>
                    <div
                      className={`text-7xl font-black text-emerald-200 group-hover:text-emerald-400 transition-colors duration-300`}
                    >
                      {item.step}
                    </div>
                  </div>
                  <div className="text-3xl font-black text-gray-900 mb-6 group-hover:text-emerald-700 transition-colors duration-300">
                    {item.title}
                  </div>
                  <p className="text-gray-600 leading-relaxed text-xl font-medium">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-13 transform -translate-y-1/2">
                    <ArrowRight className="w-10 h-10 text-emerald-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="w-full relative rounded-[50px_50px_0_0] md:rounded-[100px_100px_0_0] px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-gradient-to-br from-emerald-50 to-teal-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-5xl sm:text-6xl font-black text-gray-900 mb-8">Why Choose Our Scanner?</div>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-medium">
              Experience the most advanced food scanning technology with features designed to help you make better
              dietary choices.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Scan,
                title: "Lightning Fast Scanning",
                description:
                  "Advanced AI-powered barcode recognition that works in milliseconds, even in low light conditions.",
                color: "emerald",
                gradient: "from-emerald-500 to-emerald-600",
                bgColor: "bg-emerald-50",
                iconColor: "text-emerald-600",
              },
              {
                icon: Zap,
                title: "Detailed Nutritional Analysis",
                description:
                  "Get detailed nutritional breakdowns, complete ingredient lists, additives warnings, and daily value percentages for informed decisions.",
                color: "teal",
                gradient: "from-teal-500 to-teal-600",
                bgColor: "bg-teal-50",
                iconColor: "text-teal-600",
              },
              {
                icon: Shield,
                title: "AI-Powered Recommendations",
                description:
                  "Receive AI-driven personalized recommendations based on your dietary preferences, health goals, and nutritional needs.",
                color: "emerald",
                gradient: "from-emerald-600 to-teal-600",
                bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
                iconColor: "text-emerald-600",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white p-8 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-100"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-[2rem] transition-opacity duration-500`}
                ></div>
                <div className="relative">
                  <div
                    className={`w-24 h-24 ${feature.bgColor} rounded-[2rem] flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <feature.icon className={`w-12 h-12 ${feature.iconColor}`} />
                  </div>
                  <div className="text-2xl font-black text-gray-900 mb-6 group-hover:text-emerald-700 transition-colors">
                    {feature.title}
                  </div>
                  <p className="text-gray-600 leading-relaxed text-xl font-medium group-hover:text-gray-700 transition-colors">
                    {feature.description}
                  </p>
                  <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowRight className={`w-8 h-8 ${feature.iconColor}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div id="searchSect" className="h-20 absolute bottom-0 bg-amber-50"></div>
      </div>

      <div
        className="w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, #14b8a6 0%, transparent 50%)`,
            }}
          ></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="text-5xl sm:text-6xl font-black mb-10">Find What You&apos;re Looking For</div>
          <p className="text-2xl text-emerald-100 mb-12 font-medium">
            Search our extensive database of food items by name, brand, or category to get detailed nutritional
            information and insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="relative flex-grow max-sm:w-full max-w-2xl">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 z-10" />
              <input
                type="text"
                placeholder="e.g., 'apple', 'protein bar', 'oat milk'"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-16 pr-6 py-6 rounded-3xl bg-white/95 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-emerald-300/50 shadow-xl text-xl font-medium backdrop-blur-sm"
              />
            </div>
            <button
              onClick={HandlePush}
              className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white text-emerald-700 px-10 py-6 text-xl font-bold shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-emerald-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative flex items-center gap-4">
                Search Now
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, #14b8a6 0%, transparent 50%)`,
            }}
          ></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-5xl sm:text-6xl font-black text-white mb-10">Download Our App</h2>
              <p className="text-emerald-100 text-2xl mb-12 max-w-2xl mx-auto lg:mx-0 font-medium">
                Get the best scanning experience on your mobile device with our dedicated app. Available soon on iOS and
                Android.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <button className="group flex items-center justify-center gap-4 px-10 py-6 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-3xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <Play className="w-6 h-6 text-emerald-300" />
                  <span className="text-2xl text-white font-bold">Coming Soon to App Stores</span>
                </button>
              </div>
            </div>
            <div className="w-full max-w-sm lg:max-w-md">
              <div className="relative mx-auto w-[300px]">
                <div className="bg-gradient-to-br from-emerald-700 to-teal-800 p-3 rounded-[3rem] shadow-2xl">
                  <div className="bg-black rounded-[2.5rem] p-1">
                    <div className="bg-white rounded-[2.25rem] aspect-[9/19] overflow-hidden relative">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-10"></div>
                      <div className="h-full bg-gradient-to-br from-emerald-50 to-teal-50 flex flex-col">
                        <div className="h-12 flex items-center justify-between px-6 pt-3">
                          <div className="font-bold text-base">9:41</div>
                          <div className="flex items-center gap-1">
                            <div className="w-5 h-3 bg-green-500 rounded-sm"></div>
                            <div className="w-7 h-4 border border-gray-400 rounded-sm">
                              <div className="w-5 h-2 bg-green-500 rounded m-0.5"></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 px-6 py-6">
                          <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                              <ScanLine className="w-10 h-10 text-white" />
                            </div>
                            <div className="font-black text-gray-900 text-xl">NutriScan</div>
                            <p className="text-gray-600 text-base">Ready to scan</p>
                          </div>
                          <div className="bg-gray-900 rounded-3xl aspect-square flex items-center justify-center mb-6 shadow-inner">
                            <div className="w-36 h-36 border-4 border-emerald-400 rounded-3xl flex items-center justify-center">
                              <div className="w-20 h-2 bg-emerald-400 animate-pulse rounded-full"></div>
                            </div>
                          </div>
                          <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 rounded-2xl shadow-lg">
                            Tap to Scan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 w-8 h-8 bg-emerald-400 rounded-full animate-bounce shadow-lg"></div>
                <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-teal-400 rounded-full animate-pulse shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="FAQ"
        className="w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-gradient-to-br from-white to-emerald-50/30"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-8">Frequently Asked Questions</h2>
            <p className="text-2xl text-gray-600 font-medium">Everything you need to know about our food scanner</p>
          </div>
          <div className="space-y-8">
            {[
              {
                question: "How accurate is the nutritional information?",
                answer:
                  "Our database is sourced from official manufacturer data and verified nutritional databases, ensuring 99.9% accuracy. We continuously update our information to reflect the latest product formulations.",
              },
              {
                question: "Does the app work offline?",
                answer:
                  "The scanning feature requires an internet connection to access our comprehensive database. However, we're working on offline capabilities for frequently scanned items.",
              },
              {
                question: "Can I track my daily nutrition intake?",
                answer:
                  "Yes! Our app includes a comprehensive nutrition tracking feature that helps you monitor your daily intake of calories, macronutrients, vitamins, and minerals.",
              },
              {
                question: "Is my personal data secure?",
                answer:
                  "Absolutely. We use enterprise-grade encryption and never share your personal information with third parties. Your privacy and data security are our top priorities.",
              },
              {
                question: "What if a product isn't in your database?",
                answer:
                  "If we don't have a product in our database, you can submit it for review. Our team typically adds new products within 24-48 hours.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-[2rem] shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full cursor-pointer p-10 text-left flex items-center justify-between hover:bg-emerald-50/50 transition-colors duration-200 rounded-[2rem] group"
                >
                  <span className="font-black text-gray-900 text-2xl group-hover:text-emerald-700 transition-colors duration-200">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-8 h-8 text-gray-500 group-hover:text-emerald-600 transition-all duration-200 ${openFaq === index ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`${openFaq === index ? "opacity-100 max-h-96" : "opacity-0 max-h-0"} overflow-hidden transition-all duration-500`}
                >
                  <div className="px-10 pb-10">
                    <p className="text-gray-600 leading-relaxed text-xl font-medium">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center shadow-lg">
                  <ScanLine className="w-9 h-9 text-white" />
                </div>
                <span className="text-3xl font-black">FoodDraft</span>
              </div>
              <p className="text-emerald-100 mb-8 text-xl font-medium leading-relaxed">
                Making healthy eating choices easier with AI-powered food scanning technology.
              </p>
              <div className="flex gap-6">
                <Github
                  onClick={() => window.open(`https://github.com/Biprodeep12`, "_blank", "noopener,noreferrer")}
                  className="w-8 h-8 text-emerald-300 hover:text-white cursor-pointer transition-colors duration-300 hover:scale-110"
                />
                <Linkedin className="w-8 h-8 text-emerald-300 hover:text-white cursor-pointer transition-colors duration-300 hover:scale-110" />
                <Instagram className="w-8 h-8 text-emerald-300 hover:text-white cursor-pointer transition-colors duration-300 hover:scale-110" />
                <Youtube className="w-8 h-8 text-emerald-300 hover:text-white cursor-pointer transition-colors duration-300 hover:scale-110" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black mb-8 text-emerald-100">Product</div>
              <ul className="space-y-5 text-emerald-200">
                <li>
                  <a href="#FAQ"
                    className="hover:text-white transition-colors text-xl font-medium hover:translate-x-1 inline-block duration-200"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works"
                    className="hover:text-white transition-colors text-xl font-medium hover:translate-x-1 inline-block duration-200"
                  >
                    How it Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors text-xl font-medium hover:translate-x-1 inline-block duration-200"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors text-xl font-medium hover:translate-x-1 inline-block duration-200"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-2xl font-black mb-8 text-emerald-100">Support</div>
              <ul className="space-y-5 text-emerald-200">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors text-xl font-medium hover:translate-x-1 inline-block duration-200"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors text-xl font-medium hover:translate-x-1 inline-block duration-200"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors text-xl font-medium hover:translate-x-1 inline-block duration-200"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors text-xl font-medium hover:translate-x-1 inline-block duration-200"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-2xl font-black mb-8 text-emerald-100">Contact</div>
              <ul className="space-y-5 text-emerald-200">
                <li className="flex items-center gap-4 group">
                  <Mail className="w-6 h-6 group-hover:text-white transition-colors duration-200" />
                  <span className="text-xl font-medium group-hover:text-white transition-colors duration-200">
                    bipbose123@gmail.com
                  </span>
                </li>
                <li className="flex items-center gap-4 group">
                  <Phone className="w-6 h-6 group-hover:text-white transition-colors duration-200" />
                  <span className="text-xl font-medium group-hover:text-white transition-colors duration-200">
                    8100596282
                  </span>
                </li>
                <li className="flex items-center gap-4 group">
                  <MapPin className="w-6 h-6 group-hover:text-white transition-colors duration-200" />
                  <span className="text-xl font-medium group-hover:text-white transition-colors duration-200">
                    Kolkata, India
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-emerald-700/50 pt-10 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-emerald-200 text-xl font-medium">© 2024 FoodDraft. All rights reserved.</p>
            <p className="text-emerald-200 text-xl font-medium mt-6 sm:mt-0">Made with ❤️ for healthier living</p>
          </div>
        </div>
      </footer>

      <Scanner openScanner={openScanner} setOpenScanner={setOpenScanner} />
    </>
  )
}
