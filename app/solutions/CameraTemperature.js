// @flow
import React, { Component } from "react";
import { Surface } from "gl-react-expo";
import { withKnobs, ensureCameraPermissions } from "../decorators";

import { GLCamera } from "./CameraInGL";
import { Temperature } from "gl-react-temperature";

class Exercice extends Component<*> {
  render() {
    const { temp } = this.props;
    return (
      <Surface style={{ width: 200, height: 300 }}>
        <Temperature temp={temp}>
          <GLCamera />
        </Temperature>
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
