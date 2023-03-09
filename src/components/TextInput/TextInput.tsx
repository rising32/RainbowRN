import React from 'react';
import {
  View,
  TextInput as RNTextInput,
  ViewStyle,
  TextStyle,
  TextInputProps,
  ColorValue,
} from 'react-native';

interface CustomProps {
  viewStyle?: ViewStyle;
  textPosition?: 'left' | 'right' | 'center' | 'justify' | 'auto' | undefined;
}
interface Props {
  placeholderTextColor?: ColorValue;
  style?: TextStyle;
}

const TextInput = ({
  viewStyle = {},
  style = {},
  textPosition = 'center',
  placeholderTextColor = '#D9D9D9',
  ...rest
}: CustomProps & Props & Omit<TextInputProps, keyof Props>) => {
  return (
    <View style={[{width: '100%'}, viewStyle]}>
      <RNTextInput
        style={[
          {
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            paddingHorizontal: 10,
            textAlign: textPosition,
            fontSize: 24,
          },
          style,
        ]}
        placeholderTextColor={placeholderTextColor}
        {...rest}
      />
    </View>
  );
};

export default TextInput;
