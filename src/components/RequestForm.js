import React from 'react';

const RequestForm = () => (
    <div className="form">
        <form>
            <input 
                className="text-input"
                type="text"
                name="name"
                placeholder="Request summary"
            />
            <input 
                className="text-input"
                type="text"
                name="agency"
                placeholder="Agency"
            />
            <textarea 
                className="textarea"
                type="text"
                name="request"
                placeholder="Description of request"
            />
            <div>
                <button
                    className="button"
                >
                    Save
                </button>
            </div>
        </form>
    </div>
)

export default RequestForm;