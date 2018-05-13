import React, { Component } from "react";
import { Surface } from "gl-react-expo";
import GLImage from "gl-react-image";
import { Blur, BlurV, Blur1D, BlurV1D } from "gl-react-blur";
import { withKnobs } from "../decorators";

import * as landscapes from "../images/landscapes";
import * as maps from "../images/maps";

/**
 * We're now going to play with Blur effects.
 * Blur is an interesting and not so trivial (for perfs) topic.
 * We will use gl-react-blur to help us
 *
 * https://github.com/gre/gl-react-blur (<- doc)
 **/

// TODO (1): to start with, try to blur the image with the 2 components below

const Blur2pass = ({ children, factor }) => (
  <Blur1D direction={[factor, 0]}>
    <Blur1D direction={[0, factor]}>{children}</Blur1D>
  </Blur1D>
);

const Blur4pass = ({ children, factor }) => (
  <Blur1D direction={[factor, 0]}>
    <Blur1D direction={[0, factor]}>
      <Blur1D direction={[factor, factor]}>
        <Blur1D direction={[-factor, factor]}>{children}</Blur1D>
      </Blur1D>
    </Blur1D>
  </Blur1D>
);

// This is how blur works under the hood (at least it's one way to implement it. using multiple passes of image dispersion on different directions)

// TODO (2): now, try to directly use <Blur>. It's just a generation of that!

// TODO (3): finally, use <BlurV> to connect the map.
// this is a variable blur implementation!
// don't hesitate to study how the sourcecode works

class Exercice extends Component<*> {
  static TODO_REMOVE_ME = 1; // REMOVE THIS LINE !!!

  render() {
    const { image, map, factor } = this.props;
    return (
      <Surface style={{ width: 300, height: 300 }}>
        <GLImage source={image} />
      </Surface>
    );
  }
}

/*
* ADVANCED notes: one way to help performance is to resize the buffers for the blur passes,
* that's why Blur can accept a width and height props. you can play with different numbers.
* for BlurV usecase we don't want to resize width/height
*/

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
