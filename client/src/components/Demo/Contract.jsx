import { useRef, useEffect, useState } from "react";
import useEth from '../../contexts/EthContext/useEth';

function Contract({ value, text }) {
  const spanEle = useRef(null);
  
  const [EventValue, setEventValue] = useState("");
  const [oldEvents, setOldEvents] = useState();

  //dans mon state, besoin ndu contrat
  const {state: {contract}} = useEth();

  useEffect(() => {
    spanEle.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };
  }, [value,text]);

  useEffect (() => {
    (async function(){
      let oldEvents= await contract.getPastEvents('valueChanged', {
        fromBlock: 0,
        toBlock: 'latest'
      });

      let oldies=[];
      oldEvents.forEach(event => {
            oldies.push(event.returnValues._val);
      });
      setOldEvents(oldies);


      await contract.events.valueChanged({fromBlock:"earliest"})
      .on('data', event => {
        let lastEvent = event.returnValues._val;
        setEventValue(lastEvent);
      })          
      .on('changed', changed => console.log(changed))
      .on('error', err => console.log(err))
      .on('connected', str => console.log(str))
    })();
  }, [contract])

  return (
    <code>
      {`contract SimpleStorage {
      uint256 value = `}

      <span className="secondary-color" ref={spanEle}>
        <strong>{value}</strong>
      </span>

      {`;
       string greeter = `}

       <span className="secondary-color" ref={spanEle}>
         <strong>{text}</strong>
       </span>
 
       {`;

  function read() public view returns (uint256) {
    return value;
  }

  function write(uint256 newValue) public {
    value = newValue;
  }


  function greet() public calldata returns (string memory _greeter) {
    return _greeter;
  }

  function setGreet(string memory _greeter) public {
    greeter = _greeter;
  }
}

Events incomming : `} {EventValue} {`
Old events :`} {oldEvents}

    </code>
  );
}

export default Contract;
