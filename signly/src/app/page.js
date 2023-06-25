'use client';
import "@vercel/examples-ui/globals.css";
import { useEffect, useState } from "react";
import MetaMask from "../components/MetaMask";

export default function Home() {
  const [keys, setKeys] = useState([]);
  useEffect(() => {
    // Load keys variable from data/data.json file
    fetch("./data/data.json")
      .then((response) => response.json())
      .then((data) => {
        const accounts = data["accounts"];
        setKeys(accounts);
      });
  }, []);

  return (
    <main className="flex  flex-col items-left justify-between p-24">
      <h1 className="text-4xl font-bold text-left text-gray-100 pb-3">Welcome to Signoff</h1>
      <MetaMask />

      <h2 className="text-2xl font-bold text-left text-gray-150 pb-2">Employee Keys</h2>
      {keys.length > 0 ? (
        keys.map(key => (
          <div key={key} className="text-sm text-gray-400 line-clamp-3 group-hover:text-gray-300">
            {key}
          </div>
        ))
      ) : (
        <div className="text-sm text-gray-400 line-clamp-3 group-hover:text-gray-300">
          No keys found.
        </div>
      )}

      <h2 className="text-2xl font-bold text-left text-gray-150 pb-2">More Info</h2>
      <div className="text-sm text-gray-400 line-clamp-3 group-hover:text-gray-300">
        Signoff allows you to manage and monitor your employees' interactions with Ethereum-based
        applications. Please connect to MetaMask to start using the application.
      </div>
    </main>
  );
}

