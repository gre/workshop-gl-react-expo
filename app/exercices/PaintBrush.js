// @flow
import React, { Component } from "react";
import { Node, GLSL, Shaders, Uniform, LinearCopy } from "gl-react";
import { Surface } from "gl-react-expo";
import { withKnobs, responseToTouchPosition } from "../decorators";
import * as brushes from "../images/brushes";

/**
 * This is a basic implementation of a paint that supports
 * texture brushes and drawing with color, size, angle.
 *
 * You can take a look at responseToTouchPosition function
 * it implements a PanResponder to provide 3 props: touching, touchPosition, touchAngle
 *
 * we also inject some props coming from the knobs.
 *
 *
 * As this exercice is a bit complex for the workshop,
 * the shaders are already implemented.
 *
 * You could understand how it works & maybe add more feature?
 *
 * Then there are advanced topics you could play around:
 * - make the size inversly proportional to the speed of moving the finger.
 * - a way to define a spacing between each draw so each draw don't collides (per Paint)
 *   - one way to render this is to implement shouldComponentUpdate and return true only if distance is far from previous draw!
 */

const shaders = Shaders.create({
  colorize: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform vec4 color;
void main() {
  gl_FragColor = color;
}
  `
  },
  paint: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D backbuffer, brush;
uniform float painting, size, angle;
uniform vec2 pos;
uniform vec3 color;

void main() {
  // previous pixel color
  vec4 c = texture2D(backbuffer, uv);

  // reverse the position to lookup in the brush texture
  vec2 brushP = (uv - pos) / size;
  brushP *= mat2(
    cos(angle), sin(angle),
    -sin(angle), cos(angle)
  );
  brushP = (brushP + 1.0) / 2.0;

  // how much we want to draw of color
  float draw =
    painting *
    // this part ensure to not draw out of bound
    step(0.0, brushP.x) *
    step(0.0, brushP.y) *
    step(brushP.x, 1.0) *
    step(brushP.y, 1.0) *
    // look up the texture (intensity of brush at current pixel)
    (1.0 - texture2D(brush, brushP).r);

  // blend the brush color with the previous color based on draw
  c.rgb = mix(c.rgb, color, draw);

  gl_FragColor = c;
}
  `
  }
});

const Colorize = ({ color }) => (
  <Node shader={shaders.colorize} uniforms={{ color }} />
);

export class Paint extends Component<*, *> {
  state = { initiated: false };
  onDraw = () => {
    if (!this.state.initiated) {
      this.setState({ initiated: true });
    }
  };
  shouldComponentUpdate(nextProps: *) {
    return nextProps.painting;
  }
  render() {
    const { color, size, pos, painting, angle, brush } = this.props;
    const backbuffer = this.state.initiated ? (
      Uniform.Backbuffer
    ) : (
      <Colorize color={[1, 1, 1, 1]} />
    );
    return (
      <Node
        shader={shaders.paint}
        onDraw={this.onDraw}
        backbuffering
        uniforms={{
          backbuffer,
          color,
          size,
          pos,
          brush,
          angle,
          painting
        }}
      />
    );
  }
}

class Exercice extends Component<*> {
  render() {
    const {
      color,
      size,
      windowDim,
      touching,
      touchPosition,
      brush,
      touchAngle
    } = this.props;

    // some brush will randomly rotate, other will follow touch move
    const angle = shouldRandomizeAngle(brush)
      ? 2 * Math.PI * Math.random()
      : touchAngle;

    return (
      <Surface
        style={{
          width: windowDim.width,
          height: windowDim.width
        }}
      >
        <LinearCopy>
          <Paint
            color={color}
            size={size}
            pos={touchPosition}
            angle={angle}
            painting={touching}
            brush={brush}
          />
        </LinearCopy>
      </Surface>
    );
  }
}

const whitelistRandomizeAngle = [
  brushes.acrylic01,
  brushes.acrylic02,
  brushes.acrylic03,
  brushes.acrylic04,
  brushes.acrylic05,
  brushes.cell01,
  brushes.chalk03,
  brushes.oils01,
  brushes.texture01
];
function shouldRandomizeAngle(brush) {
  return whitelistRandomizeAngle.includes(brush);
}

export default withKnobs(
  responseToTouchPosition(Exercice),
  {
    brush: {
      label: "Brush",
      type: "images",
      images: brushes
    },
    color: {
      label: "Color",
      type: "rgbColorSlider",
      initialValue: [0.1, 0.1, 0.3]
    },
    size: {
      label: "Size",
      type: "range",
      min: 0,
      max: 0.2,
      initialValue: 0.1
    }
  },
  { noPadding: true }
);
