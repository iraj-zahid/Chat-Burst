const useUserDataApi = async () => {
  try{

    const data = await fetch("http://localhost:3000/api/getUserData",{
        cache:"no-store"
    })
    return data && data.json()
  }catch(error){

  }
}


export {useUserDataApi}