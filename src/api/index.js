import axios from 'axios'

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

const options = {
    params: {
        bl_latitude: '11.847676',
        tr_latitude: '12.838442',
        bl_longitude: '109.095887',
        tr_longitude: '109.149359'
    },
    headers: {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'X-RapidAPI-Key': '36ab43c4c4msheddc3e269ac9980p1d4d85jsn9bad30ae8e95'
    }
}

export const getPlacesData = async () => {
    try {
        const { data } = await axios.get(URL, options)

        return data;
    } catch (error) {
        console.log(error)
    }
}