import React, { useEffect, useState } from 'react';
import { useEth } from '../../contexts/EthContext';

const WhiteListeList = () => {
    const { state: {accounts, contract,  web3} } = useEth();

    const [whiteList, setWhiteList] = useState([]);

    useEffect(() =>{
        async function retrieveRegisteringVotersEvents(){
            if(contract){
              
               contract.getPastEvents("VoterRegistered", {fromBlock:0, toBlock:"latest"})
               .then(results => {
                let wl=[];
                results.forEach(event => {
                    wl.push(event.returnValues.voterAddress);    
                });
                    //const votersAddress = results.map((voter) => voter.returnValues.voterAddress);
                    //setWhiteList(votersAddress)
                setWhiteList(wl);
                })
               .catch(err => console.log(err));

            }

            await contract.events.VoterRegistered({fromBlock:"earliest"})
                .on('data', event => {
                    console.log(event.returnValues.voterAddress);
                })          
                .on('changed', changed => console.log(changed))
                .on('error', err => console.log(err))
                .on('connected', str => console.log(str))
        }

        retrieveRegisteringVotersEvents();
    }, [contract, accounts])

    return (
        <>
        {whiteList ==0?
        (
            <p>No events.....</p>
        ) :  (  
            <div className="columns">
                <div className="column is-one-quarter">
                    
                </div>
                <div className="column is-half">
                        <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th><abbr title="id">Id</abbr></th>
                            <th><abbr title="address">address</abbr></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        whiteList.map((voter, index) => {
                            return(
                            <tr>
                                <td>{index}</td>
                                <td>{voter}</td>
                            </tr>
                        )}
                        )}
                    </tbody>
                </table>
                </div>
                <div className="column is-one-quarter">
                
                </div>
            </div>
        )   }
        </>
    );
};

export default WhiteListeList;