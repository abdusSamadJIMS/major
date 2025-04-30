/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";
import { mapStatus } from "@/lib/utils";
import ItemModal from "./item-modal";

type Complaint = {
    id: string;
    description: string;
    date: string;
    attachment: string;
    status: number;
    user: string;
};

export default function ComplaintList() {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [dateFilter, setDateFilter] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (typeof window === "undefined") return;

            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
                const rawComplaints = await contract.getAllComplaints();

                const formatted: Complaint[] = rawComplaints.map((c: any) => {
                    const [day, month, year] = c[2].split("-");
                    const isoDate = `${year}-${month}-${day}`; // convert to YYYY-MM-DD
                    return {
                        id: c[0],
                        description: c[1],
                        date: isoDate,
                        attachment: c[3],
                        status: Number(c[4]),
                        user: c[5],
                    };
                });

                setComplaints(formatted.reverse());
            } catch (error) {
                console.error("Error fetching complaints:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const filteredComplaints = complaints.filter((c) => {
        const statusMatch = statusFilter === "All" || mapStatus(c.status) === statusFilter;
        const dateMatch = !dateFilter || c.date === dateFilter;
        return statusMatch && dateMatch;
    });

    if (loading) return <div className="text-center py-10">Loading complaints...</div>;

    return (
        <main className="mx-auto min-h-[90vh]">
            <div className="max-w-xl mx-auto py-10">
                <div className="mb-4 flex flex-wrap gap-4 ">
                    <select
                        className="select select-bordered w-full max-w-[14rem]"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>

                    <input
                        type="date"
                        className="input input-bordered w-full max-w-[14rem]"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    />
                </div>

                <ul className="list bg-base-100 rounded-box shadow-md ">
                    <li className="p-4 pb-2 text-xs opacity-60 tracking-wide font-bold text-center">
                        Complaints
                    </li>
                    {filteredComplaints.map((c) => (
                        <li className="list-row" key={c.id}>
                            <div>
                                <div>{c.id}</div>
                                <div className="text-xs uppercase font-semibold opacity-60">{c.date}</div>
                            </div>
                            <p className="list-col-wrap text-xs">{c.description}</p>
                            <ItemModal
                                id={c.id}
                                status={c.status}
                            />
                            <button
                                className="btn btn-square btn-ghost"
                                disabled={!c.attachment}
                                onClick={() => c.attachment && window.open(c.attachment, "_blank")}
                            >
                                <svg
                                    className="size-[1.2em]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <path d="M14 2v6h6" />
                                    </g>
                                </svg>
                            </button>
                        </li>
                    ))}

                </ul>
            </div>
        </main>
    );
}
