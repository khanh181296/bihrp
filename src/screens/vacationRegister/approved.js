import React, {Component} from 'react';
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Thumbnail,
  Body,
  Left,
  Right,
  Spinner,
  Button,
  Icon,
} from 'native-base';
import {TouchableOpacity, Modal} from 'react-native';
import Moment from 'moment';
import styles from './styles';
import asyncStorageHelper from '../../services/AsyncStorageHelper';
import config from '../../constants/config';

class Approved extends Component {
  state = {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    token: '',
    user: [],
    data: [],
    isLoading: false,
    photo: require('../../../assets/NoAvatar.jpg'),
  };

  async componentDidMount() {
    try {
      const token = await asyncStorageHelper.get('userToken');
      this.setState({token: token});
      const userInfo = await asyncStorageHelper.get('userInfo');
      this.setState({user: userInfo});
      await this.getData(token, this.state.month, this.state.year);
    } catch (error) {
      console.log(error.message);
    }
  }

  getData = async (token, month, year) => {
    this.setState({isLoading: true});
    await fetch(config.baseURL + config.ApiDangKyNghiURL + 'AssignedApprover', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token,
      },
      body: JSON.stringify({
        ID_TrungTam: this.state.user.ID_TrungTam,
        ID_Portal_NhomQuyen: this.state.user.ID_Portal_NhomQuyen,
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

  render = () => {
    if (!this.state.isLoading) {
      return (
        <Container style={styles.container}>
          <Content padder>
            <List
              dataArray={this.state.data}
              renderRow={item => (
                <ListItem avatar>
                  <Left>
                    {item.UserCreate_Image === '' && (
                      <Thumbnail small source={this.state.photo} />
                    )}
                    {item.UserCreate_Image !== '' && (
                      <Thumbnail
                        small
                        source={{uri: config.AvatarURL + item.UserCreate_Image}}
                      />
                    )}
                  </Left>
                  <Body>
                    <Text>{item.TicketTypeName}</Text>
                    <Text note>
                      {'Người tạo: '}
                      {item.UserCreate}
                    </Text>
                    {!!item.TicketContent && (
                      <Text note>
                        {'Lý do: '}
                        {item.TicketContent}
                      </Text>
                    )}
                    <Text note>
                      {'Ngày: '}
                      {item.Tu_Den}
                    </Text>
                    <Text note>
                      {'Thời gian: '}
                      {item.SoNgay}
                    </Text>
                    {!!item.ActionContent && (
                      <Text note>
                        {'ND duyệt: '}
                        {item.ActionContent}
                      </Text>
                    )}
                  </Body>
                  <Right>
                    <Text note>{item.TrangThai}</Text>
                    <Text note>{Moment(item.CreateDate).fromNow()}</Text>
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
                  </Right>
                </ListItem>
              )}
            />
          </Content>
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
  };
}

export default Approved;
