import React, { useState } from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AddButton from "../Components/AddButton";
import { colors } from "../Global/Colors";
import * as MediaLibrary from "expo-media-library";
import { usePostProfileImageMutation } from "../Services/shopServices";
import { useDispatch, useSelector } from "react-redux";
import { saveImage } from "../Features/User/userSlice";

const ImageSelector = ({ navigation }) => {
    const [image, setImage] = useState(null);

    const [triggerSaveImage, resultSaveImage] = usePostProfileImageMutation();
    const dispatch = useDispatch();
    const { localId } = useSelector((state) => state.userReducer.value);

    const verifyCameraPermissions = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if (!granted) {
            return false;
        }
        return true;
    };

    const pickImage = async () => {

        const isCameraOk = await verifyCameraPermissions();

        if (isCameraOk) {
           
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            console.log(result.assets);

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        }
    };

    const confirmImage = async () => {
        try {
            
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status === "granted") {
                console.log("Only valid on emulators and physical devices");
               
                const response = await MediaLibrary.createAssetAsync(image);
                console.log(response.uri);
                triggerSaveImage({
                    image: response.uri,
                    localId: localId,
                });
                
                dispatch(saveImage(response.uri));
            }
        } catch (error) {
            console.log(error);
        }
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {image ? (
                <>
                    <Image source={{ uri: image }} style={styles.image} />
                    <AddButton title="Take another photo" onPress={pickImage} />
                    <AddButton title="Confirm photo" onPress={confirmImage} />
                </>
            ) : (
                <>
                    <View style={styles.noPhotoContainer}>
                        <Text>No photo to show...</Text>
                    </View>
                    <AddButton title="Take a photo" onPress={pickImage} />
                </>
            )}
        </View>
    );
};

export default ImageSelector;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        gap: 20,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "flex-start",
       
    },
    image: {
        width: 200,
        height: 200,
    },
    noPhotoContainer: {
        width: 200,
        height: 200,
        borderColor: colors.orange,
        padding: 11,
        borderWidth: 3,
        justifyContent: "center",
        alignItems: "center",
    },
});