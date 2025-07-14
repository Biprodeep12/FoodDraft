import { useState } from "react"
import { X } from "lucide-react"
import Image from "next/image"

interface ImageCaptureUploadProps {
    uploadInputRef: React.RefObject<HTMLInputElement|null>
    cameraInputRef: React.RefObject<HTMLInputElement|null>
    setFileImage: (file: File | null) => void
    previewUrl: string | null
    setPreviewUrl: (url: string | null) => void
}

export function ImageCaptureUpload({
  uploadInputRef,
  cameraInputRef,
  setFileImage,
  previewUrl,
  setPreviewUrl,
}: ImageCaptureUploadProps) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith("image/")) {
      return "Please select a valid image file."
    }

    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > 5) {
      return `File size must be less than 5MB.`
    }

    return null
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setError(null)

    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      setIsLoading(false)
      return
    }

    try {
      const imageUrl = URL.createObjectURL(file)
      setPreviewUrl(imageUrl)
      setFileImage(imageUrl ? file : null)

    } catch (err) {
      setError("Failed to process the image. Please try again.:"+ err)
    } finally {
      setIsLoading(false)
    }
  }

  const clearSelection = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl(null)
    setError(null)

    if (cameraInputRef.current) cameraInputRef.current.value = ""
    if (uploadInputRef.current) uploadInputRef.current.value = ""
  }

  return (
    <>
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <input
        ref={uploadInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
          {error && (
              <div className="mb-2 italic text-lg text-red-400">{error}</div>
          )}

          {isLoading && (
            <div className="mb-2 flex flex-row items-center gap-2">
              <div className="animate-ping rounded-lg bg-gray-300 h-25 w-25"></div>
            </div>
          )}

          {previewUrl && !isLoading && (
            <div className="mb-2 flex flex-row items-center gap-2">
              <div className="relative">
                <Image
                  width={100}
                  height={100}
                  src={previewUrl || ""}
                  alt="Preview"
                  className="object-contain max-h-[200px] border-4 border-emerald-500 rounded-lg bg-gray-50"
                />
                <button
                  onClick={clearSelection}
                  className="absolute -top-2 -right-2 text-white bg-emerald-400 rounded-full p-1 hover:bg-emerald-500 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="italic text-gray-500 text-sm">Only 1 Image can be selected</div>
            </div>
          )}
    </>
  )
}