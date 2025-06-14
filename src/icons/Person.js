import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function SvgPerson(props) {
  return (
    <Svg viewBox="0 0 980 980" {...props}>
      <G data-name="Layer 2">
        <Path
          d="M490 980c270.2 0 490-219.8 490-490S760.2 0 490 0 0 219.8 0 490s219.8 490 490 490zm0-35c-119.2 0-234.1-60.9-323.6-139.8L154 794.4l10.6-12.5c31.4-37.3 87-68.4 156.5-87.5 24.8-9.9 36.9-16.5 45.9-25.4 9.6-9.6 14.8-18.5 16.7-28.5 1.2-6.8.9-42.6-.1-74.3-17.2-19.5-32.2-48.5-46.5-90.5-14.8-7.7-28-26.7-32-47.6-4.2-22.4-1.9-41.2 6.1-52.4-18.5-107.7-6.7-187.6 35.1-237.7 32.7-39.2 82.5-58.9 148.3-58.9l6-.1c54.7 0 67.3 11.4 79.1 27.6a41.2 41.2 0 007 7.9c30.3 0 55.4 12.1 72.7 35.1 32.9 43.5 36.9 126.8 11.1 224.4 9.1 11.1 11.7 31.3 6.3 55.2-5 22.3-20.6 42.2-36.5 48.3-11.7 38.4-23.6 67.5-42.3 89.4V637c2 15.5 7.9 21.2 18.7 31.6l7.1 7.1c6.6 5.4 12.6 8.2 39.1 19.8 66.5 18.4 121.6 49.3 152.7 86.3l10.5 12.5-12.3 10.9C724 884.1 609.1 945 490 945z"
          fill="#e5e3e3"
          data-name="Layer 1"
        />
      </G>
    </Svg>
  );
}

export default SvgPerson;
