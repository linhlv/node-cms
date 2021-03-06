var config = {
	"port": "5009",
	"gid": "",
	"uid": "",
	"protocol": "http",
	"layouts": {
		"dir":{		
			"layouts":"../views/layouts",
			"partials":"../views/partials"
		},
		"default": "layout_default",
		"admin_default": "layout_default",
		"avail": [
			"layout_default"
		]
	},
	"locales": {
		"dev_mode": true,
		"detect_from_subdomain": true,
		"detect_from_query": false,
		"detect_from_cookie": false,
		"avail": [
			"en",
			"ru"
		]
	},
	"dir": {
		"storage": "../public/files",
		"storage_url": "/files",
		"avatars": "../public/images/avatars",
		"tmp": "../tmp"
	},
	"cookie": {
		"secret": "x4zSC1xl2q9XtepZrokrtDqapJnV6jb5",
		"domain": "",
		"prefix": "taracotjs_locale_",
		"httpOnly": false,
		"secure": false,
		"maxAge": null,
		"path": "/"
	},
	"session": {
		"secret": "BAYMuWkXdt0GHzd9xsZwt9lTk7wrHpJA",
		"name": "taracotjs_session",
		"rolling": false,
		"resave": false,
		"proxy": true,
		"saveUninitialized": true,
		"unset": "destroy"
	},
	"salt": "E3F0UhLyP9IsczRAcVrXICBrFbqbNZP5HH260lNjB7KkEdY8jkDovQTsKw8hydta",
	"redis": {
		"active": false,
		"host": "localhost",
		"port": 6379,
		"prefix": "taracotjs_",
		"password": ""
	},
	"mailer": {
		"sender": "MK Handicrafts <noreply@taracot.org>",
		"feedback": "MK Handicrafts <info@taracot.org>",
		"transport": "sendmail",
		"sendmail": {
			"path": "/usr/sbin/sendmail"
		},
		"smtp": {
			"service": "Gmail",
			"auth": {
				"user": "gmail.user@gmail.com",
				"pass": "password"
			}
		}
	},
	"mongo": {
 "url":"mongodb://forty:572Nhu9yd5gXkVyqkg6y8eDHJNhwu6BCBUe@ds050559.mlab.com:50559/cms?auto_reconnect=true,w=1",
//		"url": "mongodb://localhost/cms",
		"options": {
			"server": {
				"auto_reconnect": false,
				"poolSize": 10,
				"socketOptions": {
					"keepAlive": 1
				}
			},
			"db": {
				"numberOfRetries": 10,
				"retryMiliSeconds": 1000
			}
		}
	},
	"captcha": "captcha_native",
	"graphicsmagick": false,
	"max_upload_file_mb": 100,
	"max_upload_image_mb": 5,
	"max_edit_file_kb": 1024,
	"log": {
		"console": {
			"level": "info",
			"colorize": true
		},
		"file": {
			"level": "error",
			"filename": "../logs/cms.log",
			"json": true,
			"maxsize": 1048576,
			"maxFiles": 3
		},
		"stack": true
	}
};

module.exports = config;
