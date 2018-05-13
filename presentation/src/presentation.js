// Import React
import React from "react";

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Appear,
  Heading,
  ListItem,
  List,
  Link,
  Quote,
  Slide,
  Text,
  Image
} from "spectacle";

// Import theme
import createTheme from "spectacle/lib/themes/default";

import logoPng from "./logo.png";
import glreactGif from "./glreact.gif";
import detailGif from "./detail.gif";
import cameraGif from "./camera.gif";
import ledgerNanoS from "./ledger_nano_s.png";

// Require CSS
require("normalize.css");

const blackShadow = {
  position: "relative",
  zIndex: 1000,
  textShadow:
    "0 0.05em 0 black,0 -0.05em 0 black,0.05em 0 0 black,-0.05em 0 0 black"
};

const theme = createTheme(
  {
    primary: "white",
    secondary: "#1F2022",
    tertiary: "#03A9FC",
    quartenary: "#CECECE"
  },
  {
    primary: "Montserrat",
    secondary: "Helvetica"
  }
);

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transition={["fade"]} transitionDuration={500} theme={theme}>
        <Slide bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="tertiary">
            gl-react<span style={{ opacity: 0.5 }}>-expo</span>
          </Heading>
          <Text margin="10px 0 0" textColor="secondary" size={1} fit bold>
            effects powered by WebGL
          </Text>
          <Image src={logoPng} />
          <Text style={{ paddingTop: 100 }}>@greweb – 2018</Text>
        </Slide>

        <Slide bgColor="primary">
          <Text bold>Gaëtan Renaudeau (@greweb)</Text>
          <Appear>
            <Text>Author of gl-react and gl-transitions.com</Text>
          </Appear>
          <br />
          <Appear>
            <Text>
              Frontend Lead at Ledger,<br />
              <em>Electron app + React Native app</em>
              <br />
              <small>(all open-source)</small>
            </Text>
          </Appear>
        </Slide>

        <Slide bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="tertiary">
            gl-react<span style={{ opacity: 0.5 }}>
              <Appear>
                <span>-expo</span>
              </Appear>
            </span>
          </Heading>
          <Appear>
            <Text margin="10px 0 0" textColor="secondary" size={1} fit bold>
              effects powered by WebGL
            </Text>
          </Appear>
          <Appear>
            <Image src={logoPng} />
          </Appear>
        </Slide>

        <Slide>
          <Heading size={4}>Session</Heading>
          <List>
            <ListItem>Introduction to gl-react (~ 20mn)</ListItem>
            <ListItem>Let's make GL effects in Expo! (~ 1h)</ListItem>
            <ListItem>More WebGL libs & concepts (~ 20mn)</ListItem>
            <ListItem>Questions</ListItem>
          </List>
        </Slide>

        <Slide bgColor="tertiary">
          <Heading fit caps textColor="primary">
            gl-react ?
          </Heading>
        </Slide>

        <Slide>
          <Heading fit lineHeight={2} textColor="secondary">
            Compose GL effects with React components
          </Heading>
          <Appear>
            <Image src={glreactGif} />
          </Appear>
          <Appear>
            <Image src={detailGif} />
          </Appear>
        </Slide>

        <Slide bgColor="primary">
          <Text>
            <strong>gl-react</strong> is universal...
          </Text>
          <Appear>
            <Heading size={5} padding={40} textColor="tertiary">
              ...with many backends
            </Heading>
          </Appear>
          <List>
            <Appear>
              <ListItem>
                <strong>gl-react-dom</strong> for WebGL
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>
                <strong>gl-react-headless</strong> for Node.js
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>
                <strong>gl-react-native</strong> for React Native
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>and...</ListItem>
            </Appear>
            <Appear>
              <ListItem>
                <strong>gl-react-expo</strong> for Expo
              </ListItem>
            </Appear>
          </List>
        </Slide>

        <Slide>
          <Heading size={6} textColor="tertiary" style={blackShadow}>
            expo.io/@gre/gl-react-expo-cookbook
          </Heading>
          <iframe
            style={{ position: "relative", top: -100 }}
            width="394"
            height="700"
            src="https://www.youtube.com/embed/gogzLxAoYks?autoplay=1&rel=0"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          />
        </Slide>

        <Slide>
          <Heading size={6} textColor="tertiary" style={blackShadow}>
            expo.io/@gre/gl-react-camera-effects
          </Heading>
          <Image
            style={{
              position: "relative",
              top: -100
            }}
            src={cameraGif}
          />
        </Slide>

        <Slide>
          <Link href="https://gl-react-cookbook.surge.sh/" target="_blank">
            <Heading size={6} textColor="tertiary">
              gl-react-cookbook.surge.sh
            </Heading>
          </Link>
          <br />
          <Text>Let's dig into gl-react examples</Text>
        </Slide>

        <Slide bgColor="tertiary">
          <Heading fit caps textColor="primary">
            Let's code!
          </Heading>
        </Slide>

        <Slide>
          <Link
            href="https://github.com/gre/workshop-gl-react-expo/"
            target="_blank"
          >
            <Heading fit textColor="tertiary">
              github.com/gre/workshop-gl-react-expo
            </Heading>
          </Link>
          <Text>Expo app with a series of exercices</Text>
        </Slide>

        <Slide>
          <Heading fit>github.com/gre/workshop-gl-react-expo</Heading>
          <br />
          <Text textAlign="left">
            <pre style={{ whiteSpace: "pre-line", fontSize: "0.6em" }}>
              <code>
                {`git clone git@github.com:gre/workshop-gl-react-expo.git
cd workshop-gl-react-expo/app
yarn
exp start --tunnel
`}
              </code>
            </pre>
          </Text>
          <br />
          <Text>Ideally, run it on your phone.</Text>
        </Slide>

        <Slide bgColor="tertiary">
          <Heading fit caps textColor="primary">
            Questions?
          </Heading>
          <Text textColor="primary" style={{ marginTop: 100 }}>
            @greweb
          </Text>
        </Slide>

        <Slide>
          <Text margin={40} textColor="tertiary">
            https://github.com/brentvatne/quoi
          </Text>
        </Slide>

        <Slide>
          <Heading fit textColor="secondary">
            other WebGL alternatives
          </Heading>
        </Slide>

        <Slide>
          <Heading size={5} textColor="tertiary">
            PIXI.js
          </Heading>
          <List>
            <Appear>
              <ListItem>Sprite-based rendering engine</ListItem>
            </Appear>
            <Appear>
              <ListItem>high performance, perfect for 2D games</ListItem>
            </Appear>
            <Appear>
              <ListItem>OOP / imperative</ListItem>
            </Appear>
          </List>
        </Slide>

        <Slide>
          <Heading size={5} textColor="tertiary">
            Three.js
          </Heading>
          <List>
            <Appear>
              <ListItem>3D Scene graph rendering engine</ListItem>
            </Appear>
            <Appear>
              <ListItem>high performance, perfect for 3D games</ListItem>
            </Appear>
            <Appear>
              <ListItem>OOP / imperative</ListItem>
            </Appear>
          </List>
        </Slide>

        <Slide>
          <Heading size={5} textColor="tertiary">
            REGL
          </Heading>
          <List>
            <Appear>
              <ListItem>light functional abstraction on top of GL</ListItem>
            </Appear>
            <Appear>
              <ListItem>high performance, but need to know GL</ListItem>
            </Appear>
            <Appear>
              <ListItem>functional</ListItem>
            </Appear>
          </List>
        </Slide>

        <Slide>
          <Heading fit caps textColor="secondary">
            Advanced topics
          </Heading>
        </Slide>

        <Slide>
          <Heading size={5} textColor="tertiary">
            "functional rendering" paradigm
          </Heading>
          <br />
          <Appear>
            <Heading size={3} bold>
              point => color
            </Heading>
          </Appear>
          <br />
          <Appear>
            <Text>(that's what we've been doing for an hour!)</Text>
          </Appear>
        </Slide>

        <Slide>
          <Heading size={5} textColor="tertiary">
            "distance estimation function"
          </Heading>
          <Appear>
            <Heading size={3} bold margin={80}>
              x,y,z => float
            </Heading>
          </Appear>
          <Appear>
            <div>
              <Link
                href="http://jamie-wong.com/2016/07/15/ray-marching-signed-distance-functions/"
                target="_blank"
              >
                <Text>
                  http://jamie-wong.com/2016/07/15/ray-marching-signed-distance-functions/
                </Text>
              </Link>
            </div>
          </Appear>
        </Slide>

        <Slide>
          <Link href="https://codesandbox.io/s/j4n8zv8r55" target="_blank">
            <Text>https://codesandbox.io/s/j4n8zv8r55</Text>
          </Link>
        </Slide>

        <Slide>
          <Heading size={6} textColor="tertiary">
            game made in this paradigm
          </Heading>
          <Text>https://github.com/gre/memocart</Text>
          <br />
          <iframe
            width="450"
            height="450"
            src="https://www.youtube.com/embed/WkRFp5gRfSo?autoplay=1&rel=0"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          />
        </Slide>

        <Slide>
          <Heading size={6}>Resources</Heading>
          <List>
            <ListItem>thebookofshaders.com</ListItem>
            <ListItem>shadertoy.com</ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading size={6} textColor="tertiary" style={blackShadow}>
            github.com/brentvatne/quoi
          </Heading>
          <iframe
            style={{ position: "relative", top: -100 }}
            width="394"
            height="700"
            src="https://www.youtube.com/embed/5361Iut849k?autoplay=1&rel=0"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          />
        </Slide>

        <Slide>
          <Image src={ledgerNanoS} />
          <Heading size={4} margin={30}>
            1 Ledger Nano S giveway
          </Heading>
          <Heading size={6} textColor="secondary">
            to enter:
          </Heading>
          <Text margin={30} textColor="tertiary">
            https://github.com/brentvatne/quoi
          </Text>
          <Text>
            Run the app on phone, upload fun pics of this event before tomorrow!
          </Text>
          <Text margin={10}>
            <strong>try to add better GL effects</strong> if you want!
          </Text>
          <Text>tomorrow: randomly pick winner on uploaded images</Text>
        </Slide>

        {/*
        <Slide transition={["fade"]} bgColor="tertiary">
          <Heading size={6} textColor="primary" caps>
            Typography
          </Heading>
          <Heading size={1}>
            Heading 1
          </Heading>
          <Heading size={2} textColor="secondary">
            Heading 2
          </Heading>
          <Heading size={3} textColor="secondary">
            Heading 3
          </Heading>
          <Heading size={4} textColor="secondary">
            Heading 4
          </Heading>
          <Heading size={5} textColor="secondary">
            Heading 5
          </Heading>
          <Text size={6} textColor="secondary">
            Standard text
          </Text>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            Standard List
          </Heading>
          <List>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 4</ListItem>
          </List>
        </Slide>
        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote>Example Quote</Quote>
            <Cite>Author</Cite>
          </BlockQuote>
        </Slide>
        */}
      </Deck>
    );
  }
}
