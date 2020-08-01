import React from 'react';
import {Root} from 'native-base';
// import { StackNavigator, DrawerNavigator } from "react-navigation";
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './screens/login/';
import Home from './screens/home/';
import Insurance from './screens/insurance/';

// Lương
import Salary from './screens/salary/';
import SalaryTable from './screens/salary/salaryTable';
import SalaryDetail from './screens/salary/salaryDetail';

// Đăng ký nghỉ
import VacationRegister from './screens/vacationRegister/';
import UserRegister from './screens/vacationRegister/userRegister';
import RegisterByDay from './screens/vacationRegister/registerByDay';
import WaitingApproval from './screens/vacationRegister/waitingApproval';
import Approved from './screens/vacationRegister/approved';
import TicketDetail from './screens/vacationRegister/ticketDetail';
import TimeKeepingInfo from './screens/timeKeepingInfo/'

import SideBar from './screens/sidebar/';
import Account from './screens/account/';

const Drawer = createDrawerNavigator(
  {
    Home: {screen: Home},
    Account: {screen: Account},
    Insurance: {screen: Insurance},
    Salary: {screen: Salary},
    VacationRegister: {screen: VacationRegister},
    TimeKeepingInfo: {screen: TimeKeepingInfo},
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
    contentComponent: props => <SideBar {...props} />,
  },
);

const AppNavigator = createStackNavigator(
  {
    Drawer: {screen: Drawer},

    Login: {screen: Login},
    Account: {screen: Account},
    Insurance: {screen: Insurance},
    Salary: {screen: Salary},
    SalaryTable: {screen: SalaryTable},
    SalaryDetail: {screen: SalaryDetail},
		VacationRegister: {screen: VacationRegister},
		UserRegister: {screen: UserRegister},
    RegisterByDay: {screen: RegisterByDay},
    WaitingApproval: {screen: WaitingApproval},
    Approved: {screen: Approved},
    TicketDetail: {screen: TicketDetail},
    TimeKeepingInfo: {screen: TimeKeepingInfo},
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default () => (
  <Root>
    <AppContainer />
  </Root>
);
