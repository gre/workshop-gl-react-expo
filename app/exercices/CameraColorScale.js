// @flow
import React, { Component } from "react";
import { Surface } from "gl-react-expo";
import { withKnobs, ensureCameraPermissions } from "../decorators";
import * as colorscales from "../images/colorscales";

import { GLCamera } from "./CameraInGL";
import { Colorify } from "./ColorScale";

/**
 * we've implemented nice effects in Image Effects,
 * we'll now use ColorScale over the camera!
 *
 * TODO use Colorify component. try without linear interpolation
 */

class Exercice extends Component<*> {
  static TODO_REMOVE_ME = 1; // REMOVE THIS LINE !!!

  render() {
    const { colorScale } = this.props;
    return (
      <Surface style={{ width: 200, height: 300 }}>
        <GLCamera position="front" />
      </Surface>
    );
  }
}

export default withKnobs(ensureCameraPermissions(Exercice), {
  colorScale: {
    label: "Color scale",
    type: "images",
    images: colorscales,
    initialValue: colorscales.spectral,
    tileSize: { height: 40, width: 250 },
    vertical: true
  }
});
