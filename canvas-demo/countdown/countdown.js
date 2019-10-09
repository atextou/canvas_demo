var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
/*ʱ�����־��뻭�������ľ���*/
var MARGIN_TOP = 60;
/*��һ�����־��뻭������߾�*/
var MARGIN_LEFT = 30;

/*���ý���ʱ��*/
/*js��������ʾ��0��ʼ�ģ�����Ҫ��һ�õ���Ҫ���·�*/
/*Сʱֻ��������λ�������Խ������ڲ��ܳ���4��*/
var endTime = new Date();
/*�������óɶ�ʱ���� ʱ��Ϊ ��ǰʱ�俪ʼһ��Сʱ*/
endTime.setTime(endTime.getTime()+3600*1000);
/*�����ڵ�ʱ����������õ���ʱ��*/
/*����������ʣ��ʱ�� (����ʱ��) ������ */
var curShowTimeSeconds = 0;

/*������ɵ�С��*/
var balls = [];
/*С����ɫ*/
const colors = ["#FFE793", "#6693C4", "#72DB67", "#F3976C", "#B7D8EF", "#DB4942", "#44BF87", "#BFB1C1", "#FF9800", "#EB6438", "#B3BB76"];


window.onload = function () {

    WINDOW_WIDTH = document.documentElement.clientWidth;
    WINDOW_HEIGHT = document.documentElement.clientHeight;

    MARGIN_LEFT =Math.round(WINDOW_WIDTH/10);
    /*������ȣ�4/5����Ļ��/С��뾶����(ռ108) ������������ǰ뾶��1*/
    RADIUS=Math.round(WINDOW_WIDTH*4/5/108)-1;

    MARGIN_TOP=Math.round(WINDOW_HEIGHT/5);

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    /*���巽�� ���㵹��ʱ��Ҫ������*/
    curShowTimeSeconds = getCurrentShowTimeSeconds();
    /*��ͼ*/
    setInterval(
        function () {
            render(ctx);
            update();
        },
        50
    );

};
/*���㵹��ʱ��Ҫ�����ķ���*/
function getCurrentShowTimeSeconds() {

    var curTime = new Date();
    //���㲢��ŵ���ʱ��
    var ret = endTime.getTime() - curTime.getTime();
    //������ת������
    ret = Math.round(ret / 1000);
    //����ret
    return ret >= 0 ? ret : 0;

    /*
    /!*������ʱ�ı�Ϊʱ��Ч��*!/
    var curTime = new Date();
    var ret = curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
    return ret;*/
}


function update() {
    /*ʱ��仯*/
    /*��ǰʱ������һʱ����бȽϣ��鿴�Ƿ�һ��*/

    /*��ȡ��һʱ��*/
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
    var nextSeconds = nextShowTimeSeconds % 60;
    /*��ǰʱ��*/
    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
    var curSeconds = curShowTimeSeconds % 60;
    /*�Ƚ�*/
    if (nextSeconds != curSeconds) {

        /*Сʱ ʮλ*/
        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
            addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curHours / 10));
        }
        /*Сʱ ��λ*/
        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(nextHours % 10));
        }
        /*���� ʮλ(Сʱ�����зֺţ��ǵ���߾�Ҫ���Ϸֺ�)*/
        if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(nextMinutes / 10));
        }
        /*���� ��λ*/
        if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(nextMinutes % 10));
        }
        /*���� ʮλ*/
        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds / 10));
        }
        /*���� ��λ*/
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds % 10));
        }

        curShowTimeSeconds = nextShowTimeSeconds;

    }

    updateBalls();
}
/*ʹ��ɫС���˶�*/
function updateBalls() {
    /*��ÿ��С�򶼼����ٶ�*/
    for (var i = 0; i < balls.length; i++) {
        /*Ϊ��ɫС����ϸ���������ٶ�*/
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        /*y����ļ��ٶȼ����������ٶ�g*/
        balls[i].vy += balls[i].g;

        /*С�����ײ���*/
        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;
        }

    }
    /*�����Ż�*/
    /*����ÿ��С�� ��cntΪ�ֽ��ߣ�ǰ���С���ڻ�����*/
    var cnt = 0;
    for (var i = 0; i < balls.length; i++) {
        /* С���ұ�Ե>0(��û�뿪�������)  ���� ���Ե<���泤�ȣ���û�뿪�����ұߣ�*/
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
            /*���������ʽ�� ˵��С���ڻ�����*/
            /*cnt��Ż��ڻ����е�С������ ��cnt�Ž�balls���� ����0��cnt-1�����ڻ������*/
            balls[cnt++] = balls[i];
        }
    }

    /*���cnt֮�󣨲��ڻ������С�򶼿���ɾ����*/
    while (balls.length > Math.min(300, cnt)) {
        balls.pop();
    }
}

/*����Ӧ��λ�ò�����ɫС��*/
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
                /*��ÿ��С�򶼴�Ž�balls��������*/
                balls.push(aBall);
            }
        }
    }
}


/*��ȡʱ�䲢��ͼ*/
function render(ctx) {
    /*����������Ա���ʾ��ȡ��һ�α仯*/
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    //Сʱ = ������ / 3600��ÿСʱ����
    var hours = parseInt(curShowTimeSeconds / 3600);
    //���� =�������� - ��Сʱ * ÿСʱ������/ 60��ÿСʱ������
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    //����=������ % 60��ÿ���ӵ�����
    var seconds = curShowTimeSeconds % 60;

    /*����ʱ������*/
    /*Сʱ*/
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx);
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), ctx);
    /*ð�� ��digit����������Ϊ10*/
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx);
    /*����*/
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ctx);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ctx);
    /*ð�� ��digit����������Ϊ10*/
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx);
    /*��*/
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
/*����ʱ������*/
function renderDigit(x, y, num, ctx) {
    ctx.fillStyle = "rgb(40,142,155)";
    /*��һ��������������*/
    for (var i = 0; i < digit[num].length; i++) {
        /*�ڶ�����������Ӧ�е�ĳһ�У���ĳһ������*/
        for (var j = 0; j < digit[num][i].length; j++) {
            /*ָ������λ��Ϊ1ʱ��ִ�л�Բ*/
            if (digit[num][i][j] == 1) {
                ctx.beginPath();
                ctx.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI, false);
                ctx.closePath();

                ctx.fill();

            }
        }
    }
}
