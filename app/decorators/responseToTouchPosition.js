//@flow
import React, { Component } from "react";
import { PanResponder, View } from "react-native";
import hoistNonReactStatics from "hoist-non-react-statics";

type Pos = [number, number];
type State = {
  touching: boolean,
  touchPosition: Pos,
  touchAngle: number
};

export default (
  Comp: *,
  { initialPosition = [0.5, 0.5] }: { initialPosition: Pos } = {}
) => {
  class TouchPositionResponding extends Component<*, State> {
    state: State = {
      touching: false,
      touchPosition: initialPosition,
      touchAngle: 0
    };
    initialContainerPos: [number, number];
    initialDragPos: [number, number];
    size: [number, number];
    panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: evt => {
        const { pageX, pageY } = evt.nativeEvent;
        this.initialDragPos = [pageX, pageY];
        this.refs.root.measure((x, y, w, h, initialPageX, initialPageY) => {
          this.initialContainerPos = [initialPageX, initialPageY];
          this.size = [w, h];
          const touchPosition = [
            (pageX - initialPageX) / w,
            1 - (pageY - initialPageY) / h
          ];
          this.setState({
            touching: true,
            touchAngle: 0,
            touchPosition
          });
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        if (!this.size) return;
        const [pageX, pageY] = this.initialDragPos;
        const [initialPageX, initialPageY] = this.initialContainerPos;
        const { dx, dy } = gestureState;
        const [w, h] = this.size;
        this.setState(prev => {
          const touchPosition = [
            (pageX + dx - initialPageX) / w,
            1 - (pageY + dy - initialPageY) / h
          ];
          const y = touchPosition[1] - prev.touchPosition[1];
          const x = touchPosition[0] - prev.touchPosition[0];
          const touchAngle =
            x * x + y * y > 0.00001 ? Math.atan2(y, x) : prev.touchAngle;
          return { touchPosition, touchAngle };
        });
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: () => this._onEnd(),
      onPanResponderTerminate: () => this._onEnd(),
      onShouldBlockNativeResponder: () => true
    });
    _onEnd = () => {
      if (this.state.touching) {
        this.setState({
          touching: false
        });
      }
    };
    render() {
      return (
        <View ref="root" collapsable={false} {...this.panResponder.panHandlers}>
          <Comp {...this.props} {...this.state} />
        </View>
      );
    }
  }

  hoistNonReactStatics(TouchPositionResponding, Comp);

  return TouchPositionResponding;
};
