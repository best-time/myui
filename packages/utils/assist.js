export const pCls = "y"

export const oneOf = arr => {
  const set = new Set(arr);
  return target => set.has(target);
};

export const hasClass = function(elem, cls) {
  cls = cls || "";
  if (cls.replace(/\s/g, "").length == 0) return false;
  return new RegExp(" " + cls + " ").test(" " + elem.className + " ");
};

export const addClass = function(ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className = ele.className == "" ? cls : ele.className + " " + cls;
  }
};

export const removeClass = function(ele, cls) {
  if (hasClass(ele, cls)) {
    let newClass = " " + ele.className.replace(/[\t\r\n]/g, "") + " ";
    while (newClass.indexOf(" " + cls + " ") >= 0) {
      newClass = newClass.replace(" " + cls + " ", " ");
    }
    ele.className = newClass.replace(/^\s+|\s+$/g, "");
  }
};

export const isColor = function(value) {
  const colorReg = /^#([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/;
  const rgbaReg = /^[rR][gG][bB][aA]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){3}\s*(\.|\d+\.)?\d+\s*\)$/;
  const rgbReg = /^[rR][gG][bB]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){2}(25[0-5]|2[0-4]\d|1?\d{1,2})\s*\)$/;

  return colorReg.test(value) || rgbaReg.test(value) || rgbReg.test(value);
};

export const scrollTop = function(el, from = 0, to, duration = 500) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        return window.setTimeout(callback, 1000 / 60);
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

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(() => scroll(d, end, step));
  }

  scroll(from, to, step);
};
