import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export function VideoCameraSVG({
  width = 95,
  height = 95,
  fill = '#000',
  ...rest
}) {
  return (
    <Svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 95.044 95.044">
      <Path
        fill={fill}
        d="M93.227 23.522a3.114 3.114 0 00-3.33.471l-18.385 15.83V21.768a3.23 3.23 0 00-3.226-3.226H3.225A3.23 3.23 0 000 21.768v51.508a3.23 3.23 0 003.225 3.226h65.062a3.23 3.23 0 003.227-3.226V55.222l18.385 15.829a3.115 3.115 0 003.33.472 3.115 3.115 0 001.815-2.832V26.353a3.115 3.115 0 00-1.817-2.831z"
      />
    </Svg>
  );
}
