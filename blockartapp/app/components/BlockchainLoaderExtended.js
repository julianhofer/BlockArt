import React from 'react';
import {View, Image, Text, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

/* 
Erweiterung des BlockchainLoaders (gleicher Ordner). Sobald nach Aufruf der Verkauf-Funktion im Trader die Blockchain-Transaktion 
länger als 30 Sekunden dauert, wird der Benutzer hiermit informiert, dass die Transaktion länger als gewöhnlich dauert */

class BlockchainLoaderExtended extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <Image
                 source={require('./blockchain_loader.gif')}
                 style={styles.img}
                 />
                 <Text style={styles.infoText}>Die Transaktion dauert länger als gewöhnlich!</Text>
            </View>
        )
    }
}

const styles = {
    img: {
        height: 200,
        width: 500,
        justifyContent : 'center',
        alignItems: 'center'
    },
    infoText: {
        fontSize: 15,
        fontWeight: "bold",
        paddingTop: 10,
        textAlign: "center",
        paddingBottom: 5,
      },
}

export default BlockchainLoaderExtended;