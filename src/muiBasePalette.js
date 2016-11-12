import * as colors from 'material-ui/styles/colors';

import {fade} from 'material-ui/utils/colorManipulator';
// import spacing from '../spacing';
export default {
//   spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: colors.deepOrange500,
    primary2Color: colors.deepOrange700,
    primary3Color: colors.deepOrange100,
    accent1Color: colors.indigoA200,
    accent2Color: colors.indigoA100,
    accent3Color: colors.indigoA700,
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