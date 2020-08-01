const React = require('react-native');

const {StyleSheet} = React;

export default {
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  left: {
    flex: 0.35,
  },
  left6: {
    flex: 0.65,
  },
  textLeft: {
    fontSize: 13,
  },
  right: {
    flex: 0.65,
  },
  right4: {
    flex: 0.35,
  },
  text: {
    alignSelf: 'center',
    marginBottom: 7,
  },
  mb: {
    marginBottom: 25,
  },
  content: {
    marginLeft: 0,
    flex: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E6E6E6',
  },
  popup: {
    backgroundColor: 'white',
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: '#00000057',
    flex: 1,
    marginTop: 30,
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    //height: 300,
  },
  popupHeader: {
    marginBottom: 45,
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
  },
  popupButton: {
    flex: 1,
    marginVertical: 16,
  },
  btnClose: {
    height: 20,
    backgroundColor: '#20b2aa',
    marginLeft: 20,
  },
  txtClose: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
};
