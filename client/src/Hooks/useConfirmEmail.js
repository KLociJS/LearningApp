import { useState, useEffect } from 'react'
import { confirmEmail } from '_Constants'
import { useNavigate } from 'react-router-dom'

export default function useConfirmEmail(email,token) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [error,setError]=useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        fetch(`${confirmEmail}?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`)
        .then(res=>{
            if(res.ok){
                return res.json()
            }
            throw res
        })
        .then(()=>{
            setIsLoaded(true)
            navigate('/')
        })
        .catch((err)=>{
            setIsLoaded(true)
            setError(true)
            if(err instanceof Response){
                err.json()
                .then(err=>console.log(err))
            }else{
                console.log(err)
            }
        })

    },[email, token, navigate])

    return { isLoaded, error }
}
