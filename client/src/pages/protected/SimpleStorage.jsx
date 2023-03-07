import React from 'react';
import Intro from "../../components/Intro/";
import Setup from "../../components/Setup";
import {Demo} from "../../components/Demo";
import Footer from "../../components/Footer";

export const SimpleStorage = () => {
    return (
        <div>
            <Intro />
          <hr />
          <Setup />
          <hr />
          <Demo />
          <hr />
          <Footer />
        </div>
    );
};
