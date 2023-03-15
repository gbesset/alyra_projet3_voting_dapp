import React, { useEffect, useState } from 'react';
import { useEth } from '../../contexts/EthContext';


export const VoteList = () => {
    const { state: {accounts, contract} } = useEth();

    const [voteList, setVoteList] = useState([]);

    useEffect(() =>{
        async function retrieveVotedPastEvents(){
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
        async function retrieveVotedEvent(){
            if(contract){
              contract.events.Voted({fromBlock:"earliest"})
              .on('data', event => {
                retrieveVotedPastEvents();
                })          
              .on('changed', changed => console.log(changed))
              .on('error', err => console.log(err))
              .on('connected', str => console.log(str))
            }
        }



        retrieveVotedPastEvents();
        retrieveVotedEvent();
    }, [contract, accounts])


    return (
        <>
      {Math.random()}
            <div className="columns">
                <div className="column is-one-quarter">
                    
                </div>
                <div className="column is-half">
                {voteList && Array.isArray(voteList) && voteList.length>0?(
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
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{v.voter}</td>
                                    <td>{v.proposalId}</td>
                                </tr>
                            )}
                        )}
                    </tbody>
                </table>
                 ) :  (  
                    <div>
                        <p className="subtitle">There is no vote at the moment</p>
                    </div>
                )   }
                </div>
                <div className="column is-one-quarter">
                
                </div>
            </div>
       
    </>
    );
};
