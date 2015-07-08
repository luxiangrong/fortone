require.config({
    paths: {
        echarts: 'bower_components/echarts/build/dist'
    }
});
// 使用
require(
    [
        'echarts',
        'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
        'echarts/chart/line',
    ],
    function(ec) {
        // 基于准备好的dom，初始化echarts图表
        var myChart = ec.init(document.getElementById('main-chart'));

        var currentMonth = '';
        var option = {
            tooltip: {
                trigger: 'axis',
                showDelay: 0
            },
            legend: {
                show: false,
                data: ['净值', '上证指数', '标普500']
            },
            grid: {
                borderWidth: 0
            },
            toolbox: {
                show: false,
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['line', 'bar', 'stack', 'tiled']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            calculable: false,
            dataZoom: {
                show: true,
                realtime: true,
                //orient: 'vertical',   // 'horizontal'
                //x: 0,
                y: 370,
                //width: 400,
                height: 16,
                backgroundColor: 'rgba(0,0,0,0.7)',
                dataBackgroundColor: (function() {
                    var zrColor = require('zrender/tool/color');
                    return zrColor.getLinearGradient(
                        0, 310, 0, 360, [
                            [0, 'rgba(0,0,0,1)'],
                            [0.4999, 'rgba(0,0,0,1)'],
                            [0.5, 'rgba(77,77,77,1)'],
                            [1, 'rgba(77,77,77,1)']
                        ], 2
                    )
                })(),
                fillerColor: 'rgba(159,195,70,0.5)',
                handleColor: 'rgba(159,195,70,0.9)',

                //xAxisIndex:[],
                //yAxisIndex:[],
                start: 99.60,
                end: 100
            },
            xAxis: [{
                type: 'category',
                position: 'bottom',
                boundaryGap: true,
                axisLine: { // 轴线
                    show: true,
                    lineStyle: {
                        color: (function() {
                            var zrColor = require('zrender/tool/color');
                            return zrColor.getLinearGradient(
                                0, 310, 0, 360, [
                                    [0, 'rgba(0,0,0,1)'],
                                    [0.4999, 'rgba(0,0,0,1)'],
                                    [0.5, 'rgba(77,77,77,1)'],
                                    [1, 'rgba(77,77,77,1)']
                                ], 2
                            )
                        })(),
                        type: 'solid',
                        width: 4
                    }
                },
                axisTick: { // 轴标记
                    show: true,
                    length: 5,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)',
                        type: 'solid',
                        width: 2
                    }
                },
                axisLabel: {
                    show: true,
                    margin: 8,
                    formatter: function(value) {
                        if (value == null) {
                            return '';
                        }
                        return value.split('-')[0] + '月' + value.split('-')[1] + '日';
                    },
                    textStyle: {
                        color: '#6b8f1a',
                        fontFamily: 'sans-serif',
                        fontSize: 12,
                        fontWeight: 'bold'
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#483d8b',
                        type: 'dashed',
                        width: 1
                    }
                },
                data: []
            }],
            yAxis: [{
                type: 'value',
                position: 'right',
                scale: true,
                axisLine: { // 轴线
                    show: false,
                    lineStyle: {
                        color: 'green',
                        type: 'solid',
                        width: 2
                    }
                },
                axisTick: { // 轴标记
                    show: true,
                    length: 3,
                    lineStyle: {
                        color: 'rgba(255,255,255,1)',
                        type: 'dotted',
                        width: 3
                    }
                },
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    margin: 18,
                    formatter: function(value) {
                        return Number(value).toFixed(2);
                    },
                    textStyle: {
                        color: '#ffffff',
                        fontFamily: 'sans-serif',
                        fontSize: 14,
                        fontWeight: 'bold'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255, 0.05)',
                        type: 'solid',
                        width: 2
                    }
                }
            }],
            series: [{
                name: '净值',
                type: 'line',
                stack: '总量',
                smooth: false,
                symbol: 'none',
                itemStyle: {
                    normal: {
                        label: {
                            show: false,
                            textStyle: {
                                fontSize: '20',
                                fontFamily: '微软雅黑',
                                fontWeight: 'bold'
                            }
                        },
                        areaStyle: {
                            // 区域图，纵向渐变填充
                            color: (function() {
                                var zrColor = require('zrender/tool/color');
                                return zrColor.getRadialGradient(442, 0, 100, 442, 50, 360, [
                                    [0, 'rgba(126,154,167,0.75)'],
                                    [1, 'rgba(60,62,69,0)']
                                ])
                            })()
                        },
                        lineStyle: { // 系列级个性化折线样式，横向渐变描边
                            width: 2,
                            color: (function() {
                                var zrColor = require('zrender/tool/color');
                                return zrColor.getLinearGradient(
                                    0, 0, 884, 0, [
                                        [0, 'rgba(134,168,58,0.8)'],
                                        [0.25, 'rgba(163,202,76,0.8)'],
                                        [0.5, 'rgba(200,228,240,0.8)'],
                                        [0.75, 'rgba(221,233,247,0.8)'],
                                        [1, 'rgba(79,100,110,0.8)']
                                    ]
                                )
                            })(),
                            shadowColor: 'rgba(0,0,0,0.5)',
                            shadowBlur: 10,
                            shadowOffsetX: 8,
                            shadowOffsetY: 8
                        }
                    }
                },
                data: []
            }, {
                name: '上证指数',
                type: 'line',
                stack: '总量',
                smooth: false,
                symbol: 'none',
                itemStyle: {
                    normal: {
                        label: {
                            show: false,
                            textStyle: {
                                fontSize: '20',
                                fontFamily: '微软雅黑',
                                fontWeight: 'bold'
                            }
                        },
                        areaStyle: {
                            // 区域图，纵向渐变填充
                            color: (function() {
                                var zrColor = require('zrender/tool/color');
                                return zrColor.getRadialGradient(442, 0, 100, 442, 50, 360, [
                                    [0, 'rgba(126,154,167,0.75)'],
                                    [1, 'rgba(60,62,69,0)']
                                ])
                            })()
                        },
                        lineStyle: { // 系列级个性化折线样式，横向渐变描边
                            width: 2,
                            color: (function() {
                                var zrColor = require('zrender/tool/color');
                                return zrColor.getLinearGradient(
                                    0, 0, 884, 0, [
                                        [0, 'rgba(134,168,58,0.8)'],
                                        [0.25, 'rgba(163,202,76,0.8)'],
                                        [0.5, 'rgba(200,228,240,0.8)'],
                                        [0.75, 'rgba(221,233,247,0.8)'],
                                        [1, 'rgba(79,100,110,0.8)']
                                    ]
                                )
                            })(),
                            shadowColor: 'rgba(0,0,0,0.5)',
                            shadowBlur: 10,
                            shadowOffsetX: 8,
                            shadowOffsetY: 8
                        }
                    }
                },
                data: []
            }, {
                name: '标普500',
                type: 'line',
                stack: '总量',
                smooth: false,
                symbol: 'none',
                itemStyle: {
                    normal: {
                        label: {
                            show: false,
                            textStyle: {
                                fontSize: '20',
                                fontFamily: '微软雅黑',
                                fontWeight: 'bold'
                            }
                        },
                        areaStyle: {
                            // 区域图，纵向渐变填充
                            color: (function() {
                                var zrColor = require('zrender/tool/color');
                                return zrColor.getRadialGradient(442, 0, 100, 442, 50, 360, [
                                    [0, 'rgba(126,154,167,0.75)'],
                                    [1, 'rgba(60,62,69,0)']
                                ])
                            })()
                        },
                        lineStyle: { // 系列级个性化折线样式，横向渐变描边
                            width: 2,
                            color: (function() {
                                var zrColor = require('zrender/tool/color');
                                return zrColor.getLinearGradient(
                                    0, 0, 884, 0, [
                                        [0, 'rgba(134,168,58,0.8)'],
                                        [0.25, 'rgba(163,202,76,0.8)'],
                                        [0.5, 'rgba(200,228,240,0.8)'],
                                        [0.75, 'rgba(221,233,247,0.8)'],
                                        [1, 'rgba(79,100,110,0.8)']
                                    ]
                                )
                            })(),
                            shadowColor: 'rgba(0,0,0,0.5)',
                            shadowBlur: 10,
                            shadowOffsetX: 8,
                            shadowOffsetY: 8
                        }
                    }
                },
                data: []
            }]
        };

        myChart.showLoading({
            text: '数据载入中',
            effect: 'spin',
            textStyle: {
                fontSize: 20
            }
        });

        var xAxisData = {},
            serieData1 = {},
            serieData2 = {},
            serieData3 = {},
            stoped = {};

        var currentData = new Date();
        currentYear = Number(currentData.getFullYear());

        for (var i = currentYear; i >= 2008; i--) {
            serieData1[i] = [];
            serieData2[i] = [];
            serieData3[i] = [];
            xAxisData[i] = [];
            stoped[i] = 0;
            (function(i) {
                $.getJSON(i + '.json', function(data) {
                    stoped[i] = 1;
                    $.each(data.sktq, function(i2, item) {
                        xAxisData[i].push(item[0]);
                        serieData1[i].push(item[1]);
                        serieData2[i].push(item[5]);
                        serieData3[i].push(item[7]);
                    });

                });
            })(i)
        }






        var handler = window.setInterval(function() {
            var total = 0;
            $.each(stoped, function(i, item) {

                total += item;
            });

            if (total == currentYear - 2008 + 1) {
                clearInterval(handler);
                $.each(xAxisData, function(i2, item2) {
                    $.each(item2.reverse(), function(i3, item3) {
                        option.xAxis[0].data.push(item3);
                    });

                });
                $.each(serieData1, function(i2, item2) {
                    $.each(item2.reverse(), function(i3, item3) {
                        option.series[0].data.push(item3);
                    });

                });
                // $.each(serieData2, function(i2, item2) {
                //     $.each(item2.reverse(), function(i3, item3) {
                //         option.series[1].data.push(item3);
                //     });

                // });
                // $.each(serieData3, function(i2, item2) {
                //     $.each(item2.reverse(), function(i3, item3) {
                //         option.series[2].data.push(item3);
                //     });

                // });


                myChart.hideLoading();
                myChart.setOption(option);

            }
        }, 1000);


        $('[name="range"]').on('ifChecked', function(){
            var range = $(this).val();
            switch(range) {
                case 'week':
                    option.dataZoom.start = (1 - 7 / option.series[0].data.length ) * 100;
                    myChart.clear();
                    myChart.setOption(option);
                    break;
                case 'month':
                    option.dataZoom.start = (1 - 22 / option.series[0].data.length ) * 100;
                    myChart.clear();
                    myChart.setOption(option);
                    break;
                case 'year':
                    option.dataZoom.start = (1 - 260 / option.series[0].data.length ) * 100;
                    myChart.clear();
                    myChart.setOption(option);
                    break;
                case 'all':
                    option.dataZoom.start = 0;
                    myChart.clear();
                    myChart.setOption(option);
                    break;
            }
        });


        // 为echarts对象加载数据 
        // myChart.setOption(option);
    }
);
