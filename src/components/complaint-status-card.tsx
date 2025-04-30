import { mapStatus } from '@/lib/utils'
import React from 'react'

const ComplaintStatusCard = ({ status, title, id, attachment, date, description }: { title: string, status: string, id: string, description: string, date: string, attachment: string | null }) => {
    return (
        <div className="card  bg-base-100 w-96 shadow-sm">
            <div className="card-body">
                <span>
                    {date}
                </span>
                <h2 className="card-title text-2xl">Status: {mapStatus(Number(status))}</h2>
                {
                    attachment &&
                    <a href={attachment} target='_blank'
                        className='link'
                    >
                        Attachment
                    </a>
                }
                <p>{title}</p>
                <p>Complaind ID: {id}</p>
                <p>
                    {description}
                </p>

            </div>
        </div>
    )
}

export default ComplaintStatusCard