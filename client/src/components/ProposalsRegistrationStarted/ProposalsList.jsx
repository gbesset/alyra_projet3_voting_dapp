import React, { useEffect, useState } from 'react';
import { useEth } from '../../contexts/EthContext';

export const ProposalList = () => {
    const { state: {accounts, contract} } = useEth();


    const [proposalList, setProposalList] = useState([]);

    useEffect(() =>{
        async function retrieveProposalRegisteredOldEvents(){
            if(contract){
              contract.getPastEvents("ProposalRegistered", {fromBlock:0, toBlock:"latest"})
               .then(results => {
                    const proposals = results.map((event)=>event.returnValues.proposalId)
                    setProposalList(proposals);
                })
               .catch(err => console.log(err));
            }
        }

        retrieveProposalRegisteredOldEvents();
    }, [contract, accounts, proposalList])

    useEffect(() =>{
        async function retrieveProposalRegisteredEvent(){
            if(contract){
              contract.events.ProposalRegistered({fromBlock:"earliest"})
              .on('data', event => {alert("Vous avez ajouté la proposition : "+event.returnValues.proposalId);})          
              .on('changed', changed => console.log(changed))
              .on('error', err => console.log(err))
              .on('connected', str => console.log(str))
            }
        }

        retrieveProposalRegisteredEvent();
    }, [])

    

    return (
            <>
            {proposalList && Array.isArray(proposalList)?(
                <div className="columns">
                    <div className="column is-one-quarter">
                        
                    </div>
                    <div className="column is-half">
                            <table className="table is-fullwidth">
                        <thead>
                            <tr>
                                <th><abbr title="id">Id</abbr></th>
                                <th><abbr title="address">Proposal id</abbr></th>
                                <th><abbr title="address">Proposal</abbr></th>
                                <th><abbr title="address">address</abbr></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                proposalList.map((p, index) => {
                                    return(
                                    <tr>
                                        <td>{index}</td>
                                        <td>{p}</td>
                                        <td>{p}</td>
                                        <td>{p}</td>
                                    </tr>
                                )}
                            )}
                        </tbody>
                    </table>
                    </div>
                    <div className="column is-one-quarter">
                    
                    </div>
                </div>
            ) :  (  
                <div>
                    <p>No proposals.....</p>
                </div>
            )   }
        </>

    );
};
