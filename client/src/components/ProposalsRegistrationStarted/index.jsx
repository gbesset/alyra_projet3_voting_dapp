import React from 'react';
import {WORKFLOW_STATUS} from '../../utils/utils.js'
import { useEth } from '../../contexts/EthContext';
import { ProposalList } from './ProposalsList.jsx';
import { ProposalForm } from './proposalForm.jsx';

export const ProposalsRegistrationStarted = ({upgradeWorkflowStatus}) => {
    const { state: { contract, accounts, artifact, isOwner} } = useEth();


    function handleStatusChange(){
        upgradeWorkflowStatus(WORKFLOW_STATUS.ProposalsRegistrationEnded);
    }

    return (
        <div className="debug">
            <div className="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                <h1 className='title is-9' >Proposals registration started</h1>
                { isOwner ? (<button className="button is-primary is-pulled-right" onClick={handleStatusChange}>Change state</button> ) : ''}
            </div>
            
            <p>You can now add some proposals.....</p>
          
            <ProposalForm />
            <ProposalList/>
        </div>
    );
};
