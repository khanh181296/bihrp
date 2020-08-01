import React, {Component} from 'react';
import {Container, Content, Card, CardItem, Text, Left, Right, Picker, Icon} from 'native-base';
import styles from './styles';
import asyncStorageHelper from '../../services/AsyncStorageHelper';
import config from '../../constants/config';

class Allowance extends Component {
	state = {
		data: [],
		loaiPhuCap: [],
		idSelected: '0',
		token: '',
	};

	async componentDidMount() {
		try {
			const token = await asyncStorageHelper.get('userToken');
			this.setState({token: token});
			await this.getLoaiPhuCap(token);
			await this.getData(this.state.idSelected);
		} catch (error) {
			console.log(error.message);
		}
	}

	getLoaiPhuCap = async token => {
		await fetch(config.baseURL + config.ApiDanhMucURL + 'LoaiPhuCap', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'bearer ' + token,
			},
		})
			.then(response => response.json())
			.then(responseJson => {
				this.setState({loaiPhuCap: responseJson});
			})
			.then(() => {})
			.catch(err => {
				this.setState({message: err.message});
			});
	};

	getData = async id => {
		await fetch(config.baseURL + config.ApiAccountURL + 'PhuCap?ID_LoaiPhuCap=' + id, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'bearer ' + this.state.token,
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

	async pickerValueChange(itemValue) {
		this.setState({idSelected: itemValue});
		await this.getData(itemValue);
	}

	render() {
		return (
			<Container style={styles.container}>
				<Content padder>
					<Text style={{padding: 20}}>Phụ cấp</Text>
					<Picker
						mode="dropdown"
						iosHeader="Chọn loại phụ cấp"
						iosIcon={<Icon name="arrow-down" />}
						style={{width: undefined}}
						selectedValue={this.state.idSelected}
						onValueChange={itemValue => this.pickerValueChange(itemValue)}>
						<Picker.Item key={'0'} label={'-- Tất cả --'} value={'0'} />
						{this.state.loaiPhuCap.map((i, index) => (
							<Picker.Item key={index} label={i.TenLoaiPhuCap} value={i.LoaiPhuCap_ID} />
						))}
					</Picker>
					{this.state.data.map((item, index) => {
						return (
							<Card key={index}>
								<CardItem header bordered>
									<Text>
										{'Từ'} {item.strHuongTuNgay}
									</Text>
								</CardItem>
								<CardItem bordered>
									<Left style={styles.left}>
										<Text style={styles.textLeft}>Loại phụ cấp</Text>
									</Left>
									<Right style={styles.right}>
										<Text>{item.TenLoaiPhuCap}</Text>
									</Right>
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
								<CardItem bordered>
									<Left style={styles.left}>
										<Text style={styles.textLeft}>Tiền phụ cấp</Text>
									</Left>
									<Right style={styles.right}>
										<Text>{item.HeSo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
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

export default Allowance;
