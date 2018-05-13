//@flow
import React, { Component, Fragment } from "react";
import { View, Dimensions, Text } from "react-native";
import { Permissions } from "expo";
import hoistNonReactStatics from "hoist-non-react-statics";

export default (C: *) => {
  class EnsureCameraPermissions extends Component<*, *> {
    state = {
      permission: null
    };

    async componentDidMount() {
      const permission = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ permission });
    }

    render() {
      const { permission } = this.state;
      return (
        <Fragment>
          {permission ? (
            permission.status === "granted" ? (
              <C {...this.props} />
            ) : (
              <Text style={{ padding: 100, color: "#F00" }}>
                Camera permission denied
              </Text>
            )
          ) : (
            <Text style={{ padding: 100, opacity: 0.5 }}>
              Loading camera permissions...
            </Text>
          )}
        </Fragment>
      );
    }
  }

  hoistNonReactStatics(EnsureCameraPermissions, C);

  return EnsureCameraPermissions;
};
