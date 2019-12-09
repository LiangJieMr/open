$(function() {
	var dom = document.getElementById("container");
	var myChart = echarts.init(dom);
	var option = {
		legend: {
			"padding": [20, 10, 20, 10],
			"itemGap": 80,
			"itemHeight": 28,
			"itemWidth": 60,
			"textStyle": {
				"fontSize": 26
			}
		},
		tooltip: {
			'trigger': 'item'
		},
		dataset: {
			source: [
				['product', '总部', '学习中心'],
				['双十一实时报名', 0, 0]
			]
		},
		xAxis: {
			type: 'category',
			axisLabel: {
				show: true,
				textStyle: {
					color: '#000',
					fontSize: '26'
				}
			},
			splitLine: {
				show: true,
				//  改变轴线颜色
				lineStyle: {
					// 使用深浅的间隔色
					color: ['red']
				}
			},
			axisLine: {
				symbol: 'arrow',
				lineStyle: {
					color: '#ccc',
					width: 3
				}
			}
		},
		name: '报名人数',
		yAxis: {
			type: 'value',
			max: function(value) {
				return value.max + Math.pow(10, String(value.max).length - 1);
			},
			//	    scale:true,
			axisLabel: {
				formatter: '{value} 人'
			},
			minInterval: 1,
			axisLine: {
				symbol: 'arrow',
				lineStyle: {
					color: '#ccc',
					width: 3
				},
			}
		},
		// Declare several bar series, each will be mapped
		// to a column of dataset.source by default.
		series: [{
				type: 'bar',
				barGap: '150%',
				barWidth: 150,
				markLine: {
					itemStyle: {
						normal: {
							color: '#FA8565',
							label: {

								formatter: '{c}'
							}
						}
					},
					data: [{
						name: 'Y 轴值为 100 的水平线',
						yAxis: 1000
					}]
				},
				itemStyle: {
					normal: {

						barBorderRadius: 5,
						label: {
							show: true, //开启显示
							position: 'top', //在上方显示
							textStyle: { //数值样式
								color: 'rgb(250, 8, 8)',
								fontSize: 25
							}
						}
					}
				}
			},
			{
				type: 'bar',
				barGap: '150%',
				barWidth: 150,
				markLine: {
					itemStyle: {
						normal: {
							color: '#FA8565',
							label: {

								formatter: '{c}'
							}
						}
					},
					data: [
						//                 {
						//      name: '平均线',
						//      // 支持 'average', 'min', 'max'
						//      type: 'average'
						//  },
						{
							name: 'Y 轴值为 100 的水平线',
							yAxis: 1000
						},
					]
				},
				itemStyle: {
					normal: {

						barBorderRadius: 5,
						label: {
							show: true, //开启显示
							position: 'top', //在上方显示
							textStyle: { //数值样式
								color: 'rgb(18, 32, 107)',
								fontSize: 25
							}
						}
					}
				}
			}
		]
	};
	myChart.setOption(option, true);
	var timer = null;
	function setTime() {
		var today = new Date(); //获得当前日期
		var year = today.getFullYear(); //获得年份
		var month = today.getMonth() + 1; //此方法获得的月份是从0---11，所以要加1才是当前月份
		var day = today.getDate(); //获得当前日期
		var hours = today.getHours();
		var minutes = today.getMinutes();
		$('#year').text(year);
		$('#month').text(month);
		$('#day').text(day);
		$('#hours').text(hours);
		$('#minutes').text(minutes)
		$.post("/home/enroll/getenrollnum?start_time=1573401600&end_time=1573488000&enroll_type=1", {}, function(result1) {
			$.post("/home/enroll/getenrollnum?start_time=1573401600&end_time=1573488000&enroll_type=2", {}, function(result2) {
				var rt1 = JSON.parse(result1);
				var rt2 = JSON.parse(result2);
				myChart.setOption({
					dataset: {
						source: [
							['product', '总部', '学习中心'],
							['双十一实时报名', parseInt(rt1['count']), parseInt(rt2['count'])]
						]
					}
				});
				if(timer) clearTimeout(timer);
				timer = setTimeout(function() {
					setTime();
				}, 1000 * 30);
			})
		});
	}
	setTime();
});