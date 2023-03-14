import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async artifact => {
      if (artifact) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const { abi } = artifact;
        let address, contract;
        let isOwner = false;
        let isVoter = false;
        try {
          address = artifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
          if(contract && accounts){
            const owner = await contract.methods.owner().call({ from: accounts[0] });
            accounts[0] === owner ? isOwner=true : isOwner=false;
          }
          if(contract && accounts){
              //Need to retrieve whitelist in events because getVoter is for OnlyVoter.
              const VoterRegisteredEvents = await contract.getPastEvents("VoterRegistered", {fromBlock:0, toBlock:"latest"});
              //find if address is Whitelisted
              const whiteListVoterAddressEvent =  VoterRegisteredEvents.find((event)=>event.returnValues.voterAddress === accounts[0]);                   
              whiteListVoterAddressEvent ? isVoter= true : isVoter=false;;
          }
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contract, isOwner, isVoter }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/Voting.json");
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
