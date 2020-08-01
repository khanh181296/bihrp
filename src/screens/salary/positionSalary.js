import React, {Component} from 'react';
import {Container, Content, Card, CardItem, Text, Left, Right} from 'native-base';
import styles from './styles';
import asyncStorageHelper from '../../services/AsyncStorageHelper';
import config from '../../constants/config';

class PositionSalary extends Component {
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
		await fetch(config.baseURL + config.ApiAccountURL + 'LuongChucDanh', {
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
					<Text style={{padding: 20}}>Lương thỏa thuận</Text>
					{this.state.data.map((item, index) => {
						return (
							<Card key={index}>
								<CardItem header bordered>
									<Text>
										{'Từ'} {item.strNgayApDung}
									</Text>
								</CardItem>
								{!!item.SoQuyetDinh && (
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Số QĐ</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.SoQuyetDinh}</Text>
										</Right>
									</CardItem>
								)}
								{!!item.strNgayQuyetDinh && (
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Ngày QĐ</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.strNgayQuyetDinh}</Text>
										</Right>
									</CardItem>
								)}
								<CardItem bordered>
									<Left style={styles.left}>
										<Text style={styles.textLeft}>Ngày biến động</Text>
									</Left>
									<Right style={styles.right}>
										<Text>{item.strNgayBienDong}</Text>
									</Right>
								</CardItem>
								{!!item.TenNgach && (
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Ngạch lương</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.TenNgach}</Text>
										</Right>
									</CardItem>
								)}
								{!!item.TenBac && (
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Bậc lương</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.TenBac}</Text>
										</Right>
									</CardItem>
								)}
								<CardItem bordered>
									<Left style={styles.left}>
										<Text style={styles.textLeft}>Tiền lương</Text>
									</Left>
									<Right style={styles.right}>
										<Text>{item.TongHeSo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
									</Right>
								</CardItem>
								{!!item.GhiChu && (
									<CardItem bordered>
										<Left style={styles.left}>
											<Text style={styles.textLeft}>Ghi chú</Text>
										</Left>
										<Right style={styles.right}>
											<Text>{item.GhiChu}</Text>
										</Right>
									</CardItem>
								)}
							</Card>
						);
					})}
				</Content>
			</Container>
		);
	}
}

export default PositionSalary;
