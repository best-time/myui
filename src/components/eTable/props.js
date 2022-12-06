
const defaultFirstPage = 1
const noPaginationDataPath = 'payload'
export default {
  props: {
    /**
     * 请求url, 如果为空, 则不会发送请求; 改变url, 则table会重新发送请求
     */
    url: {
      type: String,
      default: ""
    },
    /**
     * 主键，默认值 id，
     * 修改/删除时会用到,请求会根据定义的属性值获取主键,即row[this.id]
     */
    id: {
      type: String,
      default: "id"
    },
    /**
     * 分页请求的第一页的值(有的接口0是第一页)
     */
    firstPage: {
      type: Number,
      default: defaultFirstPage
    },
    /**
     * 渲染组件的分页数据在接口返回的数据中的路径, 嵌套对象使用.表示即可
     */
    dataPath: {
      type: String,
      default: "payload.content"
    },
    /**
     * 分页数据的总数在接口返回的数据中的路径, 嵌套对象使用.表示即可
     */
    totalPath: {
      type: String,
      default: "payload.totalElements"
    },
    /**
     * 请求的时候如果接口需要的页码的查询 key 不同的时候可以指定
     */
    pageKey: {
      type: String,
      default: "page"
    },
    /**
     * 请求的时候如果接口需要的分页数量的查询 key 不同的时候可以指定
     */
    pageSizeKey: {
      type: String,
      default: "size"
    },
    /**
     * 处理请求返回的数据
     * @param raw axios 返回的原始数据
     * @return 函数应返回 {total, data}
     */
    onResponse: {
      type: Function,
      default: undefined
    },
    /**
     * 列属性设置, 详情见element-ui官网
     * @link https://element.eleme.cn/2.4/#/zh-CN/component/table#table-column-attributes
     */
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    /**
     * 查询字段渲染, 配置参考el-form-renderer
     * @link https://femessage.github.io/el-form-renderer/
     */
    searchForm: {
      type: Array,
      default() {
        return [];
      }
    },
    /**
     * 是否开启搜索栏折叠功能
     */
    canSearchCollapse: {
      type: Boolean,
      default: false
    },
    /**
     * 点击查询按钮, 查询前执行的函数，参数form表单数据，需要返回Promise
     */
    beforeSearch: {
      type: Function,
      default() {}
    },
    /**
     * 单选, 适用场景: 不可以批量删除
     */
    single: {
      type: Boolean,
      default: false
    },
    /**
     * 切换页面时，已勾选项不会丢失
     */
    persistSelection: {
      type: Boolean,
      default: false
    },
    /**
     * 是否有操作列
     */
    hasOperation: {
      type: Boolean,
      default: true
    },
    /**
     * 操作列的自定义按钮, 渲染的是element-ui的button, 支持包括style在内的以下属性:
     * {type: '', text: '', atClick: row => Promise.resolve(), show: row => return true时显示, disabled: row => return true时禁用 }
     * 点击事件 row参数 表示当前行数据, 需要返回Promise, 默认点击后会刷新table, resolve(false) 则不刷新
     */
    extraButtons: {
      type: Array,
      default() {
        return [];
      }
    },
    /**
     * 头部的自定义按钮, 渲染的是element-ui的button, 支持包括style在内的以下属性:
     * {type: '', text: '', atClick: selected => Promise.resolve(), show: selected => return true时显示, disabled: selected => return true时禁用}
     * 点击事件 selected参数 表示选中行所组成的数组, 函数需要返回Promise, 默认点击后会刷新table, resolve(false) 则不刷新
     */
    headerButtons: {
      type: Array,
      default() {
        return [];
      }
    },
    /**
     * 是否有新增按钮
     */
    hasNew: {
      type: Boolean,
      default: true
    },
    /**
     * 是否有编辑按钮
     */
    hasEdit: {
      type: Boolean,
      default: true
    },
    /**
     * 是否有查看按钮
     */
    hasView: {
      type: Boolean,
      default: false
    },
    /**
     * table头部是否有删除按钮(该按钮要多选时才会出现)
     */
    hasDelete: {
      type: Boolean,
      default: true
    },
    /**
     * 新增按钮文案
     */
    newText: {
      type: String,
      default: "新增"
    },
    /**
     * 修改按钮文案
     */
    editText: {
      type: String,
      default: "修改"
    },
    /**
     * 查看按钮文案
     */
    viewText: {
      type: String,
      default: "查看"
    },
    /**
     * 删除按钮文案
     */
    deleteText: {
      type: String,
      default: "删除"
    },
    /**
     * 删除提示语。接受要删除的数据（单个对象或数组）；返回字符串
     * @param {object|object[]} 要删除的数据 - 单个对象或数组
     * @return {string}
     */
    deleteMessage: {
      type: Function,
      default() {
        return `确认${this.deleteText}吗?`;
      }
    },
    /**
     * 某行数据是否可以删除, 返回true表示可以, 控制的是单选时单行的删除按钮
     */
    canDelete: {
      type: Function,
      default() {
        return true;
      }
    },
    /**
     * 点击新增按钮时的方法, 当默认新增方法不满足需求时使用, 需要返回promise
     * 参数(data, row) data 是form表单的数据, row 是当前行的数据, 只有isTree为true时, 点击操作列的新增按钮才会有值
     */
    onNew: {
      type: Function,
      default(data) {
        return this.$axios.post(this.url, data, this.axiosConfig);
      }
    },
    /**
     * 点击修改按钮时的方法, 当默认修改方法不满足需求时使用, 需要返回promise
     * 参数(data, row) data 是form表单的数据, row 是当前行的数据
     */
    onEdit: {
      type: Function,
      default(data) {
        return this.$axios.put(
          `${this.url}/${this.row[this.id]}`,
          data,
          this.axiosConfig
        );
      }
    },
    /**
     * 点击删除按钮时的方法, 当默认删除方法不满足需求时使用, 需要返回promise
     * 多选时, 参数为selected, 代表选中的行组成的数组; 非多选时参数为row, 代表单行的数据
     */
    onDelete: {
      type: Function,
      default(data) {
        const ids = Array.isArray(data)
          ? data.map(v => v[this.id]).join(",")
          : data[this.id];
        return this.$axios.delete(this.url + "/" + ids, this.axiosConfig);
      }
    },
    /**
     * crud 操作成功后会调用的函数，默认是 this.$message.success('操作成功')
     * 接受两个参数：
     * type，操作的类型，可能的值有 new | edit | delete；
     * data，操作的数据对象
     */
    onSuccess: {
      type: Function,
      default() {
        return this.$message.success("操作成功");
      }
    },
    /**
     * 是否分页。如果不分页，则请求传参page=-1
     */
    hasPagination: {
      type: Boolean,
      default: true
    },
    /**
     * 分页组件的子组件布局，子组件名用逗号分隔，对应element-ui pagination的layout属性
     * @link https://element.eleme.cn/2.4/#/zh-CN/component/pagination
     */
    paginationLayout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    /**
     * 分页组件的每页显示个数选择器的选项设置，对应element-ui pagination的page-sizes属性
     * @link https://element.eleme.cn/2.4/#/zh-CN/component/pagination
     */
    paginationSizes: {
      type: Array,
      default: () => [10, 20, 30, 40, 50]
    },
    /**
     * 分页组件的每页显示个数选择器默认选项，对应element-ui pagination的page-size属性
     * @link https://element.eleme.cn/2.4/#/zh-CN/component/pagination
     */
    paginationSize: {
      type: Number,
      default: 20
    },
    /**
     * @deprecated
     * 不分页时的size的大小(建议接口约定，不分页时传参page=-1，故一般不会用到此属性)
     */
    noPaginationSize: {
      type: Number,
      default: 999
    },
    /**
     * 要渲染的数据是否是树形结构
     */
    isTree: {
      type: Boolean,
      default: false
    },
    /**
     * 树形结构相关: 子节点的字段名
     */
    treeChildKey: {
      type: String,
      default: "children"
    },
    /**
     * 树形结构相关: 父节点的字段名
     */
    treeParentKey: {
      type: String,
      default: "parentId"
    },
    /**
     * 树形结构相关: 父节点字段值的来源字段。
     * 新增/修改时会用到, 例如, 在id为2的节点新增子节点, 则子节点的parentId为2, 也即parentId的值来源于字段id, 故treeParentValue为id
     */
    treeParentValue: {
      type: String,
      default: "id"
    },
    /**
     * 树形结构相关: 是否展开所有节点
     */
    expandAll: {
      type: Boolean,
      default: false
    },
    /**
     * el-table 的 prop 配置，详情配置参考element-ui官网
     * @link https://element.eleme.cn/2.4/#/zh-CN/component/table#table-attributes
     */
    tableAttrs: {
      type: Object,
      default() {
        return {};
      }
    },
    /**
     * el-table 的 eventHandler 配置，详情配置参考element-ui官网
     * @link https://element.eleme.cn/2.4/#/zh-CN/component/table#table-attributes
     */
    tableEventHandlers: {
      type: Object,
      default() {
        return {};
      }
    },
    /**
     * 操作列属性
     * @link https://element.eleme.cn/2.4/#/zh-CN/component/table#table-column-attributes
     */
    operationAttrs: {
      type: Object,
      default() {
        return { width: "", fixed: "right" };
      }
    },
    /**
     * 新增弹窗的标题，默认为newText的值
     */
    dialogNewTitle: {
      type: String,
      default() {
        return this.newText;
      }
    },
    /**
     * 修改弹窗的标题，默认为editText的值
     */
    dialogEditTitle: {
      type: String,
      default() {
        return this.editText;
      }
    },
    /**
     * 查看弹窗的标题，默认为viewText的值
     */
    dialogViewTitle: {
      type: String,
      default() {
        return this.viewText;
      }
    },
    /**
     * @deprecated
     */
    form: {
      type: Array,
      default() {
        return [];
      }
    },
    /**
     * 弹窗表单, 用于新增与修改, 详情配置参考 el-form-renderer
     * 为了 api 更符合直觉而设置
     * @link https://femessage.github.io/el-form-renderer/
     */
    dialogForm: {
      type: Array,
      default() {
        return null;
      }
    },
    /**
     * 弹窗表单属性设置, 详情配置参考element-ui官网
     * @link https://element.eleme.cn/2.4/#/zh-CN/component/form#form-attributes
     */
    formAttrs: {
      type: Object,
      default() {
        return {};
      }
    },
    /**
     * 对话框属性设置, 详情配置参考element-ui官网
     * @link https://element.eleme.cn/2.4/#/zh-CN/component/dialog#attributes
     */
    dialogAttrs: {
      type: Object,
      default() {
        return {};
      }
    },
    /**
     * 同extraBody
     * @deprecated
     */
    extraParams: {
      type: Object,
      default() {
        return undefined;
      }
    },
    /**
     * 新增/修改提交时，请求体带上额外的参数。
     */
    extraBody: {
      type: Object,
      default() {
        return undefined;
      }
    },
    /**
     * 在新增/修改弹窗 点击确认时调用，返回Promise, 如果reject, 则不会发送新增/修改请求
     * 参数: (data, isNew) data为表单数据, isNew true 表示是新增弹窗, false 为 编辑弹窗
     */
    beforeConfirm: {
      type: Function,
      default() {
        return Promise.resolve();
      }
    },
    /**
     * 同extraQuery
     * @deprecated
     */
    customQuery: {
      type: Object,
      default() {
        return undefined;
      }
    },
    /**
     * 向请求url添加的额外参数。
     * 可用.sync修饰，此时点击重置按钮后该参数也会被重置
     */
    extraQuery: {
      type: Object,
      default() {
        return undefined;
      }
    },
    /**
     * 是否开启使用url保存query参数的功能
     */
    saveQuery: {
      type: Boolean,
      default: true
    },
    /**
     * 操作栏按钮类型
     * `text` 为文本按钮, `button` 为普通按钮
     */
    operationButtonType: {
      type: String,
      default: "text"
    },
    /**
     * 设置 `按钮` 大小
     * @see https://element.eleme.cn/#/zh-CN/component/button#bu-tong-chi-cun
     */
    buttonSize: {
      type: String,
      default: "small"
    },
    /**
     * 设置axios的config参数
     */
    axiosConfig: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
