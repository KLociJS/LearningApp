import { useState, useEffect } from 'react'
import { confirmEmail } from '_Constants'

export default function useConfirmEmail(email,token) {
    const [isLoaded, setIsLoaded] = useState(false)

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
        })
        .catch((err)=>{

            if(err instanceof Response){
                err.json()
                .then(err=>console.log(err))
            }else{
                console.log(err)
            }
        })

    },[email, token])

    return { isLoaded }
}
