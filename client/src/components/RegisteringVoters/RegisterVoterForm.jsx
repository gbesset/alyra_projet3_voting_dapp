import React, { useState }  from 'react';
import { useEth } from '../../contexts/EthContext';

export const RegisterVoterForm = () => {
    const [address, setAddress] = useState('');
    const { state: {accounts, contract,  web3} } = useEth();

    const handleAddressChange = (e) =>{
        setAddress(e.target.value);
    }

    const handleAdd = async() =>{
        if (!web3.utils.isAddress(address)) {
            alert("invalid address")
          }else{
            await contract.methods.addVoter(address).send({from:accounts[0]});
        }
    }

    return (
        <div className="field">
            <label className="subtitle ml-5">Address to whiteList</label>
            <div className="columns is-centered">
                <div className="column is-half has-text-centered ml-5">
                    <div className="control">
                        <input className="input is-success" value={address} onChange={handleAddressChange} type="text" placeholder="Address to whitelist" />
                    </div>
                </div>
                <div className="column">
                    <div className="control">
                        <button className="button is-primary" onClick={handleAdd}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
