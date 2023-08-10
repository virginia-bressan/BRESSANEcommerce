import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../Global/Colors";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../Features/User/userSlice";

const Header = ({ route, navigation }) => {
    let title;
    if (route.name === "Home") title = "Home";
    else if (route.name === "ItemListCategory") title = route.params.category;
    else if (route.name === "Detail") title = route.params.title;
    else title = route.name;

    const dispatch = useDispatch();
    const { email } = useSelector((state) => state.userReducer.value);

    return (
        <View style={styles.containerHeader}>
            <Text style={styles.text}>{title}</Text>
            {navigation.canGoBack() ? (
                <Pressable
                    style={styles.pressable}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="back" size={24} color="black" />
                </Pressable>
            ) : null}
            {email ? (
                <Pressable
                    style={styles.signOut}
                    onPress={() => dispatch(signOut())}
                >
                    <SimpleLineIcons name="logout" size={24} color="black" />
                </Pressable>
            ) : null}
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    containerHeader: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: colors.orange,
        paddingVertical: 15,
        position: "relative",
    },
     pressable: {
        position: "absolute",
        right: 28,
        top: "50%",
    },
    text: {
        fontSize: 25,
        fontFamily: "Josefin",
    },
   
    signOut: {
        position: "absolute",
        left: 30,
        top: "50%",
    },
});