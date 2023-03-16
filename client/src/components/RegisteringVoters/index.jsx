import React from 'react';
import { useEth } from '../../contexts/EthContext';
import { RegisterVoterForm } from './RegisterVoterForm';
import WhiteListeList from './WhiteListeList';
import {WORKFLOW_STATUS} from '../../utils/utils.js'

export const RegisteringVoters = ({upgradeWorkflowStatus}) => {
    const { state: { accounts, isOwner, isVoter} } = useEth();
    
    function handleStatusChange(){     
        if(isOwner)
            upgradeWorkflowStatus(WORKFLOW_STATUS.ProposalsRegistrationStarted);
    }

  

    return (
        <div >
            {
            isOwner ? (
            <>
                <div className="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                    <h1 className='title'>Registering voters</h1>
                    <button className="button is-primary" onClick={handleStatusChange}>Change state</button>
                </div>

                <RegisterVoterForm />
               
            </>
            ) : (
            <>
                <h1 className='title'>Registering voters</h1>
                {!isVoter ?(<>
                <p>The owner has to enter your public address in order to whitelist you. Please contact him.</p>
                <p className="mt-4">Your address is <strong>{accounts[0]}</strong></p>
                </>):(
                    <p>Congratulations, you are whitelisted !</p>
                )}
            </>
             )
             }
            <br/>
            {isOwner || isVoter ? <WhiteListeList/> : '' }
            
        </div>
    );
};

