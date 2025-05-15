"use client";
import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";
import { getCurrentDate } from "@/lib/utils";
import { useEdgeStore } from '../lib/edgestore';

const Form = () => {
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File>();
    const [isLoading, setIsLoading] = useState(false)
    const [isId, setIsId] = useState(false)
    const [compId, setCompId] = useState("")
    const { edgestore } = useEdgeStore();

    async function fileUpload() {
        if (file) {
            const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange(progress) {
                    console.log(`Progress: ${progress}`);

                },
            });

            return res.url
        }
    }

    async function submitComplaint(e: React.FormEvent) {
        e.preventDefault(); // Prevent default form submission behavior
        setIsId(false)
        setCompId("")
        if (!window.ethereum) return;

        setIsLoading(true);
        const url = (await fileUpload()) || ""


        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        try {
            const tx = await contract.fileComplaint(description, getCurrentDate(), url || "");
            const receipt = await tx.wait();

            // Find the ComplaintFiled event from the logs
            const event = receipt.logs
                .map((log: { topics: ReadonlyArray<string>; data: string; }) => {
                    try {
                        return contract.interface.parseLog(log);
                    } catch {
                        return null;
                    }
                })
                .find((log: { name: string; }) => log?.name === "ComplaintFiled");

            if (event) {
                const complaintId = event.args?.[0]; // First argument is ID
                alert(`Complaint filed successfully! ID: ${complaintId}`);
                setCompId(complaintId)
                setIsId(true)
                setIsLoading(false)
            } else {
                alert("Complaint filed, but no event found.");
                setIsLoading(false)
            }
        } catch (error) {
            console.error(error);
            alert("Error submitting complaint");
            setIsLoading(false)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <form className='space-y-2'
            onSubmit={submitComplaint}
        >
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">New Complaint</legend>

                <label className="label">Description</label>
                <textarea
                    disabled={isLoading}
                    value={description} onChange={e => setDescription(e.target.value)} placeholder="Description"
                    rows={5} className="textarea" required />
                <label className="label">File</label>
                <input
                    disabled={isLoading}
                    className="file-input"
                    type="file"
                    onChange={(e) => {
                        setFile(e.target.files?.[0]);
                    }}
                    placeholder="Attachment (Optional)" />
            </fieldset>
            <button
                disabled={isLoading}
                aria-disabled={isLoading}
                className='w-xs btn '
            >
                {
                    isLoading ?
                        "Submitting..." :
                        "Submit"
                }
            </button>
            {
                isId &&
                <div className="card border mt-10 p-2 font-semibold text-green-500">
                    Complaint filed successfully! ID: {compId}
                    <br />Please Save It
                </div>
            }
        </form>
    )
}

export default Form