var dom=document.getElementById("clock");
var ctx=dom.getContext("2d");
var width=ctx.canvas.width;
var height=ctx.canvas.height;
var r=width/2;
var rem=width/200;

function growbackground(){
	ctx.save();
	ctx.translate(r,r);
	ctx.beginPath();
	ctx.lineWidth=10*rem;
	ctx.arc(0,0,r-5*rem,0,2*Math.PI,false);
	ctx.stroke();

	var hourNumbers=[3,4,5,6,7,8,9,10,11,12,1,2];
	ctx.font="18px Arial";
	ctx.textAlign="center";
	ctx.textbaseline="middle";
	hourNumbers.forEach(function(number,i){
		var rad=2*Math.PI/12*i;
		var x=Math.cos(rad)*(r-30*rem);
		var y=Math.sin(rad)*(r-30*rem);
		ctx.fillText(number,x,y+5*rem);
	});

	for(var i=0;i<60;i++){
		var rad=2*Math.PI/60*i;
		var x=Math.cos(rad)*(r-18*rem);
		var y=Math.sin(rad)*(r-18*rem);
		ctx.beginPath();
		if(i%5==0){
			ctx.fillStyle="#000";
			ctx.arc(x,y,2*rem,0,2*Math.PI,false);
		}else{
			ctx.fillStyle="#ccc";
			ctx.arc(x,y,2*rem,0,2*Math.PI,false);
		}
		ctx.fill();
	}
}
function DrowHour(Hour,Minute){
	ctx.save();
	ctx.beginPath();
	var rad=2*Math.PI/12*Hour;
	var mrad=2*Math.PI/12/60*Minute;
	ctx.rotate(rad+mrad);
	ctx.lineWidth=6*rem;
	ctx.lineCap='round';
	ctx.moveTo(0,10*rem);
	ctx.lineTo(0,-r/2);
	ctx.stroke();
	ctx.restore();
}
function DrowMinute(Minute){
	ctx.save();
	ctx.beginPath();
	var rad=2*Math.PI/60*Minute;
	ctx.rotate(rad);
	ctx.lineWidth=3*rem;
	ctx.lineCap='round';
	ctx.moveTo(0,10*rem);
	ctx.lineTo(0,-r+30*rem);
	ctx.stroke();
	ctx.restore();
}
function DrowSecond(Second){
	ctx.save();
	ctx.beginPath();
	var rad=2*Math.PI/60*Second;
	ctx.rotate(rad);
	ctx.fillStyle='red'
	ctx.moveTo(2*rem,20*rem);
	ctx.lineTo(-2*rem,20*rem);
	ctx.lineTo(-1*rem,-r+18*rem);
	ctx.lineTo(1*rem,-r+18*rem);
	ctx.fill();
	ctx.restore();
}
function DrowDot(){
	ctx.beginPath();
	ctx.fillStyle='#fff';
	ctx.arc(0,0,3*rem,0,2*Math.PI,false);
	ctx.fill();
}
function Drow(){
	ctx.clearRect(0,0,width,height)
	var now=new Date();
	var Hour=now.getHours();
	var Minute=now.getMinutes();
	var Second=now.getSeconds();
	growbackground();
	DrowHour(Hour,Minute);
	DrowMinute(Minute);
	DrowSecond(Second);
	DrowDot();
	ctx.restore();
}
Drow();
setInterval(Drow,1000);