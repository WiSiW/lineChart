/**
 * ��������ͼ-�����-������
 */
function createLineChat ( canvasId , axisPadding , interval , lineColor , linesData ) {
    /**
     * ��ʼ��������ͼ
     */
    let canvas = document.getElementById(canvasId);
    // 1.������������
    let c = canvas.getContext("2d");
    // 2.������������ʼ��,ԭ��,�����������ֵ
    // 1)��ȡ�����Ŀ��
    const cWidth = canvas.width;
    const cHeight = canvas.height;
    // 2)��������ֵ
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
    // 3.����������
    // 1)��������������
    c.beginPath();
    c.moveTo(yStart.x , yStart.y);
    c.lineTo(origin.x , origin.y);
    c.lineTo(xEnd.x , xEnd.y);
    c.stroke();// ��ʼ����
    // 2)�����������ͷ ( 5*10 )
    // 3)����Y���ͷ
    c.beginPath();
    c.moveTo(yStart.x - 5 , yStart.y + 10);
    c.lineTo(yStart.x , yStart.y);
    c.lineTo(yStart.x + 5 , yStart.y + 10);
    c.stroke();// ��ʼ����

    // 4)����X���ͷ
    c.beginPath();
    c.moveTo(xEnd.x - 10 , xEnd.y - 5);
    c.lineTo(xEnd.x , xEnd.y);
    c.lineTo(xEnd.x - 10 , xEnd.y + 5);
    c.stroke();// ��ʼ����
    // 5)��ע������̶�
    // 1:���ÿ̶�����
    c.font = "14px ΢���ź�";
    // 2:����X��̶�
    // ����X��̶�������
    // ��ȡÿ������x�����ֵ,������������xSort��
    let xSort = [];
    for(let i = 0 ; i < linesData.length ; i++){
        linesData[i].sort(function (a,b) {return a.x - b.x;});
        xSort.push(linesData[i][linesData[i].length - 1])
    }
    // ���������е�x�������������,�Ա��ȡx�����ֵ
    xSort.sort(function (a,b) {return a.x - b.x;});
    let xCount = Math.ceil(xSort[xSort.length - 1].x / interval.xInterval);
    let xLen = (xEnd.x - origin.x) / xCount;
    console.log((xEnd.x - origin.x))
    console.log(xLen)
    console.log(origin)
    // ���ö��˶���
    c.textBaseline = "top";
    c.textAlign = "center";
    // ����X������
    let axisX = origin.x + xLen,
        xVal = interval.xInterval;
    for(let i = 1 ; i < xCount+1 ; i++){
        console.log(axisX,origin.y+4)
        // ���ƿ̶�(ԭ���Ҳ��ԭ������ĵ�һ����ʼ)
        c.fillText(xVal , axisX , origin.y+4);
        // ������һ���̶�ʱ,�ı�����Xֵ������ֵ
        axisX += xLen;
        xVal += interval.xInterval;
    }

    // 3:����Y��̶�
    // ����Y��̶�������
    // ��ȡÿ������y�����ֵ,������������ySort��
    let ySort = [];
    for(let i = 0 ; i < linesData.length ; i++){
        linesData[i].sort(function (a,b) {return a.y - b.y;});
        ySort.push(linesData[i][linesData[i].length - 1])
    }
    // ���������е�y�������������,�Ա��ȡy�����ֵ
    ySort.sort(function (a,b) {return a.y - b.y;});
    let yCount = Math.ceil(ySort[ySort.length - 1].y / interval.yInterval);
    let yLen = (origin.y -yStart.y) / yCount;
    // �����Ҷ���
    c.textAlign = "right";
    // ����Y������
    let axisY = origin.y - yLen,
        yVal = interval.yInterval;
    for(let i = 1 ; i < yCount+1 ; i++){
        // ���ƿ̶�(ԭ���Ϸ���ԭ������ĵ�һ����ʼ)
        c.fillText(yVal , origin.x-4 , axisY);
        // ������һ���̶�ʱ,�ı�����Yֵ������ֵ
        axisY -= yLen;
        yVal += interval.yInterval;
    }

    // 3:����ԭ��̶�
    c.fillText("0,0" , origin.x , origin.y);
    //c.closePath()// ��������
    //c.stroke(); // ��ʼ����
    // 4.��������
    drawLines( c , origin , interval , linesData , {xCount:xCount,xLen:xLen,yCount:yCount,yLen:yLen} , lineColor);

}

function drawLines ( c ,origin , interval , linesData ,axisInfo, lineColor) {
    // 3)��������
    for(let i = 0 ; i < linesData.length ; i++){
        drawLine( c ,origin , interval , linesData[i] ,axisInfo , lineColor);
    }
}


function drawLine ( c ,origin , interval , lineData ,axisInfo , lineColor) {
    // 2)������������
    c.textAlign = "left"; // �����
    c.textBaseline = "bottom"; // ����
    c.strokeStyle = lineColor; // ������ɫ
    c.fillStyle = "black";
    c.beginPath();
    // 1)���������е�x�������������
    lineData.sort(function (a,b) {return a.x - b.x});
    for(let i = 0 ; i < lineData.length ; i++){
        // ��������ڻ���������ֵ
        let pointX = origin.x + lineData[i].x / interval.xInterval * axisInfo.xLen;
        let pointY = origin.y - lineData[i].y / interval.yInterval * axisInfo.yLen;
        // ��������
        if( i === 0 ){
            c.moveTo(pointX , pointY);
        }else{
            c.lineTo(pointX , pointY);
        }
        // ���ÿ̶�ֵ
        c.fillText(lineData[i].value , pointX , pointY);
        if( i === (lineData.length - 1)){
            c.stroke();
            // ��ת�۴����Ͽ���Բ
            drawCircles(c,origin,interval,axisInfo,lineData,4);
        }
    }
}
function drawCircles ( c,origin,interval,axisInfo,lineData,radious) {
    // 1)���������е�x�������������
    //lineData.sort(function (a,b) {return a.x - b.x});
    for(let i = 0 ; i < lineData.length ; i++){
        // ��������ڻ���������ֵ
        let pointX = origin.x + lineData[i].x / interval.xInterval * axisInfo.xLen;
        let pointY = origin.y - lineData[i].y / interval.yInterval * axisInfo.yLen;
        drawCircle (c , pointX , pointY , radious)
    }
}

function drawCircle (c , x , y , radious) {
    c.beginPath();
    c.strokeStyle = "red"; // ������ɫ
    c.fillStyle = "#f0f0f0";
    c.arc(x,y,radious,Math.PI*2,0,true);
    c.closePath();
    c.fill();
    c.stroke();
}