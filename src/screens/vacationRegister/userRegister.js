import React, {Component} from 'react';
import {
  Container,
  Content,
  Text,
  View,
  Fab,
  Button,
  Icon,
  List,
  ListItem,
  Card,
  CardItem,
  Left,
  Right,
  Spinner,
} from 'native-base';
import {TouchableOpacity, Modal} from 'react-native';
import Moment from 'moment';
import styles from './styles';
import asyncStorageHelper from '../../services/AsyncStorageHelper';
import config from '../../constants/config';

class UserRegister extends Component {
  state = {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    token: '',
    user: [],
    data: [],
    ticketType: [],
    modalVisible: false,
    active: false,
    isLoading: false,
  };

  async componentDidMount() {
    try {
      const token = await asyncStorageHelper.get('userToken');
      this.setState({token: token});
      const userInfo = await asyncStorageHelper.get('userInfo');
      this.setState({user: userInfo});
      await this.getTicketType(token);
      await this.props.navigation.addListener('willFocus', () => {
        this.getData(token, this.state.month, this.state.year);
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  getData = async (token, month, year) => {
    this.setState({isLoading: true});
    await fetch(config.baseURL + config.ApiDangKyNghiURL + 'UserCreate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token,
      },
      body: JSON.stringify({
        ID_TrungTam: this.state.user.ID_TrungTam,
        TuNgay: new Date(year, month - 1, 1),
        DenNgay: Moment(new Date(year, month - 1, 1))
          .add(1, 'M')
          .add(-1, 'd'),
        Lang: config.Language,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({data: responseJson});
      })
      .then(() => {})
      .catch(err => {
        this.setState({message: err.message});
      });
    this.setState({isLoading: false});
  };

  getTicketType = async token => {
    await fetch(config.baseURL + config.ApiDangKyNghiURL + 'LoaiDangKy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ticketType: responseJson});
      })
      .then(() => {})
      .catch(err => {
        this.setState({message: err.message});
      });
  };

  setModalVisible(visible) {
    this.setState({active: visible, modalVisible: visible});
  }

  onItemPressed = item => {
    this.setState({active: false});
    this.setModalVisible(false);
    this.props.navigation.navigate('RegisterByDay', {
      id: item.Portal_TicketType_ID,
      byDay: item.ByDay,
    });
  };

  render() {
    if (!this.state.isLoading) {
      return (
        <Container style={styles.container}>
          <View style={{flex: 0.1}}>
            <Fab
              active={this.state.active}
              direction="down"
              containerStyle={{top: 5}}
              style={{backgroundColor: '#34A34F'}}
              position="topRight"
              onPress={() => this.setModalVisible(!this.state.active)}>
              <Icon name="plus" type="FontAwesome" />
            </Fab>
          </View>
          <Content padder>
            {this.state.data.map((item, index) => {
              return (
                <Card key={index}>
                  <CardItem header bordered>
                    <Text>{item.TicketTypeName}</Text>
                  </CardItem>
                  {!!item.TicketContent && (
                    <CardItem bordered>
                      <Left style={styles.left}>
                        <Text style={styles.textLeft}>Lý do</Text>
                      </Left>
                      <Right style={styles.right}>
                        <Text>{item.TicketContent}</Text>
                      </Right>
                    </CardItem>
                  )}
                  <CardItem bordered>
                    <Left style={styles.left}>
                      <Text style={styles.textLeft}>Ngày</Text>
                    </Left>
                    <Right style={styles.right}>
                      <Text>{item.Tu_Den}</Text>
                    </Right>
                  </CardItem>
                  <CardItem bordered>
                    <Left style={styles.left}>
                      <Text style={styles.textLeft}>Thời gian</Text>
                    </Left>
                    <Right style={styles.right}>
                      <Text>{item.SoNgay}</Text>
                    </Right>
                  </CardItem>
                  {!!item.TrangThai && (
                    <CardItem bordered>
                      <Left style={styles.left}>
                        <Text style={styles.textLeft}>Trạng thái</Text>
                      </Left>
                      <Right style={styles.right}>
                        <Text>{item.TrangThai}</Text>
                      </Right>
                    </CardItem>
                  )}
                  <CardItem footer bordered>
                    <Left style={styles.left}>
                      <Button
                        small
                        info
                        onPress={() => {
                          this.props.navigation.navigate('TicketDetail', {
                            id: item.Portal_TicketInfo_ID,
                          });
                        }}>
                        <Icon name="info-circle" type="FontAwesome" />
                      </Button>
                    </Left>
                    <Right style={styles.right}>
                      <Text>{Moment(item.CreateDate).fromNow()}</Text>
                    </Right>
                  </CardItem>
                </Card>
              );
            })}
          </Content>

          <Modal
            animationType={'fade'}
            transparent={true}
            onRequestClose={() => this.setModalVisible(false)}
            visible={this.state.modalVisible}>
            <View style={styles.popupOverlay}>
              <View style={styles.popup}>
                <View style={styles.popupContent}>
                  <List
                    key={0}
                    dataArray={this.state.ticketType}
                    renderRow={(item, index) => (
                      <ListItem
                        key={index}
                        onPress={() => this.onItemPressed(item)}>
                        <View>
                          <Text>{item.Name}</Text>
                        </View>
                      </ListItem>
                    )}
                  />
                </View>
                <View style={styles.popupButtons}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setModalVisible(false);
                    }}
                    style={styles.btnClose}>
                    <Text style={styles.txtClose}>Đóng</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </Container>
      );
    } else {
      return (
        <Container style={styles.container}>
          <Content padder>
            <Spinner color="#03A9F4" />
          </Content>
        </Container>
      );
    }
  }
}

export default UserRegister;
