import React, { Component } from "react";
import { Node, GLSL, Shaders, Uniform, NearestCopy } from "gl-react";
import { Surface } from "gl-react-expo";
import { timeLoop } from "../decorators";

/**
 * this advanced example is a playground.
 * there is no exercice to do, but feel free to experiment stuff!!
 * you can have your own cellular automaton rules.
 * See this: https://gl-react-cookbook.surge.sh/ibex
 */

// See https://gl-react-cookbook.surge.sh/gol
const shaders = Shaders.create({
  InitGameOfLife: {
    // returns white or black randomly
    frag: GLSL`
precision highp float;
// i
varying vec2 uv;
float random (vec2 uv) {
  return fract(sin(dot(uv, vec2(12.9898,78.233))) * 43758.5453);
}
// i
void main() {
  gl_FragColor = vec4(vec3(step(0.5, random(uv))), 1.0);
}
`
  },
  GameOfLife: {
    // implement Game Of Life.
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform float size;
uniform sampler2D t; // the previous world state
void main() {
  float prev = step(0.5, texture2D(t, uv).r);
  float c = 1.0 / size;
  float sum =
  step(0.5, texture2D(t, uv + vec2(-1.0, -1.0)*c).r) +
  step(0.5, texture2D(t, uv + vec2(-1.0,  0.0)*c).r) +
  step(0.5, texture2D(t, uv + vec2(-1.0,  1.0)*c).r) +
  step(0.5, texture2D(t, uv + vec2( 0.0,  1.0)*c).r) +
  step(0.5, texture2D(t, uv + vec2( 1.0,  1.0)*c).r) +
  step(0.5, texture2D(t, uv + vec2( 1.0,  0.0)*c).r) +
  step(0.5, texture2D(t, uv + vec2( 1.0, -1.0)*c).r) +
  step(0.5, texture2D(t, uv + vec2( 0.0, -1.0)*c).r);
  float next = prev==1.0 && sum >= 2.0 && sum <= 3.0 || sum == 3.0 ? 1.0 : 0.0;
  gl_FragColor = vec4(vec3(next), 1.0);
}
`
  }
});

const refreshEveryTicks = 20;

const GameOfLife = ({ tick }: { tick: number }) => {
  // Changing size is "destructive" and will reset the Game of Life state
  const size = 8 * (1 + Math.floor(tick / refreshEveryTicks));
  // However, we can conditionally change shader/uniforms,
  // React reconciliation will preserve the same <Node> instance,
  // and our Game of Life state will get preserved!
  return tick % refreshEveryTicks === 0 ? (
    <Node
      shader={shaders.InitGameOfLife}
      width={size}
      height={size}
      backbuffering // makes Node holding 2 fbos that get swapped each draw time
      sync // force <Node> to draw in sync each componentDidUpdate time
    />
  ) : (
    <Node
      shader={shaders.GameOfLife}
      width={size}
      height={size}
      backbuffering
      sync
      uniforms={{
        t: Uniform.Backbuffer, // Use previous frame buffer as a texture
        size
      }}
    />
  );
};

class PureGameOfLife extends Component {
  shouldComponentUpdate({ tick }) {
    // only tick should trigger redraw
    return tick !== this.props.tick;
  }
  render() {
    return <GameOfLife tick={this.props.tick} />;
  }
}

const Loop = timeLoop(PureGameOfLife, { refreshRate: 10 });

class Exercice extends Component<*> {
  render() {
    return (
      <Surface style={{ width: 300, height: 300 }}>
        <NearestCopy>
          <Loop />
        </NearestCopy>
      </Surface>
    );
  }
}

export default Exercice;
