import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useSelector } from "react-redux";

function Icon_BHLD(props) {
    const themeColor = useSelector((state) => state.SystemReducer.theme);

    return (
        <Svg width={84} height={62} viewBox="0 0 84 62" fill="none" {...props}>
            <Path
                d="M76.364 54.6045C84.023 47.2945 85.852 32.3685 78.759 21.9905C72.847 13.3405 61.959 4.44347 48.235 1.85047C34.511 -0.742529 22.49 -0.740529 17.291 2.68647C13.035 5.48647 15.013 9.39547 16.348 12.7135C18.13 17.1435 18.392 20.6605 11.065 27.0965C2.70002 34.4425 0.436022 37.1965 0.0170222 44.3045C-0.323978 50.0815 4.49902 57.8525 10.828 58.9665C19.64 60.5165 22.91 56.4215 31.528 53.6615C38.444 51.4475 43.24 52.4825 49.509 56.7265C55.778 60.9705 65.125 65.3365 76.364 54.6045Z"
                fill="#EEF7FE"
            />
            <Path
                d="M58.2801 21.3398H33.5806C31.8755 21.3398 30.4932 22.759 30.4932 24.5097V40.3587C30.4932 42.1093 31.8755 43.5285 33.5806 43.5285H58.2801C59.9852 43.5285 61.3675 42.1093 61.3675 40.3587V24.5097C61.3675 22.759 59.9852 21.3398 58.2801 21.3398Z"
                stroke={themeColor?.mainColor || "black"}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M52.1056 43.5283V18.1698C52.1056 17.3291 51.7803 16.5229 51.2013 15.9284C50.6223 15.334 49.837 15 49.0182 15H42.8433C42.0245 15 41.2392 15.334 40.6601 15.9284C40.0811 16.5229 39.7559 17.3291 39.7559 18.1698V43.5283"
                stroke={themeColor?.mainColor || "black"}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M46.123 29.2642V37.5849"
                stroke={themeColor?.mainColor || "black"}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M42.0713 33.4248H50.1758"
                stroke={themeColor?.mainColor || "black"}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

export default Icon_BHLD;
