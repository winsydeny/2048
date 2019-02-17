
let canvas = document.getElementById("canvas");
let c = canvas.getContext('2d');

canvas.width = canvas.width;
canvas.height = canvas.width;
let margin = canvas.width * 0.02;
let width = ( canvas.width - margin * 5 )/4;

let boxArray = [
	[0,0,0,0],
	[0,64,0,0],
	[0,0,0,0],
	[0,0,0,0]
];

let score = document.querySelector("#score");
let rest = document.querySelector("button");
let best = document.querySelector(".best");
best.innerText = localStorage.getItem("bestGame") || 0;

score.innerText = 0;
// 开始时随机[x,y] = 2
let startNum = function () {
	let x_1,x_2,y_1,y_2;
	let flag = true;
	while(flag) {
		x_1 = Math.floor(Math.random() * 4);
		y_1 = Math.floor(Math.random() * 4);
		x_2 = Math.floor(Math.random() * 4);
		y_2 = Math.floor(Math.random() * 4);
		if(x_1 === x_2 && y_1 === y_2) {
			x_1 = Math.floor(Math.random() * 4);
			y_1 = Math.floor(Math.random() * 4);
			x_2 = Math.floor(Math.random() * 4);
			y_2 = Math.floor(Math.random() * 4);
		} else {
			boxArray[x_1][y_1] = 2;
			boxArray[x_2][y_2] = 2;
			flag = !flag;
		}
	}
}

startNum();


let onceRander = true;
// 渲染函数
let render = function(){
	if(isGameOver()) {
		alert("game over,you lost it")
	} else {
		for(let i = 0;i<4;i++){
			for(let j =0;j<4;j++){
				c.beginPath();
				let x = margin * (i + 1) + width * i;
				let y = margin * (j + 1) + width * j;
				let fw = Math.floor(c.measureText(boxArray[j][i]).width);
				let fh = 23;
				c.font = "30px Arial";
				// console.log(fw);
				// if(onceRander){
				// 	c.fillStyle = "#dea28c";
				// 	c.fillRect(x,y,width,width);
				// 	onceRander = !onceRander;
				// }
				// console.log(fw);
				c.fillStyle = "#dea28c";
				c.fillRect(x,y,width,width);
				
				if(boxArray[j][i] != 0) {

					if(boxArray[j][i] === 2){
						c.fillStyle = "#58D68D";
						c.fillRect(x,y,width,width);
					}else if(boxArray[j][i] === 4){
						c.fillStyle = "#F4D03F";
						c.fillRect(x,y,width,width);
					}else if(boxArray[j][i] === 8) {
						c.fillStyle = "#DC7633";
						c.fillRect(x,y,width,width);
					}else if(boxArray[j][i] === 16) {
						c.fillStyle = "#45B39D";
						c.fillRect(x,y,width,width);
					}else if(boxArray[j][i] === 32){
						c.fillStyle = "#3498DB";
						c.fillRect(x,y,width,width);
					}else if(boxArray[j][i] === 64) {
						c.fillStyle = "#7D3C98";
						c.fillRect(x,y,width,width);
					}else if(boxArray[j][i] === 128) {
						c.fillStyle = "#2980B9";
						c.fillRect(x,y,width,width);
					}else if(boxArray[j][i] === 256){
						c.fillStyle = "#85929E";
						c.fillRect(x,y,width,width);
					}else if(boxArray[j][i] === 512) {
						c.fillStyle = "#A04000";
						c.fillRect(x,y,width,width);
					}else if(boxArray[j][i] === 1024) {
						c.fillStyle = "#138D75";
						c.fillRect(x,y,width,width);
					}else if(boxArray[j][i] === 2048) {
						c.fillStyle = "#E74C3C";
						c.fillRect(x,y,width,width);
					}

					c.fillStyle = "#fff";
					// console.log(x+(width-fw)/2,y+(width-fh)/2 + fh);
					// console.log(fw,fh);

					// console.log(x,fw,x+(width-fw)/2);
					c.fillText(boxArray[j][i],x+(width-fw)/2,y+(width-fh)/2+ fh);
					//x+(width-fw)/2 y+(width-fh)/2+ fh
				}
				
				c.closePath();
			}
	
		}
		
		getMax();
		saveGame();
	}

	
}
// 判断是否有本地存储
if(localStorage.getItem("2048")){
	// render();
	let str = localStorage.getItem("2048");
	let arr = eval('['+str+']');

	// console.log(arr);
	let count = 0;
	for(let i = 0;i<boxArray.length;i++) {
		for(let j = 0;j<boxArray.length;j++) {
			boxArray[i][j] = arr[count];
			count++		
		}
	}
}
// console.log(boxArray);
render();

