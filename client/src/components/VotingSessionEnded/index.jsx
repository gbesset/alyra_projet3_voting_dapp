import React from 'react';
import { useEth } from '../../contexts/EthContext';
import {WORKFLOW_STATUS} from '../../utils/utils.js'
import { NotAuthorized } from '../NotAuthorized';
import { VoteList } from '../VotingSessionStarted/VoteList';

export const VotingSessionEnded = ({upgradeWorkflowStatus}) => {
    const { state: { contract, isOwner, isVoter} } = useEth();


    async function handleStatusChange(){
        if(contract && isOwner){
            upgradeWorkflowStatus(WORKFLOW_STATUS.VotesTallied);    
        }
        
    }

    return (           
            <>
                 <div className="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                     <h1 className='title'>VotingSessionEnded</h1>
                     { isOwner ? ( <button className="button is-primary" onClick={handleStatusChange}>Tally votes</button>) : ('')}
                </div>
            {isVoter ?(
                <>
               <h2 className="subtitle mt-5">Owner is working on it. Wait for the results.....</h2>
               <VoteList />
               </>
            ) : (
                <div className="mt-5">
                    <NotAuthorized />
                </div>

            )}
            </>

    );
};

