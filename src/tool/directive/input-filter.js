// Vue自定义指令中防止中文拼音输入影响数字验证

const getInput = (el) => (el instanceof HTMLInputElement ? el : el.querySelector('input'));

export const elInputNumber = {
	mounted(el, { arg, value }) {
		const input = getInput(el);
		if (!input) return;

		let isComposing = false;
		const decimal = arg ? `(\\.\\d{0,${arg}})?` : '';
		const integer = value ? `(0|[1-9]\\d{0, ${value - 1}})` : '\\d*';
		const regExp = new RegExp(`^${integer}${decimal}$`);

		const validateInput = () => {
			if (!isComposing) {
				const matched = input.value.trim().match(regExp);
				input.value = matched ? matched[0] : '';
			}
		};

		input.addEventListener('input', validateInput);
		input.addEventListener('compositionstart', () => { isComposing = true; });
		input.addEventListener('compositionend', () => {
			isComposing = false;
			validateInput(); // 确保在拼音输入完成后进行验证
		});

		// 也可以添加 blur 事件处理器来确保在失焦时进行验证
		// input.addEventListener('blur', validateInput);
	},
	unmounted(el) {
		const input = getInput(el);
		if (input) {
			input.removeEventListener('input', validateInput);
			input.removeEventListener('compositionstart', () => {});
			input.removeEventListener('compositionend', validateInput);
			// input.removeEventListener('blur', validateInput);
		}
	}
};

// 注意：上面的 validateInput 函数需要在指令作用域内定义，
// 或者你可以使用闭包来封装它，以便在事件处理器中访问。
