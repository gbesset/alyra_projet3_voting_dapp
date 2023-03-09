import React, { useState } from 'react';
import { ProposalsRegistrationEnded } from '../../components/ProposalsRegistrationEnded/ProposalsRegistrationEnded';
import { ProposalsRegistrationStarted } from '../../components/ProposalsRegistrationStarted/ProposalsRegistrationStarted';
import { RegisteringVoters } from '../../components/RegisteringVoters/RegisteringVoters';
import { WorkflowStatus } from '../../components/WorkflowStatus';


export const Voter = () => {
    const [isAuthent, setIsAuthent] = useState(false);
    const [workflowStatus, setWorkflowStatus] = useState(0);

    function handleStatusChange(newStatus){
        setWorkflowStatus(newStatus);
    }

    return (
        <div>
            <h1 className="title">Voting Dapp</h1>
          
           <WorkflowStatus workflowStatus={workflowStatus} onStatusChange={handleStatusChange}/>
           <br/>
           <p>Le status est {workflowStatus}</p>
           <br/>
           <RegisteringVoters/>
           <br/>
           <ProposalsRegistrationStarted/>
           <br />
           <ProposalsRegistrationEnded />
        </div>
    );
};
