import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import {auth, provider} from "../config/firebase"
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate();
    const signInWithGoogle = async() => {
        const res = await(signInWithPopup(auth,provider))
        navigate('/')
        console.log(res)
    }
    return (
        <div className="flex flex-col justify-center w-screen items-center mt-24">
            <div className="flex flex-col justify-center items-center border py-10 px-10 gap-5 rounded-3xl  border-primary">
            <div className='text-primary'>Sign-In for Awesome Recipes</div>
            <button className="border w-max px-3 py-2 rounded-full text-white hover:text-primary bg-primary hover:bg-white"
            onClick={signInWithGoogle}>
                <FontAwesomeIcon icon={faGoogle} className='pr-2'/> 
                Sign-In with Google
            </button>
            </div>
        </div>
    )
}