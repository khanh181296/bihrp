import React, {Component} from 'react';
import {Container, Header, Content, Text, Left, Right, List, ListItem, Button, Icon, Title, Body} from 'native-base';
import styles from './styles';
import asyncStorageHelper from '../../services/AsyncStorageHelper';
import config from '../../constants/config';

class SalaryDetail extends Component {
	state = {
		data: [],
	};

	async componentDidMount() {
		try {
			const token = await asyncStorageHelper.get('userToken');
			const user = await asyncStorageHelper.get('userInfo');
			const id = this.props.navigation.getParam('id', 1);
			const thang = this.props.navigation.getParam('thang', 1);
			const nam = this.props.navigation.getParam('nam', 2019);
			const dotLuong = this.props.navigation.getParam('dotLuong', 0);
			await this.getData(token, user.CanBo_ID, id, user.MaTrungTam, thang, nam, dotLuong);
		} catch (error) {
			console.log(error.message);
		}
	}

	getData = async (token, idCanBo, id, MaTrungTam, thang, nam, dotLuong) => {
		if (!MaTrungTam) {
			// MaTrungTam = 'BVSC';
			MaTrungTam = 'VINATA';
		}

		await fetch(config.baseURL + config.ApiTienLuongURL + 'GetBangLuong', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'bearer ' + token,
			},
			body: JSON.stringify({
				ID_CanBo: idCanBo,
				ID_MauBaoCao: id,
				Thang: thang,
				Nam: nam,
				MaTrungTam: MaTrungTam,
				ID_DotLuong: dotLuong,
			}),
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
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.navigate('Salary')}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title>CHI TIẾT THU NHẬP</Title>
					</Body>
					<Right />
				</Header>
				<Content padder>
					<List
						dataArray={this.state.data}
						renderRow={data => (
							<ListItem bordered>
								<Left style={styles.left6}>
									<Text style={styles.textLeft}>{data.TenKhoanMuc}</Text>
								</Left>
								<Right style={styles.right4}>
									<Text>{data.GiaTri}</Text>
								</Right>
							</ListItem>
						)}
					/>
				</Content>
			</Container>
		);
	}
}

export default SalaryDetail;
