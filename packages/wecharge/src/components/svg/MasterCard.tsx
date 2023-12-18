import React from 'react';
import { G, Path, Rect, Svg, SvgProps } from 'react-native-svg';

function MasterCard(props: Omit<SvgProps, 'children'>) {
  return (
    <Svg viewBox="0 0 152.407 108" {...props}>
      <G>
        <Rect width="152.407" height="108" fill="none" />
        <G>
          <Rect
            x="60.4117"
            y="25.6968"
            width="31.5"
            height="56.6064"
            fill="#ff5f00"
          />
          <Path
            d="M382.20839,306a35.9375,35.9375,0,0,1,13.7499-28.3032,36,36,0,1,0,0,56.6064A35.938,35.938,0,0,1,382.20839,306Z"
            transform="translate(-319.79649 -252)"
            fill="#eb001b"
          />
          <Path
            d="M454.20349,306a35.99867,35.99867,0,0,1-58.2452,28.3032,36.00518,36.00518,0,0,0,0-56.6064A35.99867,35.99867,0,0,1,454.20349,306Z"
            transform="translate(-319.79649 -252)"
            fill="#f79e1b"
          />
          <Path
            d="M450.76889,328.3077v-1.1589h.4673v-.2361h-1.1901v.2361h.4675v1.1589Zm2.3105,0v-1.3973h-.3648l-.41959.9611-.41971-.9611h-.365v1.3973h.2576v-1.054l.3935.9087h.2671l.39351-.911v1.0563Z"
            transform="translate(-319.79649 -252)"
            fill="#f79e1b"
          />
        </G>
      </G>
    </Svg>
  );
}

export default MasterCard;
