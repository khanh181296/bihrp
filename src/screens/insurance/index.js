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
} from 'native-base';
import styles from './styles';
import asyncStorageHelper from '../../services/AsyncStorageHelper';
import config from '../../constants/config';

class Insurance extends Component {
  state = {
    info: [],
    data: [],
  };

  async componentDidMount() {
    try {
      const token = await asyncStorageHelper.get('userToken');
      await this.getData(token);
      await this.getInfo(token);
    } catch (error) {
      console.log(error.message);
    }
  }

  getData = async (token) => {
    await fetch(config.baseURL + config.ApiAccountURL + 'QuaTrinhBHXH', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token,
      },
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

  getInfo = async (token) => {
    await fetch(config.baseURL + config.ApiAccountURL + 'ThongTinBaoHiem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({info: responseJson});
      })
      .then(() => {})
      .catch((err) => {
        this.setState({message: err.message});
      });
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
            <Title> BẢO HIỂM</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          {this.state.info !== null && (
            <Card>
              <CardItem header bordered>
                <Text>Thông tin sổ</Text>
              </CardItem>
              <CardItem bordered>
                <Left style={styles.left}>
                  <Text style={styles.textLeft}>Số sổ BHXH</Text>
                </Left>
                <Right style={styles.right}>
                  <Text>{this.state.info.SoSoBHXH}</Text>
                </Right>
              </CardItem>
              <CardItem bordered>
                <Left style={styles.left}>
                  <Text style={styles.textLeft}>Ngày cấp</Text>
                </Left>
                <Right style={styles.right}>
                  <Text>{this.state.info.NgayCapSoBHXH}</Text>
                </Right>
              </CardItem>
              <CardItem bordered>
                <Left style={styles.left}>
                  <Text style={styles.textLeft}>Nơi cấp</Text>
                </Left>
                <Right style={styles.right}>
                  <Text>{this.state.info.NoiCapSoBHXH}</Text>
                </Right>
              </CardItem>
              <CardItem bordered>
                <Left style={styles.left}>
                  <Text style={styles.textLeft}>Trạng thái sổ</Text>
                </Left>
                <Right style={styles.right}>
                  <Text>{this.state.info.TenTrangThaiSBHXH}</Text>
                </Right>
              </CardItem>
            </Card>
          )}
          {this.state.data.map((item, index) => {
            return (
              <Card key={index}>
                <CardItem header bordered>
                  <Text>{item.TenLoaiBienDongBaoHiem}</Text>
                </CardItem>
                <CardItem bordered>
                  <Left style={styles.left}>
                    <Text style={styles.textLeft}>Tháng báo cáo</Text>
                  </Left>
                  <Right style={styles.right}>
                    <Text>{item.strThangBaoCao}</Text>
                  </Right>
                </CardItem>
                <CardItem bordered>
                  <Left style={styles.left}>
                    <Text style={styles.textLeft}>Đóng từ tháng</Text>
                  </Left>
                  <Right style={styles.right}>
                    <Text>{item.strDongTuThangNam}</Text>
                  </Right>
                </CardItem>
                {!!item.TienLuong && (
                  <CardItem bordered>
                    <Left style={styles.left}>
                      <Text style={styles.textLeft}>Mức đóng</Text>
                    </Left>
                    <Right style={styles.right}>
                      <Text>
                        {item.TienLuong.toString().replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ',',
                        )}
                      </Text>
                    </Right>
                  </CardItem>
                )}
                {!!item.HeSoLuong && (
                  <CardItem bordered>
                    <Left style={styles.left}>
                      <Text style={styles.textLeft}>Hệ số đóng</Text>
                    </Left>
                    <Right style={styles.right}>
                      <Text>
                        {item.HeSoLuong.toString().replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ',',
                        )}
                      </Text>
                    </Right>
                  </CardItem>
                )}
                <CardItem bordered>
                  <Left style={styles.left}>
                    <Text style={styles.textLeft}>Chức danh</Text>
                  </Left>
                  <Right style={styles.right}>
                    <Text>{item.ChucDanhNgheNghiep}</Text>
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

export default Insurance;
