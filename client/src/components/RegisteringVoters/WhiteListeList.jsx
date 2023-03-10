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
               
                    const votersAddress = results.map((voter) => voter.returnValues.voterAddress);
                    setWhiteList(votersAddress)
                })
               .catch(err => console.log(err));

            }
        }

        retrieveRegisteringVotersEvents();
    }, [contract, accounts])

    return (
         <div className="columns">
            <div className="column is-one-quarter">
                
            </div>
            <div className="column is-half">
                    <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th><abbr title="id">Id</abbr></th>
                        <th><abbr title="name">name</abbr></th>
                        <th><abbr title="address">address</abbr></th>
                    </tr>
                </thead>
                <tbody>
                    {
                    whiteList.map((voter) => {
                        <tr>
                            <td>key={voter}</td>
                            <td>proposal 1</td>
                            <td>{voter}</td>
                        </tr>
                    }
                    )}
                    
                    
                  
        
                </tbody>
            </table>
            </div>
            <div className="column is-one-quarter">
            
            </div>
        </div>
    );
};

export default WhiteListeList;