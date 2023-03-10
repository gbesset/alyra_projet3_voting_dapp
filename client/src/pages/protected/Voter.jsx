import React, { useEffect, useState } from 'react';
import { ProposalsRegistrationEnded } from '../../components/ProposalsRegistrationEnded/ProposalsRegistrationEnded';
import { ProposalsRegistrationStarted } from '../../components/ProposalsRegistrationStarted/ProposalsRegistrationStarted';
import { RegisteringVoters } from '../../components/RegisteringVoters/index';
import { WorkflowStatus } from '../../components/WorkflowStatus';
import { useEth } from '../../contexts/EthContext';
import { Account } from '../../components/Account/Account';

export const Voter = () => {
    const { state: { contract, accounts, artifact, isOwner} } = useEth();

    const [workflowStatus, setWorkflowStatus] = useState(0);    //workflowStatus
   
  
    
    const refreshStatus = async () => {
        alert('refresh status');
        const status = await contract.methods.workflowStatus().call({ from: accounts[0] });
        setWorkflowStatus(parseInt(status));
        //props.onStatusChange(parseInt(status));
    }

    useEffect( () =>{    
        
        async function getWorkflowStatus() {
            if (contract && contract?.methods) {
               refreshStatus()
            }
        }
      
          //getAccount();
       // getWorkflowStatus();
    }, [accounts, contract, artifact]);


    function handleStatusChange(newStatus){
        setWorkflowStatus(newStatus);
    }

    return (
        <div>
            <h1 className="title">Voting Dapp</h1>
            <WorkflowStatus workflowStatus={workflowStatus} />
            {accounts ? (
                <>
                    <Account account={accounts}  isOwner={isOwner}/>
                    <br/>
                    <p className="debug">Le status est {workflowStatus}</p>
                    <br/>
                    {workflowStatus==0 ? <RegisteringVoters setWorkflowStatus={setWorkflowStatus}/>: ''}
                    <br/>
                    {workflowStatus==1 ?<ProposalsRegistrationStarted/>: '' }
                    <br />
                    {workflowStatus==2 ?<ProposalsRegistrationEnded /> : '' }
                  </>
                ) : (
                    <p>Need to connect with your wallet...</p>
                )
                }
          
         
        </div>
    );
};
