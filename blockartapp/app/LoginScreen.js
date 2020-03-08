/*
Dieser Screen wird beim Starten der App geöffnet und beinhaltet die Login-Funktion.
Für den Login wird der OAuth-2.0 Dienst Okta verwendet (siehe https://www.okta.com/), da dieser kostenlos einfachste Authentifizierungs-Dienste
für viele Programmiersprachen zur Verfügung stellt und zudem per API-Calls verwendet werden kann.
Für Okta kann man online eine Applikation erstellen, die dann eine Authentifizierungs-Plattform darstellt. Diese hat ein entsprechendes
Dashboard, auf dem man einfach Nutzer der Applikation hinzufügen kann, löschen kann und diese verwalten kann. Nutzer können sich bei ensprechender
Konfiguration der Applikation auch selbst registrieren und ihr Benutzerkonto verwalten.

Die Okta-Konfiguration befindet sich im File 'samples.config.js'
 */

import React, { Fragment } from 'react';
import {
  SafeAreaView,
  Button,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Image,
  Linking,
  ImageBackground,
  Dimensions,
  Alert,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'BlockArt',
  };

  constructor() {
    super();
    this.state = {
      /* Übergangslösung zum Testen der Funktionen in den untergeordneten Screens, damit nicht jedes mal eine E-Mail Adresse und
      Passwort eingegeben werden muss. Gibt der Benutzer sowohl im TextInput "EMail" als auch "Passwort" nichts ein,
      werden die nachfolgenden Daten zum Login verwendet */
      userName: 'jon@test.de',
      password: 'Blockartuser3',
      //State, der für die Anzeige des Loading-Spinners verwendet wird
      progress: false,
      screenWidth: Math.round(Dimensions.get('window').width),
      screenHeight: Math.round(Dimensions.get('window').height),
     /*  Owner und User-Daten, die nach dem Login per API-Call aus der Datenbank geholt werden und anschließende dem Carousel-Screen übergeben werden, 
      damit dieser von Anfang an die aktuellen Owner-Informationen über alle Bilder hat. */
      owners: [],
      users: [],
    };

    //Okta-Authentifizierung
    var OktaAuth = require('@okta/okta-auth-js');
    var config = {
      url: 'https://dev-665917.okta.com',
    };

    this.authClient = new OktaAuth(config);
  }


  //Diese Funktion wird beim eigentlichen Login verwendet
  async login() {
    let self = this;
    this.setState({ progress: true });
    let owners;
    let users;

    /* Zunächst erfolgt ein Call zu unserer API, der alle Owner-Daten, sprich die Bilder mit ihren zugeordneten Eigentümern,
    per JSON zurückgibt */
    axios.get('http://blockarthdm.herokuapp.com/api/ownership/').then(response => {
      // console.log(response.data.response);
      owners = response.data.response;

      /* Innerhalb des ersten API-Calls erfolgt im Erfolgsfall ein zweiter API-Call, der alle User-Informationen aus der Datenbank
      per JSON zurückgibt */
      axios.get('http://blockarthdm.herokuapp.com/api/users/').then(response => {
        // console.log(response.data.response);
        users = response.data.response;


      })
        //Scheitert der zweite API-Call wird ein Window-Alert ausgegeben
        .catch(err => {
          console.log(err);
          Alert.alert("Es konnte keine Verbindung zum Backend hergestellt werden");
          self.setState({ progress: false });
        });

    })
      //Scheitert der erste API-Call wird ein Window-Alert ausgegeben
      .catch(err => {
        console.log(err);
        Alert.alert("Es konnte keine Verbindung zum Backend hergestellt werden");
        self.setState({ progress: false });
      });


    //Ab hier erfolgt die eigentliche Authentifizierung. Hierbei wird die signIn Funktion aus dem oben importierten OktaAuth-File aufgerufen
    this.authClient
      .signIn({
        username: this.state.userName,
        password: this.state.password,
      })
      .then(function (transaction) {
        self.setState({ progress: false });


        if (transaction.status === 'SUCCESS') {

          // console.log(owners);
          // console.log(users);
          const { navigate } = self.props.navigation;
          /* Navigation mit dem StackNavigator zum Hauptfenster CarouselScreen
          Diesem werden die Owner- und User-Daten aus den API-Calls mitgegeben */
          navigate('Carousel', { transaction: transaction, users: users, owners: owners, auth: self.authClient });
        } else {
          throw 'We cannot handle the ' + transaction.status + ' status';
        }
      })
      //Im Fehlerfall wird ein Window-Alert ausgegeben
      .fail(function (err) {
        Alert.alert("Der Login war nicht erfolgreich!");
        console.error(err);
        self.setState({ progress: false });
      });

  }

  /* Will der Benutzer sich für die Applikation registrieren, wird er in einen In-App-Browser weitergeleitet. 
  Dort kann er sich für die Applikation mit Okta registrieren. Okta stellt allerdings auch eine gut-dokumentierte API zur Verfügung,
  mithilfe derer die Registrierung auch direkt aus der App erfolgen kann (siehe https://developer.okta.com/docs/reference/).

  Für die Registrierung muss in der Okta-Applikation die self-service Registration aktiviert sein
   */
  async openLink() {
    try {
      const url = 'https://dev-665917.okta.com/signin/register'
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'overFullScreen',
          modalTransitionStyle: 'partialCurl',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: false,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: true,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right'
          },
          headers: {
            'blockartheader': 'Register for BlockArt Application'
          }
        })
        // Alert.alert(JSON.stringify(result))
      }
      else Linking.openURL(url)
    } catch (error) {
      Alert.alert(error.message)
    }
  }


  //Rendern der Screen-Komponenten
  render() {

    return (


      <Fragment>

        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>

          <Spinner
            visible={false}
            visible={this.state.progress}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
          
          <ImageBackground
            source={require('./components/background.jpg')}
            imageStyle={{ opacity: 0.5 }}
            style={{
              height: this.state.screenHeight,
              width: this.state.screenWidth,
              resizeMode: "cover",
              overflow: "hidden",
              flex: 1,
            }}>

            <Image
              style={{
                width: this.state.screenWidth - 40,
                height: (this.state.screenWidth / 3.5), margin: 20,
              }}
              source={require('./components/Logo_schwarz.png')}
            />

            {/* <Text style={styles.title}>Login</Text> */}
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <TextInput
                  style={styles.textInput}
                  placeholder="E-Mail"
                  onChangeText={text => (this.state.userName = text)}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={text => (this.state.password = text)}
                />
                <View style={{ marginTop: 40, height: 40 }}>
                  <Button
                    testID="loginButton"
                    color="#004274"
                    onPress={async () => {
                      this.login();
                    }}
                    title="Login"

                  />
                </View>
                <Text style={styles.registerText}>Don't have an account? </Text>

                <Button title="Register" color="#004274" onPress={() => { this.openLink() }} />

              </View>

            </View>

          </ImageBackground>

        </SafeAreaView>

      </Fragment>


    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  textInput: {
    marginTop: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#FFFFFF'
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    borderRadius: 40,
    width: 200,
    height: 40,
    marginTop: 40,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
    paddingTop: 20,
    textAlign: 'center',
  },
  registerText: {
    fontSize: 15,
    fontWeight: "bold",
    paddingTop: 10,
    textAlign: "center",
    paddingBottom: 5,
  },

});
