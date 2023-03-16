import React, { useEffect, useState } from 'react';
import { useEth } from '../../contexts/EthContext';
import {WORKFLOW_STATUS} from '../../utils/utils.js'
import { ProposalList } from '../ProposalsRegistrationStarted/ProposalsList';
import { VoteForm } from './VoteForm';
import { VoteList } from './VoteList';

export const VotingSessionStarted = ({upgradeWorkflowStatus}) => {
    const { state: { contract, accounts, isOwner, isVoter} } = useEth();

    const [displayProposals, setDisplayProposals] = useState(false);
    const [voter, setVoter] = useState('');


    useEffect(()=>{
        async function getVoter(){

            if(contract){       
                if(isVoter){
                    //retrieve voter info
                    const voterInfo = await contract.methods.getVoter(accounts[0]).call({from: accounts[0]});
            
                    setVoter({
                        isRegistered: voterInfo.isRegistered,
                        hasVoted: voterInfo.hasVoted,
                        votedProposalId:voterInfo.votedProposalId
                    })
                    console.log(isVoter + "  "+voter.isRegistered);
                }
                
            }
        }

        getVoter();
    },[accounts]);

    function voterVote(proposalId){
        setVoter({
            isRegistered: voter.isRegistered,
            hasVoted: true,
            votedProposalId:proposalId
        })
    }

    function handleStatusChange(){
        if(isOwner)
            upgradeWorkflowStatus(WORKFLOW_STATUS.VotingSessionEnded);
    }

    return (
            <>
                <div className="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                    <h1 className='title'>VotingSessionStarted</h1>
                    { isOwner ? ( <button className="button is-primary" onClick={handleStatusChange}>Change state</button>) : ('')}
                </div>
                <div className="columns mt-5 is-centered">
                    <div className="column is-half has-text-centered">
                        { 
                        isVoter && voter.hasVoted ? (
                            <p>You voted for {voter.votedProposalId}</p>    
                        )
                        :(
                            isVoter? <VoteForm voterVote={voterVote}/> : (
                            <p>You are not whitelisted and can't vote...</p>    
                        ))}

                    </div>
                    <div className="column is-half  has-text-centered">
                        {isVoter?
                        (
                            <>
                        <h3 className="subtitle">Proposals</h3> 
                        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={() =>setDisplayProposals(!displayProposals)}>
                            <span>Show proposals</span>
                            <span className="icon is-small">
                                <i className="fa fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </button>
                        {displayProposals? <ProposalList  hideVoteCount="true"/> : '' }
                        </>
                        ) : ( '' )}
                    </div>
                </div>

                
                {isVoter? <VoteList /> : '' }
               
            </>

    );
};

