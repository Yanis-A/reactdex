// // Dependencies
// import React, { useState ,useEffect } from 'react';
// import { StyleSheet, Text, View, Pressable, Image, ScrollView, TextInput, Platform } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import * as NavigationBar from 'expo-navigation-bar';
// import axios from 'axios';

// // Components
// import Card from './Components/Card';
// import Pagination from './Components/Pagination';

// // Styling
// import { size, color } from "./Styles/base";
// import { loadFonts } from './assets/fonts/fonts';

// export default function App() {
//     // Navigation bar
//     NavigationBar.setBackgroundColorAsync(color.black);

//     // Default data request
//     const defaultRequest = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';

//     // Data fetching
//     const [pokemons, setPokemons] = useState([]);

//     // Pagination
//     const [previous, setPrevious] = useState('');
//     const [next, setNext] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);

//     // Callstate
//     const [callState, setCallState] = useState(true);

//     // Search
//     const [search, setSearch] = useState('');
//     const [previousSearch, setPreviousSearch] = useState('');

//     //Fonts
//     const [isFontsLoaded, setIsFontsLoaded] = useState(false);
//     useEffect(() => {
//         // Load the custom fonts when the app starts.
//         loadFonts().then(() => setIsFontsLoaded(true));
//     }, []);

//     const fetchPokemons = async (request) => {
//         try {
//             setCallState(false);
//             const response = await axios.get(request);
//             setPokemons(response.data.results);
//             setPrevious(response.data.previous);
//             setNext(response.data.next);
//             const pageNumber = request.match(/offset=(\d+)/)[1];
//             setCurrentPage(Number(pageNumber) / 20 + 1);
//             setCallState(true);
//         } catch (error) {
//             console.error('Error fetching pokemons:', error);
//             setCallState(true);
//         }
//     };

//     useEffect(() => {
//         fetchPokemons(defaultRequest);
//     }, []);

//     useEffect(() => {
//         if (search.trim() === '' && previousSearch.trim() !== '') {
//         fetchPokemons(defaultRequest);
//         };
//         setPreviousSearch(search);
//     }, [search]);

//     const handlePagination = async (request) => {
//         fetchPokemons(request);
//     };

//     const launchSearch = async () => {
//         console.log(search);
//         if (typeof search === 'string' && search.trim() !== '') {
//         let cleanedSearch = search.trim().toLowerCase();
//         try {
//             setCallState(false);
//             let response;

//             if (cleanedSearch === '') {
//                 response = await axios.get(defaultRequest);
//             } else {
//                 response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${cleanedSearch}`);
//             }

//             if (response.data) {
//                 setPokemons([response.data]);
//                 setPrevious(null);
//                 setNext(null);
//                 setCurrentPage(1);
//             } else {
//                 setPokemons([]);
//                 setPrevious(null);
//                 setNext(null);
//                 setCurrentPage(1);
//             }

//             setCallState(true);
//         } catch (error) {
//             console.error('Error fetching pokemon:', error);
//             setCallState(true);
//         }
//         } else {
//             fetchPokemons(defaultRequest);
//         }
//     };

    
//     // Visible as font(s) are loading
//     const adjectives = [
//         'skilled',
//         'dedicated',
//         'knowledgeable',
//         'resourceful',
//         'courageous',
//         'passionate',
//         'wise',
//         'insightful',
//         'determined',
//         'charismatic',
//     ];
//     const randomWord = Math.floor(Math.random() * adjectives.length)+1;
//     if (!isFontsLoaded) {
//         return (
//             <View style={styles.container}>
//                 <Text style={{color: color.white, fontSize: size.md}}>{`Welcome ${adjectives[randomWord]} trainer !`}</Text>
//             </View>
//         ) 
//     }

//     return (
//         <View style={styles.container}>
//             <Image resizeMode='contain' style={{width:300}} source={require('./assets/logoV2.png')} />
//             <Text style={{color: color.white, fontSize: size.sm}}>{search}</Text>
//             <View style={styles.searchbar}>
//                 {!callState && <Text style={styles.searchbarLoader}>Loading...</Text>}
//                 {callState && <TextInput
//                     onChangeText={newText => setSearch(newText)}
//                     defaultValue={search}
//                     style={styles.searchbarInput} placeholder="Search a Pokémon name..." placeholderTextColor={color.grey}
//                     onEndEditing={launchSearch}
//                 />}
//             </View>
//             {pokemons.length > 1 && <Pagination callState={callState} handlePagination={handlePagination} previous={previous} next={next} currentPage={currentPage}/>}
//             <ScrollView>
//                 {pokemons.map((pokemon, index) => (
//                 <Card key={index} name={pokemon.name} data={pokemon.url} callState={callState} fontCallState={isFontsLoaded} />
//                 ), [])}
//                 <StatusBar backgroundColor={color.black} barStyle="light-content" and style="light" />
//             </ScrollView>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         marginTop: size.sm,
//         marginBottom: size.sm,
//         flex: 1,
//         backgroundColor: color.black,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//     },
//     pagination: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginVertical: size.xs,
//     },
//     paginationButton: {
//         padding: size.xs,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     chevron: {
//         color: color.white,
//         fontSize: size.sm,
//         width: 40,
//         height: 30,
//         borderRadius: 10,
//         textAlign: 'center',
//     },
//     currentPageText: {
//         fontSize: size.sm,
//         fontWeight: 'bold',
//         marginHorizontal: 15,
//         color: color.white,
//     },
//     currentPageLoader: {
//         fontSize: size.sm,
//         fontWeight: 'bold',
//         marginHorizontal: 15,
//         color: color.white,
//         paddingVertical: 12,
//     },
//     searchbar: {
//         display: 'flex',
//         flexDirection: 'row',
//     },
//     searchbarLoader: {
//         color: color.white,
//         fontSize: size.sm,
//         paddingVertical: 16,
//     },
//     searchbarInput: {
//         height: 40,
//         color: color.white,
//         borderColor: color.grey,
//         borderWidth: 1,
//         borderRadius: 10,
//         width: 275,
//         marginVertical: size.xs,
//         padding: size.xs,
//     },
//     searchbarButton: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexGrow: 0,
//         marginLeft: size.xs,
//     },
// });
