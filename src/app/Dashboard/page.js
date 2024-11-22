'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { IoLogInSharp } from "react-icons/io5";
import { useUserDataApi } from '@/utils/hooks/useUserDataApi'

const Dashboard = () => {
    const [data, setData] = useState(null)
    const [loginUser, setLoginUser] = useState(null)
    useEffect(() => {
        (async () => {
            const res = await useUserDataApi()
            setData(res)
        })()
        const logindata = JSON.parse(window.localStorage.getItem('logindata'));
        setLoginUser(logindata)

    }, [])
    const router = useRouter()
    console.log("login data", loginUser)

    const filterRandomUser = data && loginUser && data.filter((userData) => userData.name !== loginUser.name)
    const goToLogin = () => {
        router.push('/Login')
    }
   
    return (
        <>
            <div className="w-full min-h-screen bg-[#101014] flex flex-col items-center p-[1%]">
                <div onClick={goToLogin} className='w-full flex justify-end '><IoLogInSharp className='w-6 h-6 max-[350px]:w-8 max-[350px]:h-8 text-white cursor-pointer' /></div>
                <div className='w-full flex items-center justify-center text-3xl text-white hubot p-[2%] text-indigo-300 max-[750px]:text-lg max-[450px]:text-[16px] max-[400px]:hidden'>█▓▒▒░░░&nbsp;&nbsp;<p className='text-white'>𝓢𝓽𝓪𝓻𝓽 𝓒𝓱𝓪𝓽𝓽𝓲𝓷𝓰 𝓦𝓲𝓽𝓱</p>&nbsp;&nbsp;░░░▒▒▓█
                </div>
                <div className='min-[400px]:hidden  text-white flex items-center justify-center text-xl max-[285px]:text-lg p-[2%] pb-[4%]'>
                    𝓢𝓽𝓪𝓻𝓽 𝓒𝓱𝓪𝓽𝓽𝓲𝓷𝓰 𝓦𝓲𝓽𝓱
                </div>

                <div className='w-full flex flex-wrap items-center justify-center p-[2%] gap-[3%] max-[350px]:gap-[10%]'>
                    {filterRandomUser && filterRandomUser.map((datas) => {
                        return (
                            <div key={datas.name} className='m-[1%] flex flex-col items-center justify-center '>
                                <Link href={{
                                    pathname: `/Chatroom/${datas.email}`,
                                    query: {
                                        email: datas.email
                                    }
                                }}>
                                    <div className='object-contain'> <img src={datas.imageBase} className='h-24 w-24 max-[350px]:w-24 max-[350px]:h-24  max-[750px]:h-20  max-[750px]:w-20 max-[285px]:w-16 max-[285px]:h-16 rounded-full zoom cursor-pointer object-cover' /></div>
                                </Link>
                                <div className='p-[1%] w-34 max-[350px]:w-20 max-[285px]:w-16 text-white goblin text-xl  max-[750px]:text-lg flex items-center justify-center'><p className='cursor-pointer truncate'>{datas.name}</p></div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    )
}
export default Dashboard;