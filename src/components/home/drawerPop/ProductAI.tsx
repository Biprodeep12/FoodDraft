import { ArrowUp, LoaderPinwheel, Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ProductAIProps {
  nutri: string;
}

export const ProductAI = ({ nutri }: ProductAIProps) => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<string[]>([
    `Is ${nutri} good for health?`,
    `Can ${nutri} help with weight loss?`,
    `What are the benefits of ${nutri}?`,
    `Are there any side effects of ${nutri}?`,
    `How much ${nutri} should I consume daily?`,
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

const handleSendMessage = useCallback(async (customMessage?: string) => {
  const messageToSend = customMessage ?? input.trim();
  if (!messageToSend) return;

  const userMessage: Message = { role: "user", content: messageToSend };
  const newMessages = [...messages, userMessage];

  setMessages(newMessages);
  setIsLoading(true);
  setError(null);
  setInput("");

  try {
    const res = await fetch("/api/aiProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.error ||
        data.details ||
        `API request failed with status ${res.status}`
      );
    }

    const aiMessage = data?.choices?.[0]?.message;
    if (aiMessage?.content) {
      setMessages([...newMessages, aiMessage]);
    } else {
      throw new Error("No valid response from AI");
    }
  } catch (err) {
    console.error("Error sending message:", err);
    setError(err instanceof Error ? err.message : "An unknown error occurred");
    setMessages((prev) => prev.slice(0, -1));
  } finally {
    setIsLoading(false);
  }
  }, [input, messages]);


  const handleQuestionClick = useCallback(
    (questionToSend: string, index: number) => {
      setInput(questionToSend);
      setQuestions((prev) => prev.filter((_, i) => i !== index));
    },
    []
  );

  const suggestedQuestions = useMemo(() => questions, [questions]);

  return (
    <div className="max-w-xl w-full mx-auto md:rounded-lg bg-white p-6 shadow-md">
      <div className="text-2xl font-bold text-gray-800 mb-4">Ask AI Suggestions</div>

      <div className="space-y-2 mb-4 max-h-[500px] overflow-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              msg.role === "user"
                ? "bg-blue-100 text-right"
                : "bg-green-100 text-left"
            }`}
          >
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong>{" "}
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}

        {isLoading && (
          <div className="text-gray-500 mb-2 flex flex-row items-center gap-2.5">
            <LoaderPinwheel color="blue" className="animate-spin" />
            AI is Thinking...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {!isLoading && suggestedQuestions.length > 0 && (
        <div className="space-y-2 mb-4">
          {suggestedQuestions.map((opt, index) => (
            <button
              key={index}
              onClick={() => {
                handleQuestionClick(opt, index);
                handleSendMessage(opt);
              }}
              className="bg-gray-50 opacity-0 text-left items-center rounded-md shadow-sm p-3 w-full flex flex-row justify-between hover:-translate-y-1 cursor-pointer transition-all duration-200"
              style={{
                animation: "popUp 0.4s ease forwards",
                animationDelay: `${index * 0.4}s`,
              }}
            >
              {opt}
              <Plus color="blue" size={24} className="min-w-6" />
            </button>
          ))}
        </div>
      )}

      {error && <p className="text-red-500 mb-2">Error: {error}</p>}

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-grow p-2 border-b border-gray-400 outline-none"
          placeholder="Type your health question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          disabled={isLoading}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 cursor-pointer"
          onClick={()=>handleSendMessage(input)}
          disabled={isLoading || !input.trim()}
        >
          <ArrowUp size={24} color="white" />
        </button>
      </div>
    </div>
  );
};
