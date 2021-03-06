import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export function CameraSVG({width = 512, height = 512, fill = '#000', ...rest}) {
  return (
    <Svg
      {...rest}
      width={width}
      height={height}
      viewBox="0 -8 384 384"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fill={fill}
        d="M48 368h288c26.473 0 48-21.527 48-48V128c0-26.473-21.527-48-48-48h-46.113l-31.16-62.32C253.273 6.777 242.312 0 230.113 0h-76.226c-12.192 0-23.16 6.777-28.621 17.688L94.113 80H48c-26.473 0-48 21.527-48 48v192c0 26.473 21.527 48 48 48zM153.887 16v16zm0 16h76.218l24 48H129.887zM32 128c0-8.824 7.176-16 16-16h288c8.824 0 16 7.176 16 16v192c0 8.824-7.176 16-16 16H48c-8.824 0-16-7.176-16-16zm0 0"
      />
      <Path
        fill={fill}
        d="M192 304c44.113 0 80-35.887 80-80s-35.887-80-80-80-80 35.887-80 80 35.887 80 80 80zm0-128c26.473 0 48 21.527 48 48s-21.527 48-48 48-48-21.527-48-48 21.527-48 48-48zm0 0"
      />
      <Path
        fill={fill}
        d="M184 240h16c8.832 0 16-7.168 16-16s-7.168-16-16-16h-16c-8.832 0-16 7.168-16 16s7.168 16 16 16zm0 0M296 176h16c8.832 0 16-7.168 16-16s-7.168-16-16-16h-16c-8.832 0-16 7.168-16 16s7.168 16 16 16zm0 0"
      />
    </Svg>
  );
}
