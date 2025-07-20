import Link from "next/link"
import { Home, ScanLine, Sparkles, Star } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-100 flex items-center justify-center px-4 pt-20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-3xl w-full text-center relative z-10">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-lg">
              <ScanLine className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <span className="text-4xl font-black text-gray-900">
              Food
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Draft</span>
            </span>
            <div className="text-sm text-gray-500 font-medium mt-1">Smart Food Scanner</div>
          </div>
        </div>

        <div className="relative mb-12">
          <div className="text-[8rem] sm:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 leading-none select-none">
            404
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-white/90 backdrop-blur-lg rounded-full flex items-center justify-center shadow-xl border border-white/50">
              <div className="text-4xl">🍕</div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">Oops! Page Not Found</h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg sm:text-xl text-gray-600 mb-4 leading-relaxed font-medium">
              Looks like this page went on a diet and disappeared!
            </p>
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
              Don't worry though - there's plenty of delicious content waiting for you on our main page.
            </p>
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <Link
            href="/"
            className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white px-10 py-4 rounded-3xl font-bold text-lg shadow-xl transition-all duration-300 hover:shadow-emerald-500/25 hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="relative flex items-center gap-3">
              <Home className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span>Back to Home</span>
            </div>
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="group bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-sm border border-white/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300">
              <ScanLine className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Smart Scanning</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Scan any food barcode for instant nutritional insights.
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-sm border border-white/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300">
              <div className="text-lg">📊</div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Detailed Analysis</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Get comprehensive nutrition facts and health scores.
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-sm border border-white/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">AI Insights</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Personalized recommendations powered by AI.</p>
          </div>
        </div>

        <div className="mt-12 text-gray-500">
          <p className="text-lg font-medium">Even the best food explorers take wrong turns sometimes! 🧭</p>
        </div>
      </div>
    </div>
  )
}
