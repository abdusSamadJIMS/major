"use client";
import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";
import { mapStatus } from "@/lib/utils";

export default function ItemModal({ id, status }: { id: string; status: number }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newStatus, setNewStatus] = useState(status.toString());

    const handleStatusUpdate = async () => {
        if (!window.ethereum) return;

        try {
            setLoading(true);
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            const tx = await contract.updateStatus(id, parseInt(newStatus)); // Status is uint (enum index)
            await tx.wait();

            alert("Status updated successfully!");
            setOpen(false); // Close modal after success
            window.location.reload(); // Optionally refresh page to reflect changes (or optimize state update)
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button onClick={() => setOpen(true)} className="btn btn-xs btn-outline btn-warning">
                {mapStatus(status)}
            </button>

            {open && (
                <div className="modal modal-open">
                    <div className="modal-box space-y-4">
                        <h3 className="font-bold text-lg">Update Status for ID #{id}</h3>
                        <select
                            className="select select-bordered w-full"
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            disabled={loading}
                        >
                            <option value="0">Pending</option>
                            <option value="1">In Progress</option>
                            <option value="2">Resolved</option>
                        </select>
                        <div className="modal-action">
                            <button
                                className="btn btn-success"
                                onClick={handleStatusUpdate}
                                disabled={loading}
                            >
                                {loading ? "Updating..." : "Update"}
                            </button>
                            <button
                                className="btn"
                                onClick={() => setOpen(false)}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
