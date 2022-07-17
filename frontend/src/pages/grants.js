import TitleCard from "../components/Cards/titlecard";
import GrantCard from "../components/Cards/grantCard";
import GBanner from "../components/Banners/banner2"
import Loading from "../components/Loading/loading";

import { getGrants } from "../data/UDAOApi";
import { useEffect, useState } from 'react';

import "./styling/common.css"

function Grants() {
    const [grantData, setGrantData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [activeGrants, setActiveGrants] = useState([]);
    const [inactiveGrants, setInactiveGrants] = useState([]);
    const [myGrants, setMyGrants] = useState([])

    const [cardTitle, setCardTitle] = useState("Active Grants");

    function FilterGrants(props) {
        const status=props.status;
        if (isLoading) {
            return (
                <Loading />
            )
        }
        else if (status === "Active Grants" && !isLoading) {
            return (
                activeGrants.map(grant => {
                    return <GrantCard title={grant.title} desc={grant.desc} amount={grant.amount} yesVotes={grant.yesVotes} noVotes={grant.noVotes} active={grant.active}/>
                })
            )
        }
        else if (status === "Inactive Grants" && !isLoading) {
            return (
                inactiveGrants.map(grant => {
                    return <GrantCard title={grant.title} desc={grant.desc} amount={grant.amount} yesVotes={grant.yesVotes} noVotes={grant.noVotes} active={grant.active}/>
                })
            )
        }
        else if (status === "My Grants" && !isLoading) {
            return (
                myGrants.map(grant => {
                    return <GrantCard title={grant.title} desc={grant.desc} amount={grant.amount} yesVotes={grant.yesVotes} noVotes={grant.noVotes} active={grant.active}/>
                })
            )
        }
    }

    let updateTitle = (newTitle) => {
        switch(newTitle) {
            case "Active":
                setCardTitle("Active Grants");
                break;
            case "Inactive":
                setCardTitle("Inactive Grants");
                break;
            case "My":
                setCardTitle("My Grants");
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        async function retrieveGrants() {
            try{
                let allGrants = await getGrants();
                setGrantData(allGrants);
                setLoading(false);
            }
            catch(err){
                console.log(`An error occurred retrieving the grants: ${err.message}`);
            }
        }
        console.log("Now retrieving all the grant data");
        retrieveGrants();
    }, [])

    useEffect (() => {
            try{
                setActiveGrants(grantData.filter(g => g.active === 1));
                setInactiveGrants(grantData.filter(g => g.active !== 1));
            }
            catch(err){
                console.log(`An error occurred sorting the grants: ${err.message}`);
            }
            
        
    }, [grantData])
    


    return (
    <div className="container-fluid">
        <div className="container-fluid App-content">
            <div className="App">
                <GBanner updateTitle={updateTitle} 
                    name = "Grants" 
                    btn1 = "Current Round" 
                    l1="/Grants" 
                    btn2 = "Past Rounds" 
                    btn3 = "My Grants" 
                    btn4 = "Apply For Grant" 
                    l4="/Grants/Application"/>
                <div className="row">
                    <div className="col-10">
                        <TitleCard cardTitle={cardTitle}/>
                        <ul>
                            <FilterGrants status={cardTitle} />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Grants;