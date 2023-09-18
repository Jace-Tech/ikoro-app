import fonts from "./fonts";
import colors from "./colors";
import { extendTheme } from "native-base";

const customTheme = extendTheme({ ...fonts, ...colors })
type CustomThemeType = typeof customTheme;

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType { }
}

export default customTheme