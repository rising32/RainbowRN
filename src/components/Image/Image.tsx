import React, {useCallback, useMemo, useState} from 'react';
import {View, ViewStyle} from 'react-native';
import FastImage, {
  FastImageProps,
  ImageStyle,
  OnLoadEvent,
} from 'react-native-fast-image';

interface Props extends FastImageProps {
  onLoad?: (event: any) => void;
  defaultHeight?: number;
  width: number;
  style?: ImageStyle;
  viewStyle?: ViewStyle;
  isRound?: boolean;
}

const Image = ({
  onLoad,
  defaultHeight,
  viewStyle = {},
  isRound = false,
  width = 0,
  style = {},
  ...props
}: Props) => {
  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
  });

  const onLoadFunc = useCallback(
    (e: OnLoadEvent) => {
      setDimensions({width: e.nativeEvent.width, height: e.nativeEvent.height});
      if (onLoad) {
        onLoad(e);
      }
    },
    [onLoad],
  );

  const height = useMemo(() => {
    if (!dimensions.height) {
      return defaultHeight === undefined ? 300 : defaultHeight;
    }
    const ratio = dimensions.height / dimensions.width;
    return width * ratio;
  }, [dimensions.height, dimensions.width, defaultHeight, width]);

  if (isRound) {
    return (
      <View
        style={[
          viewStyle,
          {
            width: width,
            height: width,
            borderRadius: width,
            backgroundColor: 'black',
          },
        ]}>
        <FastImage
          style={[
            {
              width: width,
              height: width,
              borderRadius: width,
            },
            style,
          ]}
          {...props}
        />
      </View>
    );
  }
  return (
    <View style={[viewStyle]}>
      <FastImage
        style={[
          {
            width: width,
            height: height,
          },
          style,
        ]}
        {...props}
        onLoad={onLoadFunc}
      />
    </View>
  );
};

export default Image;
