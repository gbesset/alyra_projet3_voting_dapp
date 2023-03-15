import React, { useEffect, useState } from 'react';
import { useEth } from '../../contexts/EthContext';

const WhiteListeList = () => {
    const { state: {accounts, contract} } = useEth();

    const [isWhiteListed, setIsWhiteListed] = useState(false);

    const [whiteList, setWhiteList] = useState([]);

    useEffect(() =>{
        async function retrieveRegisteringVotersEvents(){
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

                    /*
                    TODO erreur : in a list should have a unique "key" prop.
                    let votersAddress = results.map((event,index) => {
                        return {voterAddress: event.returnValues.voterAddress, key:index}
                    });
                    setWhiteList(votersAddress)
                    */

            }
        }
       
        retrieveRegisteringVotersEvents();
    }, [contract, accounts, whiteList])

    return (
        <>

     
            <div className="columns">
                <div className="column is-one-quarter">
                    
                </div>
                <div className="column is-half">
                {whiteList && Array.isArray(whiteList)?
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
                            <tr className={accounts[0]=== voter ? "is-selected":""}>
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