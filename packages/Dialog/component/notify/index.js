import Vue from 'vue';
import NotifyC from "./index.vue";

const NotifyConstructor = Vue.extend(NotifyC);

const instance = new NotifyConstructor({
    el: document.createElement('div')
});

let timer = null;
let lock = false;
const cb = () => {
  clearTimeout(timer);
  instance.closeNotify();
}
NotifyConstructor.prototype.closeNotify = function () {
    instance.classes = 'notify-out';

    setTimeout(() => {
        const el = instance.$el;
        el.removeEventListener("click", cb)
        el.parentNode && el.parentNode.removeChild(el);
        lock = false;
    }, 150);

    typeof this.callback == 'function' && this.callback();
};

const Notify = (options = {}) => {
    instance.classes = '';
    instance.mes = options.mes;
    instance.timeout = ~~options.timeout || 5000;
    instance.callback = options.callback;

    if (lock)return;
    lock = true;

    document.body.appendChild(instance.$el);

    instance.$el.addEventListener('click', cb);

    timer = setTimeout(() => {
        clearTimeout(timer);
        instance.closeNotify();
    }, instance.timeout);
};

export default Notify;
