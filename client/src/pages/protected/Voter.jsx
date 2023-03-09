import React from 'react';
import { ProposalsRegistrationEnded } from '../../components/ProposalsRegistrationEnded/ProposalsRegistrationEnded';
import { ProposalsRegistrationStarted } from '../../components/ProposalsRegistrationStarted/ProposalsRegistrationStarted';
import { RegisteringVoters } from '../../components/RegisteringVoters/RegisteringVoters';
import { WorkflowStatus } from '../../components/WorkflowStatus';


export const Voter = () => {
    return (
        <div>
            <h1 className="title">Voting Dapp</h1>
          
           <WorkflowStatus />
           <br/>
           <p>(en fonction du status on pourra afficher le composants adéquat)</p>
           <br/>
           <RegisteringVoters/>
           <br/>
           <ProposalsRegistrationStarted/>
           <br />
           <ProposalsRegistrationEnded />
        </div>
    );
};
