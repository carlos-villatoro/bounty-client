import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import BountyForm from "../BountyForm"

export default function Home() {
    const url = process.env.REACT_APP_SERVER_URL
    //bounties form the backend
    const [bounties, setBounties] = useState([])
    //error msg state
    const [err, setErr]=useState('')

    useEffect(()=>{
        const fetchBounties = async () =>{
            try {
               const response = await axios.get(`${url}/bounties`) 
               setBounties(response.data)
               console.log(response.data)
            } catch (error) {
                console.warn(error)
            }
        }
        fetchBounties()
    }, []) //get all bounties when page loads

    // submit handler func
    const handleSubmit = async (e, form, setForm) =>{
        e.preventDefault()
        //axios to post a new bounty using form state
        console.log('the form data is:', form)
        try {
            //post to the backend
            // axios.post(url, req body/form data, options)
            const response = await axios.post(`${url}/bounties`, form)
            //update state w new data
            // opt 1 -- add this new bounty into state
            setBounties([...bounties, response.data])
            // opt 2 -- get all the bounties from backend and set in state
            // const bountiesResponse = await axios.get(`${url}/bounties`) 
            // setBounties(bountiesResponse.data)

            // console.log(response)
            //clear the form -- ???
            // form has submitted correctly -- clear it
            setForm({
                name: '',
                wantedFor: '',
                client: '',
                ship:'',
                reward: 100000,
                lastSeen: ''
            })
            //clear error
            setErr('')
        } catch (error) {
            console.warn('submit error:', error)
            if(error.response){
                if(error.response.status === 400){
                    //this error is a validation error from backend
                    setErr(error.response.data.msg)
                }
            }
        }
    }
    //form change handler funct


    const bountyLinks = bounties.map((bounty, i)=>{
        return(
            <div key={`bountylink${i}`}>
                <Link to={`/bounties/${bounty._id}`}>{bounty.name}</Link>
            </div>
        )
    })
    return(
        <div>
            <h1>Create New Bounty:</h1>
            <p>{err}</p>
                <BountyForm 
                    submitHandler={handleSubmit}
                    initialForm={{
                        name: '',
                        wantedFor: '',
                        client: '',
                        ship:'',
                        reward: 100000,
                        lastSeen: ''
                    }}
                />

            <h1>Current Bounties:</h1>

            {bountyLinks}
        </div>
    )
}