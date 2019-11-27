export const pCls = "y";
const doc = document;
const root = window;

export const oneOf = arr => {
  const set = new Set(arr);
  return target => set.has(target);
};

export const hasClass = (elem, cls) => {
  cls = cls || "";
  if (cls.replace(/\s/g, "").length == 0) return false;
  return new RegExp(" " + cls + " ").test(" " + elem.className + " ");
};

export const addClass = (ele, cls) => {
  if (!hasClass(ele, cls)) {
    ele.className = ele.className == "" ? cls : ele.className + " " + cls;
  }
};

export const removeClass = (ele, cls) => {
  if (hasClass(ele, cls)) {
    let newClass = " " + ele.className.replace(/[\t\r\n]/g, "") + " ";
    while (newClass.indexOf(" " + cls + " ") >= 0) {
      newClass = newClass.replace(" " + cls + " ", " ");
    }
    ele.className = newClass.replace(/^\s+|\s+$/g, "");
  }
};

export const isColor = value => {
  const colorReg = /^#([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/;
  const rgbaReg = /^[rR][gG][bB][aA]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){3}\s*(\.|\d+\.)?\d+\s*\)$/;
  const rgbReg = /^[rR][gG][bB]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){2}(25[0-5]|2[0-4]\d|1?\d{1,2})\s*\)$/;

  return colorReg.test(value) || rgbaReg.test(value) || rgbReg.test(value);
};

export const getScrollview = el => {
  let currentNode = el;
  while (
    currentNode &&
    currentNode.tagName !== "HTML" &&
    currentNode.tagName !== "BODY" &&
    currentNode.nodeType === 1
  ) {
    let overflowY = doc.defaultView.getComputedStyle(currentNode).overflowY;
    if (overflowY === "scroll" || overflowY === "auto") {
      return currentNode;
    }
    currentNode = currentNode.parentNode;
  }
  return root;
};

export const scrollTop = function(el, from = 0, to, duration = 500) {
  if (!root.requestAnimationFrame) {
    root.requestAnimationFrame =
      root.webkitRequestAnimationFrame ||
      root.mozRequestAnimationFrame ||
      root.msRequestAnimationFrame ||
      function(callback) {
        return root.setTimeout(callback, 1000 / 60);
      };
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil((difference / duration) * 50);

  function scroll(start, end, step) {
    if (start === end) return;

    let d = start + step > end ? end : start + step;
    if (start > end) {
      d = start - step < end ? end : start - step;
    }

    if (el === root) {
      root.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    root.requestAnimationFrame(() => scroll(d, end, step));
  }

  scroll(from, to, step);
};

export const isIOS = !!(
  (root.navigator && root.navigator.userAgent) ||
  ""
).match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

export const pageScroll = (function() {
  const fn = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  let islock = false;

  return {
    lock: () => {
      if (islock) return;
      islock = true;
      doc.addEventListener("touchmove", fn, { passive: false }); // 解决chrome报错
    },
    unlock: () => {
      islock = false;
      doc.removeEventListener("touchmove", fn, { passive: false });
    }
  };
})();

export const isSupportTouch = () => {
  const supportTouch =
    (root.Modernizr && !!root.Modernizr.touch) ||
    (function() {
      return !!(
        "ontouchstart" in root ||
        (root.DocumentTouch && doc instanceof DocumentTouch)
      );
    })();
  return supportTouch;
};

// ~~它代表双非按位取反运算符，如果你想使用比Math.floor()更快的方法，那就是它了。
// 需要注意，对于正数，它向下取整；对于负数，向上取整；非数字取值为0
export const toInt = v => ~~v;


export const off = (el, event, cb) => {
  el.removeEventListener(event, cb);
}

export const on = (el, event, cb, param=false) => {
  el.addEventListener(event, cb, param)
}