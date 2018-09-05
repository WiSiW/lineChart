/**
 * 绘制折线图-插件版-多线条
 */
function createLineChat ( canvasId , axisPadding , interval , lineColor , linesData ) {
    /**
     * 开始绘制折线图
     */
    let canvas = document.getElementById(canvasId);
    // 1.创建画布对象
    let c = canvas.getContext("2d");
    // 2.定义坐标轴起始点,原点,结束点的坐标值
    // 1)获取画布的宽高
    const cWidth = canvas.width;
    const cHeight = canvas.height;
    // 2)定义坐标值
    var yStart = {
        x : axisPadding.paddingLeft,
        y : axisPadding.padding
    };
    var origin = {
        x : axisPadding.paddingLeft,
        y : cHeight- axisPadding.paddingBottom
    };
    var xEnd = {
        x : cWidth - axisPadding.padding,
        y : cHeight - axisPadding.paddingBottom
    };
    // 3.绘制坐标轴
    // 1)绘制坐标轴线条
    c.beginPath();
    c.moveTo(yStart.x , yStart.y);
    c.lineTo(origin.x , origin.y);
    c.lineTo(xEnd.x , xEnd.y);
    c.stroke();// 结束绘制
    // 2)绘制坐标轴箭头 ( 5*10 )
    // 3)绘制Y轴箭头
    c.beginPath();
    c.moveTo(yStart.x - 5 , yStart.y + 10);
    c.lineTo(yStart.x , yStart.y);
    c.lineTo(yStart.x + 5 , yStart.y + 10);
    c.stroke();// 结束绘制

    // 4)绘制X轴箭头
    c.beginPath();
    c.moveTo(xEnd.x - 10 , xEnd.y - 5);
    c.lineTo(xEnd.x , xEnd.y);
    c.lineTo(xEnd.x - 10 , xEnd.y + 5);
    c.stroke();// 结束绘制
    // 5)标注坐标轴刻度
    // 1:设置刻度字体
    c.font = "14px 微软雅黑";
    // 2:绘制X轴刻度
    // 计算X轴刻度数与间距
    // 获取每条折线x的最大值,并保存在数组xSort中
    let xSort = [];
    for(let i = 0 ; i < linesData.length ; i++){
        linesData[i].sort(function (a,b) {return a.x - b.x;});
        xSort.push(linesData[i][linesData[i].length - 1])
    }
    // 根据数组中的x对数组进行排序,以便获取最大的x
    xSort.sort(function (a,b) {return a.x - b.x;});
    let xCount = Math.ceil(xSort[xSort.length - 1].x / interval.xInterval);
    let xLen = (xEnd.x - origin.x) / xCount;
    // 设置顶端对齐
    c.textBaseline = "top";
    // 绘制X轴坐标
    let axisX = origin.x + xLen,
        xVal = 0;
    for(let i = 0 ; i < xCount ; i++){
        // 绘制刻度(原点右侧距原点最近的第一个开始)
        c.fillText(xVal , axisX , origin.y);
        // 绘制下一个刻度时,改变坐标X值和坐标值
        axisX += xLen;
        xVal += interval.xInterval
    }

    // 3:绘制Y轴刻度
    // 计算Y轴刻度数与间距
    // 获取每条折线y的最大数值,并保存在数组ySort中
    let ySort = [];
    for(let i = 0 ; i < linesData.length ; i++){
        linesData[i].sort(function (a,b) {return a.y - b.y;});
        ySort.push(linesData[i][linesData[i].length - 1])
    }
    // 根据数组中的y对数组进行排序,以便获取最大的y
    ySort.sort(function (a,b) {return a.y - b.y;});
    let yCount = Math.ceil(ySort[ySort.length - 1].y / interval.yInterval);
    let yLen = (origin.y -yStart.y) / yCount;
    // 设置右对齐
    c.textAlign = "right";
    // 绘制Y轴坐标
    let axisY = origin.y - yLen,
        yVal = 0;
    for(let i = 0 ; i < yCount ; i++){
        // 绘制刻度(原点上方距原点最近的第一个开始)
        c.fillText(yVal , origin.x , axisY);
        // 绘制下一个刻度时,改变坐标Y值和坐标值
        axisY -= yLen;
        yVal += interval.yInterval;
    }

    // 3:绘制原点刻度
    c.fillText("0,0" , origin.x , origin.y);
    c.stroke(); // 结束绘制
    // 4.绘制折线
    drawLines( c , origin , interval , linesData , {xCount:xCount,xLen:xLen,yCount:yCount,yLen:yLen} , lineColor);
}
// 绘制多条折线
function drawLines ( c ,origin , interval , linesData ,axisInfo) {
    // 对数组进行轮询
    for(let i = 0 ; i < linesData.length ; i++){
        // 绘制单条折线
        drawLine( c ,origin , interval , linesData[i] ,axisInfo)
    }
}
// 绘制单条折线
function drawLine ( c ,origin , interval , lineData ,axisInfo , lineColor) {
    // 1)根据数组中的x对数组进行排序
    lineData.sort(function (a,b) {return a.x - b.x});
    // 2)设置折线属性
    c.textAlign = "left"; // 左对齐
    c.textBaseline = "bottom"; // 靠底
    c.strokeStyle = lineColor; // 折线颜色
    for(let i = 0 ; i < lineData.length ; i++){
        // 折线相对于画布的坐标值
        let pointX = origin.x + lineData[i].x / interval.xInterval * axisInfo.xLen;
        let pointY = origin.y - lineData[i].y / interval.yInterval * axisInfo.yLen;
        // 绘制折线
        if( i === 0 ){
            c.moveTo(pointX , pointY);
        }else{
            c.lineTo(pointX , pointY);
        }
        // 设置刻度值
        c.fillText(lineData[i].value , pointX , pointY);
    }
    c.stroke(); // 结束绘制
}
