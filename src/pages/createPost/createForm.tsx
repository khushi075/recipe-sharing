import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {addDoc, collection} from "firebase/firestore"
import { db,auth } from "../../config/firebase"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from "react-router-dom"

interface CreateFormData {
    title: string;
    descr: string;
}

export const CreateForm = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth)
    
    const schema = yup.object().shape({
        title: yup.string().required("Can't think of a fitting name? Don't worry we don't judge by names"),
        descr: yup.string().required("Recipe description feels a little lonely, required field"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    })

    const postsRef=collection(db,"posts");

    const onCreatePost = async(data: CreateFormData) => {
        await addDoc(postsRef,{
            // title:data.title,
            // descr:data.descr, alt way to do ...data
            ...data,
            username: user?.displayName,
            userId: user?.uid,
        })
        navigate('/')
    }
    return (
        <form className="flex justify-center" onSubmit={handleSubmit(onCreatePost)}>
            <div className="flex flex-col justify-center items-start mt-24 gap-9 border border-primary px-3 py-8 w-96 rounded-2xl">
                <div className="text-primary font-medium text-3xl -mt-2">Create Blog</div>
                <div className="flex flex-col justify-center items-start w-full">
                    <div className="text-primary text-lg mb-2">Recipe Blog Title</div>
                    <input placeholder="title..." className="border rounded-md px-2 border-primary w-full" {...register("title")} />
                    <div className="text-error text-sm">{errors.title?.message}</div>
                </div>
                <div className="flex flex-col justify-center items-start w-full mb-3">
                    <div className="text-primary text-lg mb-2">Short Description</div>
                    <textarea placeholder="description..." className="border rounded-md px-2 border-primary w-full h-32" {...register("descr")} />
                    <div className="text-error text-sm">{errors.descr?.message}</div>
                </div>
                <input type="submit" className="border rounded-full px-4 py-1 border-primary text-white bg-primary hover:bg-white hover:text-primary flex self-center" />
            </div>
        </form>
    )
}