import React, {Component} from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  Text,
  Body,
  Left,
  Right,
  Icon,
} from 'native-base';
import SalaryTable from '../salary/salaryTable';
import UserRegister from './userRegister';
import WaitingApproval from './waitingApproval';
import Approved from './approved';

class VacationRegister extends Component {
  state = {
    footerTab: 1,
  };

  renderTab = number => {
    switch (number) {
      case 1:
        return <UserRegister navigation={this.props.navigation} />;
        break;
      case 2:
        return <WaitingApproval navigation={this.props.navigation} />;
        break;
      case 3:
        return <Approved navigation={this.props.navigation} />;
        break;
      default:
        return <SalaryTable />;
        break;
    }
  };

  changeTab = number => {
    if (this.state.footerTab !== number) {
      this.setState({footerTab: number});
    }
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>ĐĂNG KÝ NGHỈ</Title>
          </Body>
          <Right />
        </Header>

        <Content style={{backgroundColor: '#f0f0f0'}}>
          {this.renderTab(this.state.footerTab)}
        </Content>
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={this.state.footerTab === 1}
              onPress={() => {
                this.changeTab(1);
              }}>
              <Icon active name="credit-card" type="FontAwesome" />
              <Text>Đăng ký</Text>
            </Button>
            <Button
              vertical
              active={this.state.footerTab === 2}
              onPress={() => {
                this.changeTab(2);
              }}>
              <Icon name="assistant" type="MaterialCommunityIcons" />
              <Text>Chờ duyệt</Text>
            </Button>
            <Button
              vertical
              active={this.state.footerTab === 3}
              onPress={() => {
                this.changeTab(3);
              }}>
              <Icon name="handshake-o" type="FontAwesome" />
              <Text>Đã duyệt</Text>
            </Button>
            {/* <Button
              vertical
              active={this.state.footerTab === 4}
              onPress={() => {
                this.changeTab(4);
              }}>
              <Icon name="hand-o-right" type="FontAwesome" />
              <Text>Đã hủy</Text>
            </Button> */}
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default VacationRegister;
