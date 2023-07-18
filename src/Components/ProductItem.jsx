import { Image, Pressable, StyleSheet, Text, useWindowDimensions } from "react-native";
import React from "react";
import Card from "./Card";

const ProductItem = ({ 
    item,
    navigation
}) => {
    const { height, width } = useWindowDimensions();

    const onSelect = (id) => {
        navigation.navigate('Detail', {productId: item.id})
    }

    return (
        <Pressable onPress={() => onSelect(item.id)}>
            <Card additionalStyle={styles.additionalStylesCard}>
                <Text
                    style={
                        width > 350 ? styles.textCategory : 
                        styles.textCategorySm
                    }
                >
                    {item.title}
                </Text>
                <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{ uri: item.images[0] }}
                />
            </Card>
        </Pressable>
    );
};

export default ProductItem;

const styles = StyleSheet.create({
  image: {
    height: 120,
    width: "40%",
    minWidth: 150,
    maxWidth: 250,
    borderRadius: 8,
},
  additionalStylesCard: {
    flexDirection: 'row',
    height: 120,
    padding: 2,
    justifyContent: 'space-between',
  },
  textCategory: {
    width: 130,
    minWidth: 180,
    maxWidth: 270,
    justifyContent: "center"
  }
})