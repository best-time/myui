import { ref } from 'vue';
import { ElMessage } from 'element-plus';

/**
 * @description Form 表单操作方法封装
 * @param {Function} emits 向父组件触发事件(必传)
 * @param {String} tip 提示内容(非必传)
 */
export const useFormRequest = (emits, tip = {}) => {

    const loading = ref(false);
    const visible = ref(false);

    /**
     * @description Form 表单添加操作方法
     * @param {Function} api 请求接口 api 方法(必传)
     * @param {Object} params 表单数据(必传，默认为{})
     */
    const add = async (api, params = {}) => {

        loading.value = true;
        const {
            resultCode, msg,
        } = await api(params).catch((e) => e);
        loading.value = false;
        if (resultCode === 0) {

            ElMessage.success(`添加${tip}成功`);
            visible.value = false;
            emits('update');

        } else if (msg) {

            ElMessage.error(msg);

        }

    };

    /**
     * @description Form 表单修改操作方法
     * @param {Function} api 请求接口 api 方法(必传)
     * @param {Object} params 表单数据(必传，默认为{})
     */
    const modify = async (api, params = {}) => {

        loading.value = true;
        const {
            resultCode, msg,
        } = await api(params).catch((e) => e);
        loading.value = false;
        if (resultCode === 0) {

            ElMessage.success(`修改${tip}成功`);
            emits('update');
            visible.value = false;

        } else if (msg) {

            ElMessage.error(msg);

        }

    };

    return {
        loading,
        visible,
        add,
        modify,
    };

};


/*


import {
  addCus, modifyCus
} from '@/api/modules/customer';
import { useFormRequest } from '@/hooks/useFormRequest';

const emits = defineEmits(['update']);

// 使用自定义表单hooks
const {
  loading, visible, add, modify,
} = useFormRequest(emits, '客户');


const submit = async () => {

  formRef.value.validate((vali) => {

    if (vali) {

      id.value
        ? modify(modifyCus, {
          id: id.value,
          ...model.value,
        })
        : add(addCus, model.value);

    }

  });

};


 */
