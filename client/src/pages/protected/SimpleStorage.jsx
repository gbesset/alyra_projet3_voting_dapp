import React from 'react';
import Intro from "../../components/Intro/";
import Setup from "../../components/Setup";
import {Demo} from "../../components/Demo";

export const SimpleStorage = () => {
    return (
        <div>
            <Intro />
          <hr />
          <Setup />
          <hr />
          <Demo />
          <hr />

        </div>
    );
};
