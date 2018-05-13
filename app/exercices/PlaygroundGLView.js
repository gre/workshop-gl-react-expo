import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GLView } from "expo";
import { withKnobs } from "../decorators";

const vertSrc = `
uniform float x, y;
void main() {
  gl_Position = vec4(x, y, 0.0, 1.0);
  gl_PointSize = 50.0;
}
`;

const fragSrc = `
void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`;

class Root extends Component {
  render() {
    return (
      <GLView
        style={{ width: 300, height: 300 }}
        onContextCreate={this._onContextCreate}
      />
    );
  }

  componentDidUpdate() {
    const { gl } = this;
    if (!gl) return;
    // set new uniforms value
    gl.uniform1f(this.xUniformLoc, this.props.x);
    gl.uniform1f(this.yUniformLoc, this.props.y);

    if (this.props.clear) gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
    gl.flush();
    gl.endFrameEXP();
  }

  _onContextCreate = gl => {
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0, 1, 1, 1);

    // Compile vertex and fragment shader
    const vert = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vert, vertSrc);
    gl.compileShader(vert);
    const frag = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(frag, fragSrc);
    gl.compileShader(frag);

    // Link together into a program
    const program = gl.createProgram();
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    gl.useProgram(program);

    // draw a point
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);

    // get uniforms location
    this.xUniformLoc = gl.getUniformLocation(program, "x");
    this.yUniformLoc = gl.getUniformLocation(program, "y");

    // tell GLView implementation to draw now
    gl.flush();
    gl.endFrameEXP();

    this.gl = gl;
  };
}

export default withKnobs(Root, {
  x: {
    label: "x",
    type: "range",
    min: -1,
    max: 1,
    initialValue: 0
  },
  y: {
    label: "y",
    type: "range",
    min: -1,
    max: 1,
    initialValue: 0
  },
  clear: {
    label: "clear",
    type: "toggle"
  }
});
