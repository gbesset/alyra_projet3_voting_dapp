import React, { useEffect, useState } from 'react';
import { useEth } from '../../contexts/EthContext';

 const WhiteListeList = () => {
    const { state: {accounts, contract, isVoter, txhash, web3} } = useEth();
    const [whiteList, setWhiteList] = useState([]);

    useEffect(() =>{

        /**
         * retrieve all past VoterRegistered events
         */
        async function retrieveRegisteringVotersPastEvents(){
            if(contract){
               const deployTx = await web3.eth.getTransaction(txhash)
               const voterRegisteredEvents = await contract.getPastEvents("VoterRegistered", {fromBlock:deployTx.blockNumber , toBlock:"latest"});
               
               let votersAddress = [];
               voterRegisteredEvents.map((event)=>{
                    votersAddress.push(event.returnValues.voterAddress);
                });
               setWhiteList(votersAddress);
            }
        }

        /** 
         * Listen the events  VoterRegistered. 
         * if there is a new one => call retrieveRegisteringVotersPastEvents to retrieve all events
         * */
        async function retrieveRegisteringVotersEvent(){
            if(contract){
              contract.events.VoterRegistered({fromBlock:"earliest"})
              .on('data', event => {
                retrieveRegisteringVotersPastEvents();
                })          
            }
        }

        retrieveRegisteringVotersPastEvents();
        retrieveRegisteringVotersEvent();
    }, [contract, accounts])

    return (
        <>
            <div className="columns">
                <div className="column is-one-quarter">
                </div>
                <div className="column is-half">
                {whiteList && Array.isArray(whiteList) && whiteList.length>0?
        (
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
                            <tr key={index} className={accounts[0]=== voter ? "is-selected":""}>
                                <td>{index}</td>
                                <td>{voter}</td>
                            </tr>
                        )}
                        )}
                    </tbody>
                </table>
                  ) :   (  
                    <p className="subtitle">No addresses have been whitelisted</p>
                )   }
                </div>
                <div className="column is-one-quarter">
                
                </div>
            </div>
      
        </>
    );
};
export default WhiteListeList;