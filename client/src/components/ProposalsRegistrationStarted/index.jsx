import React from 'react';
import {WORKFLOW_STATUS} from '../../utils/utils.js'
import { useEth } from '../../contexts/EthContext';
import { ProposalList } from './ProposalsList.jsx';
import { ProposalForm } from './proposalForm.jsx';
import { NotAuthorized } from '../NotAuthorized/index.jsx';

export const ProposalsRegistrationStarted = ({upgradeWorkflowStatus}) => {
    const { state: { isOwner, isVoter} } = useEth();


    function handleStatusChange(){
        if(isOwner)
            upgradeWorkflowStatus(WORKFLOW_STATUS.ProposalsRegistrationEnded);
    }

    return (
        <div>
            <div className="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                <h1 className='title is-9' >Proposals registration started</h1>
                { isOwner ? (<button className="button is-primary is-pulled-right" onClick={handleStatusChange}>Change state</button> ) : ''}
            </div>
            
            <p className="subtitle">You can now add some proposals !</p>
          
          {isVoter ?(<>
               <ProposalForm />
               <ProposalList/>
          </>):(
              <NotAuthorized />
          )}
        </div>
    );
};
