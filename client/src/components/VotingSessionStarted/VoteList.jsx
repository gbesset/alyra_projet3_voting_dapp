import React, { useEffect, useState } from 'react';
import { useEth } from '../../contexts/EthContext';


export const VoteList = () => {
    const { state: {accounts, contract} } = useEth();

    const [voteList, setVoteList] = useState([]);

    useEffect(() =>{
        async function retrieveVotedEvents(){
            if(contract){
            
                const votedEvents = await contract.getPastEvents("Voted", {fromBlock:0, toBlock:"latest"});

                const votedListTmp=[];
                votedEvents.map((event) => {
                    votedListTmp.push({
                        voter:event.returnValues.voter,
                        proposalId:event.returnValues.proposalId
                    })
                setVoteList(votedListTmp);
                
                })
              
            }
        }

        retrieveVotedEvents();
    }, [contract, accounts, voteList])


    return (
        <>
        {voteList && Array.isArray(voteList)?(
            <div className="columns">
                <div className="column is-one-quarter">
                    
                </div>
                <div className="column is-half">
                        <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th><abbr title="address">Vote id</abbr></th>
                            <th><abbr title="address">address</abbr></th>
                            <th><abbr title="address">proposalId</abbr></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            voteList.map((v, index) => {
                                return(
                                <tr>
                                    <td>{index}</td>
                                    <td>{v.voter}</td>
                                    <td>{v.proposalId}</td>
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
                <p>No votes for now</p>
            </div>
        )   }
    </>
    );
};
