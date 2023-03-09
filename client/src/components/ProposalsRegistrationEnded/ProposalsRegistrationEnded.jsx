import React from 'react';

export const ProposalsRegistrationEnded = () => {
    return (
        <div class="debug">
            <h1 className="title">Proposals Registration Ended</h1>
            <p>Here are the proposals, choose one for the vote</p>
            <table class="table">
                <thead>
                    <tr>
                        <th><abbr title="id">Id</abbr></th>
                        <th><abbr title="name">name</abbr></th>
                        <th><abbr title="address">address?</abbr></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0</td>
                        <td>proposal 1</td>
                        <td>xxxxx</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>proposal 2</td>
                        <td>xxxxx</td>
                    </tr>
        
                </tbody>
            </table>
        </div>
    );
};
