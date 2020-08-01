export default {
	container: {
		flex: 1
	},
	list: {
		paddingHorizontal: 5,
		backgroundColor: '#E6E6E6',
	},
	listContainer: {
		alignItems: 'center',
	},
	/******** card **************/
	card: {
		shadowColor: '#00000021',

		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.37,
		shadowRadius: 7.49,

		elevation: 12,
		marginVertical: 10,
		backgroundColor: 'white',
		flexBasis: '29%',
		marginHorizontal: 10,
	},
	cardHeader: {
		paddingVertical: 17,
		paddingHorizontal: 16,
		borderTopLeftRadius: 1,
		borderTopRightRadius: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	cardContent: {
		paddingVertical: 12.5,
		paddingHorizontal: 16,
	},
	cardFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 12.5,
		paddingBottom: 25,
		paddingHorizontal: 16,
		borderBottomLeftRadius: 1,
		borderBottomRightRadius: 1,
	},
	cardImage: {
		height: 70,
		width: 70,
		alignSelf: 'center',
	},
	title: {
		fontSize: 14,
		flex: 1,
		alignSelf: 'center',
		color: '#4682B4',
	},
};
