import React, { useEffect, useState } from 'react';
import { useEth } from '../../contexts/EthContext';
import { toastError} from '../../utils/utils.js'

export const VotesTallied = ({upgradeWorkflowStatus}) => {
    const { state: { contract, accounts, isVoter} } = useEth();

    const [winingProposal, setWinningProposal] = useState('');
    const [winingProposalDescription, setWinningProposalDescription] = useState('');

    useEffect(() =>{
        async function retrieveWinningProposalID(){
            if(contract){
            
                try{
                    const wining = await contract.methods.winningProposalID().call({from: accounts[0]});
                    setWinningProposal(wining);

                    if(isVoter){
                        const proposal = await contract.methods.getOneProposal(wining).call({from: accounts[0]});
                        setWinningProposalDescription(
                            {
                                description:proposal.description,
                                voteCount: proposal.voteCount
                            }
                        );
                    }
                }
                catch(error){
                    console.log(error)
                    toastError("Problem to retrieve winningProposalId")
                }
            }
        }

        retrieveWinningProposalID();
    },[accounts]);

    return (
            <div className="min-h-70">
                <div className="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                    <h1 className='title'>VotesTallied</h1>
                </div>

                <p className="subtitle mt-5">The wining proposal is #{winingProposal} ! {isVoter ?<span>with : <b>{winingProposalDescription.description}</b> ({winingProposalDescription.voteCount} votes)</span>:''}
                </p>
          
                </div>

    );
};

