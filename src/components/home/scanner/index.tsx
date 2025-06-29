import type React from "react"
import { ArrowLeft, LoaderCircle, X, Upload, Keyboard, Camera } from "lucide-react"
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode"
import { useProduct } from "@/Context/productContext"
import { useEffect, useRef, useState } from "react"

interface Props {
  openScanner: boolean
  setOpenScanner: React.Dispatch<React.SetStateAction<boolean>>
}

const Scanner = ({ openScanner, setOpenScanner }: Props) => {
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showManualInput, setShowManualInput] = useState(false)
  const [manualBarcode, setManualBarcode] = useState("")
  const { setBarcode } = useProduct()

  const startScanner = async () => {
    if (isScanning || loading) return

    setLoading(true)
    setError(null)
    setResult(null)
    setShowManualInput(false)

    await new Promise((resolve) => setTimeout(resolve, 100))

    try {
      const scannerElement = document.getElementById("scanner")
      if (!scannerElement) {
        setError("Scanner element not found.")
        setLoading(false)
        return
      }

      const devices = await Html5Qrcode.getCameras()
      console.log("Available cameras:", devices)

      if (devices.length === 0) {
        setError("No cameras found on this device.")
        setLoading(false)
        return
      }

      const cameraId = devices.find((device) => device.label.toLowerCase().includes("back"))?.id || devices[0]?.id

      console.log("Using camera:", cameraId)

      const html5QrCode = new Html5Qrcode("scanner")
      scannerRef.current = html5QrCode

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      }

      await html5QrCode.start(
        cameraId,
        config,
        (decodedText) => {
          console.log("Barcode scanned:", decodedText)
          setBarcode(decodedText)
          setResult(decodedText)
          setOpenScanner(false)
          stopScanner()
        },
        (scanError) => {
          console.log(scanError)
        },
      )

      setIsScanning(true)
      console.log("Scanner started successfully")
    } catch (err) {
      console.error("Failed to start scanner:", err)
      setError(`Failed to start scanner: ${err instanceof Error ? err.message : "Unknown error"}`)
      setIsScanning(false)
    } finally {
      setLoading(false)
    }
  }

  const stopScanner = async () => {
    if (scannerRef.current?.getState() === Html5QrcodeScannerState.NOT_STARTED) {
      return
    }

    try {
      await scannerRef.current?.stop()
      await scannerRef.current?.clear()
    } catch (err) {
      console.warn("Error while stopping scanner:", err)
    }
    setIsScanning(false)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const html5QrCode = new Html5Qrcode("scanner")
      const result = await html5QrCode.scanFile(file, true)
      setBarcode(result)
      setResult(result)
      setOpenScanner(false)
    } catch (err) {
      console.error("Failed to scan file:", err)
      setError("Failed to scan the uploaded image. Please try a different image.")
    } finally {
      setLoading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleManualSubmit = () => {
    if (manualBarcode.trim()) {
      setBarcode(manualBarcode.trim())
      setResult(manualBarcode.trim())
      setOpenScanner(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleManualSubmit()
    }
  }

  useEffect(() => {
    if (openScanner) {
      startScanner()
    } else {
      stopScanner()
    }

    return () => {
      stopScanner()
    }
  }, [openScanner])

  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      #scanner video {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        border-radius: 1rem !important;
      }
      #scanner canvas {
        display: none !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div
      className={`fixed ${
        openScanner ? "scale-100 opacity-100" : "scale-0 opacity-0"
      } transition-all duration-300 bg-gradient-to-br from-gray-900 via-black to-gray-800 inset-0 z-50 flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 bg-black/20 backdrop-blur-sm">
        <button
          onClick={() => {
            stopScanner()
            setOpenScanner(false)
          }}
          className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-white font-semibold text-lg">Scan Barcode</h2>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
        {!showManualInput && (
          <div className="relative w-full max-w-[400px] mx-auto">
            <div
              id="scanner"
              className="w-full h-[400px] rounded-2xl border-4 border-white/20 shadow-2xl overflow-hidden bg-black/20"
              style={{ minHeight: "400px" }}
            />
          </div>
        )}

        {showManualInput && (
          <div className="w-full max-w-md p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-xl">
            <div className="space-y-4">
              <div className="text-center">
                <Keyboard className="mx-auto mb-2 text-white" size={32} />
                <h3 className="text-white font-semibold">Enter Barcode Manually</h3>
                <p className="text-white/70 text-sm">Type or paste the barcode number</p>
              </div>
              <input
                type="text"
                value={manualBarcode}
                onChange={(e) => setManualBarcode(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter barcode..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowManualInput(false)}
                  className="flex-1 px-4 py-2 bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleManualSubmit}
                  disabled={!manualBarcode.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-2xl">
            <div className="text-center">
              <LoaderCircle size={48} className="animate-spin text-blue-400 mx-auto mb-2" />
              <p className="text-white font-medium">Processing...</p>
            </div>
          </div>
        )}

        {result && (
          <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg backdrop-blur-sm">
            <p className="text-green-400 font-semibold text-center">✅ Scanned: {result}</p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg backdrop-blur-sm">
            <p className="text-red-400 font-semibold text-center">{error}</p>
          </div>
        )}
      </div>

      <div className="p-6 bg-black/20 backdrop-blur-sm">
        <div className="flex justify-center gap-6">
          <div className="text-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 text-white border-2 border-white/20 hover:border-white/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Upload size={24} />
            </button>
            <p className="text-white/70 text-xs mt-2">Upload</p>
          </div>

          <div className="text-center">
            <button
              onClick={isScanning ? stopScanner : startScanner}
              disabled={loading || showManualInput}
              className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-500 hover:border-blue-400 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isScanning ? <X size={24} /> : <Camera size={24} />}
            </button>
            <p className="text-white/70 text-xs mt-2">{isScanning ? "Stop" : "Camera"}</p>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setShowManualInput(!showManualInput)
                if (isScanning) stopScanner()
              }}
              disabled={loading}
              className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 text-white border-2 border-white/20 hover:border-white/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Keyboard size={24} />
            </button>
            <p className="text-white/70 text-xs mt-2">Manual</p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-white/60 text-sm">
            {showManualInput
              ? "Enter barcode manually or switch to camera/upload"
              : isScanning
                ? "Point camera at barcode or QR code"
                : "Choose camera, upload image, or enter manually"}
          </p>
        </div>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
    </div>
  )
}

export default Scanner
