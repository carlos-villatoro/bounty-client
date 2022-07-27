import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import BountyDetails from "../BountyDetails"
import BountyForm from "../BountyForm"

export default function Bounty() {

    // state to get the bounty
    const [bounty, setBounty]=useState({})
    // whether or not form is shown
    const [showForm, setShowForm]=useState(false)
    const { id }= useParams()
    const navigate = useNavigate()
    
    // retrieve bounty from server
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/bounties/${id}`)
            .then(response =>{
                console.log(response.data)
                setBounty(response.data)
            })
    }, [id])

    const handleSubmit = (e, form, setForm) => {
        e.preventDefault()
        axios.put(`${process.env.REACT_APP_SERVER_URL}/bounties/${id}`, form)
            .then(response => {
                console.log(response.data)
                setBounty(response.data) // add update to state
                setShowForm(false) //hide form
            })
            .catch(console.warn)
    }

    const handleDelete = ()=>{
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/bounties/${id}`)
            .then(response =>{
                // navigate away from this page
                navigate('/')
            })
            .catch(console.warn)
    }
    return(
        <div>
            {
                showForm ?
                <BountyForm initialForm={bounty} 
                submitHandler={handleSubmit}/> :
                <BountyDetails 
                    bounty={bounty}
                />
            }
            <button onClick={() => setShowForm(!showForm)}>
                { showForm ? 'cancel' : 'edit'}
            </button>

            {
                showForm ?
                <button onClick={handleDelete}>Delete</button> :
                ''
            }
        </div>
    )
}