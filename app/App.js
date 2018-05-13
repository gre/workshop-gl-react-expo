// @flow
import React, { Component } from "react";
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  PixelRatio,
  ScrollView,
  SectionList,
  Dimensions,
  AsyncStorage
} from "react-native";
import { createStackNavigator, withNavigationFocus } from "react-navigation";

import EHelloGL from "./exercices/HelloGL";
import SHelloGL from "./solutions/HelloGL";
import EHelloBlue from "./exercices/HelloBlue";
import SHelloBlue from "./solutions/HelloBlue";
import EHelloSlide from "./exercices/HelloSlide";
import SHelloSlide from "./solutions/HelloSlide";
import EHelloSlideAnimated from "./exercices/HelloSlideAnimated";
import SHelloSlideAnimated from "./solutions/HelloSlideAnimated";
import EFirstTexture from "./exercices/FirstTexture";
import SFirstTexture from "./solutions/FirstTexture";
import EGLImage from "./exercices/GLImage";
import SGLImage from "./solutions/GLImage";
import EGrayscale from "./exercices/Grayscale";
import SGrayscale from "./solutions/Grayscale";
import EColorScale from "./exercices/ColorScale";
import SColorScale from "./solutions/ColorScale";
import EContrastSatBri from "./exercices/ContrastSatBri";
import SContrastSatBri from "./solutions/ContrastSatBri";
import EBlurV from "./exercices/BlurV";
import SBlurV from "./solutions/BlurV";
import EImageEffects from "./exercices/ImageEffects";
import SImageEffects from "./solutions/ImageEffects";
import ECameraInGL from "./exercices/CameraInGL";
import SCameraInGL from "./solutions/CameraInGL";
import ECameraTemperature from "./exercices/CameraTemperature";
import SCameraTemperature from "./solutions/CameraTemperature";
import ECameraColorScale from "./exercices/CameraColorScale";
import SCameraColorScale from "./solutions/CameraColorScale";
import ECameraPersistence from "./exercices/CameraPersistence";
import SCameraPersistence from "./solutions/CameraPersistence";
import ECameraPlayground from "./exercices/CameraPlayground";
import EPaintBrush from "./exercices/PaintBrush";
import ETransitions from "./exercices/Transitions";
import STransitions from "./solutions/Transitions";
import EHeart from "./exercices/Heart";
import SHeart from "./solutions/Heart";
import EGameOfLife from "./exercices/GameOfLife";
import SGameOfLife from "./exercices/GameOfLife";
import PlaygroundGLReact from "./exercices/PlaygroundGLReact";
import PlaygroundGLView from "./exercices/PlaygroundGLView";
import PlaygroundREGL from "./exercices/PlaygroundREGL";
import PlaygroundPIXI from "./exercices/PlaygroundPIXI";
import PlaygroundThree from "./exercices/PlaygroundThree";

const viewOnlyMode = !__DEV__;

const windowDim = Dimensions.get("window");

function isStarted(M) {
  // $FlowFixMe
  return !M.TODO_REMOVE_ME;
}

