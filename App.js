import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image, ScrollView, useWindowDimensions } from 'react-native';
import React, { useState ,useEffect } from 'react';
import Card from './Components/Card';
import {padding, margin, font, color} from "./Styles/base";
import axios from 'axios';

export default function App() {
    const [pokemons, setPokemons] = useState([]);
    const defaultRequest = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
    const [previous, setPrevious] = useState('');
    const [next, setNext] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [callState, setCallState] = useState(true);

    useEffect(() => {
        const fetchPokemons = async (request) => {
            try {
                const response = await axios.get(request);
                setPokemons(response.data.results);
                setPrevious(response.data.previous);
                setNext(response.data.next);
            } catch (error) {
                console.error('Error fetching pokemons:', error);
            }
            };
        fetchPokemons(defaultRequest);
    }, []);

    const handlePagination = async (request) => {
        try {
            setCallState(false);
            const response = await axios.get(request);
            setPokemons(response.data.results);
            setPrevious(response.data.previous);
            setNext(response.data.next);
            const pageNumber = request.match(/offset=(\d+)/)[1];
            setCurrentPage(Number(pageNumber) / 20 + 1);
            setCallState(true);
        } catch (error) {
            console.error('Error fetching pokemons:', error);
        }};

    // const {width, height} = useWindowDimensions();

    return (
        <View style={styles.container}>
            <Image resizeMode='contain' style={{width:300}} source={require('./assets/logoV2.png')} />
            <View style={styles.pagination}>
                <Pressable style={styles.paginationButton} onPress={() => handlePagination(previous)} disabled={!previous}>
                    <Text style={styles.chevron}>
                        {"\u2039"}
                    </Text>
                </Pressable>
                {callState ? <Text style={styles.currentPageText}>{currentPage}</Text> : <Text style={styles.currentPageText}>...</Text>}
                <Pressable style={styles.paginationButton} onPress={() => handlePagination(next)} disabled={!next}>
                    <Text style={styles.chevron}>
                        {"\u203a"}
                    </Text>
                </Pressable>
            </View>
            <ScrollView>
                {pokemons.map((pokemon, index) => (
                <Card key={index} name={pokemon.name} data={pokemon.url} callState={callState}/>
                ), [])}
                <StatusBar style="auto" />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: margin.sm,
        marginBottom: margin.sm,
        flex: 1,
        backgroundColor: color.black,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: margin.xs,
    },
    paginationButton: {
        padding: padding.xs,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chevron: {
        color: color.black,
        backgroundColor: color.white,
        fontSize: font.sm,
        width: 40,
        height: 30,
        borderRadius: 10,
        textAlign: 'center',
    },
    currentPageText: {
        fontSize: font.sm,
        fontWeight: 'bold',
        marginHorizontal: 15,
        color: color.white,
    },
});
