'use client'
import ComplaintStatusCard from '@/components/complaint-status-card';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract'; // Replace with your contract address and ABI

const StatusById = ({ id }: { id: string }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>(null); // This will hold your complaint data
    const [loading, setLoading] = useState(true); // To show a loading state
    const [error, setError] = useState<string | null>(null); // For handling errors

    // Fetch complaint data when the id is available
    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        const fetchComplaintData = async () => {
            try {
                setLoading(true);

                // Check if the browser has Ethereum
                if (!window.ethereum) {
                    setError('Ethereum provider not found. Please install MetaMask or another wallet.');
                    setLoading(false);
                    return;
                }

                const provider = new ethers.BrowserProvider(window.ethereum);
                const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

                // Fetch complaint data from blockchain by id
                const complaintData = await contract.getComplaint(id); // Replace with your contract method

                if (!complaintData) {
                    throw new Error('Complaint not found');
                }

                // Format the data if necessary (you can format the response to match your component's expected structure)
                setData({
                    id: complaintData.id.toString(),
                    status: complaintData.status.toString(),
                    title: complaintData.title,
                    description: complaintData.description,
                    // Assuming 'date' and 'attachment' are part of your contract data
                    date: complaintData.date, // Convert timestamp to readable date
                    attachment: complaintData.attachment,
                });

                setLoading(false);
            } catch (error) {
                console.log('====================================');
                console.log(error);
                console.log('====================================');
                setError('Unable to fetch data. Please try again later.');
                setLoading(false);
            }
        };

        fetchComplaintData();
    }, [id]);

    return (
        < >
            {
                !id ? (
                    <p className='text-shadow-red-600'>
                        Please Enter your Complaint ID to get the latest status
                    </p>
                ) : loading ? (
                    <p>Loading...</p> // Show loading state while fetching data
                ) : error ? (
                    <p>{error}</p> // Display error if data fetching fails
                ) : !data?.status ? (
                    <p>Please Check Your Complaint ID</p> // Handle case if the complaint doesn't exist or no status found
                ) : (
                    <ComplaintStatusCard
                        status={data.status} // The status of the complaint
                        title={data.title} // Title of the complaint
                        description={data.description} // Description of the complaint
                        id={data.id} // Complaint ID
                        date={data.date} // Date of the complaint
                        attachment={data.attachment} // Attachment (if any)
                    />
                )
            }
        </>
    );
};

export default StatusById;
