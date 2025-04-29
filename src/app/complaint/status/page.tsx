import ComplaintStatusCard from '@/components/complaint-status-card';
import React from 'react';

const page = async ({ searchParams }: { searchParams: { id: string } }) => {
    const id = (await searchParams).id;

    const res = await fetch(`${process.env.BACKEND_URL}/api/v2/document/Complaint/${id}?fields=["name","status","title"]`, {
        headers: {
            "Authorization": `token ${process.env.API_KEY}:${process.env.API_SECRET}`
        },
        // Optional: in case your API requires it
        cache: "no-store"
    });

    const data = await res.json();  // <-- get the real data


    return (
        <main className='h-[90vh] flex justify-center items-center'>
            {
                !id ?
                    <p className='text-shadow-red-600'>
                        Please Enter your Complaint ID to get the latest status
                    </p> : !data.data ?
                        <p>
                            Please Check Your Complaint ID
                        </p> : <ComplaintStatusCard
                            status={data.data.status}
                            title={data.data.title}
                            id={data.data.name}
                        />

            }
        </main>
    );
};

export default page;
