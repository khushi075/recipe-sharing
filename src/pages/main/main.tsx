import { getDocs, collection } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { useEffect, useState } from 'react'
import { Post } from './post';
import { useAuthState } from 'react-firebase-hooks/auth';


export interface Posts {
    title: string;
    descr: string;
    username: string;
    id: string;
    userId: string;
}

export const Main = () => {
    const [user] = useAuthState(auth)
    const postsRef = collection(db, "posts")
    const [postsList, setPostsList] = useState<Posts[] | null>(null)
    
    useEffect(() => {
        const getPosts = async () => {
            if (user) {
                const data = await getDocs(postsRef)
                setPostsList(data.docs.map((doc) => (
                    {
                        ...doc.data(),
                        id: doc.id
                    }
                )) as Posts[])
            }
        }

        getPosts();
        // eslint-disable-next-line
    }, [user])

    return (
        <div className="flex items-center justify-center">
            {!user && <div className="text-2xl mt-10 font-medium text-primary flex self-center">Login to Fire Up Amazing Recipes and Tips from Around the World</div>}
            {user && <div className="flex flex-row flex-wrap items-center justify-center gap-20 mt-10">
                {postsList?.map((post) => {
                    return <Post post={post} />
                })}
            </div>}
        </div>
    )
}