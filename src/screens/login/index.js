import React, {Component} from 'react';
import {
  ImageBackground,
  View,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {
  Container,
  Content,
  Button,
  Item,
  Input,
  Form,
  Text,
  H3,
  Spinner,
} from 'native-base';
import {scaleVertical} from '../../utils/scale';
import styles from './styles';
import config from '../../constants/config';
import asyncStorageHelper from '../../services/AsyncStorageHelper';
import firebase from 'react-native-firebase';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient  from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';


const loginBg = require('../../../assets/login.jpg');

class Login extends Component {
  state = {
    isLoggingIn: false,
    message: '',
    token: '',
    userInfo: '',
    username: '',
		password: '',
		fcmToken: '',
  };

  constructor(props) {
    super(props);
    this.bootstrapAsync();
	}
	
	async componentDidMount() { 
		// let fcmToken = await asyncStorageHelper.get('fcmToken');
		let fcmToken = await firebase.messaging().getToken();
		this.setState({fcmToken: fcmToken});
	}

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
		const userToken = await asyncStorageHelper.get('userToken');
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'Home' : 'Login');
  };

  handleChange = (name, val) => this.setState({[name]: val});

  signIn = () => {
    this.userLogin();
  };

  signInAsync() {
    asyncStorageHelper.set('userToken', this.state.token);
    asyncStorageHelper.set('userInfo', this.state.userInfo);
    this.props.navigation.navigate('Home');
  }

  userLogin = async () => {
    this.setState({isLoggingIn: true, message: ''});

    var params = {
      grant_type: 'password',
      username: this.state.username,
      password: this.state.password,
    };

    var formBody = [];
    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    await fetch(config.baseURL + config.ApiTokenURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        if (responseJson.token_type === 'bearer') {
          await this.getUserLogin(
            responseJson.token_type,
            responseJson.access_token,
          );
          await this.saveFcmToken(responseJson.access_token);
        } else {
          this.setState({message: responseJson.error_description});
        }
      })
      .then(() => {
        this.setState({isLoggingIn: false});
      })
      .catch((err) => {
        this.setState({isLoggingIn: false});
        this.setState({message: err.message});
      });
  };

  getUserLogin = async (token_type, token) => {
    var proceed = false;
    await fetch(config.baseURL + config.ApiAccountURL + 'UserInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token_type + ' ' + token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({token: token});
        this.setState({userInfo: responseJson});
        proceed = true;
      })
      .then(() => {
        if (proceed) this.signInAsync();
        this.setState({isLoggingIn: false});
      })
      .catch((err) => {
        this.setState({isLoggingIn: false});
        this.setState({message: err.message});
      });
  };

  saveFcmToken = async (token) => {
    await fetch(config.baseURL + config.ApiFcmURL + 'InsertUpdate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token,
      },
      body: JSON.stringify({
        token: this.state.fcmToken,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({data: responseJson});
      })
      .then(() => {})
      .catch((err) => {
        this.setState({message: err.message});
      });
  };

  render() {
    return (
      // <Container padder>
      //   <StatusBar barStyle="light-content" />
      //   <ImageBackground source={loginBg} style={styles.imageContainer}>
      //     <ScrollView>
      //       <KeyboardAvoidingView behavior="position" style={styles.screen}>
      //         <View
      //           style={{
      //             alignItems: 'center',
      //             backgroundColor: 'transparent',
      //             paddingBottom: scaleVertical(10),
      //             justifyContent: 'space-between',
      //           }}>
      //           <H3 style={styles.text}>BiHRP</H3>
      //           <View style={{marginTop: 8}} />
      //           <H3 style={styles.text}>THÔNG TIN NHÂN SỰ</H3>
      //           <View style={{marginTop: 8}} />
      //         </View>
      //         <Content>
      //           <Form>
        <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
             <View style={styles.header}>
                 <Text style={styles.text_header}>BIHRP</Text>
                 <Text style={styles.text_header}>THÔNG TIN NHÂN SỰ</Text>
                   </View>
                  <View style={styles.footer} >
                  <Text style={styles.text_footer} >Username</Text>
                  <View style={styles.action}>
                    <FontAwesome
                        name = "user-o"
                        color= "#05375a"
                        size={20}
                    />
                    <TextInput
                      placeholder="Your Username"
                      style={styles.textInput}
                      autoCapitalize="none"
                      // keyboardType="email-address"
                      onChangeText={(v) => this.handleChange('username', v)}
                    />
                    <Feather
                      name="check-circle"
                      color="green"
                      size={20}
                    />
                  </View>

                  <Text style={styles.text_signin, {
                    marginTop:35 
                  }} >Password</Text>
                  <View style={styles.action}>
                    <FontAwesome
                        name = "lock"
                        color= "#05375a"
                        size={20}
                    />
                    <TextInput
                       placeholder="Your Password"
                       secureTextEntry = {true}
                       style={styles.textInput}
                       onChangeText={(v) => this.handleChange('password', v)}
                    />
                    <Feather
                      name="eye-off"
                      color="green"
                      size={20}
                    />
                  </View>
                {!!this.state.message && (
                  <Text style={{fontSize: 14, color: 'red', padding: 5}}>
                    {this.state.message}
                  </Text>
                )}
                  <TouchableOpacity>
                <Text style={{color: '#009387', marginTop:15}}>Forgot password?</Text>
                 </TouchableOpacity>
                     {/* transparent full onPress={this.forgotPassword}  */}
                     <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                      onPress={this.signIn}>
                         <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                      {this.state.isLoggingIn ? (
                        <Spinner color="white" />
                      ) : (
                        <Text style={[styles.textSign, {
                          color:'#fff'
                      }]}>Sign In</Text>
                      )}
                      </LinearGradient>
                    </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
                </View>
                </View>
                </View>
      //          </Form>
      //         </Content>
      //       </KeyboardAvoidingView>
      //     </ScrollView>
      //   </ImageBackground>
      // </Container> 
    );
  }
}

export default Login;
