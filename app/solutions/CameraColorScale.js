// @flow
import React, { Component } from "react";
import { Surface } from "gl-react-expo";
import { withKnobs, ensureCameraPermissions } from "../decorators";
import * as colorscales from "../images/colorscales";

import { GLCamera } from "./CameraInGL";
import { Colorify } from "./ColorScale";

class Exercice extends Component<*> {
  render() {
    const { colorScale } = this.props;
    return (
      <Surface style={{ width: 200, height: 300 }}>
        <Colorify colorScale={colorScale} noInterpolation>
          <GLCamera position="front" />
        </Colorify>
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
