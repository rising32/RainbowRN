import React from 'react';
import {Pressable, Text} from 'react-native';
import {SortSVG} from '../../../components/Icons';

type Props = {
  title: string;
  width: number;
  onPress: () => void;
  iconActive: boolean;
  textAlign?: 'center' | 'auto' | 'left' | 'right' | 'justify' | undefined;
};
const TableHeaderItem = ({
  title,
  width,
  onPress,
  iconActive,
  textAlign = 'center',
}: Props) => {
  return (
    <Pressable
      style={[
        {
          width: width,
          alignItems: 'center',
          flexDirection: 'row',
        },
        textAlign === 'left' ? {} : {justifyContent: 'center'},
      ]}
      onPress={onPress}>
      <Text
        style={{
          textAlign: textAlign,
          fontWeight: 'bold',
          fontSize: 18,
        }}>
        {title}
      </Text>
      <SortSVG
        width={24}
        height={24}
        stroke={iconActive ? 'darkcyan' : 'lightgray'}
        style={{marginLeft: 5}}
      />
    </Pressable>
  );
};

export default TableHeaderItem;
