<template>
  <div class="el-data-table">
    <template v-if="showNoData">
      <!--@slot 获取数据为空时的内容-->
      <slot name="no-data"></slot>
    </template>
    <template v-else>
      <!-- 搜索字段 -->
      <!-- @submit.native.prevent -->
      <!-- 阻止表单提交的默认行为 -->
      <!-- https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2 -->
      <el-form-renderer
        v-if="hasSearchForm"
        ref="searchForm"
        :content="_searchForm"
        inline
        class="search-form-container"
        @submit.native.prevent
      >
        <slot
          v-for="slot in searchLocatedSlotKeys"
          :slot="slot.replace('search:', 'id:')"
          :name="slot"
        />
        <!--@slot 额外的搜索内容, 当searchForm不满足需求时可以使用-->
        <slot name="search"></slot>
        <el-form-item>
          <!--https://github.com/ElemeFE/element/pull/5920-->
          <el-button
            native-type="submit"
            type="primary"
            :size="buttonSize"
            @click="search"
            >查询</el-button
          >
          <el-button :size="buttonSize" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form-renderer>

      <el-form v-if="hasHeader">
        <el-form-item class="header-button-container">
          <el-button
            v-if="hasNew"
            type="primary"
            :size="buttonSize"
            @click="onDefaultNew"
            >{{ newText }}</el-button
          >
          <template v-for="(btn, i) in headerButtons">
            <self-loading-button
              v-if="'show' in btn ? btn.show(selected) : true"
              :key="i"
              :disabled="'disabled' in btn ? btn.disabled(selected) : false"
              :click="btn.atClick"
              :params="selected"
              :callback="getList"
              :size="buttonSize"
              v-bind="btn"
            >
              {{
                typeof btn.text === 'function' ? btn.text(selected) : btn.text
              }}
            </self-loading-button>
          </template>
          <el-button
            v-if="hasSelect && hasDelete"
            type="danger"
            :size="buttonSize"
            :disabled="selected.length === 0 || (single && selected.length > 1)"
            @click="onDefaultDelete(single ? selected[0] : selected)"
            >{{ deleteText }}</el-button
          >

          <!--@slot 额外的header内容, 当headerButtons不满足需求时可以使用，传入selected -->
          <slot name="header" :selected="selected" />

          <!--@collapse 自定义折叠按钮, 默认的样式文案不满足时可以使用。传入当前折叠状态 isSearchCollapse: Boolean -->
          <slot name="collapse" :isSearchCollapse="isSearchCollapse">
            <el-button
              v-if="canSearchCollapse"
              type="default"
              :size="buttonSize"
              :icon="`el-icon-arrow-${isSearchCollapse ? 'down' : 'up'}`"
              @click="isSearchCollapse = !isSearchCollapse"
              >{{ isSearchCollapse ? '展开' : '折叠' }}搜索</el-button
            >
          </slot>
        </el-form-item>
      </el-form>

      <el-table
        ref="table"
        v-loading="loading"
        v-bind="tableAttrs"
        :data="data"
        :row-class-name="rowClassName"
        v-on="tableEventHandlersInner"
        @selection-change="selectStrategy.onSelectionChange"
        @select="selectStrategy.onSelect"
        @select-all="selectStrategy.onSelectAll($event, selectable)"
      >
        <!--TODO 不用jsx写, 感觉template逻辑有点不清晰了-->
        <template v-if="isTree">
          <!--有多选-->
          <template v-if="hasSelect">
            <el-data-table-column
              key="selection-key"
              v-bind="{align: columnsAlign, ...columns[0]}"
            />

            <el-data-table-column
              key="tree-ctrl"
              v-bind="{align: columnsAlign, ...columns[1]}"
            >
              <template slot-scope="scope">
                <span
                  v-for="space in scope.row._level"
                  :key="space"
                  class="ms-tree-space"
                />
                <span
                  v-if="iconShow(scope.$index, scope.row)"
                  class="tree-ctrl"
                  @click="toggleExpanded(scope.$index)"
                >
                  <i
                    :class="`el-icon-${scope.row._expanded ? 'minus' : 'plus'}`"
                  />
                </span>
                {{ scope.row[columns[1].prop] }}
              </template>
            </el-data-table-column>

            <el-data-table-column
              v-for="col in columns.filter((c, i) => i !== 0 && i !== 1)"
              :key="col.prop"
              v-bind="{align: columnsAlign, ...col}"
            />
          </template>

          <!--无选择-->
          <template v-else>
            <!--展开这列, 丢失 el-data-table-column属性-->
            <el-data-table-column
              key="tree-ctrl"
              v-bind="{align: columnsAlign, ...columns[0]}"
            >
              <template slot-scope="scope">
                <span
                  v-for="space in scope.row._level"
                  :key="space"
                  class="ms-tree-space"
                />

                <span
                  v-if="iconShow(scope.$index, scope.row)"
                  class="tree-ctrl"
                  @click="toggleExpanded(scope.$index)"
                >
                  <i
                    :class="`el-icon-${scope.row._expanded ? 'minus' : 'plus'}`"
                  />
                </span>
                {{ scope.row[columns[0].prop] }}
              </template>
            </el-data-table-column>

            <el-data-table-column
              v-for="col in columns.filter((c, i) => i !== 0)"
              :key="col.prop"
              v-bind="{align: columnsAlign, ...col}"
            />
          </template>
        </template>

        <!--非树-->
        <template v-else>
          <el-data-table-column
            v-for="col in columns"
            :key="col.prop"
            v-bind="{align: columnsAlign, ...col}"
          />
        </template>

        <!--默认操作列-->
        <el-data-table-column
          v-if="hasOperation"
          label="操作"
          v-bind="{align: columnsAlign, ...operationAttrs}"
        >
          <template slot-scope="scope">
            <self-loading-button
              v-if="isTree && hasNew"
              type="primary"
              :size="operationButtonType === 'text' ? '' : buttonSize"
              :is-text="operationButtonType === 'text'"
              @click="onDefaultNew(scope.row)"
            >
              {{ newText }}
            </self-loading-button>
            <self-loading-button
              v-if="hasEdit"
              type="primary"
              :size="operationButtonType === 'text' ? '' : buttonSize"
              :is-text="operationButtonType === 'text'"
              @click="onDefaultEdit(scope.row)"
            >
              {{ editText }}
            </self-loading-button>
            <self-loading-button
              v-if="hasView"
              type="primary"
              :size="operationButtonType === 'text' ? '' : buttonSize"
              :is-text="operationButtonType === 'text'"
              @click="onDefaultView(scope.row)"
            >
              {{ viewText }}
            </self-loading-button>
            <template v-for="(btn, i) in extraButtons">
              <self-loading-button
                v-if="'show' in btn ? btn.show(scope.row) : true"
                :key="i"
                :is-text="operationButtonType === 'text'"
                v-bind="btn"
                :click="btn.atClick"
                :params="scope.row"
                :callback="getList"
                :disabled="'disabled' in btn ? btn.disabled(scope.row) : false"
              >
                {{
                  typeof btn.text === 'function'
                    ? btn.text(scope.row)
                    : btn.text
                }}
              </self-loading-button>
            </template>
            <self-loading-button
              v-if="!hasSelect && hasDelete && canDelete(scope.row)"
              type="danger"
              :size="operationButtonType === 'text' ? '' : buttonSize"
              :is-text="operationButtonType === 'text'"
              @click="onDefaultDelete(scope.row)"
            >
              {{ deleteText }}
            </self-loading-button>

            <!--@slot 自定义操作列, 当extraButtons不满足需求时可以使用。传入 row -->
            <slot name="operation" :row="scope.row" />
          </template>
        </el-data-table-column>

        <!--@slot 默认slot，同 el-table -->
        <slot />
      </el-table>

      <el-pagination
        v-if="hasPagination"
        :current-page="page"
        :page-sizes="paginationSizes"
        :page-size="size"
        :total="total"
        style="text-align: right; padding: 10px 0;"
        :layout="paginationLayout"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

      <the-dialog
        ref="dialog"
        :new-title="dialogNewTitle"
        :edit-title="dialogEditTitle"
        :view-title="dialogViewTitle"
        :form="dialogForm || form"
        :form-attrs="formAttrs"
        :dialog-attrs="dialogAttrs"
        :button-size="buttonSize"
        @confirm="onConfirm"
      >
        <template v-slot="scope">
          <!-- @slot 表单作用域插槽。当编辑、查看时传入row；新增时row=null -->
          <slot name="form" :row="scope.row" />
        </template>
      </the-dialog>
    </template>
  </div>
