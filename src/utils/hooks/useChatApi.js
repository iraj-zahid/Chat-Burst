const useChatApi = async () => {
  try{
    const data = await fetch("https://chat-burst.vercel.app/api/getChat",{
        cache:"no-store"
    })
    return data && data.json()
  }catch(error){
    return error
  }
}


export {useChatApi}