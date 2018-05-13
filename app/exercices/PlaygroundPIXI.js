// https://github.com/expo/expo-pixi
// http://pixijs.download/dev/docs/index.html

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GLView } from "expo";
import ExpoPixi from "expo-pixi";

import { withKnobs } from "../decorators";

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
    const { sprite } = this;
    if (!sprite) return;
    sprite.position.x = this.app.screen.width * this.props.x;
  }

  _onContextCreate = async context => {
    const app = ExpoPixi.application({ context });
    const sprite = await ExpoPixi.spriteAsync("http://i.imgur.com/uwrbErh.png");
    sprite.position.y = app.screen.height / 2;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    app.stage.addChild(sprite);
    this.sprite = sprite;
    this.app = app;
  };
}

export default withKnobs(Root, {
  x: {
    label: "x",
    type: "range",
    min: 0,
    max: 1,
    initialValue: 0
  }
});
