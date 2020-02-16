import React, { Component } from 'react';

import styled from "styled-components/native"; // 3.1.6
import Carousel from 'react-native-snap-carousel';

/* Dies ist eine erste Beispielversion des Bilder-Karusells, das für die Anzeige der Bilder im Hauptfenster CarouselScreen 
verwendet wird. Die grundlegende Funktionalität hiervon wird im CarouselScreen erweitert.
Diese Klasse dient lediglich der Orientierung an die Funktionen, die zum Carousel gehören. */

export default class MyCarousel extends Component {

  constructor(props){
    super();
    this.state = {
      errors: []
    }
    this.props = props;
    this._carousel = {};
    this.init();
  }

  
  init(){
    this.state = {
      videos: [
        {
          id: "WpIAc9by5iU",
          thumbnail: "https://drive.google.com/uc?export=download&id=1wxnncxvMIgWiNHk5TgG9TPDKs9bP81SI",
          title: "Bild 001"
        }, {
          id: "sNPnbI1arSE",
          thumbnail: "https://drive.google.com/uc?export=download&id=1ZHKTKiG7NBY_MVoU-dbwc9zZiOTyOtMm",
          title: "Bild 002"
        }, {
          id: "VOgFZfRVaww",
          thumbnail: "https://drive.google.com/uc?export=download&id=1QB-iNXteoK_5bv1v5RTf8PZxdzbYUcuy",
          title: "Bild 003"
        }
      ]
    };

    console.log("ThumbnailCarousel Props: ", this.props)
  }

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


   componentDidMount() {
    this._carousel.snapToItem(2);
  }


  handleSnapToItem(index){
    console.log("snapped to ", index)
  }

  _renderItem = ( {item, index} ) => {
    console.log("rendering,", index, item)
    return (
        <ThumbnailBackgroundView>
          <CurrentVideoTO
             onPress={ () => { 
                console.log("clicked to index", index)
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

  

  render = () => {
    return (
      <CarouselBackgroundView>
        <Carousel
          ref={ (c) => { this._carousel = c; } }
          data={this.state.videos}
          renderItem={this._renderItem.bind(this)}
          onSnapToItem={this.handleSnapToItem.bind(this)}
          sliderWidth={414}
          itemWidth={256}
          layout={'default'}
          firstItem={1}
        />
      </CarouselBackgroundView>
    );
  }
}


const VideoTitleText = styled.Text`
  color: white;
  top: 28;
  justify-content: center;
`
const CurrentVideoImage = styled.Image`
  top: 25;
  box-shadow: 5px 10px;
  width: 300;
  height: 300;
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
  background-color: black;
  height: 400;
  width: 100%;
`
