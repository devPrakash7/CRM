//setting up keys and their values for development
module.exports = {
	// 'PORT': process.env.PORT || 8090,
	// 'NODE_ENV': 'development',
	'STATUS': {'INACTIVE': 0 , 'ACTIVE': 1, 'DE_ACTIVE': 2},
	'DEPARTMENT_STATUS': {1:'ACTIVE', 0:'DEACTIVE'},
	// 'JWT_SECRET': 'bmp',
	'PAGE_DATA_LIMIT': 10,
	'DATA_LIMIT': 6,
	'PAGE': 1,
	'LIMIT': 10,
	// 'SEND_GRID_API_KEY': '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',
	// 'EMAIL_FROM': "admin@commonapp.com",
	'DEFAULT_LANGUAGE': "en",
	'APP_LANGUAGE': ['en', 'hn'],
	'URL_EXPIRE_TIME': '2h',
	'PROGRAM_DEFAULT_STATUS': 'program_remaing',
	'WORKOUT_DEFAULT_STATUS': 'workout_remaing',
	'DRILL_DEFAULT_STATUS': 'drill_remaing',
	'USER_TYPE': {
		'ADMIN': 1,
		'MANAGER': 2,
		'EMPLOYEE': 3
	},
	'ATTENDANCE_STATUS': {
		'PRESENT': 'check in',
		'ABSENT': 'check out',
	},
	'SOCIAL_LOGIN_TYPE': {
		'FACEBOOK': 1,
		'GOOGLE': 2,
		'APPLE': 3
	},
	'PROGRAM_TYPE': {
		'ON_SEASON': 1,
		'OFF_SEASON': 2,
		'ALL_SEASON': 3
	},
	'THEME_TYPE': {
		'WHITE': 1,
		'BLACK': 2	
	},
	'STATUS_CODE': {
		'SUCCESS': '1',
		'FAIL': '0',
		'VALIDATION': '2',
		'UNAUTHENTICATED': '-1',
		'NOT_FOUND': '-2'
	},
	'WEB_STATUS_CODE': {
		'OK': 200,
		'CREATED': 201,
		'NO_CONTENT': 204,
		'BAD_REQUEST': 400,
		'UNAUTHORIZED': 401,
		'NOT_FOUND': 404,
		'SERVER_ERROR': 500
	},
	'VERSION_STATUS': {
		'NO_UPDATE': 0,
		'OPTIONAL_UPDATE': 1,
		'FORCE_UPDATE': 2,
	},
	'EMAIL_TEMPLATE': {
		'WELCOME_MAIL': 'WELCOME_MAIL',
		'PASSWORD_RESET': 'PASSWORD_RESET',
		'RESEND_MAIL': 'RESEND_MAIL',
		'CONFIRM_MAIL': 'CONFIRM_MAIL'
	},
	'ENCRYPT_STRING': {
		'START_SYMBOL': '{!!!{',
		'END_SYMBOL': '}!!!}'
	},
	'NOTIFICATION_READ' : {
		'UNREAD' : 0,
		'READ' : 1,
	},
	'DEVICE_TYPE' : {
		'ANDROID' : 1,
		'IOS' : 2,
	},
	"ANDROID_USERS_TOPIC": "twtmn_android_users",
	"IOS_USERS_TOPIC": "twtmn_ios_users",
	'FS_TYPES': {
        'DIR': 'DIR',
        'FILE': 'FILE'
	},
	'LANG': {
		'HINDI': 'hn',
		'ENGLISH': 'en'
	}
}