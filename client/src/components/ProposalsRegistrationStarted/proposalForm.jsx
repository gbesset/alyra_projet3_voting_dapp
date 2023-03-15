import React, { useState }  from 'react';
import { useEth } from '../../contexts/EthContext';

export const ProposalForm = () => {

    const [proposal, setProposal] = useState('');
    const { state: {accounts, contract} } = useEth();

    const handleProposalChange = (e) =>{
            setProposal(e.target.value);    
    }

    const handleAdd = async() =>{
        if(proposal && proposal.length>0){
            await contract.methods.addProposal(proposal).send({from:accounts[0]});
            setProposal('');
        }else{
              alert("invalid proposal")
            }
        }


    return (
        <div className="field">
            <label className="subtitle ml-5">Add a proposal</label>
            <div className="columns">
                <div className="column is-half">
                    <div className="control ml-5">
                        <input className="input is-success" value={proposal} onChange={handleProposalChange} type="text" placeholder="your proposal" />
                    </div>
                </div>
                <div className="column">
                    <div className="control">
                        <button className="button is-primary" onClick={handleAdd}>Add</button>
                    </div>
                </div>
             </div>
        </div>
       

    );
};
