import React, {Component} from 'react';
import {Container, Content, Card, CardItem, Text, Body, List, ListItem, Left, Right, View} from 'native-base';
import styles from './styles';
import asyncStorageHelper from '../../services/AsyncStorageHelper';
import config from '../../constants/config';

class ReduceFamily extends Component {
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
		await fetch(config.baseURL + config.ApiAccountURL + 'GiamTruGiaCanh', {
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
										<Text>
											{item.TenQuanHe} {item.HoTenNguoiThan}
										</Text>
									</CardItem>
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Ngày sinh</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.NgaySinh}</Text>
										</Right>
									</CardItem>
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Số CMND</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.SoCMND}</Text>
										</Right>
									</CardItem>
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Mã số thuế</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.MaSoThue}</Text>
										</Right>
									</CardItem>
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Ngày báo tăng</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.NgayBaoTang}</Text>
										</Right>
									</CardItem>
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Ngày tính tăng</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.ThoiDiemTinhGiamTru}</Text>
										</Right>
									</CardItem>
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Ngày báo giảm</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.NgayBaoGiam}</Text>
										</Right>
									</CardItem>
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Ngày tính giảm</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.ThoiDiemKetThucGiamTru}</Text>
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

export default ReduceFamily;
