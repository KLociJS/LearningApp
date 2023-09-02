import React, { useEffect, useState } from 'react'

import { confirmEmail } from '_Constants'

import { Loading } from 'Components'
import { useSearchParams } from 'react-router-dom'

export default function ConfirmEmail() {
    const [searchParams] = useSearchParams()
    const email = searchParams.get('email')
    const token = searchParams.get('token')
    const [isLoaded, setIsLoaded] = useState(false)

    console.log('email: ', email)
    console.log('token: ', token);

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

    if(!isLoaded){
        return <Loading />
    }

    return (
        <div> {email}, {token}</div>
    )
}
