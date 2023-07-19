import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { size, color, cardColorType } from "../Styles/base";
import { useState ,useEffect } from 'react';
import TopIcons from './TopIcons';

import axios from 'axios';

export default function Card(props) {
    const [data, setData] = useState({});
    const [isFav, setIsFav] = useState(false);
    const [isOnTeam, setIsOnTeam] = useState(false);
    const name = props.name;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching pokemon data:', error);
            }
        };
        fetchData();
    }, [name]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    const handleFav = () => {return setIsFav(!isFav)};
    const handleTeam = () => {return setIsOnTeam(!isOnTeam)};
    const img = data.sprites ? data.sprites.front_default : '';
    const adaptiveColor = cardColorType[data.types ? data.types[0].type.name : 'normal'];

    return (
        <View style={[styles.container, {backgroundColor: adaptiveColor}]}>
            {props.callState && isOnTeam && <Text style={styles.labelTeam}>On your team</Text>}
            {props.callState && <TopIcons handleTeam={handleTeam} isOnTeam={isOnTeam} handleFav={handleFav} isFav={isFav} />}
            {props.callState ? <Image style={styles.image} source={{uri: img ? img : '../assets/pokeball.png'}} />: <Image style={styles.imageLoad} source={require('../assets/pokeball.png')} />}
            {props.callState ? <Text style={styles.title}>{name ? capitalizeFirstLetter(name) : '???' }</Text> : null}
            {props.callState && <View style={styles.buttonsRow}>
                <Pressable style={styles.goToButton}>
                    <Text style={{color: color.black, fontSize: 15}}>See More</Text>
                </Pressable>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 300,
        width: 300,
        marginTop: size.xs,
        marginBottom: size.xs,
        display: 'flex',
        flexGrow: 1,
        backgroundColor: color.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: color.grey,
        position: 'relative',
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
        color: color.black,
        fontSize: 25,
        marginBottom: size.xs,
        fontFamily: 'PressStart2P-Regular'
    },
    buttonsRow: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: size.sm,
        marginVertical: size.xs,
    },
    goToButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        borderRadius: 20,
        backgroundColor: color.white,
        paddingVertical: 5,
    },
    labelTeam: {
        color: color.black,
        backgroundColor: color.white,
        width: 100,
        height: 25,
        paddingVertical: 2,
        borderWidth: 1,
        borderColor: color.black,
        borderRadius: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 6,
        left: 6,
    },
});