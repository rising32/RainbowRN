import React, {createContext, useEffect, useState} from 'react';
import {Dimensions, ScaledSize, PixelRatio} from 'react-native';
import CONST from '../../CONST';
import {LayoutContextType} from '../../Interface';

export const LayoutContext = createContext<LayoutContextType>(
  {} as LayoutContextType,
);

type Props = {
  children: React.ReactNode;
};

function LayoutProvider({children}: Props) {
  const [scale, changeScale] = useState<LayoutContextType>({
    width: 0,
    height: 0,
    heightRatio: 0,
    widthRatio: 0,
    isLandscape: false,
    fontScale: 1,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      settingLayout(window);
    });

    settingLayout(Dimensions.get('window'));
    return () => subscription?.remove();
  }, []);

  const settingLayout = (size: ScaledSize) => {
    changeScale({
      width: size.width,
      height: size.height,
      heightRatio: parseFloat(
        (size.height / CONST.BASIC_DIMENSION.HEIGHT).toFixed(2),
      ),
      widthRatio: parseFloat(
        (size.width / CONST.BASIC_DIMENSION.WIDTH).toFixed(2),
      ),
      isLandscape: size.width > size.height,
      fontScale: PixelRatio.roundToNearestPixel(
        size.width / CONST.BASIC_DIMENSION.WIDTH,
      ),
    });
  };

  return (
    <LayoutContext.Provider value={scale}>{children}</LayoutContext.Provider>
  );
}

export default LayoutProvider;
