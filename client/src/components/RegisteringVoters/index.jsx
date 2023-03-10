import React, { useEffect, useState } from 'react';
import { useEth } from '../../contexts/EthContext';
import { RegisterVoterForm } from './RegisterVoterForm';
import WhiteListeList from './WhiteListeList';

export const RegisteringVoters = () => {
    const { state: { contract, accounts, artifact, isOwner} } = useEth();

   
    
/*
    useEffect(()=>{
        async function getPha
    },[accounts, contract, artifact])*/


    return (
        <div className="debug">
            {
            isOwner ? (
            <>
                <h1 className='title'>Registering voters</h1>
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

