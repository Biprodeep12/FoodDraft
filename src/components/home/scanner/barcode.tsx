import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { useProduct } from "@/Context/productContext";

export const BarcodeScanner = () => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setBarcode } = useProduct();

  const startScanner = async () => {
    if (isScanning) return;
    setIsScanning(true);
    setError(null);
    setResult(null);

    try {
      const devices = await Html5Qrcode.getCameras();
      const cameraId = devices.find(device => device.label.toLowerCase().includes("back"))?.id 
              || devices[0]?.id;


      if (!cameraId) {
        setError("No camera found.");
        setIsScanning(false);
        return;
      }

      const html5QrCode = new Html5Qrcode("scanner");
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        cameraId,
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          setBarcode(decodedText);
          setResult(decodedText);
          stopScanner();
        },
        (scanError) => {
          console.warn("Scan error:", scanError);
        }
      );
    } catch (err) {
      console.error("Failed to start scanner:", err);
      setError("Failed to start scanner.");
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current?.getState() === Html5QrcodeScannerState.NOT_STARTED) {
      return;
    }
    try {
      await scannerRef.current?.stop();
      await scannerRef.current?.clear();
    } catch (err) {
      console.warn("Error while stopping scanner:", err);
    }
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div className="text-center">
      <div
        id="scanner"
        className="w-[300px] h-[300px] my-4 mx-auto border-2 border-dashed rounded-2xl"
      />
      {result && <p className="mt-2 text-green-600 font-semibold">✅ Scanned: {result}</p>}
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      <button
        onClick={isScanning ? stopScanner : startScanner}
        className={`mt-4 text-xl text-white cursor-pointer font-bold rounded-xl py-2 px-4 ${
          isScanning ? "bg-red-600" : "bg-blue-600"
        }`}
      >
        {isScanning ? "Stop Scanner" : "Start Scanner"}
      </button>
    </div>
  );
};
