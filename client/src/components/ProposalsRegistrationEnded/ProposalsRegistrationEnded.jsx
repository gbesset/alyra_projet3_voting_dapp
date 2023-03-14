import React from 'react';
import {WORKFLOW_STATUS} from '../../utils/utils.js'
import { useEth } from '../../contexts/EthContext';
import { ProposalList } from '../ProposalsRegistrationStarted/ProposalsList.jsx';


export const ProposalsRegistrationEnded = ({upgradeWorkflowStatus}) => {
    const { state: { contract, accounts, artifact, isOwner} } = useEth();

    function handleStatusChange(){
        upgradeWorkflowStatus(WORKFLOW_STATUS.VotingSessionStarted);
    }

    return (
        <>
            <div className="debug">
                <div className="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                    <h1 className="title">Proposals Registration Ended</h1>
                    { isOwner ? (<button className="button is-primary is-pulled-right" onClick={handleStatusChange}>Change state</button> ) : ''}
                </div>

                <p className="subtitle has-text-centered">The voting session will starting soon.....</p>

                <p className="has-text-centered pb-5">Here are the proposals, choose one for the vote</p>
                <ProposalList />
            </div>
        </>
    );
};
