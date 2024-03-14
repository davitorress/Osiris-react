import { Theme } from "@react-navigation/native"

import Colors from "@/constants/Colors"

const OsirisTheme: Theme = {
  dark: false,
  colors: {
    text: Colors.light.black,
    background: Colors.light.white,

    // DefaultTheme values
    primary: "rgb(0, 122, 255)",
    card: "rgb(255, 255, 255)",
    border: "rgb(216, 216, 216)",
    notification: "rgb(255, 59, 48)",
  },
}

export default OsirisTheme
