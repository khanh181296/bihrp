import React, {Component} from 'react';
import {Container, Content, Text, View, Picker, Icon} from 'native-base';
import {TouchableOpacity} from 'react-native';
import styles from './styles';
import asyncStorageHelper from '../../services/AsyncStorageHelper';
import config from '../../constants/config';
import {months} from '../../utils/months';

class SalaryTable extends Component {
	state = {
		Nam: [],
		Thang: months,
		DotLuong: [],
		MauBaoCao: [],
		token: '',
		user: [],
		NamSelected: new Date().getFullYear().toString(),
		ThangSelected: (new Date().getMonth() + 1).toString(),
		DotLuongSelected: '',
	};

	async componentDidMount() {
		try {
			const token = await asyncStorageHelper.get('userToken');
			this.setState({token: token});
			const userInfo = await asyncStorageHelper.get('userInfo');
			this.setState({user: userInfo});
			await this.getNam(token);
			await this.getDotLuong(token, this.state.NamSelected, this.state.ThangSelected);
			await this.getMauBaoCao(token, this.state.DotLuongSelected);
		} catch (error) {
			console.log(error.message);
		}
	}

	getNam = async token => {
		await fetch(config.baseURL + config.ApiDanhMucURL + 'GetNam', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'bearer ' + token,
			},
		})
			.then(response => response.json())
			.then(responseJson => {
				this.setState({Nam: responseJson});
			})
			.then(() => {})
			.catch(err => {
				this.setState({message: err.message});
			});
	};

	getDotLuong = async (token, nam, thang) => {
		await fetch(config.baseURL + config.ApiTienLuongURL + 'GetDotLuong', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'bearer ' + token,
			},
			body: JSON.stringify({
				ID_TrungTam: this.state.user.ID_TrungTam,
				Nam: nam,
				Thang: thang,
			}),
		})
			.then(response => response.json())
			.then(responseJson => {
				this.setState({DotLuong: responseJson});
			})
			.then(() => {})
			.catch(err => {
				this.setState({message: err.message});
				console.log(err.message);
			});
	};

	getMauBaoCao = async (token, dotLuong) => {
		await fetch(config.baseURL + config.ApiTienLuongURL + 'GetMauBaoCao', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'bearer ' + token,
			},
			body: JSON.stringify({
				ID_TrungTam: this.state.user.ID_TrungTam,
				ID_DotLuong: dotLuong,
			}),
		})
			.then(response => response.json())
			.then(responseJson => {
				this.setState({MauBaoCao: responseJson});
			})
			.then(() => {})
			.catch(err => {
				this.setState({message: err.message});
			});
	};

	async pickerNamValueChange(itemValue) {
		this.setState({NamSelected: itemValue});
		await this.getDotLuong(this.state.token, itemValue, this.state.ThangSelected);
	}

	async pickerThangValueChange(itemValue) {
		this.setState({ThangSelected: itemValue});
		await this.getDotLuong(this.state.token, this.state.NamSelected, itemValue);
	}

	async pickerDotLuongValueChange(itemValue) {
		this.setState({DotLuongSelected: itemValue});
		await this.getMauBaoCao(this.state.token, itemValue);
	}

	onItemPressed = item => {
		this.props.navigation.navigate('SalaryDetail', {
			id: item.MauBaoCao_ID,
			thang: this.state.ThangSelected,
			nam: this.state.NamSelected,
			dotLuong: this.state.DotLuongSelected,
		});
	};

	render() {
		return (
			<Container style={styles.container}>
				<Content padder>
					<View style={styles.content}>
						<Text>Năm</Text>
						<Picker
							mode="dropdown"
							iosHeader="Chọn năm"
							iosIcon={<Icon name="arrow-down" />}
							style={{width: undefined}}
							selectedValue={this.state.NamSelected}
							onValueChange={itemValue => this.pickerNamValueChange(itemValue)}>
							{this.state.Nam.map((i, index) => (
								<Picker.Item key={index} label={i.Text} value={i.Value} />
							))}
						</Picker>
					</View>
					<View style={styles.separator} />
					<View style={styles.content}>
						<Text>Tháng</Text>
						<Picker
							mode="dropdown"
							iosHeader="Chọn tháng"
							iosIcon={<Icon name="arrow-down" />}
							style={{width: undefined}}
							selectedValue={this.state.ThangSelected}
							onValueChange={itemValue => this.pickerThangValueChange(itemValue)}>
							{this.state.Thang.map((i, index) => (
								<Picker.Item key={index} label={i.Text} value={i.Value} />
							))}
						</Picker>
					</View>
					<View style={styles.separator} />
					<View style={styles.content}>
						<Text>Đợt lương</Text>
						<Picker
							mode="dropdown"
							iosHeader="Chọn đợt lương"
							iosIcon={<Icon name="arrow-down" />}
							style={{width: undefined}}
							selectedValue={this.state.DotLuongSelected}
							onValueChange={itemValue => this.pickerDotLuongValueChange(itemValue)}>
							<Picker.Item key={'0'} label={'-- Chọn đợt lương --'} value={'0'} />
							{this.state.DotLuong.map((i, index) => (
								<Picker.Item
									key={index}
									label={i.TenDotThuong_BoSungLuong}
									value={i.TL_DotThuong_BoSungLuong_ID.toString()}
								/>
							))}
						</Picker>
					</View>
					<View style={styles.separator} />
					<View style={styles.content}>
						<Text style={styles.mb}>MẪU BẢNG LƯƠNG</Text>
						{this.state.MauBaoCao.map((item, index) => {
							return (
								<TouchableOpacity key={index} onPress={() => this.onItemPressed(item)}>
									<View style={styles.container}>
										<Text>{item.TenMauBaoCao}</Text>
									</View>
								</TouchableOpacity>
							);
						})}
					</View>
				</Content>
			</Container>
		);
	}
}

export default SalaryTable;
