import HomeScreen from '../home/index';
import AccountScreen from '../account/index';
import SalaryScreen from '../salary/index';
import InsuranceScreen from '../insurance/index';

const iconHome = require('../../../assets/icons/home.png');
const iconAccount = require('../../../assets/icons/Profile.png');
const iconSalary = require('../../../assets/icons/Salary.png');
const iconInsurance = require('../../../assets/icons/Insurance.png');

const tabNavigationData = [
    {
        name: 'Home',
        component:  HomeScreen,
        icon: iconHome
    },
    {
        name: 'Account',
        component:  AccountScreen,
        icon: iconAccount
    },
    {
        name: 'Salary',
        component:  SalaryScreen,
        icon: iconSalary
    },
    {
        name: 'Insurance',
        component:  InsuranceScreen,
        icon: iconInsurance
    },
]

export default tabNavigationData;



