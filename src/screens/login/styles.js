const React = require("react-native");
import { scaleVertical } from '../../utils/scale';
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
  // imageContainer: {
  //   flex: 1,
  //   width: null,
  //   height: null
  // },
  // logoContainer: {
  //   flex: 1,
  //   marginTop: deviceHeight / 8,
  //   marginBottom: 30
  // },
  // logo: {
  //   position: "absolute",
  //   left: Platform.OS === "android" ? 40 : 50,
  //   top: Platform.OS === "android" ? 35 : 60,
  //   width: 280,
  //   height: 100
  // },
  // text: {
  //   color: "#D8D8D8",
  //   bottom: 6,
  //   marginTop: 5
  // },
  // screen: {
	// 	padding: scaleVertical(16),
	// 	flex: 1,
	// 	justifyContent: 'space-between'
  // },
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 20
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
},
textInput: {
  flex: 1,
  marginTop: Platform.OS === 'ios' ? 0 : -12,
  paddingLeft: 10,
  color: '#05375a',
  fontSize: 16
},
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
},
  button: {
    alignItems: 'center',
    marginTop: 50 
},
signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},
textSign: {
    fontSize: 18,
    fontWeight: 'bold'
}
};
