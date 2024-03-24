import { createApp } from 'vue'
import dialog from './dialog.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';


function mountContent (option = {}) {
    const dom = document.createElement('div')
    document.body.appendChild(dom)
    const app = createApp(dialog, {
        close: () => {
            app.unmount(dom);
            document.body.removeChild(dom)
        },
        ...option
    })
    app.use(ElementPlus).mount(dom)
}
export default mountContent

