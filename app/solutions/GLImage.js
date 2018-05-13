// @flow
import React, { Component } from "react";
import { Surface } from "gl-react-expo";
import GLImage from "gl-react-image";
import { withKnobs } from "../decorators";

import * as landscapes from "../images/landscapes";

class Exercice extends Component<*> {
  render() {
    const { image, zoom } = this.props;
    return (
      <Surface style={{ width: 300, height: 300 }}>
        <GLImage source={image} zoom={zoom} />
      </Surface>
    );
  }
}

export default withKnobs(Exercice, {
  image: {
    label: "Image",
    type: "images",
    images: landscapes,
    initialValue: landscapes.mongolfier
  },
  zoom: {
    label: "Zoom",
    type: "range",
    min: 0.05,
    max: 1,
    initialValue: 0.3
  }
});
