import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Text,
  List,
  ListItem,
  Thumbnail,
  Body,
  Icon,
  Button,
  Title,
  Left,
  Right,
  Spinner,
} from 'native-base';
import Moment from 'moment';
import styles from './styles';
import asyncStorageHelper from '../../services/AsyncStorageHelper';
import config from '../../constants/config';

class TicketDetail extends Component {
  state = {
    data: [],
    isLoading: false,
    photo: require('../../../assets/NoAvatar.jpg'),
  };

  async componentDidMount() {
    try {
      const token = await asyncStorageHelper.get('userToken');
      const id = this.props.navigation.getParam('id', 1);
      await this.getData(token, id, config.Language);
    } catch (error) {
      console.log(error.message);
    }
  }

  getData = async (token, id, Lang) => {
    this.setState({isLoading: true});
    await fetch(config.baseURL + config.ApiDangKyNghiURL + 'DetailInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token,
      },
      body: JSON.stringify({
        ID_Portal_TicketInfo: id,
        Lang: Lang,
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
          <Header>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>CHI TIẾT ĐƠN</Title>
            </Body>
            <Right />
          </Header>
          <Content padder>
            <List
              dataArray={this.state.data}
              renderRow={item => (
                <ListItem avatar>
                  <Left>
                    {item.ImageCanBo === '' && (
                      <Thumbnail small source={this.state.photo} />
                    )}
                    {item.ImageCanBo !== '' && (
                      <Thumbnail
                        small
                        source={{uri: config.AvatarURL + item.ImageCanBo}}
                      />
                    )}
                  </Left>
                  <Body>
                    <Text>
                      {item.MaCanBo} - {item.HoTen}
                    </Text>
                    {!!item.TenLoaiDangKy && (
                      <Text note>
                        {'Loại: '}
                        {item.TenLoaiDangKy}
                      </Text>
                    )}
                    {!!item.DetailContent && (
                      <Text note>
                        {'Lý do: '}
                        {item.DetailContent}
                      </Text>
                    )}
                    {!!item.Tu_Den && (
                      <Text note>
                        {'Ngày: '}
                        {item.Tu_Den}
                      </Text>
                    )}
                    {!!item.SoNgay && (
                      <Text note>
                        {'Thời gian: '}
                        {item.SoNgay}
                      </Text>
                    )}
                  </Body>
                  <Right>
                    <Text note>{item.Action}</Text>
                    <Text note>{Moment(item.CreateDate).fromNow()}</Text>
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

export default TicketDetail;
