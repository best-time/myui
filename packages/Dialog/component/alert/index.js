import Vue from 'vue';
import AlertC from "./index.vue"

const AlertConstructor = Vue.extend(AlertC);

const instance = new AlertConstructor({
  el: document.createElement('div')
});

AlertConstructor.prototype.closeAlert = function () {
  // pageScroll.unlock();

  const el = instance.$el;
  el.parentNode && el.parentNode.removeChild(el);

  typeof this.callback == 'function' && this.callback();
};

const Alert = (options = {}) => {
  instance.mes = options.mes;
  instance.callback = options.callback;

  document.body.appendChild(instance.$el);

  // pageScroll.lock();
};

export default Alert;