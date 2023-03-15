import React from 'react';
import { useEth } from '../../contexts/EthContext';
import {WORKFLOW_STATUS} from '../../utils/utils.js'
import { VoteList } from '../VotingSessionStarted/VoteList';

export const VotingSessionEnded = ({upgradeWorkflowStatus}) => {
    const { state: { contract, accounts, artifact, isOwner, isVoter} } = useEth();


    async function handleStatusChange(){
        if(contract){
            await contract.methods.tallyVotes().send({from:accounts[0]})
        }
        upgradeWorkflowStatus(WORKFLOW_STATUS.VotesTallied);
    }

    return (
        <div >
           
            <>
            {isVoter ?(
                <>
                <div className="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                    <h1 className='title'>VotingSessionEnded</h1>
                    { isOwner ? ( <button className="button is-primary" onClick={handleStatusChange}>Tally votes</button>) : ('')}
                </div>

               <h2 className="subtitle">Wait for the results.....</h2>
               <VoteList />
               </>
            ) : (
                <p>You are not whitelisted and can't access to that data.</p>  

            )}
            </>
            
            </div>
    );
};

