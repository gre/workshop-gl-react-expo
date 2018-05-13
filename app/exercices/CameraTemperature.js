// @flow
import React, { Component } from "react";
import { Surface } from "gl-react-expo";
import { withKnobs, ensureCameraPermissions } from "../decorators";

import { GLCamera } from "./CameraInGL";
import { Temperature } from "gl-react-temperature";

/**
 * Use GLCamera and Temperature together!
 *
 * Temperature comes from library gl-react-temperature:
 * https://www.npmjs.com/package/gl-react-temperature
 *
 * see also https://en.wikipedia.org/wiki/Color_temperature
 */

class Exercice extends Component<*> {
  static TODO_REMOVE_ME = 1; // REMOVE THIS LINE !!!

  render() {
    const { temp } = this.props;
    return (
      <Surface style={{ width: 200, height: 300 }}>
        <GLCamera />
      </Surface>
    );
  }
}

export default withKnobs(ensureCameraPermissions(Exercice), {
  temp: {
    label: "Temperature",
    type: "range",
    min: 1000,
    max: 20000,
    initialValue: 1500
  }
});
