// @flow
import React, { Component } from "react";
import { Node, GLSL, Shaders } from "gl-react";
import { Surface } from "gl-react-expo";
import { Camera } from "expo";
import { withKnobs, ensureCameraPermissions } from "../decorators";

/**
 * The way to inject the camera into GLView is as of today a bit hairy
 * so we've written the code for it and a component <GLCamera>
 * that provides for you the camera pixel as a gl-react component :)
 * we'll use it in this series of exercices.
 *
 * TODO for this exercice:
 * Play with the defined GLCamera,
 * make it using the "front" camera stream instead of the back
 * when you toggle the "selfie moode"
 */

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
  static TODO_REMOVE_ME = 1; // REMOVE THIS LINE !!!

  render() {
    const { selfieMode } = this.props;
    return (
      <Surface style={{ width: 200, height: 300 }}>
        <GLCamera />
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
