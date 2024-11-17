const useUserDataApi = async () => {
  try{

    const data = await fetch("https://chat-burst.vercel.app/api/getUserData",{
        cache:"no-store"
    })
    return data && data.json()
  }catch(error){

  }
}


export {useUserDataApi}