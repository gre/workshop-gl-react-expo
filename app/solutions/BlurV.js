import React, { Component } from "react";
import { Surface } from "gl-react-expo";
import GLImage from "gl-react-image";
import { BlurV } from "gl-react-blur";
import { withKnobs } from "../decorators";

import * as landscapes from "../images/landscapes";
import * as maps from "../images/maps";

class Exercice extends Component<*> {
  render() {
    const { image, map, factor } = this.props;
    return (
      <Surface style={{ width: 300, height: 300 }}>
        <BlurV passes={6} map={map} factor={factor}>
          <GLImage source={image} />
        </BlurV>
      </Surface>
    );
  }
}

export default withKnobs(Exercice, {
  factor: {
    label: "Blur",
    type: "range",
    min: 0,
    max: 20,
    step: 1,
    initialValue: 8
  },
  map: {
    label: "Variable Map",
    type: "images",
    images: maps,
    initialValue: maps.radial
  },
  image: {
    label: "Image",
    type: "images",
    images: landscapes,
    initialValue: landscapes.mongolfier
  }
});
