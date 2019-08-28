
import { Platform, StyleSheet } from 'react-native';
import { System } from '../../../common';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f4'
  },
  modalContainer: {
    flex: 1,
    margin: 10,
    marginTop: Platform.OS === System.IOS ? System.window.dangerAreaTopHeight : 10,
    marginBottom: Platform.OS === System.IOS ? System.window.dangerAreaBottomHeight : 10,
    backgroundColor: 'white',
    borderRadius: 3,
    shadowColor: 'gray',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    padding: 3
  },
  themeItem: {
    flex: 1,
    height: 120,
    margin: 3,
    padding: 3,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16
  }
});
