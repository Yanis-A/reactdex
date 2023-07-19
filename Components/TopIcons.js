import { StyleSheet, Text, View, Pressable } from "react-native";
import { size, color } from "../Styles/base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart as solidHeart, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

export default function Card({handleTeam, isOnTeam, handleFav, isFav}) {
    return (
        <View style={styles.topIcons}>
            <Pressable style={styles.iconButton} onPress={handleTeam}>
            <Text>
                <FontAwesomeIcon icon={isOnTeam ? faCheck : faPlus} size={size.sm} color={isOnTeam ? color.black : color.black} />
            </Text>
            </Pressable>
            <Pressable style={styles.iconButton} onPress={handleFav}>
                <Text>
                    <FontAwesomeIcon icon={isFav ? solidHeart : regularHeart} size={size.sm} color={isFav ? color.pokemonPalette.red1 : color.pokemonPalette.red1} />
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    topIcons: {
        position: 'absolute',
        top: 6,
        right: 6,
        display: 'flex',
        flexDirection: 'column',
    },
    iconButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: size.xs,
    },
});