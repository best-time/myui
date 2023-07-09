<!--
   * cascader-input   级联选择框
   * drop-tree-input  树形下拉选择框
   * text-input       文本输入框
   * drop-input       下拉选择框
   * remote-input     远程搜索输入框
   * date-input       起止date选择框
   * date             date选择框
   * date-time-input  起止date + time选择框
   * time-input       date + time选择框
   * month-input      月份选择框
   * year-input       年份选择框
   * section-input    数字范围输入框
   * number-input     筛选数字输入框

   * @input props       {Array} inputList                输入框配置数组

     @数组内对象共同属性 {Object} name                   该对象展示的输入框类型，共有上列几种类型
                                bind_key{String,Array}  搜索返回的key
                                placeholder             占位文本
                                value                   用于v-model绑定
                                title                   标签文本
                                titleWidth              标签文本宽度(默认60px)
                                inputWidth              输入框的宽度（默认200px）

    下列name类型需添加特殊字段:
    @cascader-input{Object}     cascaderList{Array}     级联列表，数据结构同cascader组件
                                bind_key{Array}         搜索返回绑定的key名，['province', 'city']

    @drop-tree-input{Object}    label                   绑定展示数据
                                loading{boolean}        树形加载中
                                treeData{Array}         树形列表，数据结构同tree组件

    @drop-input{Object}         dropList{Array}         下拉数据，数据结构同select组件

    @remote-input{Object}       remoteMethod{Function}  远程搜索的方法，方法写法同select组件
                                remoteList              搜索到的数据，数据结构同select组件

    @date-input{Object}         bind_key{Array}         搜索返回绑定的key名，['startTime', 'endTime']

    @section-input{Object}      bind_key                搜索返回绑定的key名，['numStart', 'numEnd']
                                value1                  用于v-model绑定
                                value2                  用于v-model绑定

    Events:                     说明
    @on-search                  点击搜索时触发，返回key，value形式的对象
    @on-reset                   点击重置时触发，返回空对象

    @示例:
    inputList: [
      {
        name: 'text-input',
        bind_key: 'userAccount',
        placeholder: '请输入联系电话',
        value: '',
        title: '联系电话',
        titleWidth: 65,
        inputWidth: 200
      }
    ]
-->
<template>
  <div>
    <div
      v-for="(item, index) in inputListComp"
      v-show="index < insideShowNumber || !spreadStatus"
      :key="index"
      class="input-list-wrap"
    >
      <Dropdown
        v-if="item.name === 'drop-tree-input'"
        v-show="item.isMore"
        trigger="click"
        placement="bottom-end"
        @on-visible-change="dropTreeList"
      >
        <div class="text-input">
          <span
            class="title-name"
            :style="{ 'width': item.titleWidth + 'px' }"
          >{{item.title}}：</span>
          <div
            class="clickInput"
            :style="{ 'width': item.inputWidth + 'px' }"
          >
            <div
              v-if="item.label === ''"
              class="remodel-placeholder"
            >
              {{item.placeholder}}
            </div>
            <div v-else>{{item.label}}</div>
          </div>
        </div>
        <DropdownMenu
          slot="list"
          :style="{ 'min-width': item.inputWidth + 'px' }"
        >
          <div class="treeData-wrap">
            <Select
              ref="remodelInput"
              class="treeData-search-input"
              filterable
              remote
              :remote-method="remoteMethod"
              @on-query-change="searchTree"
            >
            </Select>
            <Spin
              v-if="item.loading"
              :style="{ width: '30px', margin: '10px auto' }"
              size="large"
            ></Spin>
            <Tree
              v-else
              :ref="item.bind_key"
              :data="item.treeData"
              empty-text="暂无数据"
              @on-select-change="getTreeData(index)"
            >
            </Tree>
          </div>
        </DropdownMenu>
      </Dropdown>
      <div
        v-if="item.name === 'cascader-input'"
        class="text-input"
      >
        <span
          class="title-name"
          :style="{ 'width': item.titleWidth + 'px' }"
        >{{item.title}}：</span>
        <Cascader
          v-model="item.value"
          :trigger="item.trigger || 'hover'"
          class="search-input"
          :placeholder="item.placeholder || `请输入${item.title}`"
          :style="{ 'width': item.inputWidth + 'px' }"
          :data="item.cascaderList"
          :load-data="loadData"
          :filterable="item.filterable || false"
          :change-on-select="item.changeOnSelect ? item.changeOnSelect : false"
          @on-change="(value, selectedData) => cascaderChange(value, selectedData, item)"
          @on-clear="() => clearCascade(item)"
          @on-visible-change="cascaderVisibleChange"
        >
        </Cascader>
      </div>
      <div
        v-if="item.name === 'text-input'"
        class="text-input"
      >
        <span
          class="title-name"
          :style="{ 'width': item.titleWidth + 'px' }"
        >{{item.title}}：</span>
        <Input v-if="item.maxlength"
               v-model="item.value"
               clearable
               :maxlength="item.maxlength"
               :placeholder="item.placeholder || `请输入${item.title}`"
               class="search-input"
               :style="{ 'width': item.inputWidth + 'px' }"
               @on-change="selectOrInput"
               @on-keydown.enter="enterSearch"
               @on-clear="enterSearch"
        />
        <Input v-else
               v-model="item.value"
               clearable
               :placeholder="item.placeholder || `请输入${item.title}`"
               class="search-input"
               :style="{ 'width': item.inputWidth + 'px' }"
               @on-change="selectOrInput"
               @on-keydown.enter="enterSearch"
               @on-clear="enterSearch"
        />
      </div>
      <div
        v-if="item.name === 'number-input'"
        class="text-input"
      >
        <span
          class="title-name"
          :style="{ 'width': item.titleWidth + 'px' }"
        >{{item.title}}：</span>
        <Input
          v-model="item.value"
          clearable
          :placeholder="item.placeholder"
          class="search-input"
          :style="{ 'width': item.inputWidth + 'px' }"
          @on-keyup="change_number(item.value,index)"
          @on-blur="change_number(item.value,index)"
          @on-change="selectOrInput"
        />
      </div>
      <div
        v-if="item.name === 'drop-input'"
        class="text-input"
      >
        <span
          class="title-name"
          :style="{ 'width': item.titleWidth + 'px' }"
        >{{item.title}}：</span>
        <Select
          v-if="typeof (item.value_key) === 'undefined' || typeof (item.label_key) === 'undefined'"
          v-model="item.value"
          :filterable="item.filterable || false"
          :clearable="item.clearable === false ? false : true"
          class="search-input"
          :placeholder="item.placeholder"
          :style="{ 'width': item.inputWidth + 'px' }"
          :multiple="item.multiple || false"
          :max-tag-count="selectNumber"
          @on-change="selectOrInput($event, item.bind_key);enterChange(item.value)"
          @on-clear="enterSearch"
        >
          <Option
            v-for="(dropItem, dropIndex) in item.dropList"
            :key="'item.dropList' + dropIndex"
            :value="dropItem.value"
            :bind_key="dropItem.value"
            :disabled="item.needDisabled && dropIndex !== item.disabledIndex"
          >{{dropItem.label}}</Option>
        </Select>
        <Select
          v-else
          v-model="item.value"
          clearable
          class="search-input"
          :placeholder="item.placeholder"
          :style="{ 'width': item.inputWidth + 'px' }"
          @on-change="selectOrInput"
        >
          <Option
            v-for="dropItem in item.dropList"
            :key="dropItem[value_key]"
            :value="dropItem[value_key]"
            :bind_key="dropItem[value_key]"
          >{{dropItem[label_key]}}</Option>
        </Select>
      </div>
      <div
        v-if="item.name === 'remote-input'"
        class="text-input"
      >
        <span
          class="title-name"
          :style="{ 'width': item.titleWidth + 'px' }"
        >{{item.title}}：</span>
        <Select
          :ref="item.bind_key"
          v-model="item.value"
          :style="{ 'width': item.inputWidth + 'px' }"
          :placeholder="item.placeholder"
          :remote-method="item.remoteMethod"
          class="search-input"
          remote
          clearable
          filterable
          @on-change="selectOrInput"
        >
          <Option
            v-for="(option, index) in item.remoteList"
            :key="index"
            :bind_key="option.value"
            :value="option.value"
          >{{option.label}}</Option>
        </Select>
      </div>
      <!-- 远程下拉单选 -->
      <div
        v-if="item.name === 'remote-scroll'"
        class="text-input"
      >
        <span
          class="title-name"
          :style="{ 'width': item.titleWidth + 'px' }"
        >{{item.title}}：</span>
        <remote-select
          ref="remoteScroll"
          :style="{ 'width': item.inputWidth + 'px' }"
          :axiosFun="item.axiosFun || axiosFun"
          :params="item.params"
          :dataKey="item.dataKey"
          :dataLabel="item.dataLabel"
          :queryName="item.queryName"
          :placeholder="item.placeholder"
          class="search-input"
          @on-select="(value) => { item.value = value }"
        >
        </remote-select>
      </div>
      <!-- 远程下拉多选 -->
      <div
        v-if="item.name === 'remote-multi-scroll'"
        class="text-input"
      >
        <span
          class="title-name"
          :style="{ 'width': item.titleWidth + 'px' }"
        >{{item.title}}：</span>
        <select-sort
          :ref="`_selectSort_${item.bind_key}`"
          :style="{ 'width': item.inputWidth + 'px' }"
          :params="item.params || {}"
          :queryName="item.queryName || ''"
          :data-key="item.dataKey"
          :data-label="item.dataLabel"
          :width="160"
          :placeholder="item.placeholder"
          :axiosFun="item.axiosFun || axiosFun"
          @on-success="(value) => { item.value = value }"
        ></select-sort>
      </div>
      <div
        v-if="item.name === 'date-input'"
        class="text-input"
      >
        <span
          class="title-name"
          :style="{ 'width': item.titleWidth + 'px' }"
        >{{item.title}}：</span>
        <DatePicker
          :ref="item.bind_key"
          v-model="item.value"
          clearable
          type="daterange"
          class="search-input"
          placement="bottom-start"
          :options="item.options || {}"
          :placeholder="item.placeholder"
          :separator="item.separator || '-'"
          :style="{ 'width': item.inputWidth + 'px' }"
          :editable="false"
          @on-clear="enterSearch"
          @on-open-change="isOpen => dateOpenChange(isOpen,index,item.value)"
          @on-change="selectOrInput"
        >
        </DatePicker>
      </div>
      <div
        v-if="item.name === 'date'"
        class="text-input"
      >
        <span
          class="title-name"
          :style="{ 'width': item.titleWidth + 'px' }"
        >{{item.title}}：</span>
        <DatePicker
          :ref="item.bind_key"
          v-model="item.value"
          clearable
          type="date"
          class="search-input"
          placement="bottom-start"
          :placeholder="item.placeholder"
          :style="{ 'width': item.inputWidth + 'px' }"
          @on-change="selectOrInput"
        >
        </DatePicker>
      </div>
      <div
        v-if="item.name === 'date-time-input'"
        class="text-input"
      >
        <span
          class="title-name"
          :style="{ 'width': item.titleWidth + 'px' }"
        >{{item.title}}：</span>
        <DatePicker
          :ref="item.bind_key"
          v-model="item.value"
          clearable
          type="datetimerange"
          class="search-input"
          :placement="item.placement || 'bottom-end'"
          :placeholder="item.placeholder"
          :editable="false"
          :format="item.format && item.format || 'yyyy-MM-dd HH:mm'"
          :style="{ 'width': item.inputWidth + 'px' }"
          @on-clear="enterSearch"
          @on-open-change="isOpen => dateOpenChange(isOpen,index,item.value)"
          @on-change="selectOrInput"
        >
        </DatePicker>
      </div>
      <div
        v-if="item.name === 'time-input'"
        class="text-input"
      >
        <span
          class="title-name"
          :style="{ 'width': item.titleWidth + 'px' }"
        >{{item.title}}：</span>
        <DatePicker
          :ref="item.bind_key"
          v-model="item.value"
          clearable
          class="search-input"
          type="datetime"
          :editable="false"
          :placeholder="item.placeholder || `请选择${item.title}`"
          :style="{ 'width': item.inputWidth + 'px' }"
          @on-change="selectOrInput"
        >
        </DatePicker>
      </div>
      <div
        v-if="item.name === 'month-input'"
        class="text-input"
      >
        <span
          class="title-name"
          :style="{ 'width': item.titleWidth + 'px' }"
        >{{item.title}}：</span>
        <DatePicker
          :ref="item.bind_key"
          v-model="item.value"
          :clearable="item.clearable === false ? false : true"
          class="search-input"
          type="month"
          :editable="item.editable === false ? false : true"
          :multiple="item.multiple"
          :options="item.options || {}"
          :placeholder="item.placeholder"
          :style="{ 'width': item.inputWidth + 'px' }"
          @on-change="selectOrInput"
        >
        </DatePicker>
      </div>
      <div
        v-if="item.name === 'year-input'"
        class="text-input"
      >
        <span
          class="title-name"
          :style="{ 'width': item.titleWidth + 'px' }"
        >{{item.title}}：</span>
        <DatePicker
          :ref="item.bind_key"
          v-model="item.value"
          clearable
          class="search-input"
          type="year"
          :editable="false"
          :placeholder="item.placeholder"
          :style="{ 'width': item.inputWidth + 'px' }"
          @on-change="selectOrInput"
        >
        </DatePicker>
      </div>
      <div
        v-if="item.name === 'section-input'"
        class="text-input"
      >
        <span
          class="title-name"
          :style="{ 'width': item.titleWidth + 'px' }"
        >{{item.title}}：</span>
        <InputNumber
          :ref="item.bind_key[0]"
          v-model="item.value1"
          class="search-input"
          :min="0"
          :placeholder="item.placeholder"
          :style="{ 'width': item.inputWidth + 'px' }"
          @on-change="selectOrInput"
        >
        </InputNumber>
        <span class="section-hr">-</span>
        <InputNumber
          :ref="item.bind_key[1]"
          v-model="item.value2"
          class="search-input"
          :min="0"
          :placeholder="item.placeholder"
          :style="{ 'width': item.inputWidth + 'px' }"
          @on-change="selectOrInput"
        >
        </InputNumber>
      </div>
      <div
        v-if="item.name === 'extendInput' && hasExtendInput"
        class="input-list-wrap"
      >
        <div class="text-input">
          <slot name="extendInput"></slot>
        </div>
      </div>
    </div>
    <div class="btn-wrap">
      <Button
        style="margin-right: 15px;"
        type="primary"
        @click="search"
      >
        {{searchTxt}}
      </Button>
      <Button v-if="showReset" @click="reset">{{resetTxt}}</Button>
      <slot name="moreBtn"></slot>
      <span
        v-show="inputListComp.length > insideShowNumber && spreadStatus"
        class="displayBtn"
        @click="spread"
      >
        查看更多
        <Icon type="ios-arrow-down" />
      </span>
      <span
        v-show="inputListComp.length < insideShowNumber && spreadStatus"
        class="displayBtn"
        @click="less"
      >
        收起更多
        <Icon type="ios-arrow-up" />
      </span>
    </div>
  </div>
</template>

<script>
import remoteSelect from "../remote-select/index.vue";
import selectSort from "../select-sort/select-sort.vue";
export default {
  name: "SearchList",
  components: {
    remoteSelect,
    selectSort
  },
  props: {
    inputList: {
      type: Array
    },
    spreadStatus: {
      type: Boolean,
      default: false
    },
    showNumber: {
      type: Number,
      default: 3
    },
    selectNumber: {
      type: Number,
      default: 1
    },
    resetTxt: {
      type: String,
      default: "清空"
    },
    searchTxt: {
      type: String,
      default: "搜索"
    },
    isEnterSearch: {
      type: Boolean,
      default: false
    },
    axiosFun: {},
    showReset: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const hasExtendInput = this.$slots && this.$slots["extendInput"]
    return {
      insideShowNumber: 0,
      hasExtendInput,
      existUniqKey: "",
      extendParams: {}
    }
  },
  computed: {
    inputListComp() {
      // 为inputList中的所有title统一冒号
      let reg = /[:：]/g;
      for (let i = 0, length = this.inputList.length; i < length; i++) {
        this.inputList[i].title = this.inputList[i].title.replace(/[:：]+/g, "");
      }
      return this.inputList
    }
  },
  watch: {
    showNumber: function () {
      this.insideShowNumber = this.showNumber
    }
  },
  created() {
    this.insideShowNumber = this.showNumber;
    this.existUniqKey = this.whetherNeedMatch();
  },
  methods: {
    spread() {
      this.insideShowNumber = this.inputListComp.length + 1
    },
    less() {
      this.insideShowNumber = this.showNumber
    },
    change_number(val, index) {
      this.inputListComp[index].value = val.replace(/[^\d]/g, "")
    },
    remoteMethod: function () { },
    dropTreeList: function (visible) {
      if (visible) { // 下拉菜单时
        this.$refs.remodelInput[0].$children[0].query = ""
        this.$emit("on-drop-tree")
      }
    },
    searchTree: function (data) { // 树形结构搜索时
      this.$emit("on-search-tree", data)
    },
    getTreeData: function (index) { // 点击树形结构选择时
      this.inputListComp[index].label = this.$refs[this.inputListComp[index].bind_key][0].getSelectedNodes()[0].label
      this.inputListComp[index].value = this.$refs[this.inputListComp[index].bind_key][0].getSelectedNodes()[0].value
    },
    resetData: function () {
      for (let i = 0; i < this.inputListComp.length; i++) {
        if (this.inputListComp[i].name === "remote-scroll") {
          this.inputListComp[i].value = ""
          this.$refs["remoteScroll"][0].$children[0].query = ""
          this.$refs["remoteScroll"][0].$children[0].clearSingleSelect()
        } else if (this.inputListComp[i].name === "remote-input") {
          this.inputListComp[i].value = ""
          this.$refs[this.inputListComp[i].bind_key][0].$children[0].query = ""
          this.$refs[this.inputListComp[i].bind_key][0].clearSingleSelect()
        } else if (this.inputListComp[i].name === "date-input" || this.inputListComp[i].name === "date-time-input") {
          this.inputListComp[i].value = ""
          this.$refs[this.inputListComp[i].bind_key][0].handleClear()
        } else if (this.inputListComp[i].name === "drop-tree-input") {
          this.inputListComp[i].value = ""
          this.inputListComp[i].label = ""
          this.$refs.remodelInput[0].$children[0].query = ""
        } else if (this.inputListComp[i].name === "cascader-input") {
          this.inputListComp[i].value = []
        } else if (this.inputListComp[i].name === "section-input") {
          this.inputListComp[i].value1 = null
          this.inputListComp[i].value2 = null
        } else if (this.inputListComp[i].name === "remote-multi-scroll") {
          this.inputListComp[i].value = ""
          const bk = this.inputListComp[i].bind_key
          const _ref = this.$refs[`_selectSort_${bk}`] && this.$refs[`_selectSort_${bk}`][0]
          if (_ref && typeof _ref.clearValue === "function") {
            _ref.clearValue()
          }
        } else {
          this.inputListComp[i].value = ""
        }
      }
      if (this.hasExtendInput) {
        this.extendParams = {}
      }
    },
    reset: function () {
      this.resetData()
      this.$store.commit("changeLoadingFlag", true)
      this.$emit("on-reset", {})
    },
    getSearchData: function () {
      let data = {}
      for (let i = 0; i < this.inputListComp.length; i++) {
        if (this.inputListComp[i].name === "remote-input") { // 远程搜索
          data[this.inputListComp[i].bind_key] = this.$refs[this.inputListComp[i].bind_key][0].$children[0].query
        } else if (this.inputListComp[i].name === "cascader-input") { // 级联选择
          let that = this
          this.inputListComp[i].bind_key.forEach(function (item, index) {
            data[item] = that.inputListComp[i].value[index]
          })
        } else if (this.inputListComp[i].name === "date-input" || this.inputListComp[i].name === "date-time-input") {
          // 起止date选择框、起止date + time选择框
          if (this.inputListComp[i].value === "") {
            data[this.inputListComp[i].bind_key[0]] = ""
            data[this.inputListComp[i].bind_key[1]] = ""
          } else {
            if (this.inputListComp[i].value[0] !== "") {
              data[this.inputListComp[i].bind_key[0]] = Date.parse(this.inputListComp[i].value[0])
              data[this.inputListComp[i].bind_key[1]] = Date.parse(this.inputListComp[i].value[1])
            } else {
              data[this.inputListComp[i].bind_key[0]] = this.inputListComp[i].value[0]
              data[this.inputListComp[i].bind_key[1]] = this.inputListComp[i].value[1]
            }
          }
        } else if (this.inputListComp[i].name === "time-input") { // date + time选择框
          if (this.inputListComp[i].value === "") {
            data[this.inputListComp[i].bind_key] = ""
          } else {
            data[this.inputListComp[i].bind_key] = Date.parse(this.inputListComp[i].value)
          }
        } else if (this.inputListComp[i].name === "month-input") { // 月份选择
          // 月份多选
          if(this.inputListComp[i].multiple) {
            if(this.inputListComp[i].value && !this.inputListComp[i].value.length) {
              data[this.inputListComp[i].bind_key] = []
            } else {
              data[this.inputListComp[i].bind_key] = this.inputListComp[i].value.map(it => (
                this.$moment(it).format("YYYY-MM")
              ))
            }
          } else {
            if (this.inputListComp[i].value === "") {
              data[this.inputListComp[i].bind_key] = ""
            } else {
              data[this.inputListComp[i].bind_key] = this.$moment(this.inputListComp[i].value).format("YYYY-MM")
            }
          }
        } else if (this.inputListComp[i].name === "year-input") { // 年份选择
          if (this.inputListComp[i].value === "") {
            data[this.inputListComp[i].bind_key] = ""
          } else {
            data[this.inputListComp[i].bind_key] = this.inputListComp[i].value.getFullYear()
          }
        } else if (this.inputListComp[i].name === "section-input") { // 数量区间选择
          if (this.inputListComp[i].value2 === "" || this.inputListComp[i].value2 === 0) {
            data[this.inputListComp[i].bind_key[0]] = 0
            data[this.inputListComp[i].bind_key[1]] = 0
          } else {
            data[this.inputListComp[i].bind_key[0]] = this.inputListComp[i].value1;
            data[this.inputListComp[i].bind_key[1]] = this.inputListComp[i].value2;
          }
        } else { // 其他输入框
          if (typeof (this.inputListComp[i].value) === "undefined") {
            data[this.inputListComp[i].bind_key] = ""
          } else {
            data[this.inputListComp[i].bind_key] = this.inputListComp[i].value
          }
        }
      }
      if (this.hasExtendInput) {
        data = {
          ...data,
          ...this.extendParams
        }
      }
      for (let item in data) {
        if (data[item] === "" || typeof (data[item]) === "undefined" || data[item] === null) {
          delete data[item]
        }
      }

      return data
    },
    loadData(item, callback) {
      this.$emit("loadData", item, callback)
    },
    search: function () {
      let data = this.getSearchData()
      this.$store.commit("changeLoadingFlag", true)
      this.$emit("on-search", data)
    },
    // 判断是否需要进行uniqKey遍历
    whetherNeedMatch() {
      return this.inputList.find(item => item.uniqKey)
    },
    matchUniqKey(data) {
      for (let i = 0, length = this.inputList.length; i < length; i++) {
        let item = this.inputList[i];
        if (item.uniqKey && item.dropList.find(item => item.value === data[data.length - 1])) {
          if (data[data.length - 1] === item.uniqKey) {
            item.value = [item.uniqKey];
          } else {
            item.value = item.value.filter(i => i !== item.uniqKey);
          }
        }
      }
    },

    selectOrInput(data, name) {
      if (this.existUniqKey) {
        this.matchUniqKey(data);
      }
      this.$emit("on-change", data, name)
    },
    cascaderChange(p, q, item) {
      this.$emit("cascade-change", p, q, item)
      // 只有点击close icon会触发此判断
      if (this.isEnterSearch && p.length === 0) {
        this.enterSearch()
      }
    },
    clearCascade(item) {
      this.$emit("clear-cascade", item)
    },
    // input-enter，单选框-切换，级联选择器关闭下拉，触发搜索操作'
    cascaderVisibleChange(isOpen) {
      if (this.isEnterSearch && !isOpen) this.enterSearch()
    },
    // 时间段，选择器关闭触发，
    dateOpenChange(isOpen, index, value) {
      if (this.isEnterSearch && !isOpen) {
        let that = this
        let beforeVal = value
        setTimeout(() => {
          let afterVal = that.inputListComp[index].value
          let isAfterVal = afterVal[0] || afterVal[1]
          let isBeforeEvalAfter = beforeVal[0] === afterVal[0] && beforeVal[1] === afterVal[1]
          // 如果是清空操作，或者未改变选择的值，不进行搜索
          if (isAfterVal && !isBeforeEvalAfter) {
            that.enterSearch()
          }
        })
      }
    },
    enterChange(value) {
      value !== undefined && value !== null && this.enterSearch()
    },
    enterSearch() {
      let that = this
      if (this.isEnterSearch) {
        setTimeout(() => {
          that.search()
        })
      }
    },
    selectCarLevel(data) {
      const { brandId, seriesId, id } = data
      this.extendParams = {
        carBrandId: brandId,
        carSeriesId: seriesId,
        carLevelId: id
      }
    }
  }
}
</script>

<style scoped src="./index.css"></style>
