import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Alert,
  Platform,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Button,
  RefreshControl,
} from 'react-native';
import axios from 'axios';

import NfcManager, { NfcEvents, Ndef } from 'react-native-nfc-manager';
import Carousel from 'react-native-snap-carousel';
import styled, { css } from "styled-components"; // 3.1.6
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';


const { width, height } = Dimensions.get('window');


class CarouselScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Bereit...",
      artists: "",
      price: "",
      location: "",
      owner: "",
      blockchain: "",
      ownerName: "",
      artHash: null,
      progress: false,
      refreshing: false, 
      owners: [],
      users: [],

    }

    this._carousel = {};
    this.init();

  }


  init() {
    this.state = {
      videos: [
        {
          id: "0x2b12a12e72407b459e7ea7277c90ffea17de1e68e63eb5cf95db93fd1cbca6a4",
          thumbnail: "https://drive.google.com/uc?export=download&id=1yr7jkWYcq6re4HMlEpjTyXbWaPNfvbbB",
          title: "Bild 001"
        }, {
          id: "0x80beafea96f0fa5ba688e37fef8eae0bbeb7ebdce652f46657bc43f52eaebc26",
          thumbnail: "https://drive.google.com/uc?export=download&id=1wR0rkmU9yIWQMZ6-EduV0XynYJU41cbY",
          title: "Bild 002"
        }, {
          id: "0xb26e61656485b5b9ce063b626c5d5c444e8eb0e449fa04ac02e3c81920811452",
          thumbnail: "https://drive.google.com/uc?export=download&id=1j6Wh_IPH-tA8kG1tlCzVHkiYgl0_LVor",
          title: "Bild 003"
        }
      ]
    };

    console.log("ThumbnailCarousel Props: ", this.props);

  }

  changeText(index) {

    if (index == 0) {
      this.setState({
        title: "Treeblock 001",
        artists: "Parco Macher",
        artHash: "0x2b12a12e72407b459e7ea7277c90ffea17de1e68e63eb5cf95db93fd1cbca6a4",
        blockchain: "1",
      })
      this.getOwnerOf("0x2b12a12e72407b459e7ea7277c90ffea17de1e68e63eb5cf95db93fd1cbca6a4")
    } else if (index == 1) {
      this.setState({
        title: "Treeblock 002",
        artists: "Julian Hanser",
        artHash: "0x80beafea96f0fa5ba688e37fef8eae0bbeb7ebdce652f46657bc43f52eaebc26",
        blockchain: "2",
      })
      this.getOwnerOf("0x80beafea96f0fa5ba688e37fef8eae0bbeb7ebdce652f46657bc43f52eaebc26")
    } else {
      this.setState({
        title: "Treeblock 003",
        artists: "Eberhardt Frick",
        artHash: "0xb26e61656485b5b9ce063b626c5d5c444e8eb0e449fa04ac02e3c81920811452",
        blockchain: "3",
      })
      this.getOwnerOf("0xb26e61656485b5b9ce063b626c5d5c444e8eb0e449fa04ac02e3c81920811452")
    }
  }

  async getOwnerOf(artHash) {
    console.log(this.state.owners);
    if(this.state.owners !== undefined){
      
      this.state.owners.map((owner) => {
        if (owner.artHash === artHash) {
          console.log(owner.artHash);
          console.log(owner.user_token);
          this.getOwnername(owner.user_token);
        }
      })
    }
    else if(this.props.navigation.getParam('owners') !== undefined){
      let owners = this.props.navigation.getParam('owners', null);
    owners.map((owner) => {
      if (owner.artHash === artHash) {
        console.log(owner.artHash);
        console.log(owner.user_token);
        this.getOwnername(owner.user_token);
      }
    })
    }
    

  }

  async getOwnername(user_token) {
    console.log(this.state.users);
    if(this.state.users !== undefined){
      this.state.users.map((user) => {
        if (user.user_token === user_token) {
          this.setState({ ownerName: user.username, owner: user.user_token });
        }
      })
    }
    else if(this.props.navigation.getParam('users') !== undefined){
    let users = this.props.navigation.getParam('users', null);
    users.map((user) => {
      if (user.user_token === user_token) {
        this.setState({ ownerName: user.username, owner: user.user_token });
      }
    })
  }
  }


  get pagination() {
    const { entries, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgb(255,250,250)'
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  _renderItem = ({ item, index }) => {
    console.log("rendering,", index, item)
    return (
      <ThumbnailBackgroundView>
        <CurrentVideoTO
          onPress={() => {
            console.log("clicked to index", index)
            this.changeText(index)
            this.setState({
              price: "-",
              location: "-",
              blockchain: "-"
            })
            this._carousel.snapToItem(index);
          }}
        >
          <CurrentVideoImage source={{ uri: item.thumbnail }} />
        </CurrentVideoTO>
        {/*<NextVideoImage source={{ uri: this.state.currentVideo.nextVideoId }}/>*/}
        <VideoTitleText>{item.title}</VideoTitleText>
      </ThumbnailBackgroundView>
    );
  }

  handleSnapToItem(index) {
    this.changeText(index)
  }

  componentDidMount() {


    this._carousel.snapToItem(1)
    this.changeText(1)
    NfcManager.start()
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {

      let parsed = null;
      if (tag.ndefMessage && tag.ndefMessage.length > 0) {
        // ndefMessage is actually an array of NdefRecords, 
        // and we can iterate through each NdefRecord, decode its payload 
        // according to its TNF & type
        const ndefRecords = tag.ndefMessage;

        function decodeNdefRecord(record) {
          if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
            return Ndef.text.decodePayload(record.payload);
          } else if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
            return Ndef.uri.decodePayload(record.payload);
          }

          return ['unknown', '---']
        }

        parsed = ndefRecords.map(decodeNdefRecord);

        var infoText = String(parsed).split(',').join(' ')

        this.setState({
          title: infoText.substring(infoText.search("TITLE") + 9, infoText.indexOf(";", infoText.search("TITLE") + 9)),
          artists: infoText.substring(infoText.search("ARTIST") + 7, infoText.indexOf(";", infoText.search("ARTIST") + 7)),
          price: infoText.substring(infoText.search("PRICE") + 6, infoText.indexOf(";", infoText.search("PRICE") + 6)),
          location: infoText.substring(infoText.search("LOCATION") + 9, infoText.indexOf(";", infoText.search("LOCATION") + 9)),
          owner: infoText.substring(infoText.search("OWNER") + 6, infoText.indexOf(";", infoText.search("OWNER") + 6)),
          blockchain: infoText.substring(infoText.search("BLOCKCHAIN") + 11, infoText.indexOf(";", infoText.search("BLOCKCHAIN") + 11))
        })

        if (String(parsed).substring(0, 1) == "1") {
          this._carousel.snapToItem(0);
        } else if (String(parsed).substring(0, 1) == "2") {
          this._carousel.snapToItem(1);
        } else {
          this._carousel.snapToItem(2);
        }
      }

      NfcManager.setAlertMessageIOS('Kunstwerk gefunden!');
      NfcManager.unregisterTagEvent().catch(() => 0);
    });


  }
  componentWillUnmount() {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.unregisterTagEvent().catch(() => 0);
  }

  _cancel = () => {
    NfcManager.unregisterTagEvent().catch(() => 0);
  }

  _test = async () => {
    try {
      await NfcManager.registerTagEvent();
    } catch (ex) {
      console.warn('ex', ex);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }

  }

  _sell = async () => {
    this.setState({ progress: true });

    // Alert.alert("Sell artwork " + this.state.artHash);

    const artHash = this.state.artHash;
    let pictureURL = "https://image.shutterstock.com/image-vector/sample-stamp-grunge-texture-vector-600w-1389188336.jpg";
    this.state.videos.map((picture) => {
      if (picture.id === artHash) {
        pictureURL = picture.thumbnail;
      }
    });
    axios.get(`http://blockarthdm.herokuapp.com/api/users/arthash/${artHash}`)
      .then(response => {
        //   const rec = response.data.response;
        console.log(response.data.response);
        console.log(response.data.response[0].username);

        this.setState({ progress: false });



        this.props.navigation.navigate('Trader', { transaction: this.props.navigation.getParam('transaction', 'NO-ID'), artHash: this.state.artHash, artwork: this.state.title, recipients: response.data.response, url: pictureURL });
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Es konnte keine Verbindung zum Backend hergestellt werden");
        this.setState({ progress: false });
      });

  }

  _buy = async () => {
    Alert.alert("Buy artwork " + this.state.title)
  }


  _profile = async () => {
   
   
      this.props.navigation.navigate('Profile', { transaction: this.props.navigation.getParam('transaction', 'NO-ID'), auth: this.props.navigation.getParam('auth', 'NO-ID') });
   
   
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.refreshData().then(() => {
      this.setState({refreshing: false});
    });
  }

  refreshData = async() => {
    let owners;
    let users;
    let self = this;

    axios.get('http://blockarthdm.herokuapp.com/api/ownership/').then(response => {
       console.log(response.data.response);

      self.setState({owners: response.data.response});

      axios.get('http://blockarthdm.herokuapp.com/api/users/').then(response => {
       console.log(response.data.response);

      self.setState({users: response.data.response});


    })
      .catch(err => {
        console.log(err);
        Alert.alert("Es konnte keine Verbindung zum Backend hergestellt werden");
        self.setState({ progress: false });
      });

    })
      .catch(err => {
        console.log(err);
        Alert.alert("Es konnte keine Verbindung zum Backend hergestellt werden");
        self.setState({ progress: false });
      });




  }


  render() {
    let artTradeArea;

    {
      if (this.state.owner == this.props.navigation.getParam('transaction', 'NO-ID').data._embedded.user.id) {
        artTradeArea = (
          <TouchableOpacity
            onPress={this._sell}
            style={styles.buttonSell}>
            <Text style={styles.buttonText}>Kunstwerk verkaufen</Text>
          </TouchableOpacity>
        );

      }
      // else {
      // artTradeArea = (
      //   <TouchableOpacity
      //     onPress={this._buy}
      //     style={styles.buttonBuy}>
      //     <Text style={styles.buttonText}>Kunstwerk kaufen</Text>
      //   </TouchableOpacity>
      // );

      //  }
    }

    return (
      <View style={{ flex: 1 }}>

        <Fragment>
          <SafeAreaView style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="always"
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }>
              <Spinner
                visible={this.state.progress}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
              />

              <ImageBackground
                source={require('./components/background.jpg')}
                style={{
                  height: height + 100,
                  width: width,
                  resizeMode: "cover",
                  overflow: "hidden",
                  flex: 1
                }}>

                <TouchableOpacity
                  onPress={this._profile} style={{ height: 50, width: 50, position: "relative", left: (width - 50), top: 5 }}
                >
                  <Image source={require('./components/user_icon.png')} style={{ height: 50, width: 50, right: 10, top: 10 }} />
                </TouchableOpacity>


                <Text style={styles.heading}>BlockArt</Text>


                <CarouselBackgroundView style={{ position: 'relative', top: 30, alignItems: 'center' }}>
                  <Carousel
                    style={styles.Carousel}
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.videos}
                    renderItem={this._renderItem.bind(this)}
                    onSnapToItem={this.handleSnapToItem.bind(this)}
                    sliderWidth={400}
                    itemWidth={256}
                    layout={'default'}
                    firstItem={1}
                    containerCustomStyle={{ flexGrow: 0 }}
                  />
                </CarouselBackgroundView>

                <View style={styles.infos}>
                  <Text style={styles.infotext}>Bildtitel: {this.state.title}</Text>
                  {/* <Text style={styles.infotext}>Künstler: {this.state.artists}</Text> */}
                  {/* <Text style={styles.infotext}>Preis: {this.state.price}</Text>
                <Text style={styles.infotext}>Standort: {this.state.location}</Text> */}
                  <Text style={styles.infotext}>Eigentümer: {this.state.ownerName}</Text>
                  {/* <Text style={styles.infotext}>Position in Blockchain: {this.state.blockchain}</Text> */}
                </View>
              </ImageBackground>
            </ScrollView>


            <ImageBackground
              source={require('./components/background-flipped_cropped.jpg')}
              imageStyle={{ opacity: 0.3 }}
              style={{
                //height: '100%',
                width: width,
                //resizeMode: "cover",
                //overflow: "hidden",
                flex: 1,
                position: 'absolute',
                bottom: 0,
              }}>

              <TouchableOpacity
                onPress={this._test}
                style={styles.buttonRead}>
                <Text style={styles.buttonText}>Kunstwerk lesen</Text>
              </TouchableOpacity>



              {artTradeArea}


            </ImageBackground>


          </SafeAreaView>
        </Fragment>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  Carousel: {
    opacity: 0,
    alignItems: 'center',
    //width: '400px',
    //height: height - 200,

  },
  textInput: {
    marginLeft: 10,
    marginRight: 20,
    height: 50,
    marginBottom: 10,
    textAlign: 'center',
    color: 'black'
  },
  buttonWrite: {
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#9D2235'
  },
  buttonRead: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#006C5B',

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
  buttonBuy: {
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#4293f5'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: "bold"
  },
  heading: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 40,
    marginBottom: 20,
    top: 10,
    width: width / 2,
    left: width / 4,
    fontWeight: "bold",
    textAlign: 'center',
    position: 'absolute'
  },
  infos: {
    marginTop: 60,
    // marginBottom: 65,
    //height: 100,
    // width: 400,
    alignItems: 'center',
    position: 'relative',

    // justifyContent: 'center'
  },
  infotext: {
    fontWeight: "bold",
    textAlign: 'left',
    fontSize: 23,
    color: "white"
  }
});

const VideoTitleText = styled.Text`
  color: transparent;
  top: 28;
  justify-content: center;
`
const CurrentVideoImage = styled.Image`
  top: 10;
  box-shadow: 5px 10px;
  width: 300;
  height: 420;
  border-radius: 10;
`;

const ThumbnailBackgroundView = styled.View`
  justify-content: center;
  align-items: center;
  width: 256; 
`;

const CurrentVideoTO = styled.TouchableOpacity`
`
const CarouselBackgroundView = styled.View`
  height: 420;
  width: 100%;
`

export default CarouselScreen;