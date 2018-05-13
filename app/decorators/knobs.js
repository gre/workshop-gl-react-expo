// @flow
import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  Slider,
  Picker,
  Switch,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";

const rowMode = {
  toggle: true
};

function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function hslToRgb(h, s, l) {
  let r, g, b;
  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [r, g, b];
}

function rgbToHsl(r, g, b) {
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;
  if (max !== min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h, s, l];
}

class Range extends Component<*, *> {
  state = { value: this.props.value };
  onValueChange = value => {
    this.setState({ value });
    if (this.props.config.live) {
      this.props.onChange(value);
    }
  };
  onSlidingComplete = () => {
    this.props.onChange(this.state.value);
  };
  render() {
    const { value } = this.state;
    const { config } = this.props;
    return (
      <Slider
        minimumValue={config.min}
        maximumValue={config.max}
        step={config.step}
        onValueChange={this.onValueChange}
        onSlidingComplete={this.onSlidingComplete}
        value={value}
      />
    );
  }
}

class RGBSlider extends Component<*, *> {
  state = {
    rgb: this.props.value
  };
  componentDidUpdate() {}
  onRChange = v => {
    this.setState(s => {
      const rgb = [v, s.rgb[1], s.rgb[2]];
      return { rgb };
    });
  };
  onGChange = v => {
    this.setState(s => {
      const rgb = [s.rgb[0], v, s.rgb[2]];
      return { rgb };
    });
  };
  onBChange = v => {
    this.setState(s => {
      const rgb = [s.rgb[0], s.rgb[1], v];
      return { rgb };
    });
  };
  onRandomize = () => {
    const rgb = [Math.random(), Math.random(), Math.random()];
    this.props.onChange(rgb);
    this.setState({ rgb });
  };

  onSlidingComplete = () => {
    this.props.onChange(this.state.rgb);
  };

  render() {
    const { rgb } = this.state;
    const { config } = this.props;
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={this.onRandomize}
          style={{
            width: 20,
            height: 20,
            backgroundColor: `rgb(${rgb.map(v => Math.floor(v * 255))})`,
            marginRight: 10
          }}
        />
        <Slider
          style={{ flex: 1 }}
          minimumValue={0}
          maximumValue={1}
          onValueChange={this.onRChange}
          onSlidingComplete={this.onSlidingComplete}
          value={rgb[0]}
        />
        <Slider
          style={{ flex: 1 }}
          minimumValue={0}
          maximumValue={1}
          onValueChange={this.onGChange}
          onSlidingComplete={this.onSlidingComplete}
          value={rgb[1]}
        />
        <Slider
          style={{ flex: 1 }}
          minimumValue={0}
          maximumValue={1}
          onValueChange={this.onBChange}
          onSlidingComplete={this.onSlidingComplete}
          value={rgb[2]}
        />
      </View>
    );
  }
}

class HueSlider extends Component<*, *> {
  state = {
    hsl: rgbToHsl(...this.props.value)
  };
  onHChange = hue => {
    this.setState(s => {
      const hsl = [hue, s.hsl[1], s.hsl[2]];
      return { hsl };
    });
  };
  onRandomize = () => {
    const hsl = [Math.random(), Math.random(), Math.random()];
    this.props.onChange(hslToRgb(...hsl));
    this.setState({ hsl });
  };
  onSlidingComplete = () => {
    this.props.onChange(hslToRgb(...this.state.hsl));
  };

  render() {
    const { hsl: [h, s, l] } = this.state;
    const { config } = this.props;
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={this.onRandomize}
          style={{
            width: 20,
            height: 20,
            backgroundColor: `hsl(${Math.floor(h * 360)},${(s * 100).toFixed(
              0
            )}%,${(l * 100).toFixed(0)}%)`,
            marginRight: 10
          }}
        />
        <Slider
          style={{ flex: 1 }}
          minimumValue={0}
          maximumValue={1}
          onValueChange={this.onHChange}
          onSlidingComplete={this.onSlidingComplete}
          value={h}
        />
      </View>
    );
  }
}

const editors = {
  images: ({ value, onChange, config }) => {
    const size = config.tileSize || { width: 50, height: 50 };
    const { images, vertical } = config;
    const style: Object = {
      flexDirection: vertical ? "column" : "row",
      alignItems: "flex-start"
    };
    if (!vertical) {
      style.paddingRight = 20;
    }
    return (
      <ScrollView
        horizontal={!vertical}
        style={{ marginRight: -20 }}
        contentContainerStyle={style}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {Object.keys(images).map(key => (
          <TouchableOpacity
            key={key}
            style={{
              borderWidth: 2,
              borderColor: images[key] === value ? "#f00" : "#000"
            }}
            onPress={() => {
              onChange(images[key]);
            }}
          >
            <Image source={images[key]} style={size} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  },
  range: Range,
  toggle: ({ value, onChange }) => {
    return <Switch onValueChange={onChange} value={value} />;
  },
  hueColorSlider: HueSlider,
  rgbColorSlider: RGBSlider,
  picker: ({ value, onChange, config }) => {
    return (
      <Picker
        selectedValue={config.items.indexOf(value)}
        style={{ height: 200 }}
        onValueChange={i => onChange(config.items[i])}
      >
        {config.items.map((item, i) => (
          <Picker.Item
            key={i}
            label={config.formatItem ? config.formatItem(item) : String(item)}
            value={i}
          />
        ))}
      </Picker>
    );
  }
};

function initialValuesFromConfig(c) {
  const values = {};
  for (const k in c) {
    let value = c[k].initialValue;
    if (!value && (typeof value !== "number" || value !== 0)) {
      switch (c[k].type) {
        case "range": {
          const { min, max } = c[k];
          value = min + (max - min) / 2;
          if (isNaN(value)) value = 0;
          break;
        }
        case "images": {
          const imgs = c[k].images;
          value = imgs && imgs[Object.keys(imgs)[0]];
          break;
        }
        case "hueColorSlider":
        case "rgbColorSlider":
          value = [1, 0, 0];
          break;
        case "picker": {
          value = c[k].items[0];
          break;
        }
        default:
      }
    }
    values[k] = value;
  }
  return values;
}

export const withKnobs = (
  C: *,
  configs: {
    [_: string]: Object
  },
  extra: {
    noPadding?: boolean
  } = {}
) => {
  class Knob extends Component<*, *> {
    state = {
      values: initialValuesFromConfig(configs)
    };
    render() {
      const { props } = this;
      const { values } = this.state;
      return (
        <Fragment>
          <C {...props} {...values} />
          <View style={{ height: extra.noPadding ? 0 : 20 }} />
          {Object.keys(configs).map(key => {
            const config = configs[key];
            const Editor = editors[config.type];
            return (
              <View
                key={key}
                style={{
                  alignSelf: "stretch",
                  paddingVertical: extra.noPadding ? 0 : 10,
                  paddingHorizontal: 40,
                  flexDirection: rowMode[config.type] ? "row" : "column",
                  justifyContent: "space-between"
                }}
              >
                <Text style={{ paddingVertical: 4, fontWeight: "bold" }}>
                  {config.label}
                </Text>
                {Editor ? (
                  <Editor
                    value={values[key]}
                    onChange={value =>
                      this.setState(old => ({
                        values: { ...old.values, [key]: value }
                      }))
                    }
                    config={config}
                  />
                ) : null}
              </View>
            );
          })}
        </Fragment>
      );
    }
  }
  for (const k in C) {
    Knob[k] = C[k];
  }
  return Knob;
};
