const mainMenu = [
	{
		name: 'Cá nhân',
		route: 'Account',
		icon: 'person',
		image: require('../../assets/icons/Profile.png'),
		bg: '#477EEA',
	},
	{
		name: 'Chấm công',
		route: 'TimeKeepingInfo',
		icon: 'calendar-check-o',
		typeicon: 'FontAwesome',
		image: require('../../assets/icons/TimeAttendance.png'),
		bg: '#477EEA',
	},
	{
		name: 'Đăng ký nghỉ',
		route: 'VacationRegister',
		icon: 'clockcircleo',
		typeicon: 'AntDesign',
		image: require('../../assets/icons/Register.png'),
		bg: '#4DCAE0',
	},
	{
		name: 'Lương',
		route: 'Salary',
		icon: 'pay-circle-o1',
		typeicon: 'AntDesign',
		image: require('../../assets/icons/Salary.png'),
		bg: '#C5F442',
	},
	{
		name: 'Bảo hiểm',
		route: 'Insurance',
		icon: 'medkit',
		image: require('../../assets/icons/Insurance.png'),
		bg: '#DA4437',
	},
];

const logOutMenu = [
	{
		name: 'Đăng xuất',
		route: 'SignOut',
		icon: 'logout',
		typeicon: 'AntDesign',
		bg: '#3591FA',
		types: '2',
	},
];

export {mainMenu, logOutMenu};
