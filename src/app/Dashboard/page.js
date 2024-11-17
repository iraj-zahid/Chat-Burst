'use client';
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { IoLogInSharp } from "react-icons/io5";
import { useUserDataApi } from '@/utils/hooks/useUserDataApi'
import { useLayoutEffect } from 'react';

const Dashboard = async () => {
    
    const router = useRouter()
    const loginUser = JSON.parse(localStorage.getItem('logindata'));
    useLayoutEffect(() => {
        if(loginUser && !loginUser.email){
           return router.push('/Login')
        }
        else if(!loginUser){
            return router.push('/Login')
        }
        else{

        }
      }, [])
    const data = await useUserDataApi()
    const filterRandomUser = data && loginUser && data.filter((userData) => userData.name !== loginUser.name)
    const goToLogin = () => {
        router.push('/Login')
    }
    return (
        <>
            <div className="w-full min-h-screen bg-[#101014] flex flex-col items-center p-[1%]">
            <div onClick={goToLogin} className='w-full flex justify-end '><IoLogInSharp className='w-6 h-6 text-white cursor-pointer'/></div>
                <div className='w-full flex items-center justify-center text-3xl text-white hubot p-[2%] text-indigo-300 max-[750px]:text-lg max-[450px]:text-[16px] max-[400px]:hidden'>█▓▒▒░░░&nbsp;&nbsp;<p className='text-white'>𝓢𝓽𝓪𝓻𝓽 𝓒𝓱𝓪𝓽𝓽𝓲𝓷𝓰 𝓦𝓲𝓽𝓱</p>&nbsp;&nbsp;░░░▒▒▓█                
                </div>
                <div className='min-[400px]:hidden  text-white flex items-center justify-center text-xl max-[285px]:text-lg p-[2%] pb-[4%]'>
                𝓢𝓽𝓪𝓻𝓽 𝓒𝓱𝓪𝓽𝓽𝓲𝓷𝓰 𝓦𝓲𝓽𝓱
                </div>
                
                <div className='w-full flex flex-wrap items-center justify-center p-[2%] gap-[3%] max-[350px]:gap-[2%]'>
                    {filterRandomUser.map((datas) => {
                        return (
                            <>
                                <div className='m-[1%] flex flex-col items-center justify-center '>
                                    <Link href={{pathname:`/Chatroom/${datas.email}`,query: datas} }>
                                    <div className='object-contain'> <img src={`/${datas.imageName}`} className='h-24 w-24 max-[750px]:h-20 max-[750px]:w-20 max-[285px]:w-16 max-[285px]:h-16 rounded-full zoom cursor-pointer' /></div>
                                    </Link>
                                    <p className='p-[1%] w-34 max-[350px]:w-20 max-[285px]:w-16 text-white goblin text-xl  max-[750px]:text-lg truncate flex items-center justify-center'><span className='cursor-pointer'>{datas.name}</span></p>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>

        </>
    )
}
export default Dashboard;