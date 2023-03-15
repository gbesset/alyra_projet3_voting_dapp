import React, { useEffect, useState } from 'react';
import { useEth } from '../../contexts/EthContext';

const WhiteListeList = () => {
    const { state: {accounts, contract} } = useEth();

    const [isWhiteListed, setIsWhiteListed] = useState(false);

    const [whiteList, setWhiteList] = useState([]);

    useEffect(() =>{
        async function retrieveRegisteringVotersPastEvents(){
            if(contract){
              
               const voterRegisteredEvents = await contract.getPastEvents("VoterRegistered", {fromBlock:0, toBlock:"latest"});
               
               let votersAddress = [];
               voterRegisteredEvents.map((event)=>{
                    votersAddress.push(event.returnValues.voterAddress);
                    if(accounts[0]===event.returnValues.voterAddress){
                        setIsWhiteListed(true);
                    }
                });
               setWhiteList(votersAddress);

            }
        }
       
       /* async function retrieveRegisterintVotersEvents(){
            if(contract){
              
                const voterRegisteredEvent = await contract.events.VoterRegistered({fromBlock:"earliest"})
                .on('data', event =>{
                    console.log(event.returnValues.VoterRegistered);
                })
                .on('changed', changed =>{
                    console.log(changed)
                })

            }
        }*/

        retrieveRegisteringVotersPastEvents();
        //retrieveRegisterintVotersEvents();
    }, [contract, accounts, whiteList])

    return (
        <>

     
            <div className="columns">
                <div className="column is-one-quarter">
                    {Math.random()} 
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
                  ) :  (  
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