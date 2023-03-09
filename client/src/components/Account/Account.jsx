import React, { useEffect, useState } from 'react';
import useEth from "../../contexts/EthContext/useEth";


export const Account = () => {
    const { state: { accounts } } = useEth();
    const [account, setAccount] = useState("");

    useEffect(()=>{
        async function getAccount(){
            if(accounts){
                setAccount(accounts[0]);
            }
        }

        getAccount();
    }, [accounts]);

    return (
        <div>
            
            You are connected with this address : {account}
        </div>
    );
};
