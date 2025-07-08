import { useMessages } from "@/Context/messagesContext";
import { CircleCheckBig, Info } from "lucide-react";
import { useEffect, useState } from "react";

interface ToastMessage {
  id: number;
  text: string;
  error: boolean;
  visible: boolean;
}

const MessagesPop = () => {
  const { message, messageError, setMessage, setMessageError } = useMessages();
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  // Add new message
  useEffect(() => {
    if (message.length === 0) return;

    const id = Date.now();
    const newMessage: ToastMessage = {
      id,
      text: message,
      error: messageError,
      visible: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage('');
    setMessageError(false);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, visible: true } : msg
        )
      );
    }, 50);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, visible: false } : msg
        )
      );
    }, 3050);

    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }, 3350);
  }, [message]);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.error) {
        setMessage(event.message);
        setMessageError(true);
      }
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [setMessage]);

  return (
    <>
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`fixed left-1/2 -translate-x-1/2 ${
            msg.visible ? 'top-20 opacity-100' : 'top-0 opacity-0'
          } transition-all duration-300 flex flex-row gap-2 items-center bg-white shadow-lg rounded-lg p-4 z-[1000]`}
        >
          {msg.error ? (
            <Info className="text-red-500 w-6 h-6 shrink-0" />
          ) : (
            <CircleCheckBig className="text-green-500 w-6 h-6 shrink-0" />
          )}
          <span className="text-xl">{msg.text}</span>
        </div>
      ))}
    </>
  );
};

export default MessagesPop;
