import React, {Component} from 'react';
import {
  Container,
  Header,
  Body,
  Button,
  Icon,
  Title,
  Content,
  Left,
  Right,
  Text,
  Card,
  CardItem,
  View,
  Picker,
} from 'native-base';
import styles from './styles';
import asyncStorageHelper from '../../services/AsyncStorageHelper';
import config from '../../constants/config';
import {months} from '../../utils/months';
import Moment from 'moment';

class TimeKeepingInfo extends Component {
  state = {
    Nam: [],
    Thang: months,
    token: '',
    user: [],
    NamSelected: new Date().getFullYear().toString(),
    ThangSelected: (new Date().getMonth() + 1).toString(),
    ChamCong: [],
  };

  async componentDidMount() {
    try {
      const token = await asyncStorageHelper.get('userToken');
      this.setState({token: token});
      const userInfo = await asyncStorageHelper.get('userInfo');
      this.setState({user: userInfo});
      await this.getNam(token);
      await this.getBangChamCong(token, this.state.NamSelected, this.state.ThangSelected);
    } catch (error) {
      console.log(error.message);
    }
  }

  getNam = async (token) => {
    await fetch(config.baseURL + config.ApiDanhMucURL + 'GetNam', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({Nam: responseJson});
      })
      .then(() => {})
      .catch((err) => {
        this.setState({message: err.message});
      });
  };

  getBangChamCong = async (token, nam, thang) => {
    await fetch(config.baseURL + config.ApiChamCongURL + 'GetChamCongThang', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token,
      },
      body: JSON.stringify({
        ID_TrungTam: this.state.user.ID_TrungTam,
        Nam: nam,
        Thang: thang,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ChamCong: responseJson});
      })
      .then(() => {})
      .catch((err) => {
        this.setState({message: err.message});
        console.log(err.message);
      });
  };

  async pickerNamValueChange(itemValue) {
    this.setState({NamSelected: itemValue});
    await this.getBangChamCong(
      this.state.token,
      itemValue,
      this.state.ThangSelected,
    );
  }

  async pickerThangValueChange(itemValue) {
    this.setState({ThangSelected: itemValue});
    await this.getBangChamCong(
      this.state.token,
      this.state.NamSelected,
      itemValue,
    );
  }

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
            <Title> CHẤM CÔNG</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <View style={styles.content}>
            <Text>Năm</Text>
            <Picker
              mode="dropdown"
              iosHeader="Chọn năm"
              iosIcon={<Icon name="arrow-down" />}
              style={{width: undefined}}
              selectedValue={this.state.NamSelected}
              onValueChange={(itemValue) =>
                this.pickerNamValueChange(itemValue)
              }>
              {this.state.Nam.map((i, index) => (
                <Picker.Item key={index} label={i.Text} value={i.Value} />
              ))}
            </Picker>
          </View>
          <View style={styles.separator} />
          <View style={styles.content}>
            <Text>Tháng</Text>
            <Picker
              mode="dropdown"
              iosHeader="Chọn tháng"
              iosIcon={<Icon name="arrow-down" />}
              style={{width: undefined}}
              selectedValue={this.state.ThangSelected}
              onValueChange={(itemValue) =>
                this.pickerThangValueChange(itemValue)
              }>
              {this.state.Thang.map((i, index) => (
                <Picker.Item key={index} label={i.Text} value={i.Value} />
              ))}
            </Picker>
          </View>
          {this.state.ChamCong.map((item, index) => {
            return (
              <Card key={index}>
                <CardItem header bordered>
                  <Text>{Moment(item.Ngay).format('DD/MM/YYYY')}</Text>
                </CardItem>
                <CardItem bordered>
                  <Left style={styles.left}>
                    <Text style={styles.textLeft}>Giờ vào</Text>
                  </Left>
                  <Right style={styles.right}>
                    <Text>{item.GioVaoThucTe}</Text>
                  </Right>
                </CardItem>
                <CardItem bordered>
                  <Left style={styles.left}>
                    <Text style={styles.textLeft}>Giờ ra</Text>
                  </Left>
                  <Right style={styles.right}>
                    <Text>{item.GioRaThucTe}</Text>
                  </Right>
                </CardItem>
                <CardItem bordered>
                  <Left style={styles.left}>
                    <Text style={styles.textLeft}>Ký hiệu</Text>
                  </Left>
                  <Right style={styles.right}>
                    <Text>{item.MaKyHieuChamCong}</Text>
                  </Right>
                </CardItem>
              </Card>
            );
          })}
        </Content>
      </Container>
    );
  }
}

export default TimeKeepingInfo;
