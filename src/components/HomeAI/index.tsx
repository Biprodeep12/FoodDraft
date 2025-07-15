import { useAuth } from "@/Context/userContext"
import { Brain, X, ArrowUp, Bot, CircleUserRound, SquareArrowOutUpLeft, SquareArrowOutDownRight, Camera, Upload } from "lucide-react"
import { useState, useRef, useEffect, useCallback } from "react"
import ReactMarkdown from "react-markdown"
import imageCompression from "browser-image-compression"
import { ImageCaptureUpload } from "./imagePreviewer"
import Image from "next/image"

interface Message {
  role: "user" | "assistant"
  content?: string
  imageUrl?: string
}

const HomeAi = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [fileImage, setFileImage] = useState<File | null>(null)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [openFileDrop, setOpenFileDrop] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { user } = useAuth()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    const throttled = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(handleResize, 150);
    };

    window.addEventListener("resize", throttled);
    return () => {
      window.removeEventListener("resize", throttled);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  const handleSendMessage = useCallback(
    async (customMessage?: string) => {
      if (isLoading) return;

      if (fileImage) {
        handleImage(fileImage)
        return;
      }

      const messageToSend = customMessage ?? inputValue.trim()
      if (!messageToSend) return

      const userMessage: Message = { role: "user", content: messageToSend }
      const newMessages = [...messages, userMessage]
      setMessages(newMessages)
      setIsLoading(true)
      setError(null)
      setInputValue("")

      try {
        const res = await fetch("/api/aiProduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: newMessages,
            productUser: user?.displayName,
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || data.details || `API request failed with status ${res.status}`)
        }

        const aiMessage = data?.choices?.[0]?.message
        if (aiMessage?.content) {
          setMessages([...newMessages, aiMessage])
        } else {
          throw new Error("No valid response from AI")
        }
      } catch (err) {
        console.error("Error sending message:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        setMessages((prev) => prev.slice(0, -1))
      } finally {
        setIsLoading(false)
      }
    },
    [inputValue, messages],
  )

  const handleImage = async (file: File) => {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 1, // compress to under 1MB
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    })

    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(",")[1]
      if (!base64) {
        setError("Failed to read image file.")
        return
      }
      const userMessage: Message = { role: "user", content: inputValue, imageUrl: URL.createObjectURL(file) }
      const newMessages = [...messages, userMessage]
      setMessages(newMessages)
      setIsLoading(true)
      setError(null)
      setInputValue("")
      setPreviewUrl(null)
      setFileImage(null)

      try {
        const res = await fetch("/api/homeAi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageBase64: base64,
            messages: newMessages,
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(
            data.error
              ? typeof data.error === "string"
                ? data.error
                : JSON.stringify(data.error)
              : "Failed to analyze image"
          )
        }

        // const aiContent = data.result || "No meaningful response."

        const aiMessage = data?.choices?.[0]?.message

        setMessages([...newMessages, aiMessage])
      } catch (error) {
        console.error("Image analysis failed:", error)
        setError(error instanceof Error ? error.message : "Something went wrong")
        setMessages((prev) => prev.slice(0, -1))
      } finally {
        setIsLoading(false)
      }
    }

    reader.readAsDataURL(compressedFile)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    } 
  }

  const closeChat = () => {
    setIsOpen(false)
    setIsFullscreen(false)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const clearChat = () => {
    setMessages([])
    setError(null)
  }

  return (
    <>
      <div className="fixed bottom-5 right-5 z-[1000]">
        <button
          onClick={() => {setIsOpen(!isOpen);
            if(width<600){
                setIsFullscreen(true)
            }
          }}
          className="group entry opacity-0 cursor-pointer relative overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl"
        >
          <Brain className="h-6 w-6 spin text-white transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110" />
        </button>

        {isOpen && !isFullscreen && (
          <div className="absolute shadow-lg bottom-0 right-0 rounded-lg bg-white flex flex-col overflow-hidden transition-all duration-300 h-[500px] w-[350px]">
            <div className="flex flex-row justify-between items-center p-3 bg-emerald-500">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-white" />
                <span className="text-white font-medium">AI Assistant</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={toggleFullscreen}
                  className="cursor-pointer hover:bg-emerald-600 p-1 rounded-lg transition-colors"
                >
                  <SquareArrowOutUpLeft size={18} className="text-white transition-transform" />
                </button>
                <button
                  onClick={closeChat}
                  className="cursor-pointer hover:bg-emerald-600 p-1 rounded-lg text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <Brain className="h-12 w-12 mx-auto mb-3 text-emerald-400" />
                  <p>Hello! How can I help you today?</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-emerald-500 text-white"
                          : "bg-white text-gray-800 border border-gray-300"
                      }`}
                    >{message.imageUrl && (
                      <div className="mb-2">
                        <Image
                          width={200}
                          height={200}
                          src={message.imageUrl}
                          loading="lazy"
                          alt="User uploaded"
                          className="object-contain max-h-[200px] border-4 border-emerald-500 rounded-lg bg-gray-50"
                        />
                      </div>
                    )}
                      <div className="text-sm">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-300 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
                  <p>Error: {error}</p>
                  <button onClick={() => setError(null)} className="text-red-600 hover:text-red-800 underline mt-1">
                    Dismiss
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-300 bg-white p-3">
              <ImageCaptureUpload
                uploadInputRef={uploadInputRef}
                cameraInputRef={cameraInputRef}
                setFileImage={setFileImage}
                previewUrl={previewUrl}
                setPreviewUrl={setPreviewUrl} />
              <div className="flex relative gap-2">
                <button 
                  onClick={()=>uploadInputRef.current?.click()} 
                  className="cursor-pointer p-1 rounded-lg hover:bg-gray-100 absolute top-1/2 -translate-1/2 left-5">
                    <Camera className="text-emerald-500"/>
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 border border-gray-300 rounded-lg pr-3 pl-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                >
                  <ArrowUp size={16} />
                </button>
              </div>
              {messages.length > 0 && (
                <button onClick={clearChat} className="text-xs text-gray-500 hover:text-gray-700 mt-2 underline">
                  Clear chat history
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {isOpen && isFullscreen && (
        <>
          <div className="fixed inset-0 bg-white/20 backdrop-blur-sm z-[1001] flex justify-center items-center">

          <div className=" w-[90%] h-[90%] shadow-lg rounded-lg bg-gray-50 flex flex-col overflow-hidden z-[1002]">
            <div className="flex flex-row justify-between items-center p-3 bg-emerald-500">
              <div className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-white" />
                <span className="text-white font-medium text-lg">AI Assistant</span>
              </div>
              <div className="flex gap-2">
                {width>600 &&
                <button
                  onClick={toggleFullscreen}
                  className="cursor-pointer hover:bg-emerald-600 p-1 rounded-lg transition-colors"
                >
                  <SquareArrowOutDownRight size={24} className="text-white transition-transform" />
                </button>}
                <button
                  onClick={closeChat}
                  className="cursor-pointer hover:bg-emerald-600 p-1 rounded-lg text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-w-[90%] max-[600px]:max-w-full w-full mx-auto">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                    <Brain className="h-12 w-12 mx-auto mb-3 text-emerald-400" />
                    <p>Hello! How can I help you today?</p>
                </div>
                ) : (
                messages.map((message, index) => (
                    <div
                    key={index}
                    className={`flex items-start gap-2 mb-2 ${
                        message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                    >
                    {message.role !== "user" && (
                        <Bot className="h-6 w-6 mt-1 text-emerald-500 shrink-0" />
                    )}
                    <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === "user"
                            ? "bg-emerald-500 text-white"
                            : "bg-white text-gray-800 border border-gray-300"
                        }`}
                    >{message.imageUrl && (
                      <div className="mb-2">
                        <Image
                          width={200}
                          height={200}
                          src={message.imageUrl}
                          loading="lazy"
                          alt="User uploaded"
                          className="object-contain max-h-[200px] border-4 border-emerald-500 rounded-lg bg-gray-50"
                        />
                      </div>
                    )}
                        <div className="text-sm">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                    </div>
                    {message.role === "user" && (
                        <CircleUserRound className="h-6 w-6 mt-1 text-gray-600 shrink-0" />
                    )}
                    </div>
                ))
                )}

              {isLoading && (
                <div className="flex justify-start items-center gap-2">
                  <Bot className="h-6 w-6 mt-1 text-emerald-500 shrink-0" />
                  <div className="bg-white border border-gray-300 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
                  <p>Error: {error}</p>
                  <button onClick={() => setError(null)} className="text-red-600 hover:text-red-800 underline mt-1">
                    Dismiss
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className=" border border-gray-300 shadow-xl mb-5 max-[600px]:mb-0 max-w-2/3 max-[600px]:max-w-full mx-auto w-full max-[600px]:rounded-none rounded-xl bg-white p-3">
              <ImageCaptureUpload
                uploadInputRef={uploadInputRef}
                cameraInputRef={cameraInputRef}
                setFileImage={setFileImage}
                previewUrl={previewUrl}
                setPreviewUrl={setPreviewUrl} />
              <div className="flex gap-2 relative">
                {width <600 && openFileDrop &&
                <>
                    <div className="absolute rounded-lg bg-white border border-gray-300 bottom-10 left-0 flex flex-col gap-0.5 p-1 text-sm z-50">
                        <button
                            onClick={() => cameraInputRef.current?.click()}
                            className="flex flex-row gap-1.5 items-center p-1 hover:bg-gray-300 rounded-sm cursor-pointer"
                        >
                            <Camera size={16} /> Open Camera
                        </button>
                        <button
                            onClick={() => uploadInputRef.current?.click()}
                            className="flex flex-row gap-1.5 items-center p-1 hover:bg-gray-300 rounded-sm cursor-pointer"
                        >
                            <Upload size={16} /> Upload Photo
                        </button>
                    </div>
                </>}
                <button onClick={()=>{
                    if(width<600){
                        setOpenFileDrop(!openFileDrop);
                    } else {
                        uploadInputRef.current?.click();
                    }
                }} className="cursor-pointer p-1 rounded-lg hover:bg-gray-100 absolute top-1/2 -translate-1/2 left-5">
                    <Camera className="text-emerald-500"/>
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 border border-gray-300 rounded-lg pr-3 pl-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                >
                  <ArrowUp size={24} />
                </button>
              </div>
              {messages.length > 0 && (
                <button onClick={clearChat} className="text-xs cursor-pointer text-gray-500 hover:text-gray-700 mt-2 underline">
                  Clear chat history
                </button>
              )}
            </div>
          </div>
          </div>
        </>
      )}
    </>
  )
}

export default HomeAi
