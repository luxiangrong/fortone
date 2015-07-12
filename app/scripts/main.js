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
        var moreData = false;

        var currentMonth = '';
        var option = {
            tooltip: {
                trigger: 'axis',
                showDelay: 0,
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        color: '#48b',
                        width: 2,
                        type: 'solid'
                    }
                },
                showContent: false,
                formatter: function(params, ticket, callback) {
                    if (params.length == 1) {
                        $.each(params, function(i, param) {
                            $('.tooltip .date').text(param.name);
                            switch (param.seriesName) {
                                case '净值':
                                    var currentVal = Number(param.data);
                                    var currentIndex = param.dataIndex;
                                    if (currentIndex == 0) {
                                        var lastVal = currentVal;
                                    } else {
                                        var lastVal = Number(param.series.data[currentIndex - 1]);
                                    }
                                    $('.tooltip .jingzhi').text('净值：' + currentVal + '（ ' + ((currentVal - lastVal) / lastVal * 100).toFixed(2) + '% ）');
                                    break;
                            }
                        });
                    } else {
                        $.each(params, function(i, param) {
                            $('.tooltip .date').text(param.name);


                            switch (param.seriesName) {
                                case '净值':
                                    var baseData = Number(data1[Math.ceil(myChart.component.dataZoom._zoom.start * data1.length / 100)]);
                                    var currentVal = Number(param.data);
                                    var currentData = baseData + currentVal / 100 * baseData;
                                    $('.tooltip .jingzhi').text('净值：' + currentData.toFixed(2) + '（ ' + currentVal.toFixed(2) + '% ）');
                                    break;
                                case '上证':
                                    var baseData = Number(data2[Math.ceil(myChart.component.dataZoom._zoom.start * data2.length / 100)]);
                                    var currentVal = Number(param.data);
                                    var currentData = baseData + currentVal / 100 * baseData;
                                    $('.tooltip .shangzheng').text('上证指数：' + currentData.toFixed(2) + '（ ' + currentVal.toFixed(2) + '% ）');
                                    break;
                                case '标普':
                                    var baseData = Number(data3[Math.ceil(myChart.component.dataZoom._zoom.start * data3.length / 100)]);
                                    var currentVal = Number(param.data);
                                    var currentData = baseData + currentVal / 100 * baseData;
                                    $('.tooltip .biaopu').text('标普500：' + currentData.toFixed(2) + '（ ' + currentVal.toFixed(2) + '% ）');
                                    break;
                            }
                        });
                    }
                    return '';
                }
            },
            legend: {
                show: false,
                data: ['净值']
            },
            grid: {
                borderWidth: 0,
                y1: 40,
                y2: 80
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
                realtime: false,
                //orient: 'vertical',   // 'horizontal'
                //x: 0,
                y: 350,
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
                handleSize: 8,

                //xAxisIndex:[],
                //yAxisIndex:[],
                start: 99.60,
                end: 100
            },
            xAxis: [{
                type: 'category',
                position: 'bottom',
                boundaryGap: false,
                axisLine: { // 轴线
                    show: true,
                    onZero: false,
                    lineStyle: {
                        color: (function() {
                            var zrColor = require('zrender/tool/color');
                            return zrColor.getLinearGradient(
                                0, 290, 0, 340, [
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
                        return value.split('-')[1] + '-' + value.split('-')[2] + '';
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
                    length: 4,
                    lineStyle: {
                        color: 'rgba(255,255,255,1)',
                        type: 'dotted',
                        width: 4
                    }
                },
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    margin: 12,
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
            }]
        };

        var jingzhiStyle1 = {
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
        };

        var jingzhiStyle2 = {
            normal: {
                label: {
                    show: false,
                    textStyle: {
                        fontSize: '20',
                        fontFamily: '微软雅黑',
                        fontWeight: 'bold'
                    }
                },
                // areaStyle: {
                //     color: (function() {
                //         var zrColor = require('zrender/tool/color');
                //         return zrColor.getRadialGradient(442, 0, 100, 442, 50, 360, [
                //             [0, 'rgba(126,154,167,0.75)'],
                //             [1, 'rgba(60,62,69,0)']
                //         ])
                //     })()
                // },
                lineStyle: { // 系列级个性化折线样式，横向渐变描边
                    width: 2,
                    color: '#df000d',
                    shadowColor: 'rgba(0,0,0,0.5)',
                    shadowBlur: 10,
                    shadowOffsetX: 8,
                    shadowOffsetY: 8
                }
            }
        };

        var shangzhengStyle = {
            normal: {
                label: {
                    show: false,
                    textStyle: {
                        fontSize: '20',
                        fontFamily: '微软雅黑',
                        fontWeight: 'bold'
                    }
                },
                // areaStyle: {
                //     // 区域图，纵向渐变填充
                //     color: (function() {
                //         var zrColor = require('zrender/tool/color');
                //         return zrColor.getRadialGradient(442, 0, 100, 442, 50, 360, [
                //             [0, 'rgba(126,154,167,0.75)'],
                //             [1, 'rgba(60,62,69,0)']
                //         ])
                //     })()
                // },
                lineStyle: { // 系列级个性化折线样式，横向渐变描边
                    width: 2,
                    color: '#192893',
                    shadowColor: 'rgba(0,0,0,0.5)',
                    shadowBlur: 10,
                    shadowOffsetX: 8,
                    shadowOffsetY: 8
                }
            }
        };

        var biaopuStyle = {
            normal: {
                label: {
                    show: false,
                    textStyle: {
                        fontSize: '20',
                        fontFamily: '微软雅黑',
                        fontWeight: 'bold'
                    }
                },
                // areaStyle: {
                //     // 区域图，纵向渐变填充
                //     color: (function() {
                //         var zrColor = require('zrender/tool/color');
                //         return zrColor.getRadialGradient(442, 0, 100, 442, 50, 360, [
                //             [0, 'rgba(126,154,167,0.75)'],
                //             [1, 'rgba(60,62,69,0)']
                //         ])
                //     })()
                // },
                lineStyle: { // 系列级个性化折线样式，横向渐变描边
                    width: 2,
                    color: '#592305',
                    shadowColor: 'rgba(0,0,0,0.5)',
                    shadowBlur: 10,
                    shadowOffsetX: 8,
                    shadowOffsetY: 8
                }
            }
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
                $.getJSON(i + '.html', function(data) {
                    stoped[i] = 1;
                    $.each(data.sktq, function(i2, item) {
                        xAxisData[i].push(i + '-' + item[0]);
                        serieData1[i].push(Number(item[1]).toFixed(4));
                        serieData2[i].push(Number(item[5]).toFixed(2));
                        serieData3[i].push(Number(item[7]).toFixed(2));
                    });

                });
            })(i)
        }

        var data1 = [],
            data2 = [],
            data3 = [];
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
                $.each(serieData2, function(i2, item2) {
                    $.each(item2.reverse(), function(i3, item3) {
                        // option.series[1].data.push(item3);
                    });

                });
                $.each(serieData3, function(i2, item2) {
                    $.each(item2.reverse(), function(i3, item3) {
                        // option.series[2].data.push(item3);
                    });

                });


                $.each(serieData1, function(year, yearData) {
                    data1 = data1.concat(yearData);
                });
                $.each(serieData2, function(year, yearData) {
                    data2 = data2.concat(yearData);
                });
                $.each(serieData3, function(year, yearData) {
                    data3 = data3.concat(yearData);
                });


                myChart.hideLoading();
                option.dataZoom.start = (1 - 22 / option.series[0].data.length) * 100;
                myChart.setOption(option);

                resetOption();

                renderExtra();
            }
        }, 1000);

        function renderExtra() {
            var zr = myChart.getZrender();
            var TextShape = require('zrender/shape/Text');

            var grid = myChart.component.grid;

            var daysArray = [];
            var allDaysNum = 0;
            $.each(serieData1, function(i, data) {
                daysArray.push(data.length);
                allDaysNum += data.length;
            });

            var currentX = grid._x;
            $.each(daysArray, function(i, num) {
                console.log(grid._x + grid._width * num / allDaysNum);
                zr.addShape(new TextShape({
                    style: {
                        x: currentX,
                        y: grid._height + grid._y * 2 + 5,
                        color: '#6b8f1a',
                        text: 2008 + i,
                        textAlign: 'center'
                    }
                }));
                zr.render();
                currentX += grid._width * num / allDaysNum;
            });
        }


        $('[name="range"]').on('ifChecked', function() {
            var range = $(this).val();
            switch (range) {
                case 'week':
                    option.dataZoom.start = (1 - 7 / option.series[0].data.length) * 100;
                    myChart.clear();
                    myChart.setOption(option);
                    break;
                case 'month':
                    option.dataZoom.start = (1 - 22 / option.series[0].data.length) * 100;
                    myChart.clear();
                    myChart.setOption(option);
                    break;
                case 'year':
                    option.dataZoom.start = (1 - 260 / option.series[0].data.length) * 100;
                    myChart.clear();
                    myChart.setOption(option);
                    break;
                case 'all':
                    option.dataZoom.start = 0;
                    myChart.clear();
                    myChart.setOption(option);
                    break;
            }
            resetOption();
        });

        var duibi = [];
        $('[name="duibi"]').on('ifChanged', function() {
            resetOption();

        });

        var ecConfig = require('echarts/config');
        var lastZoomStart = 0;
        var lastZoomEnd = 0;

        function createDuibiData(dataArray, basePos) {
            var baseData = dataArray[Math.floor(myChart.component.dataZoom._zoom.start * dataArray.length / 100)];
            var result = [];
            $.each(dataArray, function(index, value) {
                result.push((value - baseData) / baseData * 100);
            });
            return result;
        }

        function resetOption() {
            var duibi = [];
            var data1 = [],
                data2 = [],
                data3 = [];
            $.each(serieData1, function(year, yearData) {
                data1 = data1.concat(yearData);
            });
            $.each(serieData2, function(year, yearData) {
                data2 = data2.concat(yearData);
            });
            $.each(serieData3, function(year, yearData) {
                data3 = data3.concat(yearData);
            });

            $('[name="duibi"]:checked').each(function(i, data) {
                duibi.push($(data).val());
            });

            var series = [];
            if (duibi.length > 0) {
                var jingzhiData = createDuibiData(data1);
                var jingzhiSerie = {
                    name: '净值',
                    type: 'line',
                    stack: '净值',
                    smooth: false,
                    symbol: 'none',
                    itemStyle: jingzhiStyle2,
                    data: jingzhiData
                }
                series.push(jingzhiSerie);
                var base = Number(data1[Math.floor(myChart.component.dataZoom._zoom.start * data1.length / 100)]);
                var rate = Number(jingzhiData[Math.floor(myChart.component.dataZoom._zoom.end * jingzhiData.length / 100) - 1]);
                $('.tooltip .jingzhi').text('净值：' + (base + base * rate / 100).toFixed(2) + '（ ' + rate.toFixed(2) + '% ）');

                if ($.inArray('shangzheng', duibi) != -1) {
                    var shangzhangData = createDuibiData(data2);
                    var shangzhengSerie = {
                        name: '上证',
                        type: 'line',
                        stack: '上证',
                        smooth: false,
                        symbol: 'none',
                        itemStyle: shangzhengStyle,
                        data: shangzhangData
                    };
                    series.push(shangzhengSerie);
                    $('.tooltip .shangzheng').show();
                    var base = Number(data2[Math.floor(myChart.component.dataZoom._zoom.start * data2.length / 100)]);
                    var rate = Number(shangzhangData[Math.floor(myChart.component.dataZoom._zoom.end * shangzhangData.length / 100) - 1]);
                    $('.tooltip .shangzheng').text('上证指数：' + (base + base * rate / 100).toFixed(2) + '（ ' + rate.toFixed(2) + '% ）');
                } else {
                    $('.tooltip .shangzheng').hide();
                }
                if ($.inArray('biaopu', duibi) != -1) {
                    var biaopuData = createDuibiData(data3);
                    var biaopuSerie = {
                        name: '标普',
                        type: 'line',
                        stack: '标普',
                        smooth: false,
                        symbol: 'none',
                        itemStyle: biaopuStyle,
                        data: biaopuData
                    };
                    series.push(biaopuSerie);
                    $('.tooltip .biaopu').show();
                    var base = Number(data3[Math.floor(myChart.component.dataZoom._zoom.start * data3.length / 100)]);
                    var rate = Number(biaopuData[Math.floor(myChart.component.dataZoom._zoom.end * biaopuData.length / 100) - 1]);
                    $('.tooltip .biaopu').text('标普500' + (base + base * rate / 100).toFixed(2) + '（ ' + rate.toFixed(2) + '% ）');
                } else {
                    $('.tooltip .biaopu').hide();
                }

            } else {
                var jingzhiSerie = {
                    name: '净值',
                    type: 'line',
                    stack: '净值',
                    smooth: false,
                    symbol: 'none',
                    itemStyle: jingzhiStyle1,
                    data: data1
                }
                series.push(jingzhiSerie);


                $('.tooltip .shangzheng').hide();
                $('.tooltip .biaopu').hide();
            }

            option.series = series;

            myChart.clear();
            myChart.setOption(option);

            renderExtra();
        }


        myChart.on(ecConfig.EVENT.DATA_ZOOM, function(zoom, chart) {
            var jingzhiData = [];
            var shangzhengData = [];
            var biaopuData = [];

            $.each(serieData1, function(year, yearData) {
                jingzhiData = jingzhiData.concat(yearData);
            });

            $.each(serieData2, function(year, yearData) {
                shangzhengData = shangzhengData.concat(yearData);
            });

            $.each(serieData2, function(year, yearData) {
                biaopuData = biaopuData.concat(yearData);
            });


            if (lastZoomStart != zoom.zoom.start || lastZoomEnd != zoom.zoom.end) {
                lastZoomStart = zoom.zoom.start;
                lastZoomEnd = zoom.zoom.end;

                option.dataZoom.start = zoom.zoom.start;
                option.dataZoom.end = zoom.zoom.end;
                resetOption();
            }

            var xAxisData = chart._option.xAxis[0].data;
            $('.range-start').text(xAxisData[0]);
            $('.range-end').text(xAxisData[xAxisData.length - 1]);

            renderExtra();
        });


    }
);
