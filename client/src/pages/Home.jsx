import React from 'react';
import { useNavigate } from "react-router-dom";

export const Home = () => {

    const navigate = useNavigate();
    
    function routeChange(){ 
      let path = '/protected/voter'; 
      navigate(path);
    }

    return (
        <>
            <section className="section">
            <div className="container">
            <div className="columns">
                <div className="column">
                <img src="/images/voting.jpg" alt="background" />
                </div>
                <div className="column">
                <div className="is-flex is-flex-direction-column is-justify-content-center h-100">
                <h1 className="title">Projet #3 Dapp Voting</h1>
                <div className="subtitle pt-2">Developed by:
                    <ul className="pl-2">
                        <li className="pt-2">Guillaume Besset</li>
                        <li className="pt-2">Eli Gonzalez Zarate</li>
                    </ul> 
                </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        <section className="section">
            <div className="container has-text-centered">
            <h1 className="title">How to do ?</h1>
            <div>
                <ul className="is-inline-block has-text-left">
                    <li>Connect with your Wallet</li>
                    <li>Be white-listed</li>
                    <li>Make some proposals and vote</li>
                </ul>
            </div>
            <button className="button is-primary mt-2" onClick={routeChange}>Go !</button>
            </div>
        </section>
      </>
    );
};
