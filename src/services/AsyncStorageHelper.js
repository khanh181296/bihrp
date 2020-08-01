import AsyncStorage from '@react-native-community/async-storage';

export default {
	async set(key, item) {
		try {
			var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
			return jsonOfItem;
		} catch (error) {
			console.log(error.message);
		}
	},

	async get(key) {
		try {
			const retrievedItem = await AsyncStorage.getItem(key);
			const item = JSON.parse(retrievedItem);
			return item;
		} catch (error) {
			console.log(error.message);
		}
		return;
	},
};
