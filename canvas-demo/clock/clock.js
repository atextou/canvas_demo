/**
 * Created by hs on 2019/9/19.
 */
/*获取canvas的id*/
var dom = document.getElementById('clock');
/*指定画布绘图环境/绘制方法（当前仅2d）*/
var ctx = dom.getContext('2d');
/*获取canvas宽高，以便得到时钟半径r*/
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
/*按照画布为200*200的大小绘制比例*/
var rem=width/200;

/*定义画canvas背景(圆)的方法*/
function drawBackground() {
    /*保存当前画布，便于二次利用*/
    ctx.save();
    /*绘制外圆*/
    /*重置画布坐标原点（从左上方移至正中）*/
    ctx.translate(r, r);
    /*开始绘制路径*/
    ctx.beginPath();
    /*设置圆路径的宽为10像素，对应下面圆的半径应为r-5*/
    ctx.lineWidth = 10*rem;
    /*开始画圆*/
    ctx.arc(0, 0, r - ctx.lineWidth/2, 0, 2 * Math.PI, false);
    /*显示画的路径*/
    ctx.stroke();

    /*绘制小时数*/
    /*定义数组存放小时数*/
    /*因为arc开始角度在3点方向，所以从3开始*/
    var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    /*设置字体大小*/
    ctx.font = 18*rem+'px Arial';
    /*字体位置居中对齐*/
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    /*设置12个数字的位置*/
    hourNumbers.forEach(function (number, i) {
        /*求弧度*/
        var rad = 2 * Math.PI / 12 * i;
        /*小时数位置*/
        var x = Math.cos(rad) * (r - 30*rem);
        var y = Math.sin(rad) * (r - 30*rem);
        ctx.fillText(number, x, y);
    });

    /*设置60个分钟小点的位置（小点=小圆，连续（遍历）画60个小圆）*/
    for (var i = 0; i < 60; i++) {
        var rad = 2 * Math.PI / 60 * i;
        var x = Math.cos(rad) * (r - 18*rem);
        var y = Math.sin(rad) * (r - 18*rem);
        ctx.beginPath();
        /*改变小点颜色，利用判断语句，为小时数就黑，否为灰*/
        if (i % 5 == 0) {
            ctx.fillStyle = '#000';
            /*因为是小点，所以半径为2*/
            ctx.arc(x, y, 2*rem, 0, 2 * Math.PI, false);
        } else {
            ctx.fillStyle = '#ddd';
            ctx.arc(x, y, 2*rem, 0, 2 * Math.PI, false);
        }
        /*填充轨迹，制造小点效果*/
        ctx.fill();
    }
}
/*小时&分钟都需要传入两个变量，才能得到准确的偏转弧度*/
/*时针方法*/
function drawHour(hour, minute) {
    ctx.save();
    ctx.beginPath();
    /*设置时针转动*/
    var rad = 2 * Math.PI / 12 * hour;
    /*分针带动的时针偏移量*/
    var mrad = 2 * Math.PI / 12 / 60 * minute;
    /*偏转弧度=时针自身偏转量+分针带动的偏转量*/
    ctx.rotate(rad + mrad);
    ctx.lineWidth = 6*rem;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 10*rem);
    ctx.lineTo(0, -r / 3);
    ctx.stroke();
    ctx.restore();
}
/*分针方法*/
function drawMinute(minute, second) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 60 * minute;
    var srad = 2 * Math.PI / 60 / 60 * second;
    ctx.rotate(rad + srad);
    ctx.lineWidth = 4*rem;
    ctx.moveTo(0, 10*rem);
    ctx.lineTo(0, -r / 2);
    ctx.stroke();
    ctx.restore();
}
/*秒针方法*/
function drawSecond(second) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = '#f00';
    var rad = 2 * Math.PI / 60 * second;
    ctx.rotate(rad);
    /*画一个很长的梯形形成秒针上窄下宽（针）的形状，路径方法要变成填充*/
    ctx.moveTo(-2*rem, 20*rem);
    ctx.lineTo(2*rem, 20*rem);
    ctx.lineTo(1, -r + 22*rem);
    ctx.lineTo(-1, -r + 22*rem);
    ctx.fill();
    ctx.restore();
}
/*中心圆点*/
function drawDot() {
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.arc(0, 0, 3*rem, 0, 2 * Math.PI, false);
    ctx.fill();
}

function draw(){
    ctx.clearRect(0,0,width,height);
    var now= new Date();
    var hour=now.getHours();
    var minute=now.getMinutes();
    var second=now.getSeconds();
    drawBackground();
    drawHour(hour,minute);
    drawMinute(minute,second);
    drawSecond(second);
    drawDot();
    /*重新保存画布内容*/
    ctx.restore();
}
setInterval(draw,0);