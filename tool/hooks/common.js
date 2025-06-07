function useDebounce() {
    const debounce = (fn, delay) => {
        let timer = null;
        return function () {
            if (timer)  clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(this, arguments);
            }, delay);
        };
    };

    return { debounce };
}


function useThrottle() {
    const throttle = (fn, delay) => {
        let timer = null;
        return function () {
            if (!timer) {
                timer = setTimeout(() => {
                    fn.apply(this, arguments);
                    timer = null;
                }, delay);
            }
        };
    };

    return { throttle };
}

