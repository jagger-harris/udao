import React from "react"
import { Link } from "react-router-dom";
import ThumbUpOffAltSharp from "@mui/icons-material/ThumbUpOffAltSharp"
import ThumbDownOffAltSharp from "@mui/icons-material/ThumbDownOffAltSharp"
import VoteRatio from "./VoteRatio";
import Tag from "./Tag";

import { setSelectedProposal } from "../../reduxActions";
import { useDispatch } from 'react-redux/es/exports';
import { breadcrumbsClasses } from "@mui/material";

function Card({proposal}) {
  const dispatch = useDispatch();

  const total = proposal.votes.forVotes + proposal.votes.againstVotes
  const forPercent = (proposal.votes.forVotes / total) * 100;
  const againstPercent = (proposal.votes.againstVotes / total) * 100

  function handleClick() {
    dispatch(setSelectedProposal(proposal))
  }

  return (
    <Link className="transition-all duration-200 w-full h-full p-5 mt-5 border-solid rounded-lg cursor-pointer border-4 border-gray bg-gray hover:bg-hover-gray hover:border-purple" onClick={() => handleClick()} to="/view_proposal">
      <h1 className="text-3xl mb-5">{proposal.metadata.title}</h1>
      <VoteRatio forPercent={forPercent} againstPercent={againstPercent}/>
      <div className="flex mb-5">
        <ThumbUpOffAltSharp className="mr-2.5"/>
        <p className="mr-5">{proposal.votes.forVotes}</p>
        <ThumbDownOffAltSharp className="mr-2.5"/>
        <p>{proposal.votes.againstVotes}</p>
      </div>
      <div className="flex">
        <Tag proposal={proposal}/>
      </div>
    </Link>
  )
}

export default Card
