function checkToken() {
	var jsonRequest = new Request.JSON({
		url : './server/redirect/test',
		headers : {
			'Content-type' : 'application/json'
		},
		urlEncoded : false,
		method : 'get',
		onSuccess : function(registered) {
			if (registered.isRegistered) {
				getAlbums();
			} else {
				console.log("Not Yet");
				setTimeout("checkToken()", 2000);
			}
		}
	}).send();
}

function getAlbums() {
	var jsonRequest = new Request.JSON({
		url : './server/picasa/albums',
		headers : {
			'Content-type' : 'application/json'
		},
		urlEncoded : false,
		method : 'get',
		onSuccess : function(text) {
			timeLine.init(text);
		}
	}).send();
}

var data = [{
                "id": 2365361791000,
                "description": "",
                "title": "USA",
                "pictures": [
                    {
                        "id": -2069130204,
                        "timestamp": 1182196544000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "https://lh4.googleusercontent.com/-_3g4zN5GjmI/TrMY4JXI9EI/AAAAAAAAABA/4kPWlsonPw8/P6180131.JPG",
                        "thumbnailLink": "https://lh4.googleusercontent.com/-_3g4zN5GjmI/TrMY4JXI9EI/AAAAAAAAABA/4kPWlsonPw8/s72/P6180131.JPG",
                        "latlng": {
                            "lat": 35.222567,
                            "lng": -97.439478
                        }
                    },
                    {
                        "id": 1710760771,
                        "timestamp": 1182235809000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "https://lh4.googleusercontent.com/-zRPIoRtXgQ4/TrMZGTCPClI/AAAAAAAAABg/9ctoAVeS8nk/P6190148.JPG",
                        "thumbnailLink": "https://lh4.googleusercontent.com/-zRPIoRtXgQ4/TrMZGTCPClI/AAAAAAAAABg/9ctoAVeS8nk/s72/P6190148.JPG",
                        "latlng": {
                            "lat": 35.1956377,
                            "lng": -101.4275151
                        }
                    },
                    {
                        "id": -864981993,
                        "timestamp": 1182255227000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "https://lh5.googleusercontent.com/-i5pRohNao9Q/TrMZmLodb4I/AAAAAAAAACQ/NLqB_BpY_VU/DSC01255.JPG",
                        "thumbnailLink": "https://lh5.googleusercontent.com/-i5pRohNao9Q/TrMZmLodb4I/AAAAAAAAACQ/NLqB_BpY_VU/s72/DSC01255.JPG",
                        "latlng": {
                            "lat": 36.1187479,
                            "lng": -109.318839
                        }
                    },
                    {
                        "id": 287959852,
                        "timestamp": 1182255542000,
                        "width": 2448,
                        "height": 3264,
                        "normalLink": "https://lh3.googleusercontent.com/-XeAJ_PuQEpk/TrMZyANLzfI/AAAAAAAAAC0/3i5BD4qc3vM/DSC01262.JPG",
                        "thumbnailLink": "https://lh3.googleusercontent.com/-XeAJ_PuQEpk/TrMZyANLzfI/AAAAAAAAAC0/3i5BD4qc3vM/s72/DSC01262.JPG",
                        "latlng": {
                            "lat": 36.1187479,
                            "lng": -109.318839
                        }
                    },
                    {
                        "id": -2143951765,
                        "timestamp": 1182268039000,
                        "width": 2272,
                        "height": 1704,
                        "normalLink": "https://lh5.googleusercontent.com/-LV6lS7jPJuo/TrMZ_JtlsOI/AAAAAAAAADM/65CFGP6vPgk/S7001784.JPG",
                        "thumbnailLink": "https://lh5.googleusercontent.com/-LV6lS7jPJuo/TrMZ_JtlsOI/AAAAAAAAADM/65CFGP6vPgk/s72/S7001784.JPG",
                        "latlng": {
                            "lat": 36.5706494,
                            "lng": -109.5506393
                        }
                    },
                    {
                        "id": -1916842918,
                        "timestamp": 1182273147000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "https://lh6.googleusercontent.com/-COtrgJ8Zh_E/TrMadjBosvI/AAAAAAAAADU/BF_C-LHB2b8/DSC01325.JPG",
                        "thumbnailLink": "https://lh6.googleusercontent.com/-COtrgJ8Zh_E/TrMadjBosvI/AAAAAAAAADU/BF_C-LHB2b8/s72/DSC01325.JPG",
                        "latlng": {
                            "lat": 37.010556,
                            "lng": -110.242778
                        }
                    },
                    {
                        "id": -1123364585,
                        "timestamp": 1182272592000,
                        "width": 2272,
                        "height": 1704,
                        "normalLink": "https://lh4.googleusercontent.com/-4m9TeyuYpWg/TrMalNvIq1I/AAAAAAAAADc/cbAY4RGH3Cs/S7001865.JPG",
                        "thumbnailLink": "https://lh4.googleusercontent.com/-4m9TeyuYpWg/TrMalNvIq1I/AAAAAAAAADc/cbAY4RGH3Cs/s72/S7001865.JPG",
                        "latlng": {
                            "lat": 37.010556,
                            "lng": -110.242778
                        }
                    },
                    {
                        "id": 635933957,
                        "timestamp": 1182284178000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "https://lh4.googleusercontent.com/-xUx4oqocRaA/TrMbOv-Cd6I/AAAAAAAAADs/IB1fZbT78EU/DSC01344.JPG",
                        "thumbnailLink": "https://lh4.googleusercontent.com/-xUx4oqocRaA/TrMbOv-Cd6I/AAAAAAAAADs/IB1fZbT78EU/s72/DSC01344.JPG",
                        "latlng": {
                            "lat": 36.044021,
                            "lng": -112.12636
                        }
                    },
                    {
                        "id": 1019720799,
                        "timestamp": 1182289641000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "https://lh4.googleusercontent.com/-DQqeNX8QMPg/TrMbMOA8mOI/AAAAAAAAADk/fN4RVfBQazI/DSC01387.JPG",
                        "thumbnailLink": "https://lh4.googleusercontent.com/-DQqeNX8QMPg/TrMbMOA8mOI/AAAAAAAAADk/fN4RVfBQazI/s72/DSC01387.JPG",
                        "latlng": {
                            "lat": 36.044021,
                            "lng": -112.12636
                        }
                    },
                    {
                        "id": 77168105,
                        "timestamp": 1182349702000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "https://lh4.googleusercontent.com/--IXFn_oP_2g/TrMbQN-I-SI/AAAAAAAAAD0/5zKN8V7QQ-g/DSC01500.JPG",
                        "thumbnailLink": "https://lh4.googleusercontent.com/--IXFn_oP_2g/TrMbQN-I-SI/AAAAAAAAAD0/5zKN8V7QQ-g/s72/DSC01500.JPG",
                        "latlng": {
                            "lat": 36.044021,
                            "lng": -112.12636
                        }
                    },
                    {
                        "id": -281164241,
                        "timestamp": 1182377965000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "https://lh6.googleusercontent.com/-yZGoK5DpxY8/TrMbYT09_OI/AAAAAAAAAD8/s_uSQlt-ySQ/DSC01538.JPG",
                        "thumbnailLink": "https://lh6.googleusercontent.com/-yZGoK5DpxY8/TrMbYT09_OI/AAAAAAAAAD8/s_uSQlt-ySQ/s72/DSC01538.JPG",
                        "latlng": {
                            "lat": 36.0306951,
                            "lng": -115.0157642
                        }
                    },
                    {
                        "id": 1032804268,
                        "timestamp": 1182394527000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "https://lh6.googleusercontent.com/-HeKyIpGZcfo/TrMcPnYQCAI/AAAAAAAAAEM/lxcmDGePGAU/DSC01601.JPG",
                        "thumbnailLink": "https://lh6.googleusercontent.com/-HeKyIpGZcfo/TrMcPnYQCAI/AAAAAAAAAEM/lxcmDGePGAU/s72/DSC01601.JPG",
                        "latlng": {
                            "lat": 36.125038,
                            "lng": -115.1764392
                        }
                    },
                    {
                        "id": -81605241,
                        "timestamp": 1182402266000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "https://lh3.googleusercontent.com/-3PmM3qvFR-U/TrMcSFofmGI/AAAAAAAAAEU/Gxg_XSmJyT4/DSC01644.JPG",
                        "thumbnailLink": "https://lh3.googleusercontent.com/-3PmM3qvFR-U/TrMcSFofmGI/AAAAAAAAAEU/Gxg_XSmJyT4/s72/DSC01644.JPG",
                        "latlng": {
                            "lat": 36.125038,
                            "lng": -115.1764392
                        }
                    },
                    {
                        "id": -680905338,
                        "timestamp": 1182433932000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "https://lh4.googleusercontent.com/-DYHS92MqaXk/TrMcOSn3qUI/AAAAAAAAAEE/WTqrj3WrWfI/IMGP0320.JPG",
                        "thumbnailLink": "https://lh4.googleusercontent.com/-DYHS92MqaXk/TrMcOSn3qUI/AAAAAAAAAEE/WTqrj3WrWfI/s72/IMGP0320.JPG",
                        "latlng": {
                            "lat": 36.125038,
                            "lng": -115.1764392
                        }
                    },
                    {
                        "id": -695160004,
                        "timestamp": 1182446358000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "https://lh6.googleusercontent.com/--42ePGvg_c4/TrMc3LKmipI/AAAAAAAAAEc/vDvnto-jovE/DSC01719.JPG",
                        "thumbnailLink": "https://lh6.googleusercontent.com/--42ePGvg_c4/TrMc3LKmipI/AAAAAAAAAEc/vDvnto-jovE/s72/DSC01719.JPG",
                        "latlng": {
                            "lat": 36.220134,
                            "lng": -116.881684
                        }
                    },
                    {
                        "id": 150261494,
                        "timestamp": 1182447329000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "https://lh6.googleusercontent.com/-Edahtph9MFI/TrMc5RfZvFI/AAAAAAAAAEs/LOUvcuAjKsk/DSC01728.JPG",
                        "thumbnailLink": "https://lh6.googleusercontent.com/-Edahtph9MFI/TrMc5RfZvFI/AAAAAAAAAEs/LOUvcuAjKsk/s72/DSC01728.JPG",
                        "latlng": {
                            "lat": 36.220134,
                            "lng": -116.881684
                        }
                    },
                    {
                        "id": -1475080385,
                        "timestamp": 1182457500000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "https://lh6.googleusercontent.com/-sTmkJJOfXl4/TrMc4ocoNjI/AAAAAAAAAEk/9FsURUizfBs/DSC01768.JPG",
                        "thumbnailLink": "https://lh6.googleusercontent.com/-sTmkJJOfXl4/TrMc4ocoNjI/AAAAAAAAAEk/9FsURUizfBs/s72/DSC01768.JPG",
                        "latlng": {
                            "lat": 36.220134,
                            "lng": -116.881684
                        }
                    },
                    {
                        "id": -970429309,
                        "timestamp": 1182537089000,
                        "width": 2448,
                        "height": 3264,
                        "normalLink": "https://lh5.googleusercontent.com/-eomtzlbUgnc/TrMds9RuGcI/AAAAAAAAAE8/wBqsZOiUSh4/DSC01919.JPG",
                        "thumbnailLink": "https://lh5.googleusercontent.com/-eomtzlbUgnc/TrMds9RuGcI/AAAAAAAAAE8/wBqsZOiUSh4/s72/DSC01919.JPG",
                        "latlng": {
                            "lat": 37.770596,
                            "lng": -119.510771
                        }
                    },
                    {
                        "id": -726401,
                        "timestamp": 1182542586000,
                        "width": 2448,
                        "height": 3264,
                        "normalLink": "https://lh4.googleusercontent.com/-92js_e4Dyt4/TrMdqderplI/AAAAAAAAAE0/2xYJjVOZR_E/DSC01960.JPG",
                        "thumbnailLink": "https://lh4.googleusercontent.com/-92js_e4Dyt4/TrMdqderplI/AAAAAAAAAE0/2xYJjVOZR_E/s72/DSC01960.JPG",
                        "latlng": {
                            "lat": 37.770596,
                            "lng": -119.510771
                        }
                    },
                    {
                        "id": -19126834,
                        "timestamp": 1182628493000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "https://lh6.googleusercontent.com/-iVTrWCoeG5Q/TrMepqZouAI/AAAAAAAAAFM/O4ocX7o5RGA/DSC02076.JPG",
                        "thumbnailLink": "https://lh6.googleusercontent.com/-iVTrWCoeG5Q/TrMepqZouAI/AAAAAAAAAFM/O4ocX7o5RGA/s72/DSC02076.JPG",
                        "latlng": {
                            "lat": 37.8194213,
                            "lng": -122.4743476
                        }
                    },
                    {
                        "id": -1788472250,
                        "timestamp": 1182710510000,
                        "width": 2448,
                        "height": 3264,
                        "normalLink": "https://lh5.googleusercontent.com/-Nf8jpU54K2g/TrMeqafMIyI/AAAAAAAAAFQ/38Z4VNbS6Hs/DSC02262.JPG",
                        "thumbnailLink": "https://lh5.googleusercontent.com/-Nf8jpU54K2g/TrMeqafMIyI/AAAAAAAAAFQ/38Z4VNbS6Hs/s72/DSC02262.JPG",
                        "latlng": {
                            "lat": 37.794466,
                            "lng": -122.4166693
                        }
                    },
                    {
                        "id": 1881799057,
                        "timestamp": 1182804355000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "https://lh4.googleusercontent.com/-hRWeK9_TOyc/TrMenuH6t9I/AAAAAAAAAFE/ajMKGWoyPvo/DSC02424.JPG",
                        "thumbnailLink": "https://lh4.googleusercontent.com/-hRWeK9_TOyc/TrMenuH6t9I/AAAAAAAAAFE/ajMKGWoyPvo/s72/DSC02424.JPG",
                        "latlng": {
                            "lat": 37.7287825,
                            "lng": -122.3761572
                        }
                    },
                    {
                        "id": -1160400326,
                        "timestamp": 1182629122000,
                        "width": 2592,
                        "height": 1944,
                        "normalLink": "https://lh6.googleusercontent.com/-Sj2c794jHDg/TrMeuiysRuI/AAAAAAAAAFc/guDrAnutUtU/S7002362.JPG",
                        "thumbnailLink": "https://lh6.googleusercontent.com/-Sj2c794jHDg/TrMeuiysRuI/AAAAAAAAAFc/guDrAnutUtU/s72/S7002362.JPG",
                        "latlng": {
                            "lat": 37.8329802,
                            "lng": -122.4008764
                        }
                    },
                    {
                        "id": 67825261,
                        "timestamp": 1182977858000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "https://lh4.googleusercontent.com/-qq2fX4XuHFU/TrMe3kVm0sI/AAAAAAAAAFk/y2W22ceuwIM/IMGP0667.JPG",
                        "thumbnailLink": "https://lh4.googleusercontent.com/-qq2fX4XuHFU/TrMe3kVm0sI/AAAAAAAAAFk/y2W22ceuwIM/s72/IMGP0667.JPG",
                        "latlng": {
                            "lat": 34.4084766,
                            "lng": -119.6982396
                        }
                    },
                    {
                        "id": 2102029783,
                        "timestamp": 1183004056000,
                        "width": 2304,
                        "height": 3072,
                        "normalLink": "https://lh5.googleusercontent.com/-rT3Xw0GSNbU/TrMfp1JupFI/AAAAAAAAAF8/FXcxc2TQCY8/IMGP0693.JPG",
                        "thumbnailLink": "https://lh5.googleusercontent.com/-rT3Xw0GSNbU/TrMfp1JupFI/AAAAAAAAAF8/FXcxc2TQCY8/s72/IMGP0693.JPG",
                        "latlng": {
                            "lat": 33.979106,
                            "lng": -118.2452977
                        }
                    },
                    {
                        "id": -889862521,
                        "timestamp": 1183006978000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "https://lh3.googleusercontent.com/-wHXC2uedkbE/TrMfjkYRdNI/AAAAAAAAAFs/Oc9uGTpap8k/IMGP0727.JPG",
                        "thumbnailLink": "https://lh3.googleusercontent.com/-wHXC2uedkbE/TrMfjkYRdNI/AAAAAAAAAFs/Oc9uGTpap8k/s72/IMGP0727.JPG",
                        "latlng": {
                            "lat": 34.092809,
                            "lng": -118.328661
                        }
                    },
                    {
                        "id": -1114023443,
                        "timestamp": 1183165247000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "https://lh3.googleusercontent.com/-tor8dt0a7Zs/TrMfm5WMvxI/AAAAAAAAAF0/uFoSD5nRvRU/IMGP0803.JPG",
                        "thumbnailLink": "https://lh3.googleusercontent.com/-tor8dt0a7Zs/TrMfm5WMvxI/AAAAAAAAAF0/uFoSD5nRvRU/s72/IMGP0803.JPG",
                        "latlng": {
                            "lat": 34.0154397,
                            "lng": -118.4955158
                        }
                    },
                    {
                        "id": -1720462609,
                        "timestamp": 1182972445000,
                        "width": 2592,
                        "height": 1944,
                        "normalLink": "https://lh4.googleusercontent.com/-uew6UDM1muw/TrMftqxuHmI/AAAAAAAAAGE/-bu06jSwflU/S7002685.JPG",
                        "thumbnailLink": "https://lh4.googleusercontent.com/-uew6UDM1muw/TrMftqxuHmI/AAAAAAAAAGE/-bu06jSwflU/s72/S7002685.JPG",
                        "latlng": {
                            "lat": 34.0370646,
                            "lng": -118.260683
                        }
                    }
                ],
                "photosNumber": 28,
                "startDate": 1182196544000,
                "endDate": 1183165247000
            }
        ]
