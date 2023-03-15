import React, { useEffect, useState } from 'react';
import { ProposalsRegistrationEnded } from '../../components/ProposalsRegistrationEnded/ProposalsRegistrationEnded';
import { ProposalsRegistrationStarted } from '../../components/ProposalsRegistrationStarted/index';
import { RegisteringVoters } from '../../components/RegisteringVoters/index';
import { WorkflowStatus } from '../../components/WorkflowStatus';
import { useEth } from '../../contexts/EthContext';
import {WORKFLOW_STATUS} from '../../utils/utils.js'
import { VotingSessionStarted } from '../../components/VotingSessionStarted';
import { VotingSessionEnded } from '../../components/VotingSessionEnded';
import { VotesTallied } from '../../components/VotesTallied';

export const Voter = () => {
    const { state: { contract, accounts, artifact, isOwner, web3} } = useEth();

    const [workflowStatus, setWorkflowStatus] = useState(0);    //workflowStatus
   
  
    
    const refreshStatus = async () => {
        const status = await contract.methods.workflowStatus().call({ from: accounts[0] });
        setWorkflowStatus(parseInt(status));
    }

    useEffect( () =>{    
        
        async function getWorkflowStatus() {
            if (contract && contract?.methods) {
               refreshStatus()
            }
        }
      
   
        getWorkflowStatus();
    }, [accounts, contract, artifact, workflowStatus]);


    async function handleStatusChange(newStatus){

        if(workflowStatus === WORKFLOW_STATUS.RegisteringVoters  && newStatus===WORKFLOW_STATUS.ProposalsRegistrationStarted){
            await contract.methods.startProposalsRegistering().send({from:accounts[0]})
            setWorkflowStatus(newStatus);
        }
        else if(workflowStatus === WORKFLOW_STATUS.ProposalsRegistrationStarted  && newStatus===WORKFLOW_STATUS.ProposalsRegistrationEnded){
            await contract.methods.endProposalsRegistering().send({from:accounts[0]})
            setWorkflowStatus(newStatus);
        }
        else if(workflowStatus === WORKFLOW_STATUS.ProposalsRegistrationEnded  && newStatus===WORKFLOW_STATUS.VotingSessionStarted){
            await contract.methods.startVotingSession().send({from:accounts[0]})
            setWorkflowStatus(newStatus);
        }
        else if(workflowStatus === WORKFLOW_STATUS.VotingSessionStarted  && newStatus===WORKFLOW_STATUS.VotingSessionEnded){
            await contract.methods.endVotingSession().send({from:accounts[0]})
            setWorkflowStatus(newStatus);
        }
        else if(workflowStatus === WORKFLOW_STATUS.VotingSessionEnded  && newStatus===WORKFLOW_STATUS.VotesTallied){
            //TODO tallyVote
            await contract.methods.tallyVotes().send({from:accounts[0]})
            setWorkflowStatus(newStatus);
        }
        else{
            alert('Impossible de changer de status...')
        }
        
    }

    return (
        <div>
            <h1 className="title">Voting Dapp</h1>
            <WorkflowStatus workflowStatus={workflowStatus} />
            {accounts ? (
                <>
                    <br/>
                    {workflowStatus===WORKFLOW_STATUS.RegisteringVoters ? <RegisteringVoters upgradeWorkflowStatus={handleStatusChange}/>: ''}
                   
                    {workflowStatus===WORKFLOW_STATUS.ProposalsRegistrationStarted ?<ProposalsRegistrationStarted upgradeWorkflowStatus={handleStatusChange}/>: '' }
                 
                    {workflowStatus===WORKFLOW_STATUS.ProposalsRegistrationEnded ?<ProposalsRegistrationEnded upgradeWorkflowStatus={handleStatusChange}/> : '' }
                  
                    {workflowStatus===WORKFLOW_STATUS.VotingSessionStarted ?<VotingSessionStarted upgradeWorkflowStatus={handleStatusChange}/> : '' }
                    
                    {workflowStatus===WORKFLOW_STATUS.VotingSessionEnded ?<VotingSessionEnded upgradeWorkflowStatus={handleStatusChange}/> : '' }
                    
                    {workflowStatus===WORKFLOW_STATUS.VotesTallied ?<VotesTallied upgradeWorkflowStatus={handleStatusChange}/> : '' }
                  </>
                ) : (
                    <p>Need to connect with your wallet...</p>
                )
                }
          
         
        </div>
    );
};
