import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from '@chakra-ui/react'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { config } from "./config/wagmi.ts";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
  <WagmiProvider config={config}>
    <QueryClientProvider client={client}>
      <RainbowKitProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
  </ChakraProvider>
);
