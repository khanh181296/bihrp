import React, {Component} from 'react';
import {Container, Content, Card, CardItem, Text, Left, Right} from 'native-base';
import styles from './styles';
import asyncStorageHelper from '../../services/AsyncStorageHelper';
import config from '../../constants/config';

class WorkingProcess extends Component {
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
		await fetch(config.baseURL + config.ApiAccountURL + 'QuaTrinhCongTac', {
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
		return (
			<Container style={styles.container}>
				<Content padder>
					{this.state.data.map((item, index) => {
						return (
							<Card key={index}>
								<CardItem header bordered>
									<Text>
										{'Từ'} {item.TuNgay} {'đến'} {item.DenNgay != null ? item.DenNgay : 'nay'}
									</Text>
								</CardItem>
								<CardItem bordered>
									<Left style={styles.left}>
										<Text style={styles.textLeft}>Đơn vị</Text>
									</Left>
									<Right style={styles.right}>
										<Text>{item.TenDonVi}</Text>
									</Right>
								</CardItem>
								<CardItem bordered>
									<Left style={styles.left}>
										<Text style={styles.textLeft}>Loại công tác</Text>
									</Left>
									<Right style={styles.right}>
										<Text>{item.TenLoaiQTCongTac}</Text>
									</Right>
								</CardItem>
								<CardItem bordered>
									<Left style={styles.left}>
										<Text style={styles.textLeft}>Chức danh</Text>
									</Left>
									<Right style={styles.right}>
										<Text>{item.TenChucDanh}</Text>
									</Right>
								</CardItem>
								<CardItem bordered>
									<Left style={styles.left}>
										<Text style={styles.textLeft}>Chức vụ</Text>
									</Left>
									<Right style={styles.right}>
										<Text>{item.TenChucVu}</Text>
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

export default WorkingProcess;
