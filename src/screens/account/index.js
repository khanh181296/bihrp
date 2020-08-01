import React, {Component} from 'react';
import {Container, Header, Title, Button, Icon, Tabs, Tab, Right, Left, Body, ScrollableTab} from 'native-base';
import TabAccountInfo from './accountInfo';
import TabWorkingProcess from './workingProcess';
import TabContractProcess from './contractProcess';
import TabReduceFamily from './reduceFamily';
import TabCommendation from './commendation';

class Account extends Component {
	render() {
		return (
			<Container>
				<Header hasTabs>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title> CÁ NHÂN</Title>
					</Body>
					<Right />
				</Header>

				<Tabs renderTabBar={() => <ScrollableTab />}>
					<Tab heading="Thông tin chung">
						<TabAccountInfo />
					</Tab>
					<Tab heading="Công tác">
						<TabWorkingProcess />
					</Tab>
					<Tab heading="Hợp đồng">
						<TabContractProcess />
					</Tab>
					<Tab heading="Gia cảnh">
						<TabReduceFamily />
					</Tab>
					<Tab heading="Khen thưởng">
						<TabCommendation />
					</Tab>
				</Tabs>
			</Container>
		);
	}
}

export default Account;
