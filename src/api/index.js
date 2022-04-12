import axios from 'axios'

const URL = 'https://travel-advisor.p.rapidapi.com/'

export const getPlacesData = async (type, sw, ne) => {
    console.log('get places çalıştı')
    try {
        const { data } = await axios.get(`${URL}/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng
            },
            headers: {
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
                'X-RapidAPI-Key': '36ab43c4c4msheddc3e269ac9980p1d4d85jsn9bad30ae8e95'
            }
        }
    )
        return data;
    } catch (error) {
        console.log(error)
    }
}