"use client";
import { shortAddress } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function WalletConnect() {
    const [account, setAccount] = useState("");

    async function connect() {
        if (!window.ethereum) return alert("MetaMask not detected");
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
    }

    function disconnect() {
        setAccount(""); // Just reset the account state
    }

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.request({ method: "eth_accounts" }).then((accounts: string[]) => {
                if (accounts.length) setAccount(accounts[0]);
            });
        }
    }, []);

    return (
        <div>
            {account ? (
                <button onClick={disconnect} className="btn text-xs btn-primary">
                    <p className="flex flex-col">
                        <span>Logout</span>
                        <span>{shortAddress(account)}</span>
                    </p>
                </button>
            ) : (
                <button onClick={connect} className="btn btn-secondary">
                    Connect Wallet
                </button>
            )}
        </div>
    );
}
