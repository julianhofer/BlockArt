import React from 'react';
import {View, Image, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

class BlockchainLoader extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <Image
                 source={require('./blockchain_loader.gif')}
                 style={styles.img}
                 />
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
    }
}

export default BlockchainLoader;