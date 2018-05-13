import React, { Component } from "react";

export const timeLoop = (C, { refreshRate }) => {
  class TL extends Component {
    static displayName = `timeLoop(${C.displayName || C.name || ""})`;
    state = { time: 0, tick: 0 };
    componentDidMount() {
      let startTime: number, lastTime: number;
      let interval = 1000 / refreshRate;
      lastTime = -interval;
      const loop = (t: number) => {
        this._r = requestAnimationFrame(loop);
        if (!startTime) startTime = t;
        if (t - lastTime > interval) {
          lastTime = t;
          this.setState({
            time: t - startTime,
            tick: this.state.tick + 1
          });
        }
      };
      this._r = requestAnimationFrame(loop);
    }
    componentWillUnmount() {
      cancelAnimationFrame(this._r);
    }
    render() {
      return <C {...this.props} {...this.state} />;
    }
  }
  return TL;
};
