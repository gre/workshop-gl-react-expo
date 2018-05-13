import React, { Component } from "react";
import { Surface } from "gl-react-expo";
import GLImage from "gl-react-image";
import { ContrastSaturationBrightness } from "gl-react-contrast-saturation-brightness";
import { withKnobs } from "../decorators";

import * as landscapes from "../images/landscapes";

/**
 * We'll now use another library:
 * https://npmjs.com/package/gl-react-contrast-saturation-brightness
 *
 * use ContrastSaturationBrightness with the props the component receives.
 * Make sure to use GLImage so we can benefit its responsive feature.
 *
 * NB: with gl-react we can compose stack of effects like you compose React components.
 * in a shader, a sampler2D is not necessarily an image, it can be pixels coming from another shader!
 */

class Exercice extends Component<*> {
  static TODO_REMOVE_ME = 1; // REMOVE THIS LINE !!!

  render() {
    const { image, contrast, saturation, brightness } = this.props;
    return (
      <Surface style={{ width: 300, height: 300 }}>
        <GLImage source={image} zoom={0.8} />
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
    initialValue: 1
  },
  saturation: {
    label: "Saturation",
    type: "range",
    min: 0,
    max: 4,
    initialValue: 1
  },
  brightness: {
    label: "Brightness",
    type: "range",
    min: 0,
    max: 4,
    initialValue: 1
  },
  image: {
    label: "Image",
    type: "images",
    images: landscapes,
    initialValue: landscapes.mongolfier
  }
});
