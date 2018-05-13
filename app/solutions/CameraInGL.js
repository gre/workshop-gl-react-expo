// @flow
import React, { Component } from "react";
import { Node, GLSL, Shaders } from "gl-react";
import { Surface } from "gl-react-expo";
import { Camera } from "expo";
import { withKnobs, ensureCameraPermissions } from "../decorators";

const shaders = Shaders.create({
  camera: {
    // here, we need to YFlip the stream
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D t;
void main(){
  gl_FragColor=texture2D(t, vec2(uv.x, 1.0 - uv.y));
}`
  }
});

export class GLCamera extends Component<{
  position: "front" | "back"
}> {
  static defaultProps = { position: "back" };
  _raf: *;
  async componentDidMount() {
    const loop = () => {
      this._raf = requestAnimationFrame(loop);
      this.forceUpdate(); // will trigger a local gl-react redraw
    };
    this._raf = requestAnimationFrame(loop);
  }
  componentWillUnmount() {
    cancelAnimationFrame(this._raf);
  }
  camera: ?Camera;
  onCameraRef = (camera: ?Camera) => {
    this.camera = camera;
  };
  render() {
    const { position, ...rest } = this.props;
    if (!(position in Camera.Constants.Type))
      throw new Error("unknown Camera.Constants.Type." + position);
    const type = Camera.Constants.Type[position];
    return (
      <Node shader={shaders.camera} uniforms={{ t: () => this.camera }}>
        <Camera {...rest} type={type} ref={this.onCameraRef} />
      </Node>
    );
  }
}

class Exercice extends Component<*> {
  render() {
    const { selfieMode } = this.props;
    return (
      <Surface style={{ width: 200, height: 300 }}>
        <GLCamera position={selfieMode ? "front" : "back"} />
      </Surface>
    );
  }
}

export default withKnobs(ensureCameraPermissions(Exercice), {
  selfieMode: {
    label: "Selfie mode!",
    type: "toggle"
  }
});
