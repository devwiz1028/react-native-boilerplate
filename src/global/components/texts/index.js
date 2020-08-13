import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';

import AnimatableText from '../animatable/AnimatableText';
import {Colors, Fonts} from '../../constants';

const CustomText = (props) => {
  const {
    align,
    fontSize,
    lineHeight,
    color,
    weight,
    style,
    animatable,
    children,
    ...otherProps
  } = props;

  const textStyle = {
    fontFamily: Fonts.primary,
    fontSize,
    fontWeight: weight,
    color,
    textAlign: align,
  };
  if (lineHeight) {
    textStyle.lineHeight = lineHeight;
  }
  Object.assign(textStyle, style);

  if (animatable) {
    return (
      <AnimatableText style={textStyle} {...otherProps}>
        {children}
      </AnimatableText>
    );
  }

  return (
    <Text style={textStyle} {...otherProps}>
      {children}
    </Text>
  );
};

CustomText.propTypes = {
  fontSize: PropTypes.number,
  lineHeight: PropTypes.number,
  color: PropTypes.string,
  weight: PropTypes.string,
  align: PropTypes.string,
  style: PropTypes.any,
  children: PropTypes.node,
  animatable: PropTypes.bool,
};

CustomText.defaultProps = {
  fontSize: 14,
  color: Colors.black,
  weight: 'normal',
  align: 'left',
  style: {},
  animatable: false,
  children: null,
};

const H1 = (props) => <CustomText fontSize={32} weight="bold" {...props} />;
const H2 = (props) => <CustomText fontSize={28} weight="bold" {...props} />;
const H3 = (props) => <CustomText fontSize={24} weight="bold" {...props} />;
const H4 = (props) => <CustomText fontSize={20} weight="bold" {...props} />;
const H5 = (props) => <CustomText fontSize={18} weight="bold" {...props} />;
const H6 = (props) => <CustomText fontSize={16} weight="bold" {...props} />;

export {H1, H2, H3, H4, H5, H6, CustomText as Text};