const exercices = [
  {
    name: "1. Hello GL",
    description: "basics of GLSL",
    data: [
      {
        id: "HelloGL",
        name: "HelloGL",
        Exercice: EHelloGL,
        Solution: SHelloGL
      },
      {
        id: "HelloBlue",
        name: "Blue parameter",
        Exercice: EHelloBlue,
        Solution: SHelloBlue
      },
      {
        id: "HelloSlide",
        name: "Slide a value",
        Exercice: EHelloSlide,
        Solution: SHelloSlide
      },
      {
        id: "HelloSlideAnimated",
        name: "Animated *",
        Exercice: EHelloSlideAnimated,
        Solution: SHelloSlideAnimated
      }
    ]
  },
  {
    name: "2. Image Effects",
    description:
      "textures, <GLImage> & effects (grayscale, contrast, blur,...)",
    data: [
      {
        id: "FirstTexture",
        name: "First texture",
        Exercice: EFirstTexture,
        Solution: SFirstTexture
      },
      {
        id: "GLImage",
        name: "GLImage",
        Exercice: EGLImage,
        Solution: SGLImage
      },
      {
        id: "ContrastSatBri",
        name: "Contrast, Saturation, Brightness",
        Exercice: EContrastSatBri,
        Solution: SContrastSatBri
      },
      {
        id: "Grayscale",
        name: "Gray scale effect",
        Exercice: EGrayscale,
        Solution: SGrayscale
      },
      {
        id: "ColorScale",
        name: "“Color scale” effect",
        Exercice: EColorScale,
        Solution: SColorScale
      },
      {
        id: "BlurV",
        name: "Variable Blur effect",
        Exercice: EBlurV,
        Solution: SBlurV
      },
      {
        // import from the other examples, make sure it was exported?
        id: "ImageEffects",
        name: "Compose all effects!",
        Exercice: EImageEffects,
        Solution: SImageEffects
      }
    ]
  },
  {
    name: "3. Camera",
    description: "Use Expo's Camera & pipe it to a GL View",
    data: [
      {
        id: "CameraInGL",
        name: "Render camera in GLView",
        Exercice: ECameraInGL,
        Solution: SCameraInGL
      },
      {
        id: "CameraTemperature",
        name: "Camera temperature",
        Exercice: ECameraTemperature,
        Solution: SCameraTemperature
      },
      {
        id: "CameraColorScale",
        name: "Camera color scale",
        Exercice: ECameraColorScale,
        Solution: SCameraColorScale
      },
      {
        id: "CameraPersistence",
        name: "Camera persistence *",
        Exercice: ECameraPersistence,
        Solution: SCameraPersistence
      },
      {
        id: "CameraPlayground",
        name: "Camera playground",
        Exercice: ECameraPlayground
      }
    ]
  },
  {
    name: "Advanced",
    description: "More advanced topics if you have time. (take any order)",
    data: [
      {
        id: "Transitions",
        name: "GL Transitions",
        Exercice: ETransitions,
        Solution: STransitions
      },
      {
        id: "Heart",
        name: "Heart ❤",
        Exercice: EHeart,
        Solution: SHeart
      },
      {
        id: "GameOfLife",
        name: "Game of Life",
        Exercice: EGameOfLife
      },
      {
        id: "PaintBrush",
        name: "Paint with brushes!",
        Exercice: EPaintBrush,
        noScroll: true,
        noPadding: true
      }
    ]
  },
  {
    name: "Playground",
    description: "Free style playground. do what the fuck you want!",
    data: [
      {
        id: "PlaygrouncGLReact",
        name: "gl-react playground",
        Exercice: PlaygroundGLReact
      },
      {
        id: "PlaygrouncGLView",
        name: "GLView playground",
        Exercice: PlaygroundGLView
      },
      {
        id: "PlaygrouncREGL",
        name: "REGL playground",
        Exercice: PlaygroundREGL
      },
      {
        id: "PlaygroundPIXI",
        name: "PIXI.js playground",
        Exercice: PlaygroundPIXI
      },
      {
        id: "PlaygroundThree",
        name: "Three.js playground",
        Exercice: PlaygroundThree
      }
    ]
  }
];

