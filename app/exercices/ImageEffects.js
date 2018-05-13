import React, { Component } from "react";
import { Surface } from "gl-react-expo";
import GLImage from "gl-react-image";
import { BlurV } from "gl-react-blur";
import { ContrastSaturationBrightness } from "gl-react-contrast-saturation-brightness";
import { Colorify } from "./ColorScale";
import { withKnobs } from "../decorators";

import * as colorscales from "../images/colorscales";
import * as landscapes from "../images/landscapes";
import * as maps from "../images/maps";

/**
 * Now that we have explored a bunch of interesting effects,
 * we'll try to combine them all together to produce something interesting!
 * There is a suggested solution but this exercice is opened to experimentations!
 * HAVE FUN!
 */

class Exercice extends Component<*> {
  static TODO_REMOVE_ME = 1; // REMOVE THIS LINE !!!

  render() {
    const {
      // bunch of props you can use from the knobs controls
      image,
      colorScale,
      contrast,
      blur,
      blurMap,
      noInterpolation
    } = this.props;
    return (
      <Surface style={{ width: 300, height: 300 }}>
        <GLImage source={image} />
      </Surface>
    );
  }
}

export default withKnobs(Exercice, {
  contrast: {
    label: "Contrast",
    type: "range",
    min: 0,
    max: 4,
    step: 0.1,
    initialValue: 1
  },
  blur: {
    label: "Blur",
    type: "range",
    min: 0,
    max: 20,
    step: 1,
    initialValue: 5
  },
  noInterpolation: {
    label: "Disable Linear interpolation",
    type: "toggle"
  },
  image: {
    label: "Image",
    type: "images",
    images: landscapes,
    initialValue: landscapes.clouds
  },
  colorScale: {
    label: "Color scale",
    type: "images",
    images: colorscales,
    initialValue: colorscales.spectral,
    tileSize: { height: 30, width: 90 }
  },
  blurMap: {
    label: "Blur Map",
    type: "images",
    images: maps,
    initialValue: maps.radial
  }
});
