'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useUserDataApi } from "../../utils/hooks/useUserDataApi"
import Link from 'next/link'

const Login = () => {
    const router = useRouter()
    const [error, setError] = useState(false)
    const [user, setUser] = useState(false)
   
    const [formData, setFormData] = useState({
        name:null,
        email: null,
        password: null,
    })
    useEffect(() => {
        (async () => {
            const data = await useUserDataApi();        
            data && setUser(data)
        })()
    }, [])
    const filterLoginData = user && user.filter((data) => data.email === formData.email && data.password === formData.password && data.name === formData.name)
    const submit = () => {
        console.log(filterLoginData)
        if(filterLoginData.length > 0){
            router.push('/Dashboard')
            window.localStorage.setItem("logindata", JSON.stringify({email:filterLoginData[0].email, name:filterLoginData[0].name}));

        }
        else{
            setError(true)
        }
       console.log(user)
    }


    return (
        <>
            <div className="w-full h-screen py-[4%] px-[15%] max-[400px]:p-0 max-[909px]:px-[4%] bg-[#101014]">
                <div className="min-[400px]:hidden max-[550px]:pt-[4%] w-full bg-no-repeat">
                    <div className='w-full p-[3%] flex flex-col items-center justify-center'>
                        <div className='w-[50%] p-[20%] gif bg-no-repeat bg-center bg-contain'></div>
                        <div className='w-full flex items-center justify-center'><p className='goblin text-white text-2xl p-[5%]'>THE CHATBURST</p></div>
                    </div>
                </div>
                <div className="w-full rounded-3xl max-[400px]:rounded-tl-[50px] max-[400px]:rounded-tr-[50px] max-[400px]:rounded-bl-[0px] max-[400px]:rounded-br-[0px] bg-[#33333a] flex items-cente justify-center">
                    <div className="max-[400px]:hidden w-[50%] h-[498px] rounded-3xl rounded-tr-[10%] rounded-br-[10%] formUIImg bg-no-repeat relative text-[#f2f3f2] ">
                        <div className='w-full p-[1%] rounded-lg h-[498px] absolute flex bg-[#0e0e0e7c] rounded-tr-[10%] rounded-br-[10%] '>
                            <div className='w-[70%] max-[695px]:w-[90%] absolute top-[15%] left-[5%] p-[2%] rounded-lg bg-[#000000b9]'>
                                <p className='text-xl goblin font-bold my-[1%] max-[1060px]:text-md '>The ChatBurst</p>
                                <p className='text-2xl balu font-semibold my-[1%] max-[1060px]:text-lg'>Explore the universe</p>
                                <p className='goblin text-sm my-[1%] max-[1060px]:text-[12px] max-[580px]:text-[10px]'>5 Million+ people have joined our network.</p>
                                <p className='goblin text-sm my-[1%] max-[1060px]:text-[12px] max-[580px]:text-[10px]'>We invite you to join the tribe</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-[50%] max-[350px]:w-[80%] max-[360px]:h-[540px] flex items-cente justify-center">
                        <section className="w-full p-[2%] max-[350px]:pb-[7%] max-[350px]:px-[3%] max-[400px]:pt-[8%] flex flex-col items-center justify-center">
                            <p className="goblin text-white text-3xl max-[580px]:text-xl">Let's Login</p>
                            <div className="w-full p-[4%] max-[350px]:py-[12%] max-[350px]:px-[1%] max-[400px]:mt-[12%]">
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
                                    {
                                        error && <div className="flex items-center mb-4 text-sm text-red-400 dark:border-red-800" role="alert">
                                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                            </svg>
                                            <span className="sr-only">Info</span>
                                            <div>
                                                <span className="font-medium">Error alert!</span> Something is wrong! try submitting again.
                                            </div>
                                        </div>
                                    }
                                    <button onClick={submit} className="w-[70%] text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 shadow-xs transition-all duration-500">Join Now</button>
                                <Link className="w-full flex otems-center justify-center" href={'/RegistrationForm'}><p className='text-sm mt-[3%] text-white cursor-pointer hubot'>Register</p></Link>
                                </div>

                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;