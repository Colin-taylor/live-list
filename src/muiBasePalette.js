import * as colors from 'material-ui/styles/colors';

import {fade} from 'material-ui/utils/colorManipulator';
// import spacing from '../spacing';

export default {
//   spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: colors.cyan500,
    primary2Color: colors.cyan700,
    primary3Color: colors.grey400,
    accent1Color: colors.pinkA200,
    accent2Color: colors.grey100,
    accent3Color: colors.grey500,
    textColor: colors.darkBlack,
    alternateTextColor: colors.white,
    canvasColor: colors.white,
    borderColor: colors.grey300,
    disabledColor: fade(colors.darkBlack, 0.3),
    pickerHeaderColor: colors.cyan500,
    clockCircleColor: fade(colors.darkBlack, 0.07),
    shadowColor: colors.fullBlack,
  },
};