class HomeScreen extends Component<*> {
  static navigationOptions = {
    title: "workshop-gl-react-expo"
  };
  async componentDidMount() {
    const lastRoute = await AsyncStorage.getItem("lastRoute");
    if (!viewOnlyMode && lastRoute && lastRoute !== "Home") {
      this.props.navigation.push(lastRoute);
    }
  }
  componentDidUpdate(oldProps) {
    if (this.props.isFocused && !oldProps.isFocused) {
      AsyncStorage.setItem("lastRoute", "Home");
    }
  }
  render() {
    const { navigation } = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F9F9F9"
        }}
      >
        <SectionList
          sections={exercices}
          keyExtractor={item => item.id}
          ListHeaderComponent={() => (
            <View
              style={{
                paddingVertical: 20
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: 8
                }}
              >
                Welcome!
              </Text>
              {viewOnlyMode ? (
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: "center"
                  }}
                >
                  This is a read-only view of the workshop.{"\n"}
                  To enter the workshop exercices, fork{"\n"}
                  https://github.com/gre/workshop-gl-react-expo{"\n"}
                  and run the Expo app yourself.
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: "center"
                  }}
                >
                  Exercices are designed to be done in order.{"\n"}
                  You can look at solutions/ if you are really stuck.{"\n"}
                  The exercice with a * can be skipped.{"\n"}
                  For better performance, please use a phone to work on the
                  exercices. (iOS simulator is slow for GLView).
                </Text>
              )}
            </View>
          )}
          ListFooterComponent={() => (
            <Text
              style={{
                paddingVertical: 100,
                fontSize: 12,
                textAlign: "center",
                opacity: 0.5
              }}
            >
              @greweb – 2018
            </Text>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                AsyncStorage.setItem("lastRoute", item.id);
                navigation.navigate(item.id);
              }}
              style={{
                padding: 20,
                marginTop: 2,
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 1 / PixelRatio.get(),
                borderBottomColor: "#08F"
              }}
            >
              <View
                style={{
                  backgroundColor:
                    !viewOnlyMode && !isStarted(item.Exercice)
                      ? "#08F"
                      : "transparent",
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginRight: 10
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: "#08F"
                }}
              >
                {item.name}
              </Text>
              <View style={{ flex: 1 }} />
              <Text
                style={{
                  fontSize: 16,
                  color: "#08F"
                }}
              >
                >
              </Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section }) => (
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: "#08F"
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  marginBottom: 4,
                  color: "#fff"
                }}
              >
                {section.name}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: "#fff"
                }}
              >
                {section.description}
              </Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const routes: { [_: *]: * } = {
  Home: {
    screen: withNavigationFocus(HomeScreen)
  }
};

for (const section of exercices) {
  for (const {
    id,
    name,
    Exercice,
    Solution,
    noScroll,
    noPadding
  } of section.data) {
    const solId = id + "_sol";
    const wrap = (Comp, showInstruction) => (
      <ScrollView
        style={{ flex: 1 }}
        scrollEnabled={!noScroll}
        contentContainerStyle={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: noPadding ? 0 : 10,
          paddingBottom: noPadding ? 0 : 60
        }}
      >
        {showInstruction ? (
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 16, color: "red" }}>
              To start the exercice, please:{"\n"}
              - open exercices/{id}.js{"\n"}
              - Remove the TODO line{"\n"}
              - Reload this current app...
            </Text>
            <Text style={{ fontWeight: "bold", marginTop: 20 }}>
              This is the expected result of the exercice:
            </Text>
          </View>
        ) : null}
        <Comp windowDim={windowDim} />
      </ScrollView>
    );
    const ExerciceScreen = () =>
      !isStarted(Exercice) && Solution
        ? wrap(Solution, !viewOnlyMode)
        : wrap(Exercice);
    routes[id] = {
      screen: ExerciceScreen,
      navigationOptions: ({ navigation }) => ({
        title: name,
        headerRight:
          Solution && isStarted(Exercice) ? (
            <Button title="Goal" onPress={() => navigation.navigate(solId)} />
          ) : null
      })
    };
    if (Solution) {
      routes[solId] = {
        screen: () => wrap(Solution),
        navigationOptions: ({ navigation }) => ({
          title: name + "'s Solution"
        })
      };
    }
  }
}

const Main = createStackNavigator(routes);

export default class App extends Component<{}> {
  render() {
    return <Main />;
  }
}
