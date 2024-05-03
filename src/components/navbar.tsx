import { Link } from "react-router-dom"
import { auth } from "../config/firebase"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from "firebase/auth"

export const Navbar = () => {
    const [user] = useAuthState(auth)
    const signUserOut = async () => {
        await signOut(auth)
        
    }
    return (
        <div className="flex justify-center text-primary">
            <div className="container mt-4 px-1 py-2 border border-primary rounded-full flex justify-between items-center w-10/12">
                <div className="ml-3 font-medium text-lg">
                    <Link to='/'>moussaka</Link>
                </div>
                <div className="flex justify-center items-center mr-3 gap-4">
                    {user && (
                        <>
                            <button className="mr-10 flex items-center justify-center gap-1">
                                <FontAwesomeIcon icon={faPlus} className="size-5"/>
                                <Link to='/createpost' className="hover:underline">Create Post</Link>
                            </button>
                            <div className="flex justify-center items-center gap-2">
                                {/* <FontAwesomeIcon icon={faUserSecret}/> */}
                                <img src={user?.photoURL || './default.jpeg'} alt="userImg" width="25" height="25" className="rounded-md" />
                                <div className="">{user?.displayName}</div>
                            </div>
                            <div className="border border-primary rounded-full px-3 py-1 text-white  hover:text-primary bg-primary hover:bg-white">
                                <button onClick={signUserOut}>Logout</button>
                            </div>
                        </>
                    )}
                    {!user && (
                        <>
                             <button className="border border-primary rounded-full px-3 py-1 text-white  hover:text-primary bg-primary hover:bg-white">
                                <Link to='/login'>Login</Link>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}