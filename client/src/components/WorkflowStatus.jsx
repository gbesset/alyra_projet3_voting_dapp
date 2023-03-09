import React, { useEffect, useState } from 'react';
import 'bulma-o-steps/bulma-steps.min.css';
import useEth from "../contexts/EthContext/useEth";


export const WorkflowStatus = (props) => {
    const { state: { contract, accounts , artifact} } = useEth();
    const [workflowStatus, setWorkflowStatus] = useState(props.workflowStatus);

    useEffect( () =>{
        
        async function getWorkflowStatus() {
            if (contract) {
                const status = await contract.methods.workflowStatus().call({ from: accounts[0] });
                setWorkflowStatus(parseInt(status));
                props.onStatusChange(parseInt(status));
            }
        }

        /** Gérer les eveneemnts pour faire un props.onStatusChange  */
      
        getWorkflowStatus();
    }, [accounts, artifact, contract]);


    return (
        <>
         <ul className="steps is-balanced">
            <li className="steps-segment ">
            <span className="steps-marker">
                <span className="icon">
                <i className="fa fa-user"></i>
                </span>
            </span>
            <div className="steps-content">
                <p className="is-size-5">RegisteringVoters</p>
                <p className="is-size-6">Ask the admin to be registered</p>
            </div>
            </li>
            <li className="steps-segment is-active">
            <span className="steps-marker"></span>
            <div className="steps-content">
                <p className="is-size-5">ProposalsRegistrationStarted</p>
                <p className="is-size-6">You can make some proposals</p>
            </div>
            </li>
            <li className="steps-segment">
            <span className="steps-marker">
                <span className="icon">
                    <i className="fa fa-user"></i>
                    </span>
                </span>
            <div className="steps-content">
                <p className="is-size-5">ProposalsRegistrationEnded</p>
                <p className="is-size-6">End of proposals. Wait for the next step</p>
            </div>
            </li>
            <li className="steps-segment">
            <span className="steps-marker"></span>
            <div className="steps-content">
                <p className="is-size-5">VotingSessionStarted</p>
                <p className="is-size-6">You can vote</p>
            </div>
            </li>
            <li className="steps-segment">
            <span className="steps-marker">
                <span className="icon">
                    <i className="fa fa-user"></i>
                    </span>
            </span>
            <div className="steps-content">
                <p className="is-size-5">VotingSessionEnded</p>
                <p className="is-size-6">End of vote. Wait for the admin to get the results</p>
            </div>
            </li>
            <li className="steps-segment">
            <span className="steps-marker">
                <span className="icon">
                    <i className="fa fa-user"></i>
                    </span>
            </span>
            <div className="steps-content">
                <p className="is-size-5">VotesTallied</p>
                <p className="is-size-6">Here are the results !</p>
            </div>
            </li>
        </ul>

            
        </>
    );
};

