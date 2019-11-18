import Alert from './component/alert/index.js';
import Confirm from "./component/confirm/index.js"
import Toast from './component/toast/index.js';
import Notify from './component/notify/index.js';
import Loading from './component/loading/index.js';



// Alert.install = Vue => {
//   // Vue.component(Button.name, Button);
//   console.log(111)
//   Vue.prototype.$dialog = {
//     // confirm: Confirm,
//     alert: Alert,
//     // toast: Toast,
//     // notify: Notify,
//     // loading: Loading,
//   };
// };

export {
    Confirm,
    Alert,
    Toast,
    Notify,
    Loading
};
