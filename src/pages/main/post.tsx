import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Posts } from "./main"
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faOutlineHeart } from "@fortawesome/free-regular-svg-icons";
import { db, auth } from "../../config/firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
    post: Posts
}
interface Like {
    userId: string
    likeId:string
}

export const Post = (props: Props) => {
    const { post } = props;
    const likesRef = collection(db, "likes");
    const [user] = useAuthState(auth);

    const likesDoc = query(likesRef, where('postId', '==', post.id))
    const [likes, setLikes] = useState<Like[] | null>(null)

    const getLikes = async () => {
        const data = await getDocs(likesDoc)
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId:doc.id })))
    }

    useEffect(() => {
        getLikes()
        // eslint-disable-next-line
    }, [])

    const myLike = likes?.find((like) => like.userId === user?.uid)

    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id
            })
            if (user) {
                setLikes((prev) => prev ? [...prev, { userId: user.uid, likeId:newDoc.id }] : [{ userId: user.uid, likeId:newDoc.id }])
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const deleteLike = async () => {
        try {
            const delLikeQuery = query(
                likesRef,
                where('postId', '==', post.id),
                where('userId', '==', user?.uid
                ))
            const delLikeData = await getDocs(delLikeQuery)
            const likeId1 = delLikeData.docs[0].id
            const delLike = doc(db, "likes", likeId1)

            await deleteDoc(delLike)
            if (user) {
                setLikes((prev) => prev && prev.filter((like)=>like.likeId !== likeId1))
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="flex flex-col justify-around items-center w-64 h-72 px-2 py-2 border-primary rounded-2xl border text-center">
            <div className="text-primary text-lg font-semibold">{post.title}</div>
            <div className="overflow-y-scroll h-40">{post.descr}</div>
            <div className="italic text-primary flex items-center justify-between w-full">
                <button className="ml-4 flex flex-row justify-between items-center gap-1" onClick={myLike ? deleteLike : addLike}>
                    {myLike ? <FontAwesomeIcon icon={faHeart} className="text-xl" /> : <FontAwesomeIcon icon={faOutlineHeart} className="text-xl"/>}
                    {likes?.length !== 0 && likes?.length}
                </button>
                <div className="text-sm font-medium mr-1">
                    ~cooked by {post.username}
                </div>
            </div>
        </div>
    )
}