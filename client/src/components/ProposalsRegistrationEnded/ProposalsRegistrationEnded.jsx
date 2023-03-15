import React from 'react';
import {WORKFLOW_STATUS} from '../../utils/utils.js'
import { useEth } from '../../contexts/EthContext';
import { ProposalList } from '../ProposalsRegistrationStarted/ProposalsList.jsx';


export const ProposalsRegistrationEnded = ({upgradeWorkflowStatus}) => {
    const { state: { isOwner, isVoter} } = useEth();

    function handleStatusChange(){
        if(isOwner)
            upgradeWorkflowStatus(WORKFLOW_STATUS.VotingSessionStarted);
    }

    return (
        <>
            <div className="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                <h1 className="title">Proposals Registration Ended</h1>
                { isOwner ? (<button className="button is-primary is-pulled-right" onClick={handleStatusChange}>Change state</button> ) : ''}
            </div>

            <p className="subtitle ml-5">The voting session will starting soon.....</p>

            {isVoter?(<>
            <p className="has-text-centered pb-5">Here are the proposals, choose one for the vote</p>
            <ProposalList />
            </>) : (
                    <p>You are not whitelisted and can't access to that data.</p>
            )}
        </>
    );
};