// 移动端滑动
document.addEventListener("touchstart",start,false);
document.addEventListener("touchend",end,false);
let touchStart_hori = 0;
let touchStart_vert = 0;
let touchEnd_hori = 0;
let touchEnd_vert = 0;

function start (evt) {
	// console.log(evt.targetTouches[0]);
	touchStart_hori = evt.targetTouches[0].pageX;
	touchStart_vert = evt.targetTouches[0].pageY; 
	// console.log(touch);
	
}
function end (evt) {
	 touchEnd_hori = evt.changedTouches[0].pageX;
	 touchEnd_vert = evt.changedTouches[0].pageY;
	 calcuDirector();
} 
// 计算滑动的方向
function calcuDirector () {
	if(touchEnd_hori - touchStart_hori > 0 && Math.abs(touchEnd_hori - touchStart_hori) > Math.abs(touchEnd_vert - touchStart_vert)) {
		toRight();
		console.log("right")
	}
	else if(touchEnd_hori - touchStart_hori < 0 && Math.abs(touchEnd_hori - touchStart_hori) > Math.abs(touchEnd_vert - touchStart_vert)) {
		toLeft();
		console.log("left")

	}
	else if(touchEnd_vert - touchStart_vert > 0 && Math.abs(touchEnd_hori - touchStart_hori) < Math.abs(touchEnd_vert - touchStart_vert)) {
		toDown();
		console.log("down");
	}
	else if(touchEnd_vert - touchStart_vert < 0 && Math.abs(touchEnd_hori - touchStart_hori) < Math.abs(touchEnd_vert - touchStart_vert)) {
		console.log("up");
		toUp();
	}
}

// pc端 

document.addEventListener("keydown",directions,false);
function directions (e) {
	// console.log(e);
	switch(e.keyCode) {
		case 37: toLeft(); break;
		case 38: toUp(); break;
		case 39: toRight(); break;
		case 40: toDown(); break;
	}
}




// 滑动方向的四个函数

let toRight = function () {
	let isChange = isChanges();
	for(let i = 0; i < boxArray.length; i++) {
		merage(boxArray[i])
	}
	for(let j = 0;j<boxArray.length;j++){
		let tempArr = boxArray[j].filter(val => val > 0);
		let len = boxArray[j].length - tempArr.length;
		boxArray[j] = tempArr;
		// console.log(len)
		for(let i = 0;i < len ; i++) {
			boxArray[j].unshift(0);
			// console.log(i);
		}
	}
	if(isMove(isChange)){
		newNumber();
		clearCanvas(isChange);
		render();
	}else{
		alert("Can Not Move");
	}
}
let toLeft = function () {
	let isChange = isChanges();
	for(let i = 0;i<boxArray.length;i++) {
		merage(boxArray[i]);
	}
	if(isMove(isChange)){
		newNumber();
		clearCanvas(isChange);

		render();
	}else{
		alert("Can Not Move");
	}
}
let toDown = function () {
	let isChange = isChanges();
	let cpBox = upDownMerage('down');
	for(let i = 0;i<boxArray.length;i++) {
		for(let j = 0;j<boxArray.length;j++) {
			boxArray[j][i] = cpBox[i][cpBox.length-1-j];
		}
	}
	if(isMove(isChange)){
		newNumber();
		clearCanvas(isChange);

		render();
	}else{
		alert("Can Not Move");
	}

}
let toUp = function () {
	let isChange = isChanges();
	let cpBox = upDownMerage('up');
	for(let m = 0;m<boxArray.length;m++) {
		for(let n = 0;n<boxArray.length;n++)
			boxArray[n][m] = cpBox[m][n];
	}
	// 判断是否可以生成新的随机数
	if(isMove(isChange)){
		newNumber();
		clearCanvas(isChange);

		render();
	}else{
		alert("Can Not Move");
	}

}


// 随机生成数组位置
let newNumber = function () {
	let x = 0,y = 0;
	let flag = true;
	while(flag) {
		x = Math.floor(Math.random() * 4);
		y = Math.floor(Math.random() * 4);
		if(boxArray[x][y] === 0) {
			boxArray[x][y] = 2;
			flag = !flag;
		}
	}
}


