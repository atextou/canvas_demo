var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
/*时间数字距离画布顶部的距离*/
var MARGIN_TOP = 60;
/*第一个数字距离画布的左边距*/
var MARGIN_LEFT = 30;

/*设置截至时间*/
/*js的月数显示从0开始的，所以要减一得到想要的月份*/
/*小时只设置了两位数，所以截至日期不能超过4天*/
var endTime = new Date();
/*这里设置成定时器了 时间为 当前时间开始一个小时*/
endTime.setTime(endTime.getTime()+3600*1000);
/*与现在的时间做减法获得倒数时间*/
/*定义变量存放剩余时间 (倒数时间) 的秒数 */
var curShowTimeSeconds = 0;

/*存放生成的小球*/
var balls = [];
/*小球颜色*/
const colors = ["#FFE793", "#6693C4", "#72DB67", "#F3976C", "#B7D8EF", "#DB4942", "#44BF87", "#BFB1C1", "#FF9800", "#EB6438", "#B3BB76"];


window.onload = function () {

    WINDOW_WIDTH = document.documentElement.clientWidth;
    WINDOW_HEIGHT = document.documentElement.clientHeight;

    MARGIN_LEFT =Math.round(WINDOW_WIDTH/10);
    /*画布宽度（4/5的屏幕宽）/小球半径总数(占108) 这里算出来的是半径＋1*/
    RADIUS=Math.round(WINDOW_WIDTH*4/5/108)-1;

    MARGIN_TOP=Math.round(WINDOW_HEIGHT/5);

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    /*定义方法 计算倒计时需要的秒数*/
    curShowTimeSeconds = getCurrentShowTimeSeconds();
    /*绘图*/
    setInterval(
        function () {
            render(ctx);
            update();
        },
        50
    );

};
/*计算倒计时需要秒数的方法*/
function getCurrentShowTimeSeconds() {

    var curTime = new Date();
    //计算并存放倒数时间
    var ret = endTime.getTime() - curTime.getTime();
    //将毫秒转换成秒
    ret = Math.round(ret / 1000);
    //返回ret
    return ret >= 0 ? ret : 0;

    /*
    /!*将倒计时改变为时钟效果*!/
    var curTime = new Date();
    var ret = curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
    return ret;*/
}


function update() {
    /*时间变化*/
    /*当前时间与下一时间进行比较，查看是否一致*/

    /*获取下一时间*/
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
    var nextSeconds = nextShowTimeSeconds % 60;
    /*当前时间*/
    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
    var curSeconds = curShowTimeSeconds % 60;
    /*比较*/
    if (nextSeconds != curSeconds) {

        /*小时 十位*/
        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
            addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curHours / 10));
        }
        /*小时 个位*/
        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(nextHours % 10));
        }
        /*分钟 十位(小时后面有分号，记得左边距要加上分号)*/
        if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(nextMinutes / 10));
        }
        /*分钟 个位*/
        if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(nextMinutes % 10));
        }
        /*秒钟 十位*/
        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds / 10));
        }
        /*秒钟 个位*/
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds % 10));
        }

        curShowTimeSeconds = nextShowTimeSeconds;

    }

    updateBalls();
}
/*使颜色小球运动*/
function updateBalls() {
    /*给每个小球都加上速度*/
    for (var i = 0; i < balls.length; i++) {
        /*为颜色小球加上各个方向的速度*/
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        /*y方向的加速度加上重力加速度g*/
        balls[i].vy += balls[i].g;

        /*小球的碰撞检测*/
        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;
        }

    }
    /*性能优化*/
    /*遍历每个小球 以cnt为分界线，前面的小球都在画布里*/
    var cnt = 0;
    for (var i = 0; i < balls.length; i++) {
        /* 小球右边缘>0(还没离开画面左边)  并且 左边缘<画面长度（还没离开画面右边）*/
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
            /*符合上面的式子 说明小球还在画面中*/
            /*cnt存放还在画面中的小球数量 把cnt放进balls数组 所以0到cnt-1都是在画面里的*/
            balls[cnt++] = balls[i];
        }
    }

    /*因此cnt之后（不在画布里）的小球都可以删除掉*/
    while (balls.length > Math.min(300, cnt)) {
        balls.pop();
    }
}

/*在相应的位置产生颜色小球*/
function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {

                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                };
                /*把每个小球都存放进balls数组里面*/
                balls.push(aBall);
            }
        }
    }
}


/*获取时间并绘图*/
function render(ctx) {
    /*清除画布，以便显示获取下一次变化*/
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    //小时 = 总秒数 / 3600（每小时秒数
    var hours = parseInt(curShowTimeSeconds / 3600);
    //分钟 =（总秒数 - 总小时 * 每小时秒数）/ 60（每小时分钟数
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    //秒数=总秒数 % 60（每分钟的秒数
    var seconds = curShowTimeSeconds % 60;

    /*绘制时间数字*/
    /*小时*/
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx);
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), ctx);
    /*冒号 在digit数组中索引为10*/
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx);
    /*分钟*/
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ctx);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ctx);
    /*冒号 在digit数组中索引为10*/
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx);
    /*秒*/
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), ctx);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), ctx);

    for (var i = 0; i < balls.length; i++) {
        ctx.fillStyle = balls[i].color;
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
    }

}
/*绘制时间数字*/
function renderDigit(x, y, num, ctx) {
    ctx.fillStyle = "rgb(40,142,155)";
    /*第一层遍历数组的行数*/
    for (var i = 0; i < digit[num].length; i++) {
        /*第二层遍历数组对应行的某一列（即某一个数）*/
        for (var j = 0; j < digit[num][i].length; j++) {
            /*指向索引位置为1时，执行画圆*/
            if (digit[num][i][j] == 1) {
                ctx.beginPath();
                ctx.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI, false);
                ctx.closePath();

                ctx.fill();

            }
        }
    }
}
