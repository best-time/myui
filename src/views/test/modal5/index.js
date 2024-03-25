import {createVNode, render, ref, watch, nextTick} from 'vue'
// import AA from "./dialog.vue"
export async function createDynamicComponent(instance) {
    const visible = ref(false);

    const container = document.createElement("div");
    container.className = "dialog-container";

    const open = () => {
        visible.value = true;
        console.log(visible.value)
    };

    const close = () => {
        visible.value = false;
        nextTick(() => {
            container.remove()
        })
    };

    const Comp = await import("./dialog.vue");
    console.log(Comp)

    const vnode = createVNode(Comp.default, {
        name: "dy-dialog",
        visible,
        open,
        close,
        destroy: () => {
            container.remove();
        },
    }, null);

    // vnode.appContext = instance.appContext;

    watch(visible, () => {
        console.log(`visible.value : ${visible.value}`);
    });

    render(vnode, container);
    document.body.appendChild(container);

    return {
        instance: vnode,
        open,
        close,
    };
}

