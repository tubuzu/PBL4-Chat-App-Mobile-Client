import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    chatSearchIcon: {
        paddingRight: 8,
    },
    chatCloseIcon: {
    },
    chatSearchBar: {
        backgroundColor: "#6a737c",
        borderRadius: 8,
        width: "100%",
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingRight: 30,
    },
    chatSearchBarLeft: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    }, 
    chatSearchBarRight: {
        alignItems: "center",
    }, 
    searchInput: {
        fontSize: 15,
        color: "white",
        flex: 5,
    },
})