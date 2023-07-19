import { StyleSheet, Text, View, Pressable } from 'react-native';
import { size, color } from "../Styles/base";

export default function App({callState, handlePagination, previous, next, currentPage}) {
    return (
        <View style={styles.pagination}>
            {callState && <Pressable style={styles.paginationButton} onPress={() => handlePagination(previous)} disabled={!previous}>
                <Text style={styles.chevron}>
                    {previous ? "\u2039" : ""}
                </Text>
            </Pressable>}
            {callState ? <Text style={styles.currentPageText}>{currentPage}</Text> : <Text style={styles.currentPageLoader}>...</Text>}
            {callState && <Pressable style={styles.paginationButton} onPress={() => handlePagination(next)} disabled={!next}>
                <Text style={styles.chevron}>
                    {next ? "\u203a" : ""}
                </Text>
            </Pressable>}
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
});
