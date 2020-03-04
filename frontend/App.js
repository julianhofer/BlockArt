/**
 * Die Klasse <code>App.js</code> ist eine Klasse die verschiedene Methoden
 * und Widgets zur Erstellung des Frontends bereitstellt.
 * 
 * @author VincentWengert, TobiasMoser, MarcoPracher
 * @version 1.0
 */


/**
	 * Importieren der nötigen Bibliotheken
	 */
import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    Alert,
    Platform,
    Dimensions,
    ImageBackground,
    TouchableOpacity
} from 'react-native';

import NfcManager, { NfcEvents, Ndef } from 'react-native-nfc-manager';
import Carousel from 'react-native-snap-carousel';
import styled from "styled-components"; // 3.1.6

const {width, height} = Dimensions.get('window');


/**
	 * Bei der Instanziierung der <code>App.js</code> werden die nötigen Methoden hinzugefügt.
	 */
class App extends Component {
    constructor(props){
        super(props);
this.state = {
            title: "Bereit...",
            artists: "",
            price: "",
            location: "",
            owner: "",
            blockchain: ""
        }
        this._carousel = {};
        this.init();
    }


    /**
	 * Initialisierungen der Bilder
	 */
  init(){
    this.state = {
      videos: [
        {
          id: "WpIAc9by5iU",
          thumbnail: "https://drive.google.com/uc?export=download&id=1nBSPuiXuibRon1j6cTR6Pu_GJ8jiB0Bp",
          title: "Bild 001"
        }, {
          id: "sNPnbI1arSE",
          thumbnail: "https://drive.google.com/uc?export=download&id=1xWSHmr2eIUXE_r_eGl9nG4x9abAl5J7a",
          title: "Bild 002"
        }, {
          id: "VOgFZfRVaww",
          thumbnail: "https://drive.google.com/uc?export=download&id=1Dfe5IYmSP7EDS3VbQNXpEUl25KNGURBF",
          title: "Bild 003"
        }
      ]
    };
  }

  /**
	 * Initialisierungen der Texte der Bilder anhand der Position
	 */
  changeText(index){
    if (index==0){
      this.setState({
        title: "BlockCeption",
        artists: "Parco Macher",
      })
    } else if (index == 1){
      this.setState({
        title: "BlockCircle",
        artists: "Julian Hanser",
      })
    }else {
      this.setState({
        title: "Blocks",
        artists: "Eberhardt Frick",
      })
    }
  }

