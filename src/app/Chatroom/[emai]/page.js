'use client';
import { useRef } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoArrowBackOutline } from "react-icons/io5";
import { useUserDataApi } from "../../../utils/hooks/useUserDataApi";
import { useChatApi } from "../../../utils/hooks/useChatApi";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const Chatroom = () => {
    const searchParams = useSearchParams()
    const email = searchParams.get('email')
    const [user, setUser] = useState(null)
    const [listner, setListner] = useState(false)
    const [chat, setChat] = useState("")
    const [userChat, setUserChat] = useState(null)
    const [loginUser, setLoginUser] = useState(null)
  
    useEffect(() => {
        (async () => {
           
            const data = await useUserDataApi();
            const allChats = await useChatApi()
            const logindata = JSON.parse(window.localStorage.getItem('logindata'));
            setLoginUser(logindata)
          
            data && setUser(data)
            allChats && setUserChat(allChats)
        })()
    }, [listner])
    const filterRandomUser = user && email && user.filter((userData) => userData.email === email)
    const filterChats = userChat && loginUser && userChat.filter((chatings) => chatings.email === email && chatings.name === loginUser.name || chatings.email === loginUser.email && chatings.name ===  filterRandomUser[0].name)
    const messagesEndRef = useRef(null)
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [userChat])

    const chatSubmit = async () => {
        if (chat.length > 0) {
            setListner(!listner)
            setChat("")

            const res = await fetch("https://chat-burst.vercel.app/api/chat", {
                method: "POST",
                body: JSON.stringify({
                    chat: chat,
                    name: loginUser.name,
                    email: email
                })
            })
        }
    }

    return (
        <>
            <div className="bg-[#101014] w-full min-h-screen max-[450px]:h-screen bg-no-repeat flex max-[450px]:flex-1 items-center justify-center">
                <div className="w-[60%] max-[450px]:min-h-[100%] max-[450px]:flex max-[450px]:flex-col max-[450px]:flex-1 max-[450px]:w-full max-[450px]:min-h-screen max-[600px]:w-[90%] h-[540px] max-[450px]:h-full max-[750px]:h-[450px] bg-[#1c1c20] rounded-xl  ">
                    <div className="w-full border-[#727272] border-b-[1px] p-[1%]  max-[450px]:p-[2%] rounded-t-xl flex items-center gap-[1%]">
                        <Link href={"/Dashboard"}>
                            <IoArrowBackOutline className="text-white mr-[2%]" />
                        </Link>
                        {
                            filterRandomUser && filterRandomUser.map((userRandom) => {
                                return (
                                    <div className="flex w-full items-center gap-[1%]" key={userRandom.name}>
                                        <Image src={userRandom.imageName} width={20} height={20} className="w-10 max-[450px]:w-8 h-10 max-[450px]:h-8 rounded-full" alt="hey" />
                                        <p className="text-white lobster max-[450px]:ml-2 ml-4">{userRandom.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="w-full h-4/5 max-[450px]:flex-1 max-[750px]:min-h-[75%] p-[1%] gap-[2%] flex flex-col overflow-y-scroll max-[450px]:overflow-hidden">
                        {filterChats && filterChats.map((data) => {
                            return (
                                <div key={data._id} className={`w-full flex p-[1%] ${loginUser.name === data.name && "justify-end"} `}>
                                    <div className={`max-w-[70%] max-[450px]:my-[4px] max-[450px]:max-w-[80%] p-[2%]  max-[450px]:text-[14px]  max-[350px]:text-[12px] bg-indigo-400 rounded text-white lobster ${loginUser.email === data.email && "bg-indigo-600"}`}>{data.chat}</div>
                                </div>

                            )
                        })}
                        <div className="mb-[4%]" ref={messagesEndRef} />
                    </div>
                    {/* message send input  */}
                    <div
                        className="flex flex-row items-center h-16 rounded-xl bg-[#36363d] w-full px-4"
                    >
                        <div>
                            <button
                                className="flex items-center justify-center text-gray-400 hover:text-gray-600  max-[450px]:hidden"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <div className="flex-grow ml-4  max-[450px]:ml-[0px] ">
                            <div className="relative w-full">
                                <input
                                    value={chat}
                                    onChange={(event) => { setChat(event.target.value) }}
                                    type="text"
                                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                />
                                <button
                                    className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="ml-4  max-[450px]:ml-2">
                            <button
                                onClick={chatSubmit}
                                className="flex items-center justify-center  max-[450px]:py-[20%] bg-indigo-500 hover:bg-indigo-600 rounded-xl  max-[450px]:rounded text-white px-4 py-1 flex-shrink-0"
                            >
                                <span className=" max-[450px]:hidden">Send</span>
                                <span className="ml-2  max-[450px]:ml-[0px]">
                                    <svg
                                        className="w-4 h-4 transform rotate-45 -mt-px"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                        ></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Chatroom;
