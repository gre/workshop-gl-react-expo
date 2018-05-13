// @flow
import React, { Component } from "react";
import { Surface } from "gl-react-expo";
import { withKnobs, ensureCameraPermissions } from "../decorators";
import { GLCamera } from "./CameraInGL";
import * as colorscales from "../images/colorscales";
import * as maps from "../images/maps";

import { ContrastSaturationBrightness } from "gl-react-contrast-saturation-brightness";
import { Temperature } from "gl-react-temperature";
import { Blur, BlurV } from "gl-react-blur";
import { Colorify } from "./ColorScale";
import { Grayscale } from "./Grayscale";
import { Persistence } from "../solutions/CameraPersistence";

/**
 * We've tried many effects already,
 * this exercice is an open playground for you to test combining many things together
 * what cool stuff can you imagine?
 * NB see how different it can be to combine components in different orders.
 * for instance, `Persistence> Temperature` is not same as `Temperature> Persistence`
 */

class Exercice extends Component<*> {
  render() {
    const { a, b, color, landscape, colorscale, map } = this.props;
    return (
      <Surface style={{ width: 200, height: 300 }}>
        <BlurV passes={4} map={map} factor={8 * a}>
          <Persistence
            persistence={1.1 * a}
            color={color}
            offsetY={0.002 * (b - 0.5)}
          >
            <ContrastSaturationBrightness contrast={2 * b}>
              <GLCamera />
            </ContrastSaturationBrightness>
          </Persistence>
        </BlurV>
      </Surface>
    );
  }
}

export default withKnobs(ensureCameraPermissions(Exercice), {
  a: {
    label: "a",
    type: "range",
    min: 0,
    max: 1
  },
  b: {
    label: "b",
    type: "range",
    min: 0,
    max: 1
  },
  color: {
    label: "color",
    type: "rgbColorSlider",
    initialValue: [0.2, 0.5, 0]
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