	/**
	 * In dieser Methode wird die Navigation der Bilder realisiert
	 */
  get pagination () {
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

	/**
	 * In dieser Methode werden die einzelnen Bilder gerendert
	 */
_renderItem = ( {item, index} ) => {
    console.log("rendering,", index, item)
    return (
        <ThumbnailBackgroundView>
          <CurrentVideoTO
             onPress={ () => { 
                console.log("clicked to index", index)
                this.changeText(index)
                this.setState({
                  price: "-",
                  location: "-",
                  owner: "-",
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

  	/**
	 * In dieser Methode wird das Wechseln zu den anderen Bildern behandelt
	 */
    handleSnapToItem(index){
      this.changeText(index)
      }

   	/**
	 * Das heißt, nachdem das HTML aus dem Renderer fertig geladen ist.
   * Es wird einmal im Komponentenlebenszyklus aufgerufen und signalisiert, 
   * dass die Komponente und alle ihre Unterkomponenten ordnungsgemäß gerendert wurden.
	 */
    componentDidMount() {
        this._carousel.snapToItem(1)
        this.changeText(1)
        NfcManager.start()
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
            
                let parsed = null;
                if (tag.ndefMessage && tag.ndefMessage.length > 0) {
                    /* ndefMessage ist eigentlich ein Array von NdefRecords, 
                    und wir können durch jeden NdefRecord iterieren, seine Nutzlast entschlüsseln 
                    entsprechend seiner TNF & Art */
                    const ndefRecords = tag.ndefMessage;

                     // Decodieren der Einträge
                    function decodeNdefRecord(record) {
                        if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
                            return Ndef.text.decodePayload(record.payload);
                        } else if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
                            return Ndef.uri.decodePayload(record.payload);
                        }
                        return ['unknown', '---']
                    }

                    parsed = ndefRecords.map(decodeNdefRecord);

                    //Ergebniss splitten
                    var infoText = String(parsed).split(',').join(' ') 

                    /**
	                  * Setzen der Texte der Bilder anhand der Position
	                   */
                    this.setState({
                      title: infoText.substring(infoText.search("TITLE") + 9, infoText.indexOf(";", infoText.search("TITLE") + 9)),
                      artists: infoText.substring(infoText.search("ARTIST") + 7, infoText.indexOf(";", infoText.search("ARTIST") + 7)),
                      price: infoText.substring(infoText.search("PRICE") + 6, infoText.indexOf(";", infoText.search("PRICE") + 6)),
                      location: infoText.substring(infoText.search("LOCATION") + 9, infoText.indexOf(";", infoText.search("LOCATION") + 9)),
                      owner: infoText.substring(infoText.search("OWNER") + 6, infoText.indexOf(";", infoText.search("OWNER") + 6)),
                      blockchain: infoText.substring(infoText.search("BLOCKCHAIN") + 11, infoText.indexOf(";", infoText.search("BLOCKCHAIN") + 11))
                    })        

                  /**
                   * Wechseln zum gescannten Kunstwerk
                   */
                    if (String(parsed).substring(0,1) == "1"){
                      this._carousel.snapToItem(0);
                  }else if (String(parsed).substring(0,1) == "2"){
                      this._carousel.snapToItem(1);
                  }else{
                      this._carousel.snapToItem(2);
                  }
                }
          NfcManager.setAlertMessageIOS('Kunstwerk gefunden!');
          NfcManager.unregisterTagEvent().catch(() => 0);
        });
      }

      /**
	     * Zugehörige Methode zu @see componentDidMount
	    */
      componentWillUnmount() {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        NfcManager.unregisterTagEvent().catch(() => 0);
      }

      /**
       * Abbrechen des NFC Lesevorgangs
       */
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

/**
   * Die Render-Methode gibt an was genau auf der Benutzeroberfläche der Anwendung angezeigt wird. 
   * Sie definiert das Layout, den Inhalt, Bilder usw. Alles, was man auf der UI sieht, wird von den Komponenten gerendert.
   */
render(){
        return (
          <ImageBackground
  source={require('../frontend/Components/background.jpg')}
  style={{height: height,
          width: width,
          resizeMode: "cover",
          overflow: "hidden",
          flex: 1}}>
            <SafeAreaView style={styles.container}> 
             <Text style={styles.heading}>BlockArt</Text>    
            <CarouselBackgroundView>
            <Carousel
            style={styles.Carousel}
              ref={ (c) => { this._carousel = c; } }
              data={this.state.videos}
              renderItem={this._renderItem.bind(this)}
              onSnapToItem={this.handleSnapToItem.bind(this)}
              sliderWidth={400}
              itemWidth={256}
              layout={'default'}
              firstItem={1}
            />
          </CarouselBackgroundView>

        <View style={styles.infos}>
                    <Text style={styles.infotext}>Bildtitel: {this.state.title}</Text>
                    <Text style={styles.infotext}>Künstler: {this.state.artists}</Text>
                    <Text style={styles.infotext}>Preis: {this.state.price}</Text>
                    <Text style={styles.infotext}>Standort: {this.state.location}</Text>
                    <Text style={styles.infotext}>Eigentümer: {this.state.owner}</Text>
                    <Text style={styles.infotext}>Position in Blockchain: {this.state.blockchain}</Text>
                </View>

        <TouchableOpacity
            onPress={this._test}
            style={styles.buttonRead}>
            <Text style={styles.buttonText}>Kunstwerk lesen</Text>
        </TouchableOpacity>
        
            </SafeAreaView>
            </ImageBackground>
        )
    }
}


 /**
   * Styling
	*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    Carousel:{
      opacity:0,
      alignItems: 'center',
      width: '400px'
    },
    textInput: {
        marginLeft: 10,
        marginRight: 20,
        height: 50,
        marginBottom: 10,
        textAlign:'center',
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
        backgroundColor: '#006C5B'
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
      marginBottom:20,
      fontWeight: "bold",
      textAlign: 'center',
  },
    infos: {
        marginTop: 70,
        marginLeft: 45,
        marginBottom:65,
        height: 50,
        width: 400,
        //alignItems: 'center',
        
        justifyContent: 'center'
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

export default App;