const devMode = process.env.NODE_ENV !== 'development';

export default {
	// App Details
	appName: 'BiHRP',

	// Build Configuration - eg. Debug or Release?
	DEV: devMode,

	// Google Analytics - uses a 'dev' account while we're testing
	gaTrackingId: devMode ? 'UA-84284256-2' : 'UA-84284256-1',

	// Application
	AppCode: 'BiHRP',

	// Language
	Language: 'vi',

	// Base URL
	// baseURL: 'http://app.bitecco.vn/api/',
	// AvatarURL: 'http://app.bitecco.vn/bihrp/Upload/AnhCanBo/',
	baseURL: 'http://bihrpapi.bitecco.vn/',
	AvatarURL: 'http://bihrp.bitecco.vn/bihrp_vinata_dev/Upload/AnhCanBo/',
	ApiTokenURL: 'token',
	ApiAccountURL: 'api/account/',
	ApiDanhMucURL: 'api/danhmuc/',
	ApiTienLuongURL: 'api/salary/',
	ApiDangKyNghiURL: 'api/dangkynghi/',
	ApiChamCongURL: 'api/ChamCong/',
	ApiFcmURL: 'api/fcm/',
};
