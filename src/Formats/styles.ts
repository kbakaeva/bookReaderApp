import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  options: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  currentFormat: {
    textAlign: 'center',
  },
  book_btn: {
    backgroundColor: 'teal',
    borderWidth: 1,
    borderRadius: 5,
    width: '30%',
    height: 60,
    padding: 5,
    justifyContent: 'center',
  },
  btn_text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
  },
});
