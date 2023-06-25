'use client';
import "@vercel/examples-ui/globals.css";
import MetaMask from "../components/MetaMask";

export default function Home() {
  return (
    <main className="flex  flex-col items-left justify-between p-24">
      <h1 className="text-4xl font-bold text-left text-gray-100 pb-3">Welcome to Signoff</h1>
      <MetaMask/>

      <div className="text-sm text-gray-400 line-clamp-3 group-hover:text-gray-300">
        Signoff allows you to manage and monitor your employees' interactions with Ethereum-based
        applications. Please connect to MetaMask to start using the application.
      </div>
    </main>
  );
}

