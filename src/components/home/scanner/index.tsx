import { ArrowLeft, LoaderCircle, X, RotateCcw, Upload } from "lucide-react";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import { useProduct } from "@/Context/productContext";
import { useEffect, useRef, useState } from "react";

interface Props {
  openScanner: boolean;
  setOpenScanner: React.Dispatch<React.SetStateAction<boolean>>;
}

const Scanner = ({ openScanner, setOpenScanner }: Props) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setBarcode } = useProduct();

  const startScanner = async () => {
    if (isScanning || loading) return;
    setLoading(true);
    setIsScanning(true);
    setError(null);
    setResult(null);

    try {
      const devices = await Html5Qrcode.getCameras();
      const cameraId =
        devices.find((device) =>
          device.label.toLowerCase().includes("back")
        )?.id || devices[0]?.id;

      if (!cameraId) {
        setError("No camera found.");
        setIsScanning(false);
        setLoading(false);
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
          setOpenScanner(false);
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
    } finally {
      setLoading(false);
    }
  };

  const stopScanner = async () => {
    if (
      scannerRef.current?.getState() === Html5QrcodeScannerState.NOT_STARTED
    ) {
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
  if (openScanner) {
    startScanner();
  } else {
    stopScanner();
  }

  return () => {
    stopScanner();
  };
  },[!openScanner]);

  return (
    <div
      className={`fixed ${openScanner ? "scale-100 opacity-100" : "scale-0 opacity-0"} transition-all duration-300 bg-black inset-0 z-50 grid grid-rows-[20%_60%_20%]`}
    >
      <button onClick={() => {
        stopScanner();
        setOpenScanner(false);
        }}>
        <ArrowLeft size={30} color="white" className="cursor-pointer absolute top-4 left-4" />
      </button>
      <div id="scanner" className="max-w-[500px] max-h-[400px] overflow-hidden w-full self-center justify-self-center" />
      {loading ? (
        <div>
          <LoaderCircle size={40} color="white" className="animate-spin absolute top-1/2 left-1/2 -translate-1/2"/>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center">
          {result && (
            <p className="mt-2 text-green-600 font-semibold">
              ✅ Scanned: {result}
            </p>
          )}
          {error && (
            <p className="text-red-500 font-semibold">{error}</p>
          )}
          <div className="flex flex-row w-full justify-evenly">
            <button className="cursor-pointer rounded-full hover:bg-white/20 p-4">
              <Upload size={40} color="white"/>
            </button>
            <button
              onClick={isScanning ? stopScanner : startScanner}
              className="cursor-pointer rounded-full hover:bg-white/20 p-4"
            >
              {isScanning ?
              <X size={40} color="white"/>
              :
              <RotateCcw size={40} color="white"/>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;
