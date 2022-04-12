import React, { useState, useEffect } from "react"
import { CssBaseline, Grid } from "@material-ui/core"

import { getPlacesData } from "./api"
import Header from "./Components/Header/Header"
import List from "./Components/List/List"
import Map from "./Components/Map/Map"

const App = () => {
    const [places, setPlaces] = useState([])
    const [childClicked, setChildClicked] = useState(null)
    const [filteredPlaces, setFilteredPlaces] = useState([])
    const [coordinates, setCoordinates] = useState({})

    const [bounds, setBounds] = useState({})

    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState('')

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
            setCoordinates({ lat: latitude, lng: longitude })
        })
    }, [])

    useEffect(() => {
        setFilteredPlaces(places.filter((place) => place.rating > rating))
    }, [rating, setFilteredPlaces, places])

    useEffect(() => {
        setIsLoading(true)

        getPlacesData(type, bounds.sw, bounds.ne)
            .then((data) => {
                setPlaces(data.data)
                setFilteredPlaces([])
                setIsLoading(false)
            })
    }, [type, coordinates, bounds])

    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        coordinates={coordinates}
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App