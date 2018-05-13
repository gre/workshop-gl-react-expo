import React, { Component } from "react";
import { Surface } from "gl-react-expo";
import { Node, Shaders, GLSL, LinearCopy, NearestCopy, Bus } from "gl-react";

// Some libaries you can use
import GLImage from "gl-react-image";
import { BlurV } from "gl-react-blur";
import { ContrastSaturationBrightness } from "gl-react-contrast-saturation-brightness";
import { HueRotate } from "gl-react-hue-rotate";
import { Negative } from "gl-react-negative";
import { Temperature } from "gl-react-temperature";

// workshop utils
import { withKnobs } from "../decorators";
import * as colorscales from "../images/colorscales";
import * as landscapes from "../images/landscapes";
import * as maps from "../images/maps";

// your shaders
const shaders = Shaders.create({
  playground: {
    frag: GLSL`
precision highp float;
varying vec2 uv;

uniform sampler2D children;
uniform sampler2D map;
uniform sampler2D colorscale;
uniform vec3 color;
uniform float floatNumber;

void main() {
  vec4 img = texture2D(children, uv);
  vec4 mapC = texture2D(map, uv);
  gl_FragColor = mix(
    mix(img, img * vec4(vec3(uv.x, uv.y, 0.5) + color, 1.0), mapC.r),
    texture2D(colorscale, vec2(img.r, 0.5)),
    floatNumber
  );
}
    `
  }
});

// your components
const Playground = ({
  children,
  map,
  colorscale,
  color,
  floatNumber,
  boolValue
}) => (
  <Node
    shader={shaders.playground}
    uniforms={{ children, map, colorscale, color, floatNumber }}
    uniformsOptions={{
      colorscale: { interpolation: boolValue ? "nearest" : "linear" }
    }}
  />
);

class Root extends Component<*> {
  render() {
    const {
      floatNumber,
      boolValue,
      landscape,
      colorscale,
      map,
      windowDim
    } = this.props;
    return (
      <Surface style={{ width: windowDim.width, height: 300 }}>
        <Playground {...this.props}>
          <GLImage source={landscape} />
        </Playground>
      </Surface>
    );
  }
}

export default withKnobs(Root, {
  floatNumber: {
    label: "floatNumber",
    type: "range",
    min: 0,
    max: 1,
    initialValue: 0.3
  },
  boolValue: {
    label: "boolValue",
    type: "toggle"
  },
  color: {
    label: "color",
    type: "rgbColorSlider"
  },
  landscape: {
    label: "landscape",
    type: "images",
    images: landscapes,
    initialValue: landscapes.mongolfier
  },
  colorscale: {
    label: "colorscale",
    type: "images",
    images: colorscales,
    initialValue: colorscales.accent,
    tileSize: { height: 40, width: 80 }
  },
  map: {
    label: "map",
    type: "images",
    images: maps,
    initialValue: maps.square
  }
});
