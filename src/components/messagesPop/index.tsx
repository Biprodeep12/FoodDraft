import { useMessages } from "@/Context/messagesContext";
import { CircleCheckBig, Info } from "lucide-react";
import { useEffect } from "react";

const MessagesPop = () => {
    const { message, messageError, setMessage } = useMessages();
    const lenghtMessage = message.length > 0;

    useEffect(() => {
        const handleError = (event: ErrorEvent) => {
            if (event.error) {
                setMessage(event.message);
            }
        };

        window.addEventListener('error', handleError);

        return () => {
            window.removeEventListener('error', handleError);
        };
    }, [setMessage]);

    useEffect(() => {
        if (!lenghtMessage) return;
        
        const timer = setTimeout(() => {
            if (lenghtMessage) {
               setMessage('');
            }
        }, 3000);
        return () => clearTimeout(timer);
    },[setMessage, lenghtMessage])
    
    return(
        <>
                <div className={`fixed left-1/2 -translate-x-1/2 ${lenghtMessage?'top-20 opacity-100':'top-0 opacity-0'} transition-all duration-300 flex flex-row gap-2 items-center flex-nowrap bg-white shadow-lg rounded-lg p-4 z-[1000]`}>
                    {messageError ?<Info className="text-red-500 w-6 h-6 shrink-0"/>: <CircleCheckBig className="text-green-500 w-6 h-6 shrink-0"/>}
                    <span className="text-xl">{message}</span>
                </div>
        </>
    )
}
export default MessagesPop;