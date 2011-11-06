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

var data = [

            {
                "id": 2365361791000,
                "description": "",
                "title": "USA",
                "pictures": [
                    {
                        "id": -1377726332,
                        "timestamp": 1182196544000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-_3g4zN5GjmI/TrMY4JXI9EI/AAAAAAAAABA/4kPWlsonPw8/P6180131.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-_3g4zN5GjmI/TrMY4JXI9EI/AAAAAAAAABA/4kPWlsonPw8/s72/P6180131.JPG",
                        "latlng": {
                            "lat": 35.222567,
                            "lng": -97.439478
                        }
                    },
                    {
                        "id": -1892802653,
                        "timestamp": 1182235809000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-zRPIoRtXgQ4/TrMZGTCPClI/AAAAAAAAABg/9ctoAVeS8nk/P6190148.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-zRPIoRtXgQ4/TrMZGTCPClI/AAAAAAAAABg/9ctoAVeS8nk/s72/P6190148.JPG",
                        "latlng": {
                            "lat": 35.1956377,
                            "lng": -101.4275151
                        }
                    },
                    {
                        "id": -173578121,
                        "timestamp": 1182255227000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "server/proxy/url/?url=https://lh5.googleusercontent.com/-i5pRohNao9Q/TrMZmLodb4I/AAAAAAAAACQ/NLqB_BpY_VU/DSC01255.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh5.googleusercontent.com/-i5pRohNao9Q/TrMZmLodb4I/AAAAAAAAACQ/NLqB_BpY_VU/s72/DSC01255.JPG",
                        "latlng": {
                            "lat": 36.1187479,
                            "lng": -109.318839
                        }
                    },
                    {
                        "id": 979363724,
                        "timestamp": 1182255542000,
                        "width": 2448,
                        "height": 3264,
                        "normalLink": "server/proxy/url/?url=https://lh3.googleusercontent.com/-XeAJ_PuQEpk/TrMZyANLzfI/AAAAAAAAAC0/3i5BD4qc3vM/DSC01262.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh3.googleusercontent.com/-XeAJ_PuQEpk/TrMZyANLzfI/AAAAAAAAAC0/3i5BD4qc3vM/s72/DSC01262.JPG",
                        "latlng": {
                            "lat": 36.1187479,
                            "lng": -109.318839
                        }
                    },
                    {
                        "id": -1452547893,
                        "timestamp": 1182268039000,
                        "width": 2272,
                        "height": 1704,
                        "normalLink": "server/proxy/url/?url=https://lh5.googleusercontent.com/-LV6lS7jPJuo/TrMZ_JtlsOI/AAAAAAAAADM/65CFGP6vPgk/S7001784.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh5.googleusercontent.com/-LV6lS7jPJuo/TrMZ_JtlsOI/AAAAAAAAADM/65CFGP6vPgk/s72/S7001784.JPG",
                        "latlng": {
                            "lat": 36.5706494,
                            "lng": -109.5506393
                        }
                    },
                    {
                        "id": -1225439046,
                        "timestamp": 1182273147000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/-COtrgJ8Zh_E/TrMadjBosvI/AAAAAAAAADU/BF_C-LHB2b8/DSC01325.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/-COtrgJ8Zh_E/TrMadjBosvI/AAAAAAAAADU/BF_C-LHB2b8/s72/DSC01325.JPG",
                        "latlng": {
                            "lat": 37.010556,
                            "lng": -110.242778
                        }
                    },
                    {
                        "id": -431960713,
                        "timestamp": 1182272592000,
                        "width": 2272,
                        "height": 1704,
                        "normalLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-4m9TeyuYpWg/TrMalNvIq1I/AAAAAAAAADc/cbAY4RGH3Cs/S7001865.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-4m9TeyuYpWg/TrMalNvIq1I/AAAAAAAAADc/cbAY4RGH3Cs/s72/S7001865.JPG",
                        "latlng": {
                            "lat": 37.010556,
                            "lng": -110.242778
                        }
                    },
                    {
                        "id": 1327337829,
                        "timestamp": 1182284178000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-xUx4oqocRaA/TrMbOv-Cd6I/AAAAAAAAADs/IB1fZbT78EU/DSC01344.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-xUx4oqocRaA/TrMbOv-Cd6I/AAAAAAAAADs/IB1fZbT78EU/s72/DSC01344.JPG",
                        "latlng": {
                            "lat": 36.044021,
                            "lng": -112.12636
                        }
                    },
                    {
                        "id": 1711124671,
                        "timestamp": 1182289641000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-DQqeNX8QMPg/TrMbMOA8mOI/AAAAAAAAADk/fN4RVfBQazI/DSC01387.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-DQqeNX8QMPg/TrMbMOA8mOI/AAAAAAAAADk/fN4RVfBQazI/s72/DSC01387.JPG",
                        "latlng": {
                            "lat": 36.044021,
                            "lng": -112.12636
                        }
                    },
                    {
                        "id": 768571977,
                        "timestamp": 1182349702000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/--IXFn_oP_2g/TrMbQN-I-SI/AAAAAAAAAD0/5zKN8V7QQ-g/DSC01500.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/--IXFn_oP_2g/TrMbQN-I-SI/AAAAAAAAAD0/5zKN8V7QQ-g/s72/DSC01500.JPG",
                        "latlng": {
                            "lat": 36.044021,
                            "lng": -112.12636
                        }
                    },
                    {
                        "id": 410239631,
                        "timestamp": 1182377965000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/-yZGoK5DpxY8/TrMbYT09_OI/AAAAAAAAAD8/s_uSQlt-ySQ/DSC01538.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/-yZGoK5DpxY8/TrMbYT09_OI/AAAAAAAAAD8/s_uSQlt-ySQ/s72/DSC01538.JPG",
                        "latlng": {
                            "lat": 36.0306951,
                            "lng": -115.0157642
                        }
                    },
                    {
                        "id": 1724208140,
                        "timestamp": 1182394527000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/-HeKyIpGZcfo/TrMcPnYQCAI/AAAAAAAAAEM/lxcmDGePGAU/DSC01601.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/-HeKyIpGZcfo/TrMcPnYQCAI/AAAAAAAAAEM/lxcmDGePGAU/s72/DSC01601.JPG",
                        "latlng": {
                            "lat": 36.125038,
                            "lng": -115.1764392
                        }
                    },
                    {
                        "id": 609798631,
                        "timestamp": 1182402266000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "server/proxy/url/?url=https://lh3.googleusercontent.com/-3PmM3qvFR-U/TrMcSFofmGI/AAAAAAAAAEU/Gxg_XSmJyT4/DSC01644.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh3.googleusercontent.com/-3PmM3qvFR-U/TrMcSFofmGI/AAAAAAAAAEU/Gxg_XSmJyT4/s72/DSC01644.JPG",
                        "latlng": {
                            "lat": 36.125038,
                            "lng": -115.1764392
                        }
                    },
                    {
                        "id": 10498534,
                        "timestamp": 1182433932000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-DYHS92MqaXk/TrMcOSn3qUI/AAAAAAAAAEE/WTqrj3WrWfI/IMGP0320.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-DYHS92MqaXk/TrMcOSn3qUI/AAAAAAAAAEE/WTqrj3WrWfI/s72/IMGP0320.JPG",
                        "latlng": {
                            "lat": 36.125038,
                            "lng": -115.1764392
                        }
                    },
                    {
                        "id": -3756132,
                        "timestamp": 1182446358000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/--42ePGvg_c4/TrMc3LKmipI/AAAAAAAAAEc/vDvnto-jovE/DSC01719.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/--42ePGvg_c4/TrMc3LKmipI/AAAAAAAAAEc/vDvnto-jovE/s72/DSC01719.JPG",
                        "latlng": {
                            "lat": 36.220134,
                            "lng": -116.881684
                        }
                    },
                    {
                        "id": 841665366,
                        "timestamp": 1182447329000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/-Edahtph9MFI/TrMc5RfZvFI/AAAAAAAAAEs/LOUvcuAjKsk/DSC01728.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/-Edahtph9MFI/TrMc5RfZvFI/AAAAAAAAAEs/LOUvcuAjKsk/s72/DSC01728.JPG",
                        "latlng": {
                            "lat": 36.220134,
                            "lng": -116.881684
                        }
                    },
                    {
                        "id": -783676513,
                        "timestamp": 1182457500000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/-sTmkJJOfXl4/TrMc4ocoNjI/AAAAAAAAAEk/9FsURUizfBs/DSC01768.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/-sTmkJJOfXl4/TrMc4ocoNjI/AAAAAAAAAEk/9FsURUizfBs/s72/DSC01768.JPG",
                        "latlng": {
                            "lat": 36.220134,
                            "lng": -116.881684
                        }
                    },
                    {
                        "id": -279025437,
                        "timestamp": 1182537089000,
                        "width": 2448,
                        "height": 3264,
                        "normalLink": "server/proxy/url/?url=https://lh5.googleusercontent.com/-eomtzlbUgnc/TrMds9RuGcI/AAAAAAAAAE8/wBqsZOiUSh4/DSC01919.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh5.googleusercontent.com/-eomtzlbUgnc/TrMds9RuGcI/AAAAAAAAAE8/wBqsZOiUSh4/s72/DSC01919.JPG",
                        "latlng": {
                            "lat": 37.770596,
                            "lng": -119.510771
                        }
                    },
                    {
                        "id": 690677471,
                        "timestamp": 1182542586000,
                        "width": 2448,
                        "height": 3264,
                        "normalLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-92js_e4Dyt4/TrMdqderplI/AAAAAAAAAE0/2xYJjVOZR_E/DSC01960.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-92js_e4Dyt4/TrMdqderplI/AAAAAAAAAE0/2xYJjVOZR_E/s72/DSC01960.JPG",
                        "latlng": {
                            "lat": 37.770596,
                            "lng": -119.510771
                        }
                    },
                    {
                        "id": 672277038,
                        "timestamp": 1182628493000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/-iVTrWCoeG5Q/TrMepqZouAI/AAAAAAAAAFM/O4ocX7o5RGA/DSC02076.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/-iVTrWCoeG5Q/TrMepqZouAI/AAAAAAAAAFM/O4ocX7o5RGA/s72/DSC02076.JPG",
                        "latlng": {
                            "lat": 37.8194213,
                            "lng": -122.4743476
                        }
                    },
                    {
                        "id": -1097068378,
                        "timestamp": 1182710510000,
                        "width": 2448,
                        "height": 3264,
                        "normalLink": "server/proxy/url/?url=https://lh5.googleusercontent.com/-Nf8jpU54K2g/TrMeqafMIyI/AAAAAAAAAFQ/38Z4VNbS6Hs/DSC02262.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh5.googleusercontent.com/-Nf8jpU54K2g/TrMeqafMIyI/AAAAAAAAAFQ/38Z4VNbS6Hs/s72/DSC02262.JPG",
                        "latlng": {
                            "lat": 37.794466,
                            "lng": -122.4166693
                        }
                    },
                    {
                        "id": -1721764367,
                        "timestamp": 1182804355000,
                        "width": 3264,
                        "height": 2448,
                        "normalLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-hRWeK9_TOyc/TrMenuH6t9I/AAAAAAAAAFE/ajMKGWoyPvo/DSC02424.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-hRWeK9_TOyc/TrMenuH6t9I/AAAAAAAAAFE/ajMKGWoyPvo/s72/DSC02424.JPG",
                        "latlng": {
                            "lat": 37.7287825,
                            "lng": -122.3761572
                        }
                    },
                    {
                        "id": -468996454,
                        "timestamp": 1182629122000,
                        "width": 2592,
                        "height": 1944,
                        "normalLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/-Sj2c794jHDg/TrMeuiysRuI/AAAAAAAAAFc/guDrAnutUtU/S7002362.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/-Sj2c794jHDg/TrMeuiysRuI/AAAAAAAAAFc/guDrAnutUtU/s72/S7002362.JPG",
                        "latlng": {
                            "lat": 37.8329802,
                            "lng": -122.4008764
                        }
                    },
                    {
                        "id": 759229133,
                        "timestamp": 1182977858000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-qq2fX4XuHFU/TrMe3kVm0sI/AAAAAAAAAFk/y2W22ceuwIM/IMGP0667.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-qq2fX4XuHFU/TrMe3kVm0sI/AAAAAAAAAFk/y2W22ceuwIM/s72/IMGP0667.JPG",
                        "latlng": {
                            "lat": 34.4084766,
                            "lng": -119.6982396
                        }
                    },
                    {
                        "id": -1501533641,
                        "timestamp": 1183004056000,
                        "width": 2304,
                        "height": 3072,
                        "normalLink": "server/proxy/url/?url=https://lh5.googleusercontent.com/-rT3Xw0GSNbU/TrMfp1JupFI/AAAAAAAAAF8/FXcxc2TQCY8/IMGP0693.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh5.googleusercontent.com/-rT3Xw0GSNbU/TrMfp1JupFI/AAAAAAAAAF8/FXcxc2TQCY8/s72/IMGP0693.JPG",
                        "latlng": {
                            "lat": 33.979106,
                            "lng": -118.2452977
                        }
                    },
                    {
                        "id": -198458649,
                        "timestamp": 1183006978000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "server/proxy/url/?url=https://lh3.googleusercontent.com/-wHXC2uedkbE/TrMfjkYRdNI/AAAAAAAAAFs/Oc9uGTpap8k/IMGP0727.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh3.googleusercontent.com/-wHXC2uedkbE/TrMfjkYRdNI/AAAAAAAAAFs/Oc9uGTpap8k/s72/IMGP0727.JPG",
                        "latlng": {
                            "lat": 34.092809,
                            "lng": -118.328661
                        }
                    },
                    {
                        "id": -422619571,
                        "timestamp": 1183165247000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "server/proxy/url/?url=https://lh3.googleusercontent.com/-tor8dt0a7Zs/TrMfm5WMvxI/AAAAAAAAAF0/uFoSD5nRvRU/IMGP0803.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh3.googleusercontent.com/-tor8dt0a7Zs/TrMfm5WMvxI/AAAAAAAAAF0/uFoSD5nRvRU/s72/IMGP0803.JPG",
                        "latlng": {
                            "lat": 34.0154397,
                            "lng": -118.4955158
                        }
                    },
                    {
                        "id": -1029058737,
                        "timestamp": 1182972445000,
                        "width": 2592,
                        "height": 1944,
                        "normalLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-uew6UDM1muw/TrMftqxuHmI/AAAAAAAAAGE/-bu06jSwflU/S7002685.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-uew6UDM1muw/TrMftqxuHmI/AAAAAAAAAGE/-bu06jSwflU/s72/S7002685.JPG",
                        "latlng": {
                            "lat": 34.0370646,
                            "lng": -118.260683
                        }
                    }
                ],
                "photosNumber": 28,
                "startDate": 1182196544000,
                "endDate": 1183165247000
            },
            {
                "id": 2436584439000,
                "description": "",
                "title": "New Zealand",
                "pictures": [
                    {
                        "id": 1352649787,
                        "timestamp": 1218195720000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "server/proxy/url/?url=https://lh5.googleusercontent.com/-ikz8kQFBD3E/TrMYuQuIsyI/AAAAAAAAAAk/5MNMT6F1-qU/DSC03138.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh5.googleusercontent.com/-ikz8kQFBD3E/TrMYuQuIsyI/AAAAAAAAAAk/5MNMT6F1-qU/s72/DSC03138.JPG",
                        "latlng": {
                            "lat": -43.5980132,
                            "lng": 169.5473021
                        }
                    },
                    {
                        "id": -668693848,
                        "timestamp": 1218192640000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-dIhWLr1Z77Q/TrMYyEN0wOI/AAAAAAAAAAw/llrG82G313c/DSC03113.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-dIhWLr1Z77Q/TrMYyEN0wOI/AAAAAAAAAAw/llrG82G313c/s72/DSC03113.JPG",
                        "latlng": {
                            "lat": -43.5980131,
                            "lng": 169.5473021
                        }
                    },
                    {
                        "id": -1864554328,
                        "timestamp": 1218195310000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-p6jbPCs5TqU/TrMYyLwMenI/AAAAAAAAAAs/UO66Q8DN0lc/DSC03132.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-p6jbPCs5TqU/TrMYyLwMenI/AAAAAAAAAAs/UO66Q8DN0lc/s72/DSC03132.JPG",
                        "latlng": {
                            "lat": -43.5980131,
                            "lng": 169.5473021
                        }
                    },
                    {
                        "id": 500839829,
                        "timestamp": 1218385207000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-XpWGoBc9Fq8/TrMY_rNylRI/AAAAAAAAABI/YdQcLZdgft8/DSC03348.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-XpWGoBc9Fq8/TrMY_rNylRI/AAAAAAAAABI/YdQcLZdgft8/s72/DSC03348.JPG",
                        "latlng": {
                            "lat": -46.1492595,
                            "lng": 167.4660262
                        }
                    },
                    {
                        "id": 272230392,
                        "timestamp": 1218291625000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/-ge3zSXN4AG4/TrMZCFoKy3I/AAAAAAAAABQ/9kQQ-xTQDQM/DSC03303.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/-ge3zSXN4AG4/TrMZCFoKy3I/AAAAAAAAABQ/9kQQ-xTQDQM/s72/DSC03303.JPG",
                        "latlng": {
                            "lat": -43.6672341,
                            "lng": 169.5654449
                        }
                    },
                    {
                        "id": 1434367520,
                        "timestamp": 1218370396000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-IOrqpbzkaaw/TrMZEffnwzI/AAAAAAAAABY/rkPmSV5jSTc/DSC03323.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-IOrqpbzkaaw/TrMZEffnwzI/AAAAAAAAABY/rkPmSV5jSTc/s72/DSC03323.JPG",
                        "latlng": {
                            "lat": -43.7100174,
                            "lng": 169.2640074
                        }
                    },
                    {
                        "id": 1320130477,
                        "timestamp": 1218640247000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-XVEfto7dlWE/TrMZRiXSM6I/AAAAAAAAABs/PCwROQbDKwU/DSC03432.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh4.googleusercontent.com/-XVEfto7dlWE/TrMZRiXSM6I/AAAAAAAAABs/PCwROQbDKwU/s72/DSC03432.JPG",
                        "latlng": {
                            "lat": -43.6368466,
                            "lng": 171.1660154
                        }
                    },
                    {
                        "id": -546682293,
                        "timestamp": 1218464908000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/-sSFAXYmWGG4/TrMZRJHGxXI/AAAAAAAAABo/rj341QHoLh4/DSC03380.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/-sSFAXYmWGG4/TrMZRJHGxXI/AAAAAAAAABo/rj341QHoLh4/s72/DSC03380.JPG",
                        "latlng": {
                            "lat": -45.6352847,
                            "lng": 169.6114499
                        }
                    },
                    {
                        "id": 288027094,
                        "timestamp": 1218466381000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "server/proxy/url/?url=https://lh3.googleusercontent.com/-x9gVgtkVM6s/TrMZVG_bywI/AAAAAAAAAB4/xFwJmiqGHx4/DSC03396.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh3.googleusercontent.com/-x9gVgtkVM6s/TrMZVG_bywI/AAAAAAAAAB4/xFwJmiqGHx4/s72/DSC03396.JPG",
                        "latlng": {
                            "lat": -45.5737958,
                            "lng": 169.7213131
                        }
                    },
                    {
                        "id": -1479720856,
                        "timestamp": 1218643259000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "server/proxy/url/?url=https://lh5.googleusercontent.com/-Q2NYAmhZeSI/TrMZigqjhII/AAAAAAAAACg/qvnIECWxo4I/DSC03494.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh5.googleusercontent.com/-Q2NYAmhZeSI/TrMZigqjhII/AAAAAAAAACg/qvnIECWxo4I/s72/DSC03494.JPG",
                        "latlng": {
                            "lat": -44.2354814,
                            "lng": 170.3804927
                        }
                    },
                    {
                        "id": -38312764,
                        "timestamp": 1218642619000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "server/proxy/url/?url=https://lh3.googleusercontent.com/-PiTG0DixacA/TrMZe8BsBCI/AAAAAAAAACA/yU1-g3Sdbvk/DSC03468.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh3.googleusercontent.com/-PiTG0DixacA/TrMZe8BsBCI/AAAAAAAAACA/yU1-g3Sdbvk/s72/DSC03468.JPG",
                        "latlng": {
                            "lat": -43.456624,
                            "lng": 171.304428
                        }
                    },
                    {
                        "id": 825133989,
                        "timestamp": 1218642923000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "server/proxy/url/?url=https://lh3.googleusercontent.com/-0oN16I3gtyA/TrMZmtv5IDI/AAAAAAAAACU/1PM4vCJo6_E/DSC03488.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh3.googleusercontent.com/-0oN16I3gtyA/TrMZmtv5IDI/AAAAAAAAACU/1PM4vCJo6_E/s72/DSC03488.JPG",
                        "latlng": {
                            "lat": -43.4087555,
                            "lng": 171.4966887
                        }
                    },
                    {
                        "id": -1200011759,
                        "timestamp": 1217942926000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "server/proxy/url/?url=https://lh5.googleusercontent.com/-6ViXwMeM4IY/TrMZvSroGXI/AAAAAAAAACk/0vRiPdv2pFY/DSC02939.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh5.googleusercontent.com/-6ViXwMeM4IY/TrMZvSroGXI/AAAAAAAAACk/0vRiPdv2pFY/s72/DSC02939.JPG",
                        "latlng": {
                            "lat": -43.3022366,
                            "lng": 170.2360074
                        }
                    },
                    {
                        "id": 1350162092,
                        "timestamp": 1217941180000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/-n4r8O5_He48/TrMZxR79TBI/AAAAAAAAACs/kO8uWbFn32k/DSC02869.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/-n4r8O5_He48/TrMZxR79TBI/AAAAAAAAACs/kO8uWbFn32k/s72/DSC02869.JPG",
                        "latlng": {
                            "lat": -43.466667,
                            "lng": 170.183333
                        }
                    },
                    {
                        "id": -111416984,
                        "timestamp": 1218015193000,
                        "width": 3072,
                        "height": 2304,
                        "normalLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/-3gr5EmG3PR4/TrMZz-RLFqI/AAAAAAAAAC8/TZPGADhX8NE/DSC03032.JPG",
                        "thumbnailLink": "server/proxy/url/?url=https://lh6.googleusercontent.com/-3gr5EmG3PR4/TrMZz-RLFqI/AAAAAAAAAC8/TZPGADhX8NE/s72/DSC03032.JPG",
                        "latlng": {
                            "lat": -43.466667,
                            "lng": 170.183333
                        }
                    }
                ],
                "photosNumber": 15,
                "startDate": 1217941180000,
                "endDate": 1218643259000
            }

        ]