</template>

<script>
import _get from 'lodash.get'
import _values from 'lodash.values'
import _kebabcase from 'lodash.kebabcase'
import _isEmpty from 'lodash.isempty'
import SelfLoadingButton from './components/self-loading-button.vue'
import TheDialog, {dialogModes} from './components/the-dialog.vue'
import ElDataTableColumn from './components/el-data-table-column'
import * as queryUtil from './utils/query'
import getSelectStrategy from './utils/select-strategy'
import getLocatedSlotKeys from './utils/extract-keys'
import transformSearchImmediatelyItem from './utils/search-immediately-item'
import {isFalsey, removeEmptyKeys} from './utils/utils'
import propsMixin from './props.js'

const defaultFirstPage = 1
const noPaginationDataPath = 'payload'

export default {
  name: 'ElDataTable',
  components: {
    SelfLoadingButton,
    TheDialog,
    ElDataTableColumn
  },
  mixins: [propsMixin],
  data() {
    return {
      data: [],
      size: this.paginationSize || this.paginationSizes[0],
      page: defaultFirstPage,
      // https://github.com/ElemeFE/element/issues/1153
      total: null,
      loading: false,
      // 多选项的数组
      selected: [],

      // 要修改的那一行
      row: {},

      // 初始的extraQuery值, 重置查询时, 会用到
      // JSON.stringify是为了后面深拷贝作准备
      initExtraQuery: JSON.stringify(this.extraQuery || this.customQuery || {}),
      isSearchCollapse: false,
      showNoData: false
    }
  },
  computed: {
    tableEventHandlersInner() {
      const handlers = {}
      for (const key in this.tableEventHandlers) {
        const kebab = _kebabcase(key)
        handlers[kebab] = this.tableEventHandlers[key]
      }
      return handlers
    },
    hasSelect() {
      return this.columns.length && this.columns[0].type == 'selection'
    },

    selectable() {
      if (this.hasSelect && this.columns[0].selectable) {
        return this.columns[0].selectable
      }
      return () => true
    },

    columnsAlign() {
      if (this.columns.some(col => col.columns && col.columns.length)) {
        // 多级表头默认居中
        return 'center'
      } else {
        return ''
      }
    },
    routerMode() {
      return this.$router ? this.$router.mode : 'hash'
    },
    hasSearchForm() {
      return this.searchForm.length || this.$slots.search
    },
    hasHeader() {
      return (
        this.hasNew ||
        (this.hasSelect && this.hasDelete) ||
        this.headerButtons.length ||
        this.canSearchCollapse ||
        this.$scopedSlots.header
      )
    },
    _extraBody() {
      return this.extraBody || this.extraParams || {}
    },
    _extraQuery() {
      return this.extraQuery || this.customQuery || {}
    },
    selectStrategy() {
      return getSelectStrategy(this)
    },
    searchLocatedSlotKeys() {
      return getLocatedSlotKeys(this.$slots, 'search:')
    },
    collapseForm() {
      return this.searchForm.map(item => {
        if ('collapsible' in item && !item.collapsible) {
          return item
        }

        const itemHidden = item.hidden || (() => false)
        return {
          ...item,
          hidden: data => {
            return this.isSearchCollapse || itemHidden(data)
          }
        }
      })
    },
    _searchForm() {
      return transformSearchImmediatelyItem(this.collapseForm, this)
    }
  },
  watch: {
    url: {
      handler(val) {
        if (!val) return
        this.page = defaultFirstPage
        // mounted处有updateForm的行为，所以至少在初始执行时要等到nextTick
        this.$nextTick(this.getList)
      },
      immediate: true
    },
    selected(val) {
      /**
       * 多选项发生变化
       * @property {array} rows - 已选中的行数据的数组
       */
      this.$emit('selection-change', val)
    }
  },
  mounted() {
    if (this.saveQuery) {
      const query = queryUtil.get(location.href)
      if (query) {
        this.page = parseInt(query[this.pageKey])
        this.size = parseInt(query[this.pageSizeKey])
        // 恢复查询条件，但对slot=search无效
        if (this.$refs.searchForm) {
          delete query[this.pageKey]
          delete query[this.pageSizeKey]
          this.$refs.searchForm.updateForm(query)
        }
      }
    }
  },
  methods: {
    /**
     * 手动刷新列表数据，选项的默认值为: { loading: true }
     * @public
     * @param {object} options 方法选项
     */
    getList({loading = true} = {}) {
      const {url} = this

      if (!url) {
        console.warn('DataTable: url 为空, 不发送请求')
        return
      }

      // 构造query对象
      let query = {}
      let formValue = {}
      if (this.$refs.searchForm) {
        formValue = this.$refs.searchForm.getFormValue()
        Object.assign(query, formValue)
      }
      Object.assign(query, this._extraQuery)

      query[this.pageSizeKey] = this.hasPagination
        ? this.size
        : this.noPaginationSize

      // 根据偏移值计算接口正确的页数
      const pageOffset = this.firstPage - defaultFirstPage
      query[this.pageKey] = this.hasPagination ? this.page + pageOffset : -1

      // 无效值过滤，注意0是有效值
      query = Object.keys(query)
        .filter(k => ![undefined, null].includes(query[k]))
        .reduce((obj, k) => ((obj[k] = query[k]), obj), {})

      // 请求开始
      this.loading = loading
      // 存储query记录, 便于后面恢复
      if (this.saveQuery) {
        // 存储的page是table的页码，无需偏移
        query[this.pageKey] = this.page
        const newUrl = queryUtil.set(location.href, query, this.routerMode)
        history.replaceState(history.state, 'el-data-table search', newUrl)
      }

      // 当查询参数为数组时，需要将参数转化为字符串才发送请求
      query = Object.keys(query).reduce(
        (obj, k) => (
          (obj[k] = Array.isArray(query[k])
            ? query[k].toString().trim()
            : query[k]),
          obj
        ),
        {}
      )

      const params = {
        ...removeEmptyKeys(query),
        ..._get(this.axiosConfig, 'params', {})
      }

      this.$axios({
        method: 'get',
        url,
        params,
        ...this.axiosConfig
      })
        .then(raw => {
          let payload = raw
          let data = []
          let total = 0

          if (this.onResponse) {
            let processData = this.onResponse(raw)
            data = processData.data
            total = processData.total
          } else {
            payload = raw.data
            // 不分页
            if (!this.hasPagination) {
              data =
                _get(payload, this.dataPath) ||
                _get(payload, noPaginationDataPath) ||
                []
              total = data.length
            } else {
              data = _get(payload, this.dataPath) || []
              // 获取不到值得时候返回 undefined, el-pagination 接收一个 null 或者 undefined 会导致没数据但是下一页可点击
              total = _get(payload, this.totalPath) || 0
              const lastPage = Math.ceil(total / this.size)
              if (0 < lastPage && lastPage < this.page) {
                this.page = lastPage
                this.getList(...arguments)
                return
              }
            }
          }

          // 树形结构逻辑
          if (this.isTree) {
            this.data = this.tree2Array(data, this.expandAll)
            this.total = total //树翻页总数
          } else {
            this.data = data
            this.total = total
          }

          this.showNoData =
            this.$slots['no-data'] &&
            this.total === 0 &&
            (_isEmpty(formValue) || _values(formValue).every(isFalsey))

          this.loading = false
          /**
           * 请求返回, 数据更新后触发
           * @property {object} data - table的数据
           * @property {object} payload - 包含 data 的外层数据
           */
          this.$emit('update', data, payload)

          // 开启persistSelection时，需要同步selected状态到el-table中
          this.$nextTick(() => {
            this.selectStrategy.updateElTableSelection()
          })
        })
        .catch(err => {
          /**
           * 请求数据失败，返回err对象
           * @event error
           */
          this.$emit('error', err)
          this.total = 0
          this.loading = false
        })
    },
    async search() {
      const form = this.$refs.searchForm
      const valid = await new Promise(r => form.validate(r))
      if (!valid) return

      try {
        await this.beforeSearch(form.getFormValue())
        this.page = defaultFirstPage
        this.getList()
      } catch (err) {
        this.$emit('error', err)
      }
    },
    /**
     * 重置查询，相当于点击「重置」按钮
     *
     * @public
     */
    resetSearch() {
      // reset后, form里的值会变成 undefined, 在下一次查询会赋值给query
      this.$refs.searchForm.resetFields()
      this.page = defaultFirstPage

      // 重置
      if (this.saveQuery) {
        const newUrl = queryUtil.clear(location.href)
        history.replaceState(history.state, '', newUrl)
      }

      /**
       * 按下重置按钮后触发
       */
      this.$emit('reset')

      this.$emit('update:customQuery', JSON.parse(this.initExtraQuery))
      this.$emit('update:extraQuery', JSON.parse(this.initExtraQuery))

      this.$nextTick(() => {
        this.getList()
      })
    },
    handleSizeChange(val) {
      if (this.size === val) return

      this.page = defaultFirstPage
      this.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      if (this.page === val) return

      this.page = val
      this.getList()
    },
    /**
     * 切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否
     *
     * @public
     * @param {object} row - 要更新的数据行
     * @param {boolean} isSelected - 是否被勾选
     */
    toggleRowSelection(row, isSelected) {
      return this.selectStrategy.toggleRowSelection(row, isSelected)
    },
    /**
     * 清空多选项
     *
     * @public
     */
    clearSelection() {
      return this.selectStrategy.clearSelection()
    },
    // 弹窗相关
    // 除非树形结构在操作列点击新增, 否则 row 是 MouseEvent
    onDefaultNew(row) {
      this.row = row
      this.$refs.dialog.show(dialogModes.new)
    },
    onDefaultView(row) {
      this.row = row
      this.$refs.dialog.show(dialogModes.view, row)
    },
    onDefaultEdit(row) {
      this.row = row
      this.$refs.dialog.show(dialogModes.edit, row)
    },
    async onConfirm(isNew, formValue, done) {
      const data = {
        ...formValue,
        ...this._extraBody
      }

      if (this.isTree) {
        data[this.treeParentKey] = isNew
          ? this.row[this.treeParentValue]
          : this.row[this.treeParentKey]
      }

      try {
        await this.beforeConfirm(data, isNew)
        if (isNew) {
          await this.onNew(data, this.row)
        } else {
          await this.onEdit(data, this.row)
        }
        this.getList()
        this.onSuccess(isNew ? 'new' : 'edit', data)
        done()
      } catch (e) {
        // 出错则不关闭dialog
        done(false)
      }
    },
    /**
     * 完整的删除方法，流程如下：
     * 1. 弹出二次确认弹窗（使用 deleteMessage）；
     * 2. 执行 onDelete，过程中确认按钮保持 loading；
     * 3. 失败则报错误信息、弹窗不关闭；
     * 4. 成功则报成功信息、弹窗关闭、重新请求数据、并校正页码（详见 correctPage）；
     * @public
     * @param {object|object[]} - 要删除的数据对象或数组
     */
    onDefaultDelete(data) {
      return this.$confirm(this.deleteMessage(data), '提示', {
        type: 'warning',
        confirmButtonClass: 'el-button--danger',
        beforeClose: async (action, instance, done) => {
          if (action !== 'confirm') return done()

          instance.confirmButtonLoading = true

          try {
            await this.onDelete(data)
            done()
            this.onSuccess('delete', data)

            this.correctPage()
            this.getList()
          } catch (error) {
            console.warn(error.message)
            throw error
          } finally {
            instance.confirmButtonLoading = false
          }
        }
      }).catch(() => {
        /*取消*/
      })
    },

    /**
     * 判断是否返回上一页
     * @public
     */
    correctPage() {
      let deleteCount = 1
      if (this.hasSelect) {
        deleteCount = this.selected.length
        this.clearSelection()
      }
      const remain = this.data.length - deleteCount
      const lastPage = Math.ceil(this.total / this.size)
      if (
        remain === 0 &&
        this.page === lastPage &&
        this.page > defaultFirstPage
      )
        this.page--
    },

    // 树形table相关
    // https://github.com/PanJiaChen/vue-element-admin/tree/master/src/components/TreeTable
    tree2Array(data, expandAll, parent = null, level = null) {
      let tmp = []
      data.forEach(record => {
        if (record._expanded === undefined) {
          this.$set(record, '_expanded', expandAll)
        }
        let _level = 0
        if (level !== undefined && level !== null) {
          _level = level + 1
        }
        this.$set(record, '_level', _level)
        // 如果有父元素
        if (parent) {
          Object.defineProperty(record, 'parent', {
            value: parent,
            enumerable: false
          })
        }
        tmp.push(record)

        if (record[this.treeChildKey] && record[this.treeChildKey].length > 0) {
          const children = this.tree2Array(
            record[this.treeChildKey],
            expandAll,
            record,
            _level
          )
          tmp = tmp.concat(children)
        }
      })
      return tmp
    },
    rowClassName(...args) {
      let rcn =
        this.tableAttrs.rowClassName || this.tableAttrs['row-class-name'] || ''
      if (typeof rcn === 'function') rcn = rcn(...args)
      if (this.isTree) rcn += ' ' + this.showRow(...args)
      return rcn
    },
    showRow({row}) {
      const show = !row.parent || (row.parent._expanded && row.parent._show)
      row._show = show
      return show ? 'row-show' : 'row-hide'
    },
    // 切换下级是否展开
    toggleExpanded(trIndex) {
      const record = this.data[trIndex]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow(index, record) {
      //      return index ===0 && record.children && record.children.length > 0;
      return record[this.treeChildKey] && record[this.treeChildKey].length > 0
    }
  }
}
</script>
<style lang="less" src="./index.less">
</style>
