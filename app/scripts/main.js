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
                trigger: 'axis'
            },
            legend: {
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
                height: 10,
                //backgroundColor: 'rgba(221,160,221,0.5)',
                //dataBackgroundColor: 'rgba(138,43,226,0.5)',
                //fillerColor: 'rgba(38,143,26,0.6)',
                //handleColor: 'rgba(128,43,16,0.8)',
                //xAxisIndex:[],
                //yAxisIndex:[],
                start: 40,
                end: 60
            },
            xAxis: [{
                type: 'category',
                position: 'bottom',
                boundaryGap: true,
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
                    length: 10,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)',
                        type: 'solid',
                        width: 2
                    }
                },
                axisLabel: {
                    show: true,
                    interval: function(index, label) {
                        if (label == null) {
                            return false;
                        }
                        var labelArray = label.split('-');
                        if (labelArray[0] != currentMonth) {
                            currentMonth = labelArray[0];
                            return true;
                        } else {
                            return false;
                        }
                    },
                    margin: 8,
                    formatter: function(value) {
                        if (value == null) {
                            return '';
                        }
                        return value.split('-')[0] + '月';
                    },
                    textStyle: {
                        color: '#6b8f1a',
                        fontFamily: 'sans-serif',
                        fontSize: 15,
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
                }
            }],
            yAxis: [{
                type: 'value',
                position: 'right',
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
                        return value;
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
                smooth: true,
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
                                return zrColor.getRadialGradient(342, 0, 50, 342, 50, 300, [
                                    [0, 'rgba(126,154,167,0.75)'],
                                    [1, 'rgba(60,62,69,0)']
                                ])
                            })()
                        },
                        lineStyle: { // 系列级个性化折线样式，横向渐变描边
                            width: 3,
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
                }
            }]
        };

        myChart.showLoading({
            text: '数据载入中',
            effect: 'spin',
            textStyle: {
                fontSize: 20
            }
        });

        var xAxisData = [],
            serieData1 = [],
            serieData2, serieData3;
        $.getJSON('2015.json', function(data) {
            $.each(data.sktq, function(i, item) {
                xAxisData.push(item[0]);
                serieData1.push(item[1]);
            });
            $.getJSON('2014.json', function(data) {
                $.each(data.sktq, function(i, item) {
                    xAxisData.push(item[0]);
                    serieData1.push(item[1]);
                });
                $.getJSON('2013.json', function(data) {
                    $.each(data.sktq, function(i, item) {
                        xAxisData.push(item[0]);
                        serieData1.push(item[1]);
                    });
                    $.getJSON('2012.json', function(data) {
                        $.each(data.sktq, function(i, item) {
                            xAxisData.push(item[0]);
                            serieData1.push(item[1]);
                        });
                        $.getJSON('2011.json', function(data) {
                            $.each(data.sktq, function(i, item) {
                                xAxisData.push(item[0]);
                                serieData1.push(item[1]);
                            });

                            $.getJSON('2010.json', function(data) {
                                $.each(data.sktq, function(i, item) {
                                    xAxisData.push(item[0]);
                                    serieData1.push(item[1]);
                                });
                                $.getJSON('2009.json', function(data) {
                                    $.each(data.sktq, function(i, item) {
                                        xAxisData.push(item[0]);
                                        serieData1.push(item[1]);
                                    });

                                    $.getJSON('2008.json', function(data) {
                                        $.each(data.sktq, function(i, item) {
                                            xAxisData.push(item[0]);
                                            serieData1.push(item[1]);
                                        });
                                        option.xAxis[0].data = xAxisData.reverse();
                                        option.series[0].data = serieData1.reverse();
                                        myChart.hideLoading();
                                        myChart.setOption(option);

                                    });
                                });

                            });
                        });

                    });

                });

            });
        });



        // 为echarts对象加载数据 
        // myChart.setOption(option);
    }
);
