import React, { useEffect, useState } from 'react';
import { useEth } from '../../contexts/EthContext';

export const ProposalList = () => {
    const { state: {accounts, contract, txhash, web3} } = useEth();


    const [proposalList, setProposalList] = useState([]);

    useEffect(() =>{
        async function retrieveProposalRegisteredPastEvents(){
            if(contract){
                const deployTx = await web3.eth.getTransaction(txhash)
                //retrieve all past events
                const proposalRegisteredEvents = await contract.getPastEvents("ProposalRegistered", {fromBlock:deployTx.blockNumber , toBlock:"latest"});
              
                //retrieve all past events IDs
                const eventProposalIdList = proposalRegisteredEvents.map((event)=>event.returnValues.proposalId)
                    
                //retrieve all past events datas (desrciption, address)    
                let proposalListTmp = [];
                for(let id of eventProposalIdList){
                    const proposal = await contract.methods.getOneProposal(id).call({from:accounts[0]});
                    proposalListTmp.push(
                        {
                            id: id,
                            description:proposal.description,
                            voteCount: proposal.voteCount
                        }
                    )
                }
    
                console.log(proposalListTmp)
                setProposalList([...proposalListTmp]);
                
            }
        }

        async function retrieveProposalRegisteredEvent(){
            if(contract){
              contract.events.ProposalRegistered({fromBlock:"earliest"})
              .on('data', event => {
                retrieveProposalRegisteredPastEvents();
                })          
              .on('changed', changed => console.log(changed))
              .on('error', err => console.log(err))
              .on('connected', str => console.log(str))
            }
        }

        retrieveProposalRegisteredPastEvents();
        retrieveProposalRegisteredEvent();
    
    }, [])

    useEffect(() =>{
       
    }, [])

    

    return (
            <>
                <div className="columns">
                    <div className="column is-one-quarter">
                        
                    </div>
                    <div className="column is-half">
                    {proposalList && Array.isArray(proposalList) && proposalList.length>0?(
                            <table className="table is-fullwidth">
                        <thead>
                            <tr>
                                <th><abbr title="address">Proposal id</abbr></th>
                                <th><abbr title="address">Proposal</abbr></th>
                                <th><abbr title="address">voteCount</abbr></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                proposalList.map((p, index) => {
                                    return(
                                    <tr key={index}>
                                        <td>{p.id}</td>
                                        <td>{p.description}</td>
                                        <td>{p.voteCount}</td>
                                    </tr>
                                )}
                            )}
                        </tbody>
                    </table>
                       ) :  (  
                        <div>
                            <p className="subtitle">There are no proposals at the moment</p>
                        </div>
                    )   }

                    </div>
                    <div className="column is-one-quarter">
                    
                    </div>
                </div>
         
        </>

    );
};
