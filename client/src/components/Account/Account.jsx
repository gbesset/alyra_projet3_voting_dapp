import React, { useEffect, useState } from 'react';

export const Account = ({accounts, isOwner}) => {
    
    const [user, setUser] = useState('');
    
    useEffect(()=>{
        if(accounts){
            let u = accounts[0].substring(0,5)+"..."+accounts[0].substring(accounts[0].length-4,accounts[0].length);
            setUser(u);
        }
        else{
            setUser("not connected");
        }
    },[accounts]);

    
    return (
        <div>
            {isOwner===true?(
                <>
                <span className="icon is-large"><i className="fa fa-user"></i></span>
                 <a className="button is-primary">
                        {user}
                </a>
                </>
            ) : (
                <>
                <a className="button is-light">
                         {user}
                    </a>
                </>
                    
            )}
           
        </div>
    );
};
