import React, {Component} from 'react';
import {Container, Content, Thumbnail, View, List, ListItem, Left, Right, Text} from 'native-base';
import styles from './styles';
import asyncStorageHelper from '../../services/AsyncStorageHelper';
import config from '../../constants/config';

class AccountInfo extends Component {
	state = {
		user: [],
		photo: require('../../../assets/NoAvatar.jpg'),
	};

	setStateAsync(state) {
		return new Promise(resolve => {
			this.setState(state, resolve);
		});
	}

	async componentDidMount() {
		try {
			const userInfo = await asyncStorageHelper.get('userInfo');
			await this.setStateAsync({user: userInfo});
			if (userInfo.AnhCaNhan === true) {
				await this.setStateAsync({photo: {uri: config.AvatarURL + userInfo.CanBo_ID + '.jpg'}});
			}
		} catch (error) {
			console.log(error.message);
		}
	}

	render() {
		return (
			<Container style={styles.container}>
				<Content padder>
					<View style={styles.avatar}>
						<Thumbnail large source={this.state.photo} />
					</View>
					<List>
						<ListItem>
							<Left style={styles.left}>
								<Text style={styles.textLeft}>Mã nhân viên</Text>
							</Left>
							<Right style={styles.right}>
								<Text>{this.state.user.MaCanBo}</Text>
							</Right>
						</ListItem>
						<ListItem>
							<Left style={styles.left}>
								<Text style={styles.textLeft}>Họ và tên</Text>
							</Left>
							<Right style={styles.right}>
								<Text>{this.state.user.HoTen}</Text>
							</Right>
						</ListItem>
						<ListItem>
							<Left style={styles.left}>
								<Text style={styles.textLeft}>Ngày sinh</Text>
							</Left>
							<Right style={styles.right}>
								<Text>{this.state.user.NgaySinh}</Text>
							</Right>
						</ListItem>
						<ListItem>
							<Left style={styles.left}>
								<Text style={styles.textLeft}>Giới tính</Text>
							</Left>
							<Right style={styles.right}>
								<Text>{this.state.user.GioiTinh ? 'Nam' : 'Nữ'}</Text>
							</Right>
						</ListItem>
						<ListItem>
							<Left style={styles.left}>
								<Text style={styles.textLeft}>Email</Text>
							</Left>
							<Right style={styles.right}>
								<Text>{this.state.user.Email}</Text>
							</Right>
						</ListItem>
						<ListItem>
							<Left style={styles.left}>
								<Text style={styles.textLeft}>Đơn vị</Text>
							</Left>
							<Right style={styles.right}>
								<Text>{this.state.user.DonViCongTac}</Text>
							</Right>
						</ListItem>
						<ListItem>
							<Left style={styles.left}>
								<Text style={styles.textLeft}>Chức danh</Text>
							</Left>
							<Right style={styles.right}>
								<Text>{this.state.user.TenChucDanh}</Text>
							</Right>
						</ListItem>
						<ListItem>
							<Left style={styles.left}>
								<Text style={styles.textLeft}>Chức vụ</Text>
							</Left>
							<Right style={styles.right}>
								<Text>{this.state.user.TenChucVu}</Text>
							</Right>
						</ListItem>
					</List>
				</Content>
			</Container>
		);
	}
}

export default AccountInfo;
