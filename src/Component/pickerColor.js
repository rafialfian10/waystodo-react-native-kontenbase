import { useState, useRef } from "react";
import ColorPicker from "react-native-wheel-color-picker";
import { StyleSheet, View, Text } from "react-native";

function PickerColor({ form, handleChange, colorPickerVisible }) {
  const pickerRef = useRef(null);
  const [swatchesOnly, setSwatchesOnly] = useState(false);
  const [swatchesEnabled, setSwatchesEnabled] = useState(true);
  const [disc, setDisc] = useState(false);
  // const [swatchesLast, setSwatchesLast] = useState(false);

  return (
    colorPickerVisible && (
      <View style={styles.containerColor}>
        <ColorPicker
          ref={pickerRef}
          color={form.bgColor}
          swatchesOnly={swatchesOnly}
          // onColorChange={onColorChange}
          onColorChangeComplete={(value) => handleChange("bgColor", value)}
          thumbSize={40}
          sliderSize={20}
          noSnap={true}
          row={false}
          swatches={swatchesEnabled}
          discrete={disc}
          style={styles.colorPicker}
        />
        <Text style={styles.textColorPicker}>
          Hashcode: {form.bgColor.toUpperCase()}
        </Text>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  containerColor: {
    width: "80%",
    height: 400,
    alignSelf: "center",
    borderRadius: 10,
  },
  colorPicker: {
    width: "100%",
    height: "100%",
  },
  textColorPicker: {
    width: "100%",
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "800",
    color: "grey",
  },
});

export default PickerColor;
