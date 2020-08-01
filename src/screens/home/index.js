import React, {Component} from 'react';
import {Container, Header, Content, Left, Button, Icon, Body, Title, Right} from 'native-base';
import {Text, View, TouchableOpacity, Image, FlatList} from 'react-native';
import {mainMenu} from '../../utils/menus';
import styles from './styles';

class Home extends Component {
	clickEventListener(item) {
		this.props.navigation.navigate(item.route);
	}

	render() {
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.openDrawer()}>
							<Icon name="menu" />
						</Button>
					</Left>
					<Body>
						<Title>Home</Title>
					</Body>
					<Right />
				</Header>
				<FlatList
					style={styles.list}
					contentContainerStyle={styles.listContainer}
					data={mainMenu}
					horizontal={false}
					numColumns={3}
					keyExtractor={item => {
						return item.route;
					}}
					renderItem={({item}) => {
						return (
							<TouchableOpacity style={styles.card} onPress={() => this.clickEventListener(item)}>
								<View style={styles.cardFooter}></View>
								<Image style={styles.cardImage} source={item.image} />
								<View style={styles.cardHeader}>
									<View style={{alignItems: 'center', justifyContent: 'center'}}>
										<Text style={styles.title}>{item.name}</Text>
									</View>
								</View>
							</TouchableOpacity>
						);
					}}
				/>
			</Container>
		);
	}
}

export default Home;
