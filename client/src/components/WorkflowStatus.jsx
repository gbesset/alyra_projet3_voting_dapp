import React from 'react';
import 'bulma-o-steps/bulma-steps.min.css';

export const WorkflowStatus = () => {
    return (
        <>
         <ul className="steps is-balanced">
            <li className="steps-segment is-active">
            <span className="steps-marker">
                <span class="icon">
                <i class="fa fa-user"></i>
                </span>
            </span>
            <div className="steps-content">
                <p className="is-size-5">RegisteringVoters</p>
                <p className="is-size-6">Ask the admin to be registered</p>
            </div>
            </li>
            <li className="steps-segment">
            <span className="steps-marker"></span>
            <div className="steps-content">
                <p className="is-size-5">ProposalsRegistrationStarted</p>
                <p className="is-size-6">You can make some proposals</p>
            </div>
            </li>
            <li className="steps-segment">
            <span className="steps-marker">
                <span class="icon">
                    <i class="fa fa-user"></i>
                    </span>
                </span>
            <div className="steps-content">
                <p className="is-size-5">ProposalsRegistrationEnded</p>
                <p className="is-size-6">End of proposals. Wait for the next step</p>
            </div>
            </li>
            <li className="steps-segment">
            <span className="steps-marker"></span>
            <div className="steps-content">
                <p className="is-size-5">VotingSessionStarted</p>
                <p className="is-size-6">You can vote</p>
            </div>
            </li>
            <li className="steps-segment">
            <span className="steps-marker">
                <span class="icon">
                    <i class="fa fa-user"></i>
                    </span>
            </span>
            <div className="steps-content">
                <p className="is-size-5">VotingSessionEnded</p>
                <p className="is-size-6">End of vote. Wait for the admin to get the results</p>
            </div>
            </li>
            <li className="steps-segment">
            <span className="steps-marker">
                <span class="icon">
                    <i class="fa fa-user"></i>
                    </span>
            </span>
            <div className="steps-content">
                <p className="is-size-5">VotesTallied</p>
                <p className="is-size-6">Here are the results !</p>
            </div>
            </li>
        </ul>

            
        </>
    );
};

