import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    // marginBottom: -8,
    // marginLeft: -4,
    paddingHorizontal: 5,
    fontSize: 20,
    color: 'black',
  },
  editableInput: {
    color: 'black',
  },
  icon: {
    marginLeft: 8,
    alignSelf: 'center',
  },
  placeholder: {
    color: 'black',
  },
  errorWrapper: {
    marginTop: 5,
    height: 20,
  },
  message: {
    fontSize: 10,
    color: 'black',
    alignSelf: 'stretch',
  },
  errorMessage: {
    fontSize: 14,
    color: 'red',
    alignSelf: 'stretch',
  },
});
