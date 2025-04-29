import React from 'react'

const Form = () => {
    return (
        <form className='space-y-2'>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">New Complaint</legend>

                <label className="label">Title</label>
                <input type="text" className="input" placeholder="Title of your complaint" />

                <label className="label">Description</label>
                <textarea rows={5} className="textarea" placeholder="my-awesome-page" />
            </fieldset>
            <button
                className='w-xs btn '
            >
                Submit
            </button>
        </form>
    )
}

export default Form