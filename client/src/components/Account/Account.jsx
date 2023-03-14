import React from 'react';

export const Account = ({account, isOwner}) => {
    return (
        <div>
            
            You are connected with this address : {account} and {isOwner==true?'is owner':'is not owner'}
        </div>
    );
};
