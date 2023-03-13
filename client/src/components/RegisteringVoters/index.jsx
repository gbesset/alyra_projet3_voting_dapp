import React, { useEffect, useState } from 'react';
import { useEth } from '../../contexts/EthContext';
import { RegisterVoterForm } from './RegisterVoterForm';
import WhiteListeList from './WhiteListeList';
import {WORKFLOW_STATUS} from '../../utils/utils.js'

export const RegisteringVoters = ({upgradeWorkflowStatus}) => {
    const { state: { contract, accounts, artifact, isOwner} } = useEth();

   
    
    function handleStatusChange(){
        upgradeWorkflowStatus(WORKFLOW_STATUS.ProposalsRegistrationStarted);
    }


    return (
        <div className="debug">
            {
            isOwner ? (
            <>
                <h1 className='title'>Registering voters</h1>
                <div className='has-text-right'>
                    <button className="button is-primary" onClick={handleStatusChange}>Change state</button>
                </div>

                <RegisterVoterForm />

                <WhiteListeList/>
               
            </>
            ) : (
            <>
                <h1 className='title'>Registering voters</h1>
                <p>The Owner have to enter your public address in order to white list you. Please contact him</p>
                <p>Your address is <strong>{accounts}</strong></p>
            </>
             )
             }
                   </div>
    );
};

