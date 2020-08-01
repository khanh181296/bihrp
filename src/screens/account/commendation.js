import React, {Component} from 'react';
import {Container, Content, Card, CardItem, Text, Body, List, ListItem, Left, Right} from 'native-base';
import styles from './styles';
import asyncStorageHelper from '../../services/AsyncStorageHelper';
import config from '../../constants/config';

class Commendation extends Component {
	state = {
		data: [],
	};

	async componentDidMount() {
		try {
			const token = await asyncStorageHelper.get('userToken');
			await this.getData(token);
		} catch (error) {
			console.log(error.message);
		}
	}

	getData = async token => {
		await fetch(config.baseURL + config.ApiAccountURL + 'KhenThuongKyLuat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'bearer ' + token,
			},
		})
			.then(response => response.json())
			.then(responseJson => {
				this.setState({data: responseJson});
			})
			.then(() => {})
			.catch(err => {
				this.setState({message: err.message});
			});
	};

	render() {
		if (this.state.data !== []) {
			return (
				<Container style={styles.container}>
					<Content padder>
						{this.state.data.map((item, index) => {
							return (
								<Card key={index}>
									<CardItem header bordered>
										<Text>{item.KhenThuong}</Text>
									</CardItem>
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Năm</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.Nam}</Text>
										</Right>
									</CardItem>
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Loại</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.TenLoaiKhenThuong_KyLuat}</Text>
										</Right>
									</CardItem>
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Số quyết định</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.SoQuyetDinh}</Text>
										</Right>
									</CardItem>
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Ngày quyết định</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.NgayRaQuyetDinh1}</Text>
										</Right>
									</CardItem>
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Ghi chú</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.GhiChu}</Text>
										</Right>
									</CardItem>
								</Card>
							);
						})}
					</Content>
				</Container>
			);
		} else {
			return (
				<View>
					<Text>Không có dữ liệu</Text>
				</View>
			);
		}
	}
}

export default Commendation;
