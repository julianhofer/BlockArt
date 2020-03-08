import React from 'react';
import {View, Image, Text, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

/* 
Dieser benutzerdefinierte Loader wird im Trader-Screen während der Blockchain Transaktion angezeigt
Dauert die Transaktion länger als 30 Sekunden wird der BlockchainLoaderExtended angezeigt. Dieser erhält die gleiche Ladeanimation
mit einer veränderten Information für den Benutzer */

class BlockchainLoader extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <Image
                 source={require('./blockchain_loader.gif')}
                 style={styles.img}
                 />
                 <Text style={styles.infoText}>Info: Smart-Contract wird aktualisiert. Mining kann je nach Netzauslastung bis zu einer Minute dauern!</Text>
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

export default BlockchainLoader;