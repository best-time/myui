import {render,createVNode} from 'vue'
export default class M_Dialog{
    static root  = document.createElement('div')
    // 传入 getCurrentInstance().proxy
    static openDialog = (component,props,appContext=null)=>{
        return new Promise((resolve,reject)=>{
            const dialogInstance = initDialogInstance(component,{
                myProps: props,
                visible:true,
                resolve:data=>resolve({dialogInstance,props}),
                reject:data => reject({dialogInstance,props})
            }, appContext)
            window.dia = dialogInstance
            dialogInstanceMount(dialogInstance,this.root)
        })
    }
    static closeDialog = (dialogInstance)=>{
        dialogInstanceUnmount(dialogInstance)
    }
}
function initDialogInstance(component,props,appContext){
    const vNode = createVNode(component,props)
    vNode.appContext = appContext // 调用openDialog的时候，传入上下文，挂载到vNode上就可以了
    return vNode
}
function dialogInstanceMount(dialogInstance,root){
    document.body.appendChild(root)
    render(dialogInstance,root)
}
function dialogInstanceUnmount(dialogInstance){
    const el  = dialogInstance.el.parentNode
    // 卸载组件
    if(dialogInstance) render(null,el)
    dialogInstance = null;
    // 移除组件父元素
    document.body.removeChild(el);
}
