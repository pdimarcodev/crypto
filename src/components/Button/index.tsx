import {FC} from 'react';
import {ActivityIndicator, Pressable, PressableProps, Text} from 'react-native';
import {styles} from './styles';

/**
 * Types
 */

export interface ButtonProps extends PressableProps {
  accessibilityLabel: string;
  title: string;
  disabled?: boolean;
  loading?: boolean;
  selected?: boolean;
  onPress: () => void;
}

/**
 * Button
 */

export const Button: FC<ButtonProps> = ({
  onPress,
  title,
  accessibilityLabel,
  loading,
  disabled,
  selected,
  ...props
}) => {
  return (
    <Pressable
      {...props}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={disabled ? 'disabled' : undefined}
      disabled={disabled || loading || selected}
      onPress={onPress}
      style={({pressed}) => [styles.button, {opacity: pressed ? 0.8 : 1}]}>
      {loading ? (
        <ActivityIndicator color={'white'} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
};
