import React, { Component } from "react";
import { Surface } from "gl-react-expo";
import GLImage from "gl-react-image";
import { ContrastSaturationBrightness } from "gl-react-contrast-saturation-brightness";
import { withKnobs } from "../decorators";

import * as landscapes from "../images/landscapes";

class Exercice extends Component<*> {
  render() {
    const { image, contrast, saturation, brightness } = this.props;
    return (
      <Surface style={{ width: 300, height: 300 }}>
        <ContrastSaturationBrightness
          contrast={contrast}
          saturation={saturation}
          brightness={brightness}
        >
          <GLImage source={image} zoom={0.8} />
        </ContrastSaturationBrightness>
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
