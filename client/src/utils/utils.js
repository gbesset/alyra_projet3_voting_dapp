import { toast } from 'bulma-toast'

export const WORKFLOW_STATUS = {
    "RegisteringVoters":0,
    "ProposalsRegistrationStarted":1,
    "ProposalsRegistrationEnded":2,
    "VotingSessionStarted":3,
    "VotingSessionEnded":4,
    "VotesTallied":5,
  };

  export const toastInfo = (message) => { 
        toast({
            message: message,
            type: 'is-info',
            position:'top-center',
            duration: 2000,          
          })
    }
   export const toastWarning = (message) => {
        toast({
            message: message,
            type: 'is-warning',
            position:'top-center',
          })
    }
    export const toastError = (message) =>{
        toast({
            message: message,
            type: 'is-danger',
            position:'top-center',
          })
    }