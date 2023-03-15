import React, { useState } from 'react';
import { useEth } from '../../contexts/EthContext';


export const VoteForm = () => {

    const [proposalId, setProposalId] = useState('');
    const [hasVoted, setHasVoted] = useState(false);
    const { state: {accounts, contract} } = useEth();

    const handleVoteChange = (e) =>{
        setProposalId(e.target.value);    
    }

    const handleVote = async() =>{
        if (proposalId && /^\d+$|^$/.test(proposalId)) {
            await contract.methods.setVote(proposalId).send({from:accounts[0]});
            setHasVoted(true);
            setProposalId('');
        }else{
              alert("invalid proposal id")
            }
        }

    return (
        <div className="field">
        <h3 className="subtitle">Vote for a proposal</h3> hasvoted{hasVoted}
        <div className="columns is-centered">
            <div className="column has-text-centered ml-5">
                <div className="control">
                    <input className="input is-success" value={proposalId} onChange={handleVoteChange} type="text" placeholder="proposal Id" />
                </div>
            </div>
            <div className="column has-text-centered">
                <div className="control">
                    <button className="button is-primary"  disabled={hasVoted?'disabled' :''} onClick={handleVote}>Vote</button>
                </div>
            </div>
         </div>
    </div>
    );
};
