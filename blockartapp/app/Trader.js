import React, { Fragment } from 'react';
import {
    SafeAreaView,
    Button,
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView,
    ImageBackground,
    Dimensions,
    Picker,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import BlockchainLoader from './components/BlockchainLoader';
import axios from 'axios';


const { width, height } = Dimensions.get('window');

class Trader extends React.Component {
    static navigationOptions = {
        title: 'Trader',

    };

    constructor(props) {
        super(props);
        this.state = {
            progress: false,
            chosenRecipient: '',
        }

    }


    componentDidMount() {
        // const { navigation } = this.props;
        // const recipients = navigation.getParam('recipients', 'NO-ID');

        // this.setState = {
        //     chosenRecipient : recipients[0].username,
        // }

    }


    _sell = () => {
        this.setState({ progress: true });

        const { navigation } = this.props;
        const userID = navigation.getParam('transaction', 'NO-ID').data._embedded.user.id;
        const artHash = navigation.getParam('artHash', 'NO-ID');
        const buyer = this.state.chosenRecipient;

        console.log("USER_TOKEN: " + userID + "ARTHASH: " + artHash + "BUYER: " + buyer);

        axios({
            method: 'post',
            url: 'http://blockarthdm.herokuapp.com/api/ownership/newOwner',
            timeout: 180000, // Wait at leat 180 seconds
            data: {
                artHash: artHash,
                user_token: userID,
                userName: buyer
            }
        })
            .then(response => {

                console.log(response.data.response);

                setTimeout(function(){

                    axios.get('http://blockarthdm.herokuapp.com/api/ownership/').then(response => {
            // console.log(response.data.response);
            const owners = response.data.response;
                this.setState({progress: false});
            const { navigate } = this.props.navigation;
            navigate('Carousel', { owners: owners });

        })
            .catch(err => {
                console.log(err);
                Alert.alert("Es konnte keine Verbindung zum Backend hergestellt werden");
                this.setState({ progress: false });
            });

    
                },3000);

            })
            .catch(err => {
                console.log(err);
                Alert.alert("Die Transaktion ist fehlgeschlagen");
                this.setState({ progress: false });
            });


            // let body = JSON.stringify({
            //     artHash: artHash,
            //     user_token: userID,
            //     userName: buyer
            // })

        // axios.post('http://blockarthdm.herokuapp.com/api/ownership/newOwner', body)
        //     .then(response => {

        //         console.log(response.data.response);

        //         axios.get('http://blockarthdm.herokuapp.com/api/ownership/').then(response => {
        //             // console.log(response.data.response);
        //             owners = response.data.response;

        //             this.setState({ progress: false });
        //             navigate('Carousel', { owners: owners });

        //         })
        //             .catch(err => {
        //                 console.log(err);
        //                 Alert.alert("Es konnte keine Verbindung zum Backend hergestellt werden");
        //                 self.setState({ progress: false });
        //             });


        //     })
        //     .catch(err => {
        //         console.log(err);
        //         Alert.alert("Die Transaktion ist fehlgeschlagen");
        //         this.setState({ progress: false });
        //     });

    }

    changeText(itemValue) {
        this.setState({ chosenRecipient: itemValue });
    }



    render() {

        const { navigation } = this.props;
        const transaction = navigation.getParam('transaction', 'NO-ID');
        const userProfile = transaction.data._embedded.user.profile;
        const userId = transaction.data._embedded.user.id;

        const artHash = navigation.getParam('artHash', 'NO-ID');
        const artwork = navigation.getParam('artwork', 'NO-ID');
        const recipients = navigation.getParam('recipients', 'NO-ID');

        let loader

        if (this.state.progress) {
            loader = (
                <View style={styles.overlay}>
                    <BlockchainLoader />
                </View>
            )
        }

        return (

            <Fragment>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView style={styles.container}>
                    {loader}
                    <ImageBackground
                        source={require('./components/background.jpg')}
                        imageStyle={{ opacity: 0.5 }}
                        style={{
                            height: height,
                            width: width,
                            resizeMode: "cover",
                            overflow: "hidden",
                            flex: 1,
                        }}>
                        <Text style={styles.titleHello}>
                            Hello {userProfile.firstName} {userProfile.lastName}
                        </Text>

                        <Text style={styles.titleHello}>
                            Trading artwork {artwork}
                        </Text>
                        <Image
                            style={{
                                width: "40%",
                                height: "40%", margin: 20,
                                alignSelf: 'center',
                            }}
                            source={{ uri: navigation.getParam('url') }}
                        />

                        <Picker
                            selectedValue={this.state.chosenRecipient}
                            style={{ height: 50, width: 300, alignSelf: 'center' }}
                            onValueChange={this.changeText.bind(this)}
                            itemStyle={{backgroundColor: "white", fontSize: 20}}

                        >
                            <Picker.Item label={recipients[0].username} value={recipients[0].username } color="#004274" fontSize="20"/>
                            <Picker.Item label={recipients[1].username} value={recipients[1].username} color="#004274" fontSize="20"/>
                            <Picker.Item label={recipients[2].username} value={recipients[2].username} color="#004274" fontSize="20"/>
                        </Picker>

                        <TouchableOpacity
                            onPress={this._sell}
                            style={styles.buttonSell}>
                            <Text style={styles.buttonText}>Kunstwerk verkaufen!</Text>
                        </TouchableOpacity>

                    </ImageBackground>
                </SafeAreaView>

            </Fragment>
        )
    }

}

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    titleHello: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#004274',
        paddingTop: 40,
        textAlign: 'center',
    },
    buttonSell: {
        marginLeft: 20,
        marginRight: 20,
        height: 50,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#9D2235'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold"
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: height / 3,
        // opacity: 0.5,
        // backgroundColor: 'black',
        width: width
    }
})


export default Trader;