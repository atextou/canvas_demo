/**
 * Created by hs on 2019/9/19.
 */
/*��ȡcanvas��id*/
var dom = document.getElementById('clock');
/*ָ��������ͼ����/���Ʒ�������ǰ��2d��*/
var ctx = dom.getContext('2d');
/*��ȡcanvas��ߣ��Ա�õ�ʱ�Ӱ뾶r*/
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
/*���ջ���Ϊ200*200�Ĵ�С���Ʊ���*/
var rem=width/200;

/*���廭canvas����(Բ)�ķ���*/
function drawBackground() {
    /*���浱ǰ���������ڶ�������*/
    ctx.save();
    /*������Բ*/
    /*���û�������ԭ�㣨�����Ϸ��������У�*/
    ctx.translate(r, r);
    /*��ʼ����·��*/
    ctx.beginPath();
    /*����Բ·���Ŀ�Ϊ10���أ���Ӧ����Բ�İ뾶ӦΪr-5*/
    ctx.lineWidth = 10*rem;
    /*��ʼ��Բ*/
    ctx.arc(0, 0, r - ctx.lineWidth/2, 0, 2 * Math.PI, false);
    /*��ʾ����·��*/
    ctx.stroke();

    /*����Сʱ��*/
    /*����������Сʱ��*/
    /*��Ϊarc��ʼ�Ƕ���3�㷽�����Դ�3��ʼ*/
    var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    /*���������С*/
    ctx.font = 18*rem+'px Arial';
    /*����λ�þ��ж���*/
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    /*����12�����ֵ�λ��*/
    hourNumbers.forEach(function (number, i) {
        /*�󻡶�*/
        var rad = 2 * Math.PI / 12 * i;
        /*Сʱ��λ��*/
        var x = Math.cos(rad) * (r - 30*rem);
        var y = Math.sin(rad) * (r - 30*rem);
        ctx.fillText(number, x, y);
    });

    /*����60������С���λ�ã�С��=СԲ����������������60��СԲ��*/
    for (var i = 0; i < 60; i++) {
        var rad = 2 * Math.PI / 60 * i;
        var x = Math.cos(rad) * (r - 18*rem);
        var y = Math.sin(rad) * (r - 18*rem);
        ctx.beginPath();
        /*�ı�С����ɫ�������ж���䣬ΪСʱ���ͺڣ���Ϊ��*/
        if (i % 5 == 0) {
            ctx.fillStyle = '#000';
            /*��Ϊ��С�㣬���԰뾶Ϊ2*/
            ctx.arc(x, y, 2*rem, 0, 2 * Math.PI, false);
        } else {
            ctx.fillStyle = '#ddd';
            ctx.arc(x, y, 2*rem, 0, 2 * Math.PI, false);
        }
        /*���켣������С��Ч��*/
        ctx.fill();
    }
}
/*Сʱ&���Ӷ���Ҫ�����������������ܵõ�׼ȷ��ƫת����*/
/*ʱ�뷽��*/
function drawHour(hour, minute) {
    ctx.save();
    ctx.beginPath();
    /*����ʱ��ת��*/
    var rad = 2 * Math.PI / 12 * hour;
    /*���������ʱ��ƫ����*/
    var mrad = 2 * Math.PI / 12 / 60 * minute;
    /*ƫת����=ʱ������ƫת��+���������ƫת��*/
    ctx.rotate(rad + mrad);
    ctx.lineWidth = 6*rem;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 10*rem);
    ctx.lineTo(0, -r / 3);
    ctx.stroke();
    ctx.restore();
}
/*���뷽��*/
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
/*���뷽��*/
function drawSecond(second) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = '#f00';
    var rad = 2 * Math.PI / 60 * second;
    ctx.rotate(rad);
    /*��һ���ܳ��������γ�������խ�¿��룩����״��·������Ҫ������*/
    ctx.moveTo(-2*rem, 20*rem);
    ctx.lineTo(2*rem, 20*rem);
    ctx.lineTo(1, -r + 22*rem);
    ctx.lineTo(-1, -r + 22*rem);
    ctx.fill();
    ctx.restore();
}
/*����Բ��*/
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
    /*���±��滭������*/
    ctx.restore();
}
setInterval(draw,0);