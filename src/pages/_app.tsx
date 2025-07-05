import DrawerPop from "@/components/home/drawerPop";
import MessagesPop from "@/components/messagesPop";
import { MessageProvider } from "@/Context/messagesContext";
import { ProductProvider } from "@/Context/productContext";
import { AuthProvider } from "@/Context/userContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return(
    <ProductProvider>
      <MessageProvider>
        <AuthProvider>
          <Component {...pageProps} />
          <DrawerPop/>
          <MessagesPop/>
        </AuthProvider>
      </MessageProvider>
    </ProductProvider>
  );
}
