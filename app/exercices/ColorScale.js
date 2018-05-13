import React, { Component } from "react";
import { GLSL, Node, Shaders } from "gl-react";
import { Surface } from "gl-react-expo";
import GLImage from "gl-react-image";
import { withKnobs } from "../decorators";
import * as colorscales from "../images/colorscales";
import * as landscapes from "../images/landscapes";

/**
 * We're nice, we have implemented for you that component "Colorify"
 * feel free to read its implementation.
 * it takes 2 props: the image to render (children) and another image that contains the color scale to use.
 * image will be grayscale and the gray value will be used as a lookup in the scale image.
 * in short, a gradient applied to the grayscale of the image.
 * a third prop allow to disable the gradient interpolation which produce interesting results.
 */

const shaders = Shaders.create({
  colorify: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D children, colorScale;
float greyscale (vec3 c) { return 0.2125 * c.r + 0.7154 * c.g + 0.0721 * c.b; }
void main() {
  vec4 original = texture2D(children, uv);
  vec4 newcolor = texture2D(colorScale, vec2(greyscale(original.rgb), 0.5));
  gl_FragColor = vec4(newcolor.rgb, original.a * newcolor.a);
}
`
  }
});

export const Colorify = ({ children, colorScale, noInterpolation }) => (
  <Node
    shader={shaders.colorify}
    uniforms={{ children, colorScale }}
    uniformsOptions={{
      colorScale: {
        interpolation: noInterpolation ? "nearest" : "linear"
      }
    }}
  />
);

class Exercice extends Component<*> {
  static TODO_REMOVE_ME = 1; // REMOVE THIS LINE !!!

  render() {
    const { colorScale, image, noInterpolation } = this.props;

    /**
     * TODO
     * what you need to do now is to combine <Colorify> with GLImage
     */
    return (
      <Surface style={{ width: 300, height: 300 }}>
        <GLImage source={image} />
      </Surface>
    );
  }
}

export default withKnobs(Exercice, {
  image: {
    label: "Image",
    type: "images",
    images: landscapes,
    initialValue: landscapes.mongolfier
  },
  colorScale: {
    label: "Color scale",
    type: "images",
    images: colorscales,
    initialValue: colorscales.spectral,
    tileSize: { height: 40, width: 250 },
    vertical: true
  },
  noInterpolation: {
    label: "Disable Linear interpolation",
    type: "toggle"
  }
});
