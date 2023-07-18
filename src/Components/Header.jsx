import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'

const Header = () => {
  return (
    <View 
        style={styles.containerHeader}>
      <Text style ={styles.text}>Tienda Virtual</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    containerHeader: {
        backgroundColor: colors.orange,
        justifyContent: 'center',
        padding: 10,
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        fontFamily: 'Josefin'
    }
})