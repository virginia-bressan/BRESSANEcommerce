import {
    Button,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import allProducts from "../Data/products.json";
import { useDispatch } from "react-redux";
import { addCartItem } from "../Features/Cart/cartSlice";

const ItemDetail = ({ 
    navigation,
    route
}) => {

    const {productId: idSelected} = route.params

    const dispatch = useDispatch()

    const [product, setProduct] = useState(null);
    const [orientation, setOrientation] = useState("portrait");
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        if (width > height) setOrientation("landscape");
        else setOrientation("portrait");
    }, [width, height]);

    useEffect(() => {
        const productSelected = allProducts.find(
            (product) => product.id === idSelected
            );
        setProduct(productSelected);
    }, [idSelected]);

    const onAddCart = () => {
        dispatch(addCartItem({
            ...product,
            quantity: 1
        }))
    }

    return (
        <View>
            {product ? (
                <View
                    style={
                        orientation === "portrait"
                            ? styles.mainContainer
                            : styles.mainContainerLandscape
                    }
                >
                    <Image
                        source={{ uri: product.images[0] }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={styles.textContainer}>
                        <Text style = {styles.text}>{product.title}</Text>
                        <Text style = {styles.text}>{product.description}</Text>
                        <Text style = {styles.text}>${product.price}</Text>
                        <Button title="Add cart"
                            onPress={onAddCart}
                        ></Button>
                    </View>
                </View>
            ) : null}
        </View>
    );
};

export default ItemDetail;

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        padding: 9,
    },
    text: {
        fontSize: 22,
    },
    mainContainerLandscape: {
      flexDirection: "row",
      padding: 10,
      justifyContent: "center",
      alignItems: "flex-start",  
  },
    image: {
        width: 295,
        height: 245,
        borderRadius: 3,
    },
    textContainer: {
      flexDirection: 'column',
      padding: 8,
    }
});