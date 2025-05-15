import React from 'react';
import StatusById from './StatusById';


const Page = async ({ searchParams }: {
    searchParams: Promise<{ id?: string }>
}) => {
    const { id } = await searchParams;
    const i = typeof id === 'string' ? id : null;

    return (
        <main className='h-[90vh] flex justify-center items-center'>
            <StatusById id={i} />
        </main>
    );
};

export default Page;