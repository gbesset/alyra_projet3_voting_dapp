import React, { useEffect, useState } from 'react';
import { useEth } from '../../contexts/EthContext';
import {WORKFLOW_STATUS} from '../../utils/utils.js'
import { ProposalList } from '../ProposalsRegistrationStarted/ProposalsList';
import { VoteForm } from './VoteForm';
import { VoteList } from './VoteList';

export const VotingSessionStarted = ({upgradeWorkflowStatus}) => {
    const { state: { contract, accounts, artifact, isOwner, isVoter} } = useEth();

    const [displayProposals, setDisplayProposals] = useState(false);
    const [voter, setVoter] = useState('');
    const [hasVoted, setHasVoted] = useState(false);


    useEffect(()=>{
        async function getVoter(){
            if(contract){

                if(isVoter){
                    //retrieve voter info
                    const voter = await contract.methods.getVoter(accounts[0]).call({from: accounts[0]});
            
                    setVoter({
                        isRegistered: voter.isRegistered,
                        hasVoted: voter.hasVoted,
                        votedProposalId:voter.votedProposalId
                    })
                    setHasVoted(voter.hasVoted);
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
        setHasVoted(true);
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
                        hasVoted ? (
                            <p>You voted for {voter.votedProposalId}</p>    
                        )
                        :(
                            isVoter? <VoteForm /> : (
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
                        {displayProposals? <ProposalList /> : '' }
                        </>
                        ) : ( '' )}
                    </div>
                </div>

                
                {isVoter? <VoteList /> : '' }
               
            </>

    );
};

