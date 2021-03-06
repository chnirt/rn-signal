import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export function SendSVG({width = 512, height = 512, fill = '#000', ...rest}) {
  return (
    <Svg
      {...rest}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512">
      <Path
        fill={fill}
        d="M481.508 210.336L68.414 38.926c-17.403-7.222-37.064-4.045-51.309 8.287C2.86 59.547-3.098 78.551 1.558 96.808L38.327 241h180.026c8.284 0 15.001 6.716 15.001 15.001 0 8.284-6.716 15.001-15.001 15.001H38.327L1.558 415.193c-4.656 18.258 1.301 37.262 15.547 49.595 14.274 12.357 33.937 15.495 51.31 8.287l413.094-171.409C500.317 293.862 512 276.364 512 256.001s-11.683-37.862-30.492-45.665z"
      />
    </Svg>
  );
}
