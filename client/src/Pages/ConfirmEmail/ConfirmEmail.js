import { Loading } from 'Components'
import { useSearchParams } from 'react-router-dom'
import { useConfirmEmail } from 'Hooks'

export default function ConfirmEmail() {
    const [searchParams] = useSearchParams()
    const email = searchParams.get('email')
    const token = searchParams.get('token')

    const { isLoaded } = useConfirmEmail(email,token)

    if(!isLoaded){
        return <Loading />
    }

    return (
        <div> {email}, {token}</div>
    )
}
