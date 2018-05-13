// @flow
import React, { Component } from "react";
import { Surface } from "gl-react-expo";
import GLImage from "gl-react-image";
import { withKnobs } from "../decorators";

import * as landscapes from "../images/landscapes";

/**
 * You may have noticed that the image is stretched previous example
 * We need a way to respect the image ratio.
 * For this purpose we will use library gl-react-image
 * Play with it and connect the image and zoom props
 *
 * https://github.com/gre/gl-react-image
 */

class Exercice extends Component<*> {
  static TODO_REMOVE_ME = 1; // REMOVE THIS LINE !!!

  render() {
    const { image, zoom } = this.props;
    return (
      <Surface style={{ width: 300, height: 300 }}>
        <GLImage source={null} />
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
