import {useEffect, useState} from 'react'

const useApi = ({ link, method, token, body, call}) =>{
    const [data, setData] = useState({fetchedData: {}, isLoading: true})
    useEffect(() =>{
        fetch(`https://leaf-musicapp.herokuapp.com/${link}`,{
            method: method,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : ''
        })
        .then(response => response.json())
        .then(response => setData({fetchedData: response, isLoading: false}))
        .catch(error => setData({...data, error: error}))
    }, [link, method, token, call])
    return data
}
export default useApi