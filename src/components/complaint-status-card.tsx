import React from 'react'

const ComplaintStatusCard = ({ status, title, id }: { title: string, status: string, id: string }) => {
    return (
        <div className="card  bg-base-100 w-96 shadow-sm">
            <div className="card-body">
                <h2 className="card-title text-2xl">Status: {status}</h2>
                <p>{title}</p>
                <p>Complaind ID: {id}</p>
            </div>
        </div>
    )
}

export default ComplaintStatusCard