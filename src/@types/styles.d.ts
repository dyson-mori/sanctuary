/* eslint-disable @typescript-eslint/no-empty-object-type */

import 'styled-components';
import theme from '../global/theme';

type ThemeProps = typeof theme.light;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeProps { }
}