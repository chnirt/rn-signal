import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export function PhoneSVG({width = 484, height = 484, fill = '#000', ...rest}) {
  return (
    <Svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 484.287 484.287">
      <Path
        fill={fill}
        d="M314.631 345.811c-8.698 1.734-33.972 21.063-39.69 20.146-17.479-17.404-33.518-36.266-47.683-56.465a387.73 387.73 0 01-23.757-38.512l.076-.041a389.054 389.054 0 01-23.181-51.516c-8.459-23.176-14.746-47.124-19.013-71.418 2.52-5.214 32.835-14.877 39.234-21.016C237.892 91.228 228.188-9.848 155.263.779c-93.787 13.629-87.735 124.79-65.991 193.295 8.154 25.685 22.019 63.427 40.909 102.44l5.12 10.035c21.18 37.818 44.195 70.789 60.589 92.176 43.732 57.038 131.423 125.622 196.278 56.51 50.194-55.052-26.88-119.526-77.537-109.424z"
      />
    </Svg>
  );
}