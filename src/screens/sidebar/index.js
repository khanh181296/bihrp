import React, {Component} from 'react';
import {Image} from 'react-native';
import {Content, Text, List, ListItem, Icon, Container, Left, Right, Badge, Item} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './style';
import {mainMenu, logOutMenu} from '../../utils/menus'

const drawerCover = require('../../../assets/drawer-cover.png');
const drawerImage = require('../../../assets/logo-kitchen-sink.png');

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shadowOffsetWidth: 1,
			shadowRadius: 4,
		};
	}

	signOut = async () => {
		await AsyncStorage.clear();
		this.props.navigation.navigate('Login');
	};

	render() {
		return (
			<Container>
				<Content bounces={false} style={{flex: 1, backgroundColor: '#fff', top: -1}}>
					<Image source={drawerCover} style={styles.drawerCover} />
					<Image square style={styles.drawerImage} source={drawerImage} />

					<List
						dataArray={mainMenu}
						renderRow={data => (
							<ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
								<Left>
									<Icon active name={data.icon} type={data.typeicon} style={{color: '#777', fontSize: 26, width: 30}} />
									<Text style={styles.text}>{data.name}</Text>
								</Left>
								{data.types && (
									<Right style={{flex: 1}}>
										<Badge
											style={{
												borderRadius: 3,
												height: 25,
												width: 72,
												backgroundColor: data.bg,
											}}>
											<Text style={styles.badgeText}>{`${data.types} Types`}</Text>
										</Badge>
									</Right>
								)}
							</ListItem>
						)}
					/>
					<List
						dataArray={logOutMenu}
						renderRow={data => (
							<ListItem button noBorder onPress={this.signOut}>
								<Left>
									<Icon active name={data.icon} type={data.typeicon} style={{color: '#777', fontSize: 26, width: 30}} />
									<Text style={styles.text}>{data.name}</Text>
								</Left>
							</ListItem>
						)}
					/>
				</Content>
			</Container>
		);
	}
}

export default SideBar;
