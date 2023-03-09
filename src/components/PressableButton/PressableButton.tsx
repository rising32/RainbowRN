import React, {useCallback} from 'react';
import {
  Pressable,
  PressableProps,
  Text,
  TextStyle,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';

interface Props extends PressableProps {
  onPress?: () => void;
  isFetching?: boolean;
  style?: ViewStyle;
  text: string;
  textStyle?: TextStyle;
}

const PressableButton = ({
  onPress,
  isFetching,
  style = {},
  text,
  textStyle = {},
  ...props
}: Props) => {
  const onClick = useCallback(() => {
    if (onPress) {
      onPress();
    }
  }, [onPress]);

  return (
    <Pressable
      style={[
        {
          width: '100%',
          height: 50,
          backgroundColor: 'black',
          paddingVertical: 10,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',

          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.46,
          shadowRadius: 1.14,
          elevation: 5,
        },
        style,
      ]}
      {...props}
      disabled={isFetching}
      onPress={onClick}>
      {isFetching ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text
          style={[
            {
              textAlign: 'center',
              color: 'white',
              fontSize: 24,
            },
            textStyle,
          ]}>
          {text}
        </Text>
      )}
    </Pressable>
  );
};

export default PressableButton;
