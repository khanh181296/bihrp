import React, {Component} from 'react';
import {Container, Content, Card, CardItem, Text, Body, List, ListItem, Left, Right} from 'native-base';
import styles from './styles';
import asyncStorageHelper from '../../services/AsyncStorageHelper';
import config from '../../constants/config';

class ContractProcess extends Component {
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
		await fetch(config.baseURL + config.ApiAccountURL + 'QuaTrinhHopDong', {
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
											{'Từ'} {item.TuNgay} {'đến'} {item.DenNgay != null ? item.DenNgay : 'nay'}
										</Text>
									</CardItem>
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Phân loại</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.TenPhanLoaiHopDong}</Text>
										</Right>
									</CardItem>
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Loại hợp đồng</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.TenLoaiHopDong}</Text>
										</Right>
									</CardItem>
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Ngày ký</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.NgayKyHopDong}</Text>
										</Right>
									</CardItem>
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Ngày hiệu lực</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.NgayHieuLucHD}</Text>
										</Right>
									</CardItem>
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Số hợp đồng</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.SoHopDong}</Text>
										</Right>
									</CardItem>
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Chuyên môn</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.ChucDanhChuyenMon}</Text>
										</Right>
									</CardItem>
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Nơi làm việc</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.DiaDiemLamViec}</Text>
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

export default ContractProcess;
