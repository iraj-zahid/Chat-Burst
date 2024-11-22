'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useBase64 } from '@/utils/hooks/useBase64';

import confetti from 'canvas-confetti';
const RegistrationForm = () => {
    const router = useRouter()
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
    const [error, setError] = useState(false)
    const [formData, setFormData] = useState({
        name: null,
        email: null,
        password: null,
        image: null,
        imageName: null,
        imageBase:null
    })
    const takingImageFunction = async (event) => {
        const base64 = await useBase64(event.target.files[0])
        setFormData((e) => ({
            ...e, image: event.target.files[0], imageName: event.target.files[0].name, imageBase:base64.toString()
        }))
        setError(false)

    }
    const submit = async () => {
        if (formData.name && formData.password.length > 6 && formData.imageName && gmailRegex.test(formData.email)) {
            router.push('/Dashboard')
            localStorage.setItem("logindata", JSON.stringify({email:formData.email, name:formData.name}));
            const imageForm = new FormData()
            imageForm.append('file', formData.image)

            const imageRes = await fetch("https://chat-burst.vercel.app/api/image", {
                method: "POST",
                body: imageForm
            })
            const res = await fetch("https://chat-burst.vercel.app/api/userData", {
                method: "POST",
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    imageName: formData.imageName,
                    imageBase:formData.imageBase,
                })
            })
        }
        else { setError(true) }
       
    }

    const confet = () => {
        if (formData.password && formData.password.length > 6 && formData.name.length < 12  && formData.imageName && gmailRegex.test(formData.email)) {
            confetti({
                particleCount: 200,
                spread: 170,
                origin: { y: 0.6 }
            });
        }
        else { setError(true) }

    }

    return (
        <>
            <div className="w-full min-h-screen py-[4%] px-[15%] max-[400px]:p-0 max-[909px]:px-[4%] bg-[#101014]">
                <div className="min-[500px]:hidden w-full bg-no-repeat">
                    <div className='w-full p-[3%] flex flex-col items-center justify-center'>
                        <div className='w-[50%] p-[20%] gif bg-no-repeat bg-center bg-contain'></div>
                        <div className='w-full flex items-center justify-center'><p className='goblin text-white text-2xl p-[5%]'>THE CHATBURST</p></div>
                    </div>
                </div>
                <div className="w-full rounded-3xl max-[400px]:rounded-tl-[50px] max-[400px]:rounded-tr-[50px] max-[400px]:rounded-bl-[0px] max-[400px]:rounded-br-[0px] bg-[#33333a] flex items-cente justify-center max-[450px]:p-[8%] ">
                    <div className="max-[500px]:hidden w-[50%] h-[498px] rounded-3xl rounded-tr-[10%] rounded-br-[10%] formUIImg bg-no-repeat relative text-[#f2f3f2] ">
                        <div className='w-full p-[1%] rounded-lg h-[498px] absolute flex bg-[#0e0e0e7c] rounded-tr-[10%] rounded-br-[10%] '>
                            <div className='w-[70%] max-[695px]:w-[90%] absolute top-[15%] left-[5%] p-[2%] rounded-lg bg-[#000000b9]'>
                                <p className='text-xl goblin font-bold my-[1%] max-[1060px]:text-md '>The ChatBurst</p>
                                <p className='text-2xl balu font-semibold my-[1%] max-[1060px]:text-lg'>Explore the universe</p>
                                <p className='goblin text-sm my-[1%] max-[1060px]:text-[12px] max-[580px]:text-[10px]'>5 Million+ people have joined our network.</p>
                                <p className='goblin text-sm my-[1%] max-[1060px]:text-[12px] max-[580px]:text-[10px]'>We invite you to join the tribe</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-[50%] max-[500px]:w-full max-[500px]:h-screen flex items-cente justify-center">
                        <section className="w-full p-[2%] max-[350px]:pb-[7%] max-[350px]:px-[3%] max-[400px]:pt-[0%] flex flex-col items-center justify-center">
                            <p className="goblin text-white text-3xl max-[580px]:text-xl max-[450px]:mt-[8%]">Let's Connect</p>
                            <div className="w-full p-[4%] max-[450px]:pb-[12%] max-[450px]:pt-[0%] max-[350px]:px-[1%] max-[400px]:mt-[12%]">
                                <div className="w-full flex flex-col items-center justify-center" >
                                    <div className="relative z-0 w-full mb-5 group">
                                        <input autoComplete="off" onChange={(event) => {
                                            setFormData((prev) => ({ ...prev, name: event.target.value }))
                                            setError(false)
                                        }} type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-indigo-400 focus:outline-none focus:ring-0 focus:border-indigo-500 peer" placeholder=" " />
                                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-indigo-500 peer-focus:text-indigo-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-5 group">
                                        <input autoComplete="off" onChange={(event) => {
                                            setFormData((prev) => ({ ...prev, email: event.target.value }))
                                            setError(false)
                                        }} type="text" name="floating_email" id="floating_email" className="block bg-transparent py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-indigo-400 focus:outline-none focus:ring-0 focus:border-indigo-500 peer" placeholder=" " />
                                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-indigo-500 peer-focus:text-indigo-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-5 group">
                                        <input autoComplete="off" onChange={(event) => {
                                            setFormData((prev) => ({ ...prev, password: event.target.value }))
                                            setError(false)
                                        }} type="text" name="floating_password" id="floating_password" className="block bg-transparent py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-indigo-400 focus:outline-none focus:ring-0 focus:border-indigo-500 peer" placeholder=" " />
                                        <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-indigo-500 peer-focus:text-indigo-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-[7%] group">
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-34  max-[300px]:h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-800bg-gray-700 border-gray-600 hover:border-gray-500 hover:bg-gray-600">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-6 h-6 mb-2 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p className="mb-2 text-sm max-[300px]:text-[10px] text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs max-[300px]:text-[8px] text-gray-400">Your Profile Picture</p>
                                                </div>
                                                <input onChange={takingImageFunction} id="dropzone-file" type="file" className="hidden" />
                                            </label>
                                        </div>
                                    </div>
                                    {
                                        error && <div className={` flex items-center mb-4 text-sm text-red-400 dark:border-red-800`} role="alert">
                                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                            </svg>
                                            <span className="sr-only">Info</span>
                                            <div>
                                                <span className="font-medium">Error alert!</span> Something is wrong! try submitting again.
                                            </div>
                                        </div>
                                    }
                                   
                                    <button onClick={() => { confet(); setTimeout(submit, 3000) }} className="w-[70%] text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 shadow-xs transition-all duration-500">Join Now</button>
                                    <Link className="w-full flex otems-center justify-center" href={'/Login'}><p className='text-white text-[14px] p-[2%] cursor-pointer hubot'>Already have an account</p></Link>
                              
                                </div>

                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RegistrationForm;