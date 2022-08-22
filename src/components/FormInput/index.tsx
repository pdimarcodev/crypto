import {View, Text, TextInput, TextInputProps, Keyboard} from 'react-native';
import {Control, Controller, Path} from 'react-hook-form';

import {ShowIf} from '../ShowIf';
import {styles} from './styles';

/**
 * Types
 */

interface IFormInput<ContentType> extends TextInputProps {
  control: Control<ContentType, object>;
  name: Path<ContentType>;
  rules?: Object;
}

/**
 * FormInput
 */

export function FormInput<ContentType>({
  control,
  name,
  rules = {},
  ...props
}: IFormInput<ContentType>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View style={styles.container}>
            <TextInput
              value={value as string}
              placeholderTextColor={styles.placeholder.color}
              onChangeText={onChange}
              onBlur={onBlur}
              onSubmitEditing={Keyboard.dismiss}
              style={styles.input}
              {...props}
            />
          </View>
          <View style={styles.errorWrapper}>
            <ShowIf condition={!!error}>
              <Text style={styles.errorMessage}>
                {error?.message || 'Error'}
              </Text>
            </ShowIf>
          </View>
        </>
      )}
    />
  );
}
