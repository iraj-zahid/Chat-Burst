const useChatApi = async () => {
  try{

    const data = await fetch("http://localhost:3000/api/getChat",{
        cache:"no-store"
    })
    return data && data.json()
  }catch(error){

  }
}


export {useChatApi}