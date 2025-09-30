// 鼠标长按

function mouseLongClick() {
	// 设定长按时间阈值（例如 1 秒）
	const longPressThreshold = 1000;
	let timer;

	const handleMouseDown = (event) => {
		// 启动定时器，如果达到阈值时间，则触发自定义长按事件
		timer = setTimeout(() => {
			const longPressEvent = new Event('longpress');
			event.target.dispatchEvent(longPressEvent);
		}, longPressThreshold);
	};

	const handleMouseUp = () => {
		// 清除定时器
		clearTimeout(timer);
	};

	const element = document.getElementById('yourElementId');
	element.addEventListener('mousedown', handleMouseDown);
	element.addEventListener('mouseup', handleMouseUp);
	element.addEventListener('mouseleave', handleMouseUp); // 防止鼠标移出元素时未触发 mouseup

// 监听自定义长按事件
	element.addEventListener('longpress', () => {
		console.log('Long press detected');
	});
}

// 键盘长按
function keyboardLongClick() {
	let timer;

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') { // 仅在按下 Enter 键时触发
			// 启动定时器，如果达到阈值时间，则触发自定义长按事件
			timer = setTimeout(() => {
				const longPressEvent = new Event('longpress');
				event.target.dispatchEvent(longPressEvent);
			}, longPressThreshold);
		}
	};

	const handleKeyUp = () => {
		// 清除定时器
		clearTimeout(timer);
	};

	const inputElement = document.getElementById('input');
	inputElement.addEventListener('keydown', handleKeyDown);
	inputElement.addEventListener('keyup', handleKeyUp);

// 监听自定义长按事件
	inputElement.addEventListener('longpress', () => {
		console.log('Long press detected');
	});
}
