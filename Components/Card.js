import { StyleSheet, Text, View, Image } from "react-native";
import { padding, margin, font, color } from "../Styles/base";
import { useState ,useEffect } from 'react';

import axios from 'axios';

export default function Card(props) {
    const idFetch = props.data.split("/").slice(-2, -1)[0];
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idFetch}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching pokemon data:', error);
            }
        };
        fetchData();
    }, [idFetch]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    const name = props.name ? capitalizeFirstLetter(props.name) : `Pokemon n°${idFetch}`;

    return (
        <View style={styles.container}>
            {props.callState ? <Image style={styles.image} source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idFetch}.png`}} />: <Image style={styles.imageLoad} source={require('../assets/pokeball.png')} />}
            {props.callState ? <Text style={styles.title}>{name}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 300,
        width: 300,
        marginTop: margin.xs,
        marginBottom: margin.xs,
        display: 'flex',
        flexGrow: 1,
        backgroundColor: color.pokemonPalette.blue,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: color.white,
    },
    image: {
        width: 200,
        height: 200,
    },
    imageLoad: {
        width: 100,
        height: 100,
    },
    title: {
        color: color.white,
        fontSize: 25,
        fontFamily: '',
        marginBottom: margin.xs,
        fontWeight: 'bold',
    },
});