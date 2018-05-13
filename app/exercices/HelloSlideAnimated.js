// @flow
import React, { Component } from "react";
import { Animated } from "react-native";
import { Node, GLSL, Shaders } from "gl-react";
import { Surface } from "gl-react-expo";
import { withKnobs } from "../decorators";

/* TODO
 * Let's reuse the HelloSlide component we've just implemented
 * to make it animated! (instead of controlling it with a slider, we just have a toggle)
 *
 * HELP: use Animated.createAnimatedComponent
 * see also https://facebook.github.io/react-native/docs/animations.html
 */
import { HelloSlide } from "./HelloSlide";

// const AnimatedHelloSlide = ??? HelloSlide

class Exercice extends Component<*, *> {
  static TODO_REMOVE_ME = 1; // REMOVE THIS LINE !!!

  state = {
    value: new Animated.Value(0)
  };

  componentDidUpdate(prevProps) {
    if (this.props.toggle !== prevProps.toggle) {
      // Toggle has changed! we need to animate this.state.value
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
