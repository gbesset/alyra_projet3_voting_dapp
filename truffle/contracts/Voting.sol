// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

/// @title Voting contract 
/// @author https://github.com/gbesset
/// @notice Voting is used for only one session of vote.
/// @dev Implements a complete voting process in 6 steps managed by an owner
contract Voting is Ownable {

    uint public winningProposalID;
    
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }

    struct Proposal {
        string description;
        uint voteCount;
    }

    enum  WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    WorkflowStatus public workflowStatus;
    Proposal[] proposalsArray;
    mapping (address => Voter) voters;

     /// @dev Event emitted when a voter is registered (whitelisted)
     /// @param voterAddress voter address
    event VoterRegistered(address voterAddress); 
     
     /// @dev Event emitted when the workflow status change
     /// @param previousStatus the status before the change
     /// @param newStatus the new status
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
     
     /// @dev Event emitted when a proposal is done
     /// @param proposalId done
    event ProposalRegistered(uint proposalId);

     /// @dev Event emitted when a pvote is done
     /// @param voter who made the vote
     /// @param proposalId choosen by the voter
    event Voted (address voter, uint proposalId);
    
    /// @dev modifier to authorize only registered addresses
    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }
    
    // on peut faire un modifier pour les états

    // ::::::::::::: GETTERS ::::::::::::: //
    /// @notice return a voter from an address
    /// @return Voter  struct Voter from an address stored in the mapping
    /// @dev Return a voter. protected by onlyVoters.
    /// @param _addr voter address
    function getVoter(address _addr) external onlyVoters view returns (Voter memory) {
        return voters[_addr];
    }
    
    /// @notice return a proposal from its id
    /// @return Proposal struct Proposal stored in an array from an id
    /// @dev Return a proposal. protected by onlyVoters.
    /// @param _id proposal id
    function getOneProposal(uint _id) external onlyVoters view returns (Proposal memory) {
        return proposalsArray[_id];
    }

 
    // ::::::::::::: REGISTRATION ::::::::::::: // 
    /// @notice add a voter to the registered addresses (whitelist)
    /// @dev add a voter to the registered addresses. protected by onlyVoters.
    /// @param _addr address to register
    function addVoter(address _addr) external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Voters registration is not open yet');
        require(voters[_addr].isRegistered != true, 'Already registered');
    
        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }
 

    // ::::::::::::: PROPOSAL ::::::::::::: // 
    /// @notice add a proposal to the proposal list
    /// @dev add a proposal. protected by onlyVoters.
    /// @param _desc description of the proposal to add
    function addProposal(string calldata _desc) external onlyVoters {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Proposals are not allowed yet');
        require(keccak256(abi.encode(_desc)) != keccak256(abi.encode("")), 'Vous ne pouvez pas ne rien proposer'); // facultatif
        // voir que desc est different des autres

        Proposal memory proposal;
        proposal.description = _desc;
        proposalsArray.push(proposal);
        emit ProposalRegistered(proposalsArray.length-1);
    }

    // ::::::::::::: VOTE ::::::::::::: //
    /// @notice vote for a proposal
    /// @dev vote for a proposal. protected by onlyVoters. Calculate temporary winner to avoid DoS Gas limit
    /// @param _id if of the proposal voted
    function setVote( uint _id) external onlyVoters {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        require(voters[msg.sender].hasVoted != true, 'You have already voted');
        require(_id < proposalsArray.length, 'Proposal not found'); // pas obligé, et pas besoin du >0 car uint

        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount++;

        //Temporarty Winner (for DoS gas Limit)
        if(proposalsArray[_id].voteCount > proposalsArray[winningProposalID].voteCount){
            winningProposalID = _id;
        }

        emit Voted(msg.sender, _id);
    }

    // ::::::::::::: STATE ::::::::::::: //

    /// @notice change the workflow status from RegisteringVoters to ProposalsRegistrationStarted
    /// @dev change workflowstatus , protected by onlyOwner and the previous status
    function startProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Registering proposals cant be started now');
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;
        
        Proposal memory proposal;
        proposal.description = "GENESIS";
        proposalsArray.push(proposal);
        
        emit WorkflowStatusChange(WorkflowStatus.RegisteringVoters, WorkflowStatus.ProposalsRegistrationStarted);
    }

    /// @notice change the workflow status from ProposalsRegistrationStarted to ProposalsRegistrationEnded
    /// @dev change workflowstatus , protected by onlyOwner and the previous status
    function endProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Registering proposals havent started yet');
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationStarted, WorkflowStatus.ProposalsRegistrationEnded);
    }

    /// @notice change the workflow status from ProposalsRegistrationEnded to VotingSessionStarted
    /// @dev change workflowstatus , protected by onlyOwner and the previous status
    function startVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationEnded, 'Registering proposals phase is not finished');
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationEnded, WorkflowStatus.VotingSessionStarted);
    }

    /// @notice change the workflow status from VotingSessionStarted to VotingSessionEnded
    /// @dev change workflowstatus , protected by onlyOwner and the previous status
    function endVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionStarted, WorkflowStatus.VotingSessionEnded);
    }


    /// @notice change the workflow status from VotingSessionEnded to VotesTallied
    /// @dev change workflowstatus , protected by onlyOwner and the previous status
   function tallyVotes() external onlyOwner {
       require(workflowStatus == WorkflowStatus.VotingSessionEnded, "Current status is not voting session ended");       
       workflowStatus = WorkflowStatus.VotesTallied;
       emit WorkflowStatusChange(WorkflowStatus.VotingSessionEnded, WorkflowStatus.VotesTallied);
    }
}