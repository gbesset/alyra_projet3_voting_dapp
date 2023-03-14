import React, { useEffect, useState } from 'react';
import { useEth } from '../../contexts/EthContext';
import {WORKFLOW_STATUS} from '../../utils/utils.js'
import { ProposalList } from '../ProposalsRegistrationStarted/ProposalsList';
import { VoteForm } from './VoteForm';
import { VoteList } from './VoteList';

export const VotingSessionStarted = ({upgradeWorkflowStatus}) => {
    const { state: { contract, accounts, artifact, isOwner} } = useEth();

    const [displayProposals, setDisplayProposals] = useState(false);
    const [voter, setVoter] = useState('');
    const [isVoter, setIsVoter] = useState(false);

    useEffect(()=>{
        async function getVoter(){
            if(contract){

                //Need to retrieve whitelist in events because getVoter is for OnlyVoter.
                const VoterRegisteredEvents = await contract.getPastEvents("VoterRegistered", {fromBlock:0, toBlock:"latest"});
                
                //find if addres is Whiiltelisted
                const whiteListVoterAddressEvent =  VoterRegisteredEvents.find((event)=>event.returnValues.voterAddress === accounts[0]);                   
                 
                if(whiteListVoterAddressEvent){
                    // voter is whitelisted
                    const whiteListAddress = whiteListVoterAddressEvent.returnValues.voterAddress;
                    setIsVoter(true);

                    //retrieve voter info
                    const voter = await contract.methods.getVoter(whiteListAddress).call({from: accounts[0]});
            
                    setVoter({
                        isRegistered: voter.isRegistered,
                        hasVoted: voter.hasVoted,
                        votedProposalId:voter.votedProposalId
                    })
                }
                else{
                    alert("You are not whitelisted")
                }
            }
        }

        getVoter();
    },[]);

    function handleStatusChange(){
        upgradeWorkflowStatus(WORKFLOW_STATUS.VotingSessionEnded);
    }

    return (
        <div className="debug">
            <>
                <div className="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                    <h1 className='title'>VotingSessionStarted</h1>
                    { isOwner ? ( <button className="button is-primary" onClick={handleStatusChange}>Change state</button>) : ('')}
                </div>
                <div className="columns mt-5 is-centered">
                    <div className="column is-half has-text-centered">
                        { isVoter? <VoteForm /> : (
                            <p>You are not whitelisted and can't vote...</p>    
                        )}

                    </div>
                    <div className="column is-half  has-text-centered">
                        <h3 className="subtitle">Proposals</h3> 
                        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={() =>setDisplayProposals(!displayProposals)}>
                            <span>Show proposals</span>
                            <span className="icon is-small">
                                <i className="fa fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </button>
                        {displayProposals? <ProposalList /> : '' }
                    </div>
                </div>

                
                <VoteList />
               
            </>
            
            </div>
    );
};

