import React from 'react';
import StatusById from './StatusById';

const page = async ({ searchParams }: { searchParams: { id: string } }) => {
    const id = (await searchParams).id;




    return (
        <main className='h-[90vh] flex justify-center items-center'>
            <StatusById
                id={id}
            />
        </main>
    );
};

export default page;
