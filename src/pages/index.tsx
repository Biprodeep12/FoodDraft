import Scanner from "@/components/home/scanner";
import { Scan, ScanLine, Shield, Zap } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [openScanner, setOpenScanner] = useState(false)
  return (
    <>
    <div className="w-full flex px-4 bg-emerald-200 justify-center">
      <div className="flex flex-col items-center max-w-[1440px] w-full">
        <div className="rounded-2xl max-w-[700px] w-full gap-6 shadow-lg bg-white flex flex-col items-center my-8 mx-5 text-center p-8">
          <div className="text-4xl md:text-6xl font-bold text-gray-900">
                Know What You&apos;re
            <span className="text-emerald-500 block">Eating</span>
          </div>
          <p className="text-xl text-gray-600">
              Scan any food barcode to instantly get detailed nutritional information, ingredients, and health
              insights.
          </p>
          <button onClick={()=>setOpenScanner(true)} className="rounded-[10px] cursor-pointer hover:scale-110 transition-all duration-200 text-xl font-bold text-white bg-emerald-500 py-2 px-2 flex gap-3 flex-row items-center">
            Scan Now 
            <ScanLine size={30} color="white" />
          </button>
          <div className="p-4 w-full bg-blue-50 rounded-xl text-left">
            <h3 className="font-semibold text-xl text-blue-900 mb-2">Scanning Tips:</h3>
            <ul className="text-base text-blue-800 space-y-1">
              <li>• Ensure good lighting</li>
              <li>• Hold camera steady</li>
              <li>• Keep barcode in frame</li>
            </ul>
         </div>
        </div>
      </div>
    </div>
    <div className="flex items-center px-4 py-8 w-full bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="text-center p-6 bg-white rounded-xl shadow-lg">
          <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Scan className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Scanning</h3>
          <p className="text-gray-600">Quick barcode recognition with our advanced scanning technology</p>
        </div>

        <div className="text-center p-6 bg-white rounded-xl shadow-lg">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Analysis</h3>
          <p className="text-gray-600">Complete nutritional breakdown with daily value percentages</p>
        </div>

        <div className="text-center p-6 bg-white rounded-xl shadow-lg">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Health Insights</h3>
          <p className="text-gray-600">Get personalized recommendations based on your dietary needs</p>
        </div>
      </div>
    </div>
    <Scanner openScanner={openScanner} setOpenScanner={setOpenScanner}/>
    </>
  );
}
