import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Body,
  Left,
  Right,
  Button,
  Icon,
  Title,
  Subtitle,
  View,
  Text,
  Picker,
  List,
  ListItem,
  Form,
  Input,
  Label,
  Item,
} from 'native-base';
import {TouchableOpacity, Dimensions} from 'react-native';
import Moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import asyncStorageHelper from '../../services/AsyncStorageHelper';
import config from '../../constants/config';
const deviceWidth = Dimensions.get('window').width - 40;

class RegisterByDay extends Component {
  state = {
    token: '',
    user: [],
    LoaiDangKy: [],
    PhepCon: 0,
    LyDoNghi: '',
    fromDate: new Date(),
    fromSelected: true,
    toDate: new Date(),
    fromTime: 'CaSang',
    toTime: 'CaChieu',
    message: '',
    TrangThai: '',
    show: false,
    mode: 'date',
  };

  async componentDidMount() {
    try {
      const token = await asyncStorageHelper.get('userToken');
      this.setState({token: token});
      const userInfo = await asyncStorageHelper.get('userInfo');
      this.setState({user: userInfo});
      const id = this.props.navigation.getParam('id', 1);
      await this.getLoaiDangKy(token, id);
      if (this.state.LoaiDangKy.Code == 'PHEP') {
        await this.getPhepCon(token);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  getLoaiDangKy = async (token, id) => {
    await fetch(
      config.baseURL + config.ApiDangKyNghiURL + 'LoaiDangKyDetail?id=' + id,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + token,
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({LoaiDangKy: responseJson});
      })
      .then(() => {})
      .catch(err => {
        this.setState({message: err.message});
      });
  };

  getPhepCon = async token => {
    await fetch(config.baseURL + config.ApiDangKyNghiURL + 'GetSoNgayPhepCon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token,
      },
      body: JSON.stringify({
        ID_TrungTam: this.state.user.ID_TrungTam,
        Thang: 12,
        Nam: this.state.fromDate.getFullYear(),
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({PhepCon: responseJson});
      })
      .then(() => {})
      .catch(err => {
        this.setState({message: err.message});
      });
  };

  onCreateSubmit = async () => {
    await this.CreatePersonal();
    if (this.state.TrangThai == '') {
      alert('Đăng ký thành công');
      this.props.navigation.pop();
    } else {
      alert(this.state.TrangThai);
    }
  };

  async CreatePersonal() {
    await fetch(config.baseURL + config.ApiDangKyNghiURL + 'CreatePersonal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + this.state.token,
      },
      body: JSON.stringify({
        ID_Portal_TicketType: this.state.LoaiDangKy.Portal_TicketType_ID,
        ID_TrungTam: this.state.user.ID_TrungTam,
        FromDate: this.state.fromDate,
        TuNgay: '',
        FromShift: this.state.fromTime,
        FromTime: '',
        ToDate: this.state.toDate,
        DenNgay: '',
        ToShift: this.state.toTime,
        ToTime: '',
        Days: 0,
        BuoiNghiNgan: '',
        CaNghi: '',
        NgayLamBu: '',
        TicketContent: this.state.LyDoNghi,
        UserInform: [],
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({TrangThai: responseJson});
      })
      .then(() => {})
      .catch(err => {
        this.setState({TrangThai: err.message});
      });
  }

  datepicker = isFrom => {
    this.setState({fromSelected: isFrom});
    this.show('date');
  };

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  };

  setDate = (event, date) => {
    if (this.state.fromSelected) {
      date = date || this.state.fromDate;

      this.setState({
        show: Platform.OS === 'ios' ? true : false,
        fromDate: date,
      });
    } else {
      date = date || this.state.toDate;

      this.setState({
        show: Platform.OS === 'ios' ? true : false,
        toDate: date,
      });
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{this.state.LoaiDangKy.Name}</Title>
            <Subtitle>{this.state.LoaiDangKy.Description}</Subtitle>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <List>
            {this.state.LoaiDangKy.Code === 'PHEP' && (
              <ListItem>
                <Left style={styles.Left}>
                  <Text style={styles.textLeft}>Phép còn</Text>
                </Left>
                <Right style={styles.right}>
                  <Text style={{color: 'red'}}>{this.state.PhepCon}</Text>
                </Right>
              </ListItem>
            )}
            <ListItem>
              <View>
                <Text>Bắt đầu từ</Text>
              </View>
            </ListItem>
            <ListItem>
              <View>
                <Picker
                  mode="dropdown"
                  iosHeader="Chọn ca"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{width: deviceWidth, height: 40}}
                  selectedValue={this.state.fromTime}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({fromTime: itemValue})
                  }>
                  <Picker.Item label="Buổi sáng" value="CaSang" />
                  <Picker.Item label="Buổi chiều" value="CaChieu" />
                </Picker>
              </View>
            </ListItem>
            <ListItem>
              <View>
                <TouchableOpacity onPress={() => this.datepicker(true)}>
                  <View>
                    <Text>
                      {Moment(this.state.fromDate).format('DD/MM/YYYY')}
                    </Text>
                  </View>
                </TouchableOpacity>
                {this.state.show && (
                  <DateTimePicker
                    value={this.state.fromDate}
                    mode={this.state.mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.setDate}
                  />
                )}
              </View>
            </ListItem>
            <ListItem>
              <View>
                <Text>Đến hết</Text>
              </View>
            </ListItem>
            <ListItem>
              <View>
                <Picker
                  mode="dropdown"
                  iosHeader="Chọn ca"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{width: deviceWidth, height: 40}}
                  selectedValue={this.state.toTime}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({toTime: itemValue})
                  }>
                  <Picker.Item label="Buổi sáng" value="CaSang" />
                  <Picker.Item label="Buổi chiều" value="CaChieu" />
                </Picker>
              </View>
            </ListItem>
            <ListItem>
              <View>
                <TouchableOpacity onPress={() => this.datepicker(false)}>
                  <View>
                    <Text>
                      {Moment(this.state.toDate).format('DD/MM/YYYY')}
                    </Text>
                  </View>
                </TouchableOpacity>
                {this.state.show && (
                  <DateTimePicker
                    value={this.state.toDate}
                    mode={this.state.mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.setDate}
                  />
                )}
              </View>
            </ListItem>
            <Form>
              <Item floatingLabel>
                <Label>Lý do</Label>
                <Input onChangeText={v => this.handleChange('LyDoNghi', v)} />
              </Item>
            </Form>
            <View>
              <View>
                <Button
                  primary
                  full
                  onPress={() => this.onCreateSubmit()}
                  style={{marginTop: 10}}>
                  {this.state.registering ? (
                    <Spinner color="white" />
                  ) : (
                    <Text>Đăng ký</Text>
                  )}
                </Button>
              </View>
            </View>
          </List>
        </Content>
      </Container>
    );
  }

  handleChange = (name, val) => this.setState({[name]: val});
}

export default RegisterByDay;
