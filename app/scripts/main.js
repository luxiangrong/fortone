(function($){
    $(document).ready(function(){
        var now = new Date();
        $('#date-today').text(now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDay() ) ;
    });
})(jQuery);

require.config({
    paths: {
        echarts: 'bower_components/echarts/build/source'
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
            backgroundColor: 'rgba(0,0,0,0)',
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
                y1: 20,
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
                y: 336,
                //width: 400,
                height: 30,
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
                                    [1, 'rgba(160,62,69,0)']
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
                                [0, 'rgba(153,204,51,1)'],
                                [0.25, 'rgba(163,202,76,1)'],
                                [0.5, 'rgba(200,228,240,1)'],
                                [0.75, 'rgba(221,233,247,1)'],
                                [1, 'rgba(79,100,110,1)']
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
                    color: '#99cc33',
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
                    color: '#0078fe',
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
                    color: '#fd2b2b',
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
            stoped = {},
            allData = {};

        var currentData = new Date();
        currentYear = Number(currentData.getFullYear());

        for (var i = currentYear; i >= 2008; i--) {
            serieData1[i] = [];
            serieData2[i] = [];
            serieData3[i] = [];
            xAxisData[i] = [];
            allData[i] = [];
            stoped[i] = 0;
            (function(i) {
                $.getJSON(i + '.html', function(data) {
                    stoped[i] = 1;
                    $.each(data.sktq, function(i2, item) {
                        xAxisData[i].push(i + '-' + item[0]);
                        serieData1[i].push(Number(item[1]).toFixed(4));
                        serieData2[i].push(Number(item[5]).toFixed(2));
                        serieData3[i].push(Number(item[7]).toFixed(2));
                        allData[i].push(item);
                    });

                });
            })(i)
        }

        var datax = [],
            data1 = [],
            data2 = [],
            data3 = [],
            dataAll = [];
            
        var handler = window.setInterval(function() {
            var total = 0;
            $.each(stoped, function(i, item) {

                total += item;
            });

            if (total == (currentYear - 2008 + 1)) {
                clearInterval(handler);

                for (var index = currentYear; index >= 2008; index--) {
                    datax = datax.concat(xAxisData[index]);
                    data1 = data1.concat(serieData1[index]);
                    data2 = data2.concat(serieData2[index]);
                    data3 = data3.concat(serieData3[index]);
                    dataAll = dataAll.concat(allData[index]);
                }

                datax = datax.reverse();
                data1 = data1.reverse();
                data2 = data2.reverse();
                data3 = data3.reverse();
                dataAll = dataAll.reverse();

                $.each(datax, function(i, data){
                    option.xAxis[0].data.push(data);
                });
                $.each(data1, function(i, data){
                    option.series[0].data.push(data);
                });



                myChart.hideLoading();
                option.dataZoom.start = (1 - 22 / option.series[0].data.length) * 100;
                myChart.setOption(option);

                resetOption();

                renderExtra();

                var shouyi = [];
                for(var i2 = 0; i2 < dataAll.length; i2 ++) {
                    shouyi.push(Number(dataAll[i2][1]));
                }
                var huice = [];
                for(var i3 = 0; i3 < shouyi.length; i3 ++) {
                    huice.push(shouyi[i3]/Math.max.apply(Math, shouyi.slice(0, i3 + 1)) - 1);
                }
                

                $('#date-today').text(datax[datax.length - 1]) ;
                $('#data-jingzhi').text(data1[data1.length - 1]);
                $('#data-dangrishouyi').text((((data1[data1.length - 1] / data1[data1.length - 2]) - 1) *100).toFixed(2) + '%');
                $('#data-dangyueshouyi').text((((data1[data1.length - 1] / getEndDayOfLastMonth(allData)[1]) - 1) *100).toFixed(2) + '%');
                $('#data-dangnianshouyi').text((((data1[data1.length - 1] / getEndDayOfLastYear(allData)[1]) - 1) *100).toFixed(2) + '%');
                $('#data-zongshouyi').text((((data1[data1.length - 1] / data1[0]) - 1) *100).toFixed(2) + '%');
                $('#data-zuidahuicelastyear').text((Math.min.apply(Math, huice.slice(huice.length-250, huice.length)) * 100).toFixed(2) + '%');
            }
        }, 1000);

        // var max_of_array = Math.max.apply(Math, array);
        // var min_of_array = Math.min.apply(Math, array);

        function getEndDayOfLastMonth(data) {
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var day = now.getDate();
            if(month == 1) {
                var yearData = data[year-1];
                for(var i = 0; i < yearData.length; i ++) {
                    if(yearData[i][0].indexOf('12') == 0) {
                        return yearData[i];
                    }
                }
            } else {
                var yearData = data[year];
                for(var i = 0; i < yearData.length; i ++) {
                    if(yearData[i][0].indexOf('10') == 0) {
                        return yearData[i];
                    }
                }
                
            }
        }

        function getEndDayOfLastYear(data) {
            var now = new Date();
            var year = now.getFullYear();
            var yearData = data[year-1];
            return yearData[0];
        }

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
                    option.dataZoom.start = option.dataZoom.end - 7 / option.series[0].data.length * 100;
                    // option.dataZoom.end = 100;
                    myChart.clear();
                    myChart.setOption(option);
                    break;
                case 'month':
                    option.dataZoom.start = option.dataZoom.end - 22 / option.series[0].data.length * 100;
                    // option.dataZoom.end = 100;
                    myChart.clear();
                    myChart.setOption(option);
                    break;
                case 'year':
                    option.dataZoom.start = option.dataZoom.end - 260 / option.series[0].data.length * 100;
                    // option.dataZoom.end = 100;
                    myChart.clear();
                    myChart.setOption(option);
                    break;
                case 'all':
                    option.dataZoom.start = 0;
                    option.dataZoom.end = 100;
                    myChart.clear();
                    myChart.setOption(option);
                    break;
            }
            var xAxisData = myChart._option.xAxis[0].data;
            $('.range-start').text(xAxisData[0]);
            $('.range-end').text(xAxisData[xAxisData.length - 1]);
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

                option.yAxis[0].axisLabel.formatter = function(value) {
                    return Number(value).toFixed(0) + '%';
                };

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

                option.yAxis[0].axisLabel.formatter = function(value) {
                    return Number(value).toFixed(2);
                };
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

        myChart.on(ecConfig.EVENT.REFRESH, function(a,chart){
            var xAxisData = chart._option.xAxis[0].data;
            $('.range-start').text(xAxisData[0]);
            $('.range-end').text(xAxisData[xAxisData.length - 1]);
            console.log(xAxisData[0]);
        })


    }
);
