import React, {Component} from 'react';
import {
  Container,
  Content,
  View,
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
  Radio,
  Form,
  Item,
  Label,
  Input,
} from 'native-base';
import {TouchableOpacity, Modal, Dimensions, Alert} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import Moment from 'moment';
import styles from './styles';
import asyncStorageHelper from '../../services/AsyncStorageHelper';
import config from '../../constants/config';

class WaitingApproval extends Component {
  height = Math.round(Dimensions.get('window').height);
  state = {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    token: '',
    user: [],
    data: [],
    isLoading: false,
    photo: require('../../../assets/NoAvatar.jpg'),
    modalVisible: false,
    modalLoading: false,
    isDongY: true,
    NoiDungDuyet: '',
    ID_Portal_TicketInfo: 0,
    selectedItemsMultipleDonVi: [],
    toggledSelectMultipleDonVi: false,
    ListDonVi: [],
    selectedItemsMultipleThongBao: [],
    toggledSelectMultipleThongBao: false,
    ListThongBao: [],
    duyetThanhCong: false,
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
    await fetch(
      config.baseURL + config.ApiDangKyNghiURL + 'WaitingForApproval',
      {
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
      },
    )
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

  getDonVi = ID_TrungTam => {
    try {
      fetch(
        config.baseURL +
          config.ApiDangKyNghiURL +
          'GetDonVi?ID_TrungTam=' +
          ID_TrungTam,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'bearer ' + this.state.token,
          },
        },
      )
        .then(response => response.json())
        .then(responseJson => {
          this.setState(previousState => {
            return {
              ...previousState,
              ListDonVi: responseJson,
              modalLoading: false,
            };
          });
        })
        .then(() => {})
        .catch(err => {
          this.setState({message: err.message});
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  getThongBao = id => {
    try {
      fetch(
        config.baseURL + config.ApiDangKyNghiURL + 'GetUserInForm?id=' + id,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'bearer ' + this.state.token,
          },
        },
      )
        .then(response => response.json())
        .then(responseJson => {
          this.setState(previousState => {
            return {
              ...previousState,
              ListThongBao: responseJson,
              modalLoading: false,
            };
          });
        })
        .then(() => {})
        .catch(err => {
          this.setState({message: err.message});
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  duyetDangKy = async () => {
    try {
      await fetch(config.baseURL + config.ApiDangKyNghiURL + 'DuyetDangKy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + this.state.token,
        },
        body: JSON.stringify({
          ID_Portal_TicketInfo: this.state.ID_Portal_TicketInfo,
          ActionContent: this.state.NoiDungDuyet,
          UserInform: this.state.selectedItemsMultipleThongBao,
          Action: this.state.isDongY ? 'Agree' : 'Reject',
          Selected: '',
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson === '') {
            this.setState(previousState => {
              return {
                ...previousState,
                duyetThanhCong: true,
                modalLoading: false,
              };
            });
          }
        })
        .then(() => {})
        .catch(err => {
          this.setState({message: err.message});
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handleChange = (name, val) => this.setState({[name]: val});

  toggleSwitch1 = () => {
    this.setState({isDongY: true});
  };

  toggleSwitch2 = () => {
    this.setState({isDongY: false});
  };

  onSelectedItemsChangeDonVi = selectedItems => {
    this.setState(
      previousState => {
        return {
          ...previousState,
          selectedItemsMultipleDonVi: selectedItems,
        };
      },
      () => {
        var id = '';
        if (selectedItems.length > 0) {
          selectedItems.forEach(element => {
            id += element + ',';
          });
          id = id.slice(0, -1);
        } else {
          this.setState(previousState => {
            return {
              ...previousState,
              selectedItemsMultipleThongBao: [],
              ListThongBao: [],
            };
          });
        }
        this.getThongBao(id);
      },
    );
  };

  onSelectedItemsChangeThongBao = selectedItems => {
    this.setState(previousState => {
      return {
        ...previousState,
        selectedItemsMultipleThongBao: selectedItems,
      };
    });
  };

  onToggleListMultipleDonVi = () => {
    this.setState(previousState => {
      return {
        ...previousState,
        toggledSelectMultipleDonVi: true,
      };
    });
  };

  onToggleListMultipleThongBao = () => {
    this.setState(previousState => {
      return {
        ...previousState,
        toggledSelectMultipleThongBao: true,
      };
    });
  };

  toggleModal = (item = {}) => {
    if (!this.state.modalVisible) {
      this.getDonVi(item.ID_TrungTam);
    }
    this.setState({
      modalVisible: true,
      ID_Portal_TicketInfo: item.Portal_TicketInfo_ID,
    });
  };

  onPressDuyetDangKyNghi = async () => {
    if (
      this.state.NoiDungDuyet === undefined ||
      this.state.NoiDungDuyet === ''
    ) {
      Alert.alert('Thông báo', 'Bạn chưa nhập lý do');
    } else {
      await this.duyetDangKy();
      if (this.state.duyetThanhCong) {
        Alert.alert('Thông báo', 'Duyệt đăng ký nghỉ thành công');
      } else {
        Alert.alert('Thông báo', 'Có lỗi xảy ra vui lòng thử lại sau');
      }
      this.setState({modalVisible: false});
      await this.getData(this.state.token, this.state.month, this.state.year);
    }
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
                  </Body>
                  <Right>
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
                    <Button
                      small
                      //onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                      onPress={() => this.toggleModal(item)}>
                      <Icon name="check-circle" type="FontAwesome" />
                    </Button>
                  </Right>
                </ListItem>
              )}
            />
          </Content>

          <Modal
            coverScreen={true}
            animationType={'fade'}
            transparent={true}
            onRequestClose={() => this.setModalVisible(false)}
            visible={this.state.modalVisible}>
            <View style={styles.popupOverlay}>
              <View style={styles.popup}>
                <View style={styles.popupContent}>
                  <ListItem>
                    <Radio
                      selected={this.state.isDongY}
                      onPress={this.toggleSwitch1}
                    />
                    <Body>
                      <Text>Đồng ý</Text>
                    </Body>
                  </ListItem>
                  <ListItem>
                    <Radio
                      selected={!this.state.isDongY}
                      onPress={this.toggleSwitch2}
                    />
                    <Body>
                      <Text>Từ chối</Text>
                    </Body>
                  </ListItem>
                  <Form>
                    <Item floatingLabel>
                      <Label>Lý do</Label>
                      <Input
                        onChangeText={v => this.handleChange('NoiDungDuyet', v)}
                      />
                    </Item>
                  </Form>
                  <ListItem>
                    <Text note>Đơn vị</Text>
                  </ListItem>
                  <ListItem>
                    <View style={{flex: 1}}>
                      <MultiSelect
                        hideTags
                        items={this.state.ListDonVi}
                        uniqueKey="DonVi_ID"
                        ref={async component => {
                          this.multiSelectDonVi = await component;
                        }}
                        onSelectedItemsChange={this.onSelectedItemsChangeDonVi}
                        selectedItems={this.state.selectedItemsMultipleDonVi}
                        selectText="Lựa chọn"
                        searchInputPlaceholderText="Tìm kiếm"
                        // onChangeInput={(text) => console.log(text)}
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="TenDonVi"
                        searchInputStyle={{color: '#CCC'}}
                        submitButtonColor="#CCC"
                        submitButtonText="Xác nhận lựa chọn"
                        flatListProps={{
                          style: {height: this.height * 0.15},
                          nestedScrollEnabled: true,
                          extraData: this.state,
                        }}
                        onToggleList={this.onToggleListMultipleDonVi}
                      />
                    </View>
                  </ListItem>
                  <ListItem>
                    <Text note>Thông báo cho</Text>
                  </ListItem>
                  <ListItem>
                    <View style={{flex: 1}}>
                      <MultiSelect
                        hideTags
                        items={this.state.ListThongBao}
                        uniqueKey="ID_CanBo"
                        ref={async component => {
                          this.multiSelectThongBao = await component;
                        }}
                        onSelectedItemsChange={
                          this.onSelectedItemsChangeThongBao
                        }
                        selectedItems={this.state.selectedItemsMultipleThongBao}
                        selectText="Lựa chọn"
                        searchInputPlaceholderText="Tìm kiếm"
                        // onChangeInput={(text) => console.log(text)}
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="HoTen"
                        searchInputStyle={{color: '#CCC'}}
                        submitButtonColor="#CCC"
                        submitButtonText="Xác nhận lựa chọn"
                        flatListProps={{
                          style: {height: this.height * 0.15},
                          nestedScrollEnabled: true,
                          extraData: this.state,
                        }}
                        onToggleList={this.onToggleListMultipleThongBao}
                      />
                    </View>
                  </ListItem>
                </View>
                <View style={styles.popupButtons}>
                  <TouchableOpacity
                    onPress={this.onPressDuyetDangKyNghi}
                    style={styles.btnClose}>
                    <Text style={styles.txtClose}>Lưu</Text>
                  </TouchableOpacity>
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
  };
}

export default WaitingApproval;
