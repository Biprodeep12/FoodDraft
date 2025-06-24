import DrawerPop from "@/components/home/drawerPop";
import Scanner from "@/components/home/scanner";
import { Apple, ArrowRight, CheckCircle, Scan, ScanLine, Shield, Star, Zap } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [openScanner, setOpenScanner] = useState(false)
  return (
    <>
      <div className="min-h-screen w-full flex px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-100 justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl"></div>
        </div> 

        <div className="flex flex-col items-center max-w-6xl w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 my-12 lg:my-20">
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-700 rounded-full text-sm font-medium mb-6">
                  <Star className="w-4 h-4" />
                  Trusted by 10,000+ users
                </span>
              </div>

              <div className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Know What You&apos;re
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600 block">
                  Eating
                </span>
              </div>

              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Scan any food barcode to instantly get detailed nutritional information, ingredients, and personalized
                health insights. Make informed choices for a healthier lifestyle.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <button
                  onClick={() => setOpenScanner(true)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div className="relative flex items-center gap-3">
                    <ScanLine className="w-6 h-6" />
                    Start Scanning
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>

                <button className="px-8 py-4 cursor-pointer text-lg font-semibold text-gray-700 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300">
                  Learn More
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>No Registration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
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

      <div className="w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Why Choose Our Scanner?</div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
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
                title: "Comprehensive Analysis",
                description:
                  "Get detailed nutritional breakdowns, ingredient lists, allergen warnings, and daily value percentages.",
                color: "blue",
                gradient: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-50",
                iconColor: "text-blue-600",
              },
              {
                icon: Shield,
                title: "Personalized Insights",
                description:
                  "Receive tailored health recommendations based on your dietary preferences and nutritional goals.",
                color: "purple",
                gradient: "from-purple-500 to-purple-600",
                bgColor: "bg-purple-50",
                iconColor: "text-purple-600",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
                ></div>

                <div className="relative">
                  <div
                    className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {feature.description}
                  </p>

                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowRight className={`w-5 h-5 ${feature.iconColor}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 sm:p-12 text-white">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { number: "1M+", label: "Products Scanned" },
                { number: "50K+", label: "Happy Users" },
                { number: "99.9%", label: "Accuracy Rate" },
                { number: "24/7", label: "Available" },
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="text-3xl sm:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-emerald-100 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-gradient-to-r from-gray-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, #3b82f6 0%, transparent 50%)`,
            }}
          ></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Download Our App</h2>
              <p className="text-gray-300 text-lg sm:text-xl mb-8 max-w-2xl mx-auto lg:mx-0">
                Get the best scanning experience on your mobile device with our dedicated app.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="group flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                    <Apple className="w-6 h-6 text-black" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download on the</div>
                    <div className="text-white font-semibold">App Store</div>
                  </div>
                </button>

                <button className="group flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Get it on</div>
                    <div className="text-white font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="w-full max-w-sm lg:max-w-md">
              <div className="relative mx-auto w-[280px]">
                <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-2 rounded-[2.5rem] shadow-2xl">
                  <div className="bg-black rounded-[2.25rem] p-1">
                    <div className="bg-white rounded-[2rem] aspect-[9/19] overflow-hidden relative">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-10"></div>

                      <div className="h-full bg-gradient-to-br from-emerald-50 to-teal-50 flex flex-col">
                        <div className="h-10 flex items-center justify-between px-6 pt-2">
                          <div className="font-semibold text-sm">9:41</div>
                          <div className="flex items-center gap-1">
                            <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                            <div className="w-6 h-3 border border-gray-400 rounded-sm">
                              <div className="w-4 h-2 bg-green-500 rounded m-0.5"></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 px-6 py-4">
                          <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                              <ScanLine className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">NutriScan</h3>
                            <p className="text-gray-600 text-sm">Ready to scan</p>
                          </div>

                          <div className="bg-gray-900 rounded-2xl aspect-square flex items-center justify-center mb-4">
                            <div className="w-32 h-32 border-2 border-emerald-400 rounded-2xl flex items-center justify-center">
                              <div className="w-16 h-1 bg-emerald-400 animate-pulse"></div>
                            </div>
                          </div>

                          <button className="w-full bg-emerald-500 text-white font-semibold py-3 rounded-xl">
                            Tap to Scan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 w-6 h-6 bg-emerald-400 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-5 h-5 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Scanner openScanner={openScanner} setOpenScanner={setOpenScanner} />
      <DrawerPop />
    </>
  );
}
