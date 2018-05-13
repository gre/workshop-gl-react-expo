// @flow
import React, { Component } from "react";
import { Animated } from "react-native";
import { Node, GLSL, Shaders } from "gl-react";
import { Surface } from "gl-react-expo";
import GLImage from "gl-react-image";
import { withKnobs } from "../decorators";
import * as landscapes from "../images/landscapes";

const shaders = Shaders.create({
  heart: {
    frag: GLSL`
precision highp float;
varying vec2 uv;

uniform sampler2D image;
uniform vec3 color;
uniform float toggle;

void main() {
  float scale = 1.0 - 0.9 * toggle;
  vec2 offset = vec2(0.0, -0.3 - 0.8 * toggle);
  vec2 p = scale * (2.0 * uv - 1.0 + offset);
  float a = atan(p.x, p.y) / ${Math.PI};
  float r = length(p);
  float h = abs(a);
  float d = (13.0*h - 22.0*h*h + 10.0*h*h*h - 0.3)/(6.0-5.0*h);
  float f = step(r,d) * pow(max(1.0-r/d, 0.0),0.25);
  vec3 t = texture2D(image, uv).rgb;
  vec3 c = mix(color * (1.0 + 0.6 * t), t, toggle);
  gl_FragColor = vec4(mix(vec3(1.0), c, f), 1.0);
}
  `
  }
});

class Heart extends Component<{
  image: *,
  toggle: number,
  color: [number, number, number]
}> {
  render() {
    const { image, toggle, color } = this.props;
    return <Node shader={shaders.heart} uniforms={{ image, toggle, color }} />;
  }
}

const AnimatedHeart = Animated.createAnimatedComponent(Heart);

class Exercice extends Component<*, *> {
  static TODO_REMOVE_ME = 1; // REMOVE THIS LINE !!!

  state = {
    toggle: new Animated.Value(0)
  };

  componentDidUpdate(prevProps) {
    if (this.props.toggle !== prevProps.toggle) {
      Animated.spring(this.state.toggle, {
        toValue: this.props.toggle ? 1 : 0
      }).start();
    }
  }

  render() {
    const { toggle } = this.state;
    const { image, color } = this.props;
    return (
      <Surface style={{ width: 300, height: 300 }}>
        <AnimatedHeart
          toggle={toggle}
          image={<GLImage source={image} />}
          color={color}
        />
      </Surface>
    );
  }
}

export default withKnobs(Exercice, {
  toggle: {
    label: "Toggle",
    type: "toggle",
    initialValue: false
  },
  color: {
    label: "Color",
    type: "hueColorSlider",
    initialValue: [1, 0, 0]
  },
  image: {
    label: "Image",
    type: "images",
    images: landscapes,
    initialValue: landscapes.mongolfier
  }
});
