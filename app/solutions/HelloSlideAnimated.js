// @flow
import React, { Component } from "react";
import { Animated } from "react-native";
import { Node, GLSL, Shaders } from "gl-react";
import { Surface } from "gl-react-expo";

import { withKnobs } from "../decorators";
import { HelloSlide } from "./HelloSlide";

const AnimatedHelloSlide = Animated.createAnimatedComponent(HelloSlide);

class Exercice extends Component<*, *> {
  state = {
    value: new Animated.Value(0)
  };

  componentDidUpdate(prevProps) {
    if (this.props.toggle !== prevProps.toggle) {
      Animated.spring(this.state.value, {
        toValue: this.props.toggle ? 1 : 0
      }).start();
    }
  }

  render() {
    const { value } = this.state;
    return (
      <Surface style={{ width: 300, height: 300 }}>
        <AnimatedHelloSlide value={value} />
      </Surface>
    );
  }
}

export default withKnobs(Exercice, {
  toggle: {
    label: "Slide Toggle",
    type: "toggle",
    initialValue: false
  }
});
