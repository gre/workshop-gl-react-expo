// https://github.com/expo/gl-test/blob/master/Scenes/REGLParticlesScene.js
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GLView } from "expo";
import REGL from "regl";

import { withKnobs } from "../decorators";

import mat4 from "gl-mat4";
import hsv2rgb from "hsv2rgb";

const NUM_POINTS = 1e3;
const VERT_SIZE = 4 * (4 + 4 + 3);

class Root extends React.Component {
  render() {
    return (
      <GLView
        style={{ width: 300, height: 300 }}
        onContextCreate={this._onContextCreate}
      />
    );
  }

  componentDidMount() {
    cancelAnimationFrame(this.raf);
  }

  _onContextCreate = gl => {
    const regl = REGL({ gl });

    const pointBuffer = regl.buffer(
      Array(NUM_POINTS)
        .fill()
        .map(() => {
          const color = hsv2rgb(Math.random() * 360, 0.6, 1);
          return [
            // freq
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            // phase
            2.0 * Math.PI * Math.random(),
            2.0 * Math.PI * Math.random(),
            2.0 * Math.PI * Math.random(),
            2.0 * Math.PI * Math.random(),
            // color
            color[0] / 255,
            color[1] / 255,
            color[2] / 255
          ];
        })
    );

    const drawParticles = regl({
      vert: `
  precision highp float;
  attribute vec4 freq, phase;
  attribute vec3 color;
  uniform float time;
  uniform mat4 view, projection;
  varying vec3 fragColor;
  void main() {
    vec3 position = 8.0 * cos(freq.xyz * time + phase.xyz);
    gl_PointSize = 10.0 * (1.0 + cos(freq.w * time + phase.w));
    gl_Position = projection * view * vec4(position, 1);
    fragColor = color;
  }`,

      frag: `
  precision lowp float;
  varying vec3 fragColor;
  void main() {
    if (length(gl_PointCoord.xy - 0.5) > 0.5) {
      discard;
    }
    gl_FragColor = vec4(fragColor, 1);
  }`,

      attributes: {
        freq: {
          buffer: pointBuffer,
          stride: VERT_SIZE,
          offset: 0
        },
        phase: {
          buffer: pointBuffer,
          stride: VERT_SIZE,
          offset: 16
        },
        color: {
          buffer: pointBuffer,
          stride: VERT_SIZE,
          offset: 32
        }
      },

      uniforms: {
        view: ({ time: t }) => {
          t = t * 0.1;
          return mat4.lookAt(
            [],
            [this.props.x, 2.5, this.props.z],
            [0, 0, 0],
            [0, 1, 0]
          );
        },
        projection: mat4.perspective(
          [],
          Math.PI / 4,
          gl.drawingBufferWidth / gl.drawingBufferHeight,
          0.01,
          1000
        ),
        time: ({ time }) => time * 0.1
      },

      count: NUM_POINTS,

      primitive: "points"
    });

    const frame = () => {
      regl.poll();
      regl.clear({
        color: [0, 0, 0, 1],
        depth: 1
      });

      drawParticles();

      gl.flush();
      gl.endFrameEXP();
      this.raf = requestAnimationFrame(frame);
    };
    frame();
  };
}

export default withKnobs(Root, {
  x: {
    label: "x",
    type: "range",
    min: -30,
    max: 30,
    initialValue: 10
  },
  z: {
    label: "z",
    type: "range",
    min: -30,
    max: 30,
    initialValue: 10
  }
});
