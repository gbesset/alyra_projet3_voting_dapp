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
                    let votersAddress=[];
                    results.forEach(event => {
                        votersAddress.push(event.returnValues.voterAddress);    
                    });
                    setWhiteList(votersAddress);

                    /*
                    TODO erreur : in a list should have a unique "key" prop.
                    let votersAddress = results.map((event,index) => {
                        return {voterAddress: event.returnValues.voterAddress, key:index}
                    });
                    setWhiteList(votersAddress)
                    */
        
                })
               .catch(err => console.log(err));
            }
        }

        retrieveRegisteringVotersEvents();
    }, [contract, accounts, whiteList])

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