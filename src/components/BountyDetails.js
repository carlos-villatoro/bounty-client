export default function BountyDetails({bounty}) {
    return(
        <div>
            <h2>{bounty.name}</h2>
            
            <p>Wanted for: {bounty.wantedFor}</p>

            <h3>Client: {bounty.client}</h3>

            <h3>Ship: {bounty.ship}</h3>

            <h2>Reward: {bounty.reward}</h2>

            <p>Last seen: {bounty.lastSeen}</p>
        </div>
    )
}