import {FC} from 'react';
import {View} from 'react-native';

/**
 * Types
 */

interface SpacerProps {
  height?: number | string;
}

/**
 * Constants
 */

const DEFAULT_HEIGHT = 22;

/**
 * Spacer
 */

export const Spacer: FC<SpacerProps> = ({height}) => (
  <View style={{height: height ?? DEFAULT_HEIGHT}} />
);
