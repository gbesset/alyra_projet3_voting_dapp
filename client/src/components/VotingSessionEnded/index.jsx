import React from 'react';
import { useEth } from '../../contexts/EthContext';
import {WORKFLOW_STATUS} from '../../utils/utils.js'

export const VotingSessionEnded = ({upgradeWorkflowStatus}) => {
    const { state: { contract, accounts, artifact, isOwner} } = useEth();


    function handleStatusChange(){
        upgradeWorkflowStatus(WORKFLOW_STATUS.VotingSessionEnded);
    }

    return (
        <div className="debug">
           
            <>
                <div className="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                    <h1 className='title'>VotingSessionEnded</h1>
                    { isOwner ? ( <button className="button is-primary" onClick={handleStatusChange}>Change state</button>) : ('')}
                </div>

                wait for results
               
            </>
            
            </div>
    );
};

