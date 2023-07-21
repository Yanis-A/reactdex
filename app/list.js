// Dependencies
import React, { useState ,useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';

import axios from 'axios';

// Components
import Card from '../Components/Card';
import Pagination from '../Components/Pagination';

// Styling
import { size, color } from "../Styles/base";


export default function App(params) {
    
    console.log(params.fontCallState);
    // Default data request
    const defaultRequest = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';

    // Data fetching
    const [pokemons, setPokemons] = useState([]);

    // Pagination
    const [previous, setPrevious] = useState('');
    const [next, setNext] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Callstate
    const [callState, setCallState] = useState(true);

    // Search
    const [search, setSearch] = useState('');
    const [previousSearch, setPreviousSearch] = useState('');

    const fetchPokemons = async (request) => {
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
            setCallState(true);
        }
    };

    useEffect(() => {
        fetchPokemons(defaultRequest);
    }, []);

    useEffect(() => {
        if (search.trim() === '' && previousSearch.trim() !== '') {
        fetchPokemons(defaultRequest);
        };
        setPreviousSearch(search);
    }, [search]);

    const handlePagination = async (request) => {
        fetchPokemons(request);
    };

    const launchSearch = async () => {
        console.log(search);
        if (typeof search === 'string' && search.trim() !== '') {
        let cleanedSearch = search.trim().toLowerCase();
        try {
            setCallState(false);
            let response;

            if (cleanedSearch === '') {
                response = await axios.get(defaultRequest);
            } else {
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${cleanedSearch}`);
            }

            if (response.data) {
                setPokemons([response.data]);
                setPrevious(null);
                setNext(null);
                setCurrentPage(1);
            } else {
                setPokemons([]);
                setPrevious(null);
                setNext(null);
                setCurrentPage(1);
            }

            setCallState(true);
        } catch (error) {
            console.error('Error fetching pokemon:', error);
            setCallState(true);
        }
        } else {
            fetchPokemons(defaultRequest);
        }
    };

    return (
        <View>
            <Text style={{color: color.white, fontSize: size.sm}}>{search}</Text>
            <View style={styles.searchbar}>
                {!callState && <Text style={styles.searchbarLoader}>Loading...</Text>}
                {callState && <TextInput
                    onChangeText={newText => setSearch(newText)}
                    defaultValue={search}
                    style={styles.searchbarInput} placeholder="Search a Pokémon name..." placeholderTextColor={color.grey}
                    onEndEditing={launchSearch}
                />}
            </View>
            {pokemons.length > 1 && <Pagination callState={callState} handlePagination={handlePagination} previous={previous} next={next} currentPage={currentPage}/>}
            <ScrollView>
                {pokemons.map((pokemon, index) => (
                <Card key={index} name={pokemon.name} data={pokemon.url} callState={callState} fontCallState={params.fontCallState} />
                ), [])}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: size.xs,
    },
    paginationButton: {
        padding: size.xs,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chevron: {
        color: color.white,
        fontSize: size.sm,
        width: 40,
        height: 30,
        borderRadius: 10,
        textAlign: 'center',
    },
    currentPageText: {
        fontSize: size.sm,
        fontWeight: 'bold',
        marginHorizontal: 15,
        color: color.white,
    },
    currentPageLoader: {
        fontSize: size.sm,
        fontWeight: 'bold',
        marginHorizontal: 15,
        color: color.white,
        paddingVertical: 12,
    },
    searchbar: {
        display: 'flex',
        flexDirection: 'row',
    },
    searchbarLoader: {
        color: color.white,
        fontSize: size.sm,
        paddingVertical: 16,
    },
    searchbarInput: {
        height: 40,
        color: color.white,
        borderColor: color.grey,
        borderWidth: 1,
        borderRadius: 10,
        width: 275,
        marginVertical: size.xs,
        padding: size.xs,
    },
    searchbarButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 0,
        marginLeft: size.xs,
    },
});