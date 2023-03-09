import React from 'react';

export const ProposalsRegistrationStarted = () => {
    return (
        <div className="debug">
            <h1 className='title'>Proposals registration started</h1>
            <p>You can now make some proposals.....</p>
            <div>
                <input className="input is-normal is-primary" type="text" placeholder='Enter a proposal'/>
                <button className="button is-primary">Send</button>
            </div>
        </div>
    );
};