// 合并函数，
function merage (arr) {
	// console.log(arr);
	let newArr = arr.filter(val => val > 0);
	let len = arr.length - newArr.length;
	for(let i = 0;i<len;i++) newArr.push(0);
	newArr.forEach((ele,index) => {
		if(ele === newArr[index+1]) {
			newArr[index+1] = newArr[index + 1] * 2;
			

			for(let j = index;j<newArr.length;j++){
				newArr[j] = newArr[j + 1];
			}
				newArr[newArr.length-1] = 0; 
		}
	})
	for(let i = 0;i<newArr.length;i++) arr[i] = newArr[i];
}
// 矩阵变换
function matrixTransmate (boxArray) {
	console.log(boxArray);

	let temp = 0;
	for(let i = 0; i < boxArray.length;i++) {
		for(let j = 0; j < boxArray.length; j++) {
			if(boxArray[i][j] !== boxArray[i][boxArray.length-1-j]) {
				temp = boxArray[i][j];
				boxArray[i][j] = boxArray[i][boxArray.length -1- j];
				boxArray[i][boxArray.length -1- j] = temp;
			}
			if(j === boxArray.length - j) break;
		}
	}
	console.log(boxArray);
}
// 移动数组中有有效数的位置
function move(boxarr) {
	console.log(boxarr);

		let tempArr = boxarr.filter(val => val > 0);
		let len = boxarr.length - tempArr.length;
		arr = tempArr;
		// console.log(tempArr)
		for(let i = 0;i < len ; i++) {
			boxarr.unshift(0);
		}
}
 // 获取数组中最大值
function getMax () {
	let judege = [];
	for(let i = 0;i<boxArray.length;i++)
	{
		boxArray.forEach((ele,index) => {
			if(boxArray[i][index] > 0) judege.push(boxArray[i][index]);
		})
	}
	// console.log(judege)
	if(judege.length === 2) {
		score.innerText = 0;
		return;
	}
	let max = 0;
	for(let i = 0;i<boxArray.length;i++) {
		for(let j = 0;j<boxArray.length;j++) {
			max = Math.max(max,boxArray[i][j])
		}
	}
	score.innerText = max;
	if(max === 2048) alert("you win the game,congratulate!!!");

	// if(localStorage.getItem("bestGame") < max){
	// 	best.innerText = max;
	// }
	localStorage.setItem("bestGame",max);
}
// 检测可否在移动
function isMove (arr) {
	// console.log(arr);

	for(let i = 0;i<boxArray.length;i++) {
		for(let j = 0;j<boxArray.length;j++) {
			if(arr[i][j] !== boxArray[i][j])
				return true;
		}
	}
	return false;
}

//游戏是否结束
function isGameOver () {
	let count = 0;
	for(let i = 0;i<boxArray.length;i++){
		for(let j = 0;j<boxArray.length;j++) {
			if(boxArray[i][j] !== 0) count++;
		}
	}
	// console.log(count)
	for(let i = 0;i<boxArray.length;i++){
		for(let j = 0;j<boxArray.length;j++) {
				if(boxArray[i][j] === boxArray[i][j+1]&&count === 16) return true;
				if(boxArray[j][i] === boxArray[j][i+1]&&count === 16) return true;
		}
	}
	return false;
}

// 保存游戏
function saveGame () {
	let str = [];
	for(let i = 0;i<boxArray.length;i++) {
		for(let j = 0;j<boxArray.length;j++) {
			str.push(boxArray[i][j]);
			// console.log(boxArray[i][j])
		}
	}

	// console.log(str);
	localStorage.setItem("2048",str);
}

// 重置按钮
rest.onclick = function () {
	// alert("already rest");
	localStorage.removeItem("2048");
	// startNum();
	console.log(boxArray);
	boxArray = [
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	]
	
	startNum();
	clearCanvas();
	render();
}



function upDownMerage (operator) {
	let len = 0;
	if(operator === "down"){
		len = boxArray.length-1;
	}else if(operator === "up"){
		len = 0;
	}else {
		return "error";
	}
	let cpBox = [];
	let tempArr = [];
	for(let i = 0;i<boxArray.length;i++) {		
		for(let j = 0;j<boxArray.length;j++) {
			tempArr.push(boxArray[Math.abs(len-j)][i])
		}
		merage(tempArr);
		cpBox.push(tempArr);
		tempArr = [];
	}
	return cpBox;
}


function isChanges () {
	let isChange = [[],[],[],[]];
	for(let i = 0;i<boxArray.length;i++){
		for(let j = 0;j<boxArray.length;j++) {
			isChange[i][j] = boxArray[i][j]
		}
	}
	return isChange;
}

function clearCanvas (boxArray) {
	c.beginPath();
	c.clearRect(0,0,canvas.width,canvas.width)
	c.closePath();
}