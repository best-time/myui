<template>
  <div class="list_data">
    <div class="list_table">
      <el-table
        ref="tableBox"
        :size="size"
        :data="data"
        :border="border"
        :stripe="stripe"
        :max-height="height ? height : null"
        :highlight-current-row="heightLinght"
        :show-header="showHeader"
        :empty-text="emptyText"
        :show-overflow-tooltip="showTooltip"
        :row-class-name="getRowClass"
        :cell-class-name="getCellClass"
        :header-cell-class-name="getHeadClass"
        @row-click="handRowClick"
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <!-- 多选框 -->
        <el-table-column type="selection" width="55" v-if="multiple"></el-table-column>
        <!-- 单选框 -->
        <el-table-column width="55" v-if="radio">
          <template slot-scope="scope">
            <el-radio v-model="radioValue" :label="scope.row[rowKey]">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <!-- 序号 -->
        <el-table-column v-if="index" type="index" width="50" :label="indexLabel"></el-table-column>
        <!-- 其他数据 -->
        <el-table-column
          v-for="(item, index) in columns"
          :key="index"
          :prop="item.key"
          :label="item.title"
          :width="item.width"
          :fixed="item.fixed || null"
        >
          <template slot-scope="{ row, column, $index }">
            <!-- 如果有插槽内容，则显示插槽 -->
            <template v-if="item.slot">
              <slot :name="item.slot" :row="row" :column="column" :index="$index"></slot>
            </template>
            <!-- 如果没有，则显示默认的数据 -->
            <template v-else>
              {{ row[item.key] }}
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页功能 -->
    <div class="list_page" v-if="page">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        :page-sizes="pageSizeArr"
        :layout="layout"
        :pager-count="pagerCount"
        :background="background"
        :small="small"
        :hide-on-single-page="hideOn"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
/*
@selectChange  暴露出去一个方法 返回的是单选或者多选的数据
@pageChange   分页的改变 不管是当前页数的改变 还是每页显示数量的改变都会触发 返回一个对象
    {
        currentPage: '',
        pageSize: ''
      }
*/
export default {
  // 下面这些就是所有的设置的参数
  props: {
    //   表格的数据  必传
    data: {
      type: Array,
      default: () => []
    },
    // 表格的表头内容和对应的字段，还有是否定位 宽度等 必传
    /*
      columns:[
          {
            title: "名称",//表头
            key: "name",//对应的参数
            fixed:'left',//是否定位
            width:70,//宽度
            slot:'',//slot是作为插槽来用，自定义内容标签
          }
      ]
    */
    columns: {
      type: Array,
      default: () => []
    },
    // 表格是否显示序号 默认为显示
    index: {
      type: Boolean,
      default: true
    },
    // 序号的标题设置
    indexLabel: {
      type: String,
      default: '序号'
    },
    // 表格是否显示边框 默认为显示
    border: {
      type: Boolean,
      default: true
    },
    // 表格是否显示斑马条纹的颜色 默认为显示
    stripe: {
      type: Boolean,
      default: true
    },
    // Table 的尺寸  medium / small / mini  默认为 medium
    size: {
      type: String,
      default: 'medium'
    },
    // 是否显示表头， 默认为显示
    showHeader: {
      type: Boolean,
      default: true
    },
    //  是否高亮当前点击行  默认为false
    heightLinght: {
      type: Boolean,
      default: false
    },
    // 默认情况下若内容过多会折行显示，为true时多余的内容会在 hover 时以 tooltip 的形式显示出来。
    showTooltip: {
      type: Boolean,
      default: false
    },
    // 表格最大高度，是需要固定表头的时候设置这个值 默认为空
    height: {
      type: [String, Number],
      default: ''
    },
    // 数据的唯一值，默认为id，在多选点击行选中 和 单选时 单选按钮选中时 需要使用这个值
    rowKey: {
      type: String,
      default: 'id'
    },
    // 表格是否需要作为单选，如果为单选，则会显示单选按钮  并返回一个方法来接受选择的数据 如果需要开启 则需要传递 rowKey  这个唯一值
    radio: {
      type: Boolean,
      default: false
    },
    // 是否需要作为多选模式，默认为false,如果多选，则会显示多选框，并返回一个方法来接受选择的数据
    multiple: {
      type: Boolean,
      default: false
    },
    // 这个主要是为多选时服务，是否在多选时点击行就选中数据，element默认是只能选中多选框才能选中数据，如果开启，则需要传递下面的rowKey，如果唯一值为id，则不需要，默认为id，
    rowSelect: {
      type: Boolean,
      default: false
    },
    // 当没有数据时，需要展示的文字提示
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    // 给某一行添加class添加样式 Function(row, rowIndex)/String
    rowClassName: [String, Function],
    //  列的className的回调方法 Function(row, column, rowIndex, columnIndex)/String
    cellClassName: [String, Function],
    // 表头单元格的 className 的回调方法， Function({row, rowIndex})/String
    headClassNmae: [String, Function],

    // 是否显示分页，默认为显示
    page: {
      type: Boolean,
      default: true
    },
    // 当前显示的页数
    currentPage: {
      type: Number,
      default: 1
    },
    // 每页显示的数量
    pageSize: {
      type: Number,
      default: 20
    },
    // 总条数
    total: {
      type: Number,
      default: 0
    },
    // 页码按钮的数量，当总页数超过该值时会折叠，大于等于 5 且小于等于 21 的奇数
    pagerCount: {
      type: Number,
      default: 5
    },
    //每页显示个数选择器的选项设置
    pageSizeArr: {
      type: Array,
      default: [10, 20, 30, 40, 50, 100]
    },
    // 是否使用小型分页样式  默认为false
    small: {
      type: Boolean,
      default: false
    },
    // 是否为分页按钮添加背景色  默认为true
    background: {
      type: Boolean,
      default: true
    },
    // 	只有一页时是否隐藏  默认为false
    hideOn: {
      type: Boolean,
      default: false
    },
    layout: {
      type: String,
      default: 'prev, pager, next,sizes, total,jumper'
    }
  },
  data() {
    return {
      radioValue: '', //单选按钮绑定的值
      selectList: [] //选中的值
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    //   获取行的classname
    getRowClass({ row, rowIndex }) {
      let rowClass = this.rowClassName
      if (typeof rowClass === 'string') {
        return rowClass
      } else if (typeof rowClass === 'function') {
        return rowClass(row, rowIndex)
      }
    },
    // 获取列的className
    getCellClass({ row, column, rowIndex, columnIndex }) {
      let cellClass = this.cellClassName
      if (typeof cellClass === 'string') {
        return cellClass
      } else if (typeof cellClass === 'function') {
        return cellClass(row, column, rowIndex, columnIndex)
      }
    },
    // 获取表头的className
    getHeadClass({ row, rowIndex }) {
      let headClass = this.headClassNmae
      if (typeof headClass === 'string') {
        return headClass
      } else if (typeof headClass === 'function') {
        return headClass(row, rowIndex)
      }
    },
    // 点击多选框时的数据
    handleSelectionChange(val) {
      this.selectList = val
      this.$emit('selectChange', this.selectList)
    },
    // 某一行被点击时
    handRowClick(row, column) {
      // 如果为单选时
      if (this.radio) {
        this.selectList = []
        this.radioValue = row[this.rowKey] //将选中的值赋值用于单选按钮的选中
        this.$refs.tableBox.setCurrentRow(row) //单选时 element提供了一个方法 来使选中的高亮
        this.selectList.push(row)
        this.$emit('selectChange', this.selectList)
      }
      //如果为多选时，需要点击行来选中数据 rowSelect为true ， rowKey为列表唯一值
      if (this.multiple && this.rowSelect && this.rowKey) {
        //   先判断点击的数据是否已在选中数据中存在 不过需要一个列表的唯一值来判断  默认为id
        let index = this.selectList.findIndex((item) => {
          return item[this.rowKey] == row[this.rowKey]
        })
        if (index == -1) {
          // 如果未存在，设置已选状态
          this.$refs.tableBox.toggleRowSelection(row, true) //设置复选框为选中状态
        } else {
          // 如果已存在，设置未选状态
          this.$refs.tableBox.toggleRowSelection(row, false) //设置复选框为未选状态
        }
      }
    },
    //   选取页数
    handleCurrentChange(val) {
      this.currentPage = val
      this.$emit('pageChange', {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
    },
    // 选取每页显示的数量
    handleSizeChange(val) {
      let num = this.currentPage * val
      if (this.total < num && this.total > 0) {
        this.currentPage = Math.ceil(this.total / val)
      }
      this.pageSize = val
      this.$emit('pageChange', {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
    }
  }
}
</script>

<style scoped lang="less">
// 这个样式是根据自己项目里需要写的，可以自己更改，用的flex
.list_data {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  padding-bottom: 50px;

  .list_table {
    flex: 1;
    overflow: auto;

    .el-table {
      .el-table__body-wrapper {
        overflow: auto;

        // 表格的滚动条的样式
        &::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }

        &::-webkit-scrollbar-track {
          background: rgb(239, 239, 239);
          border-radius: 2px;
        }

        &::-webkit-scrollbar-thumb {
          background: #bfbfbf;
          border-radius: 10px;
        }
      }
    }

    &::-webkit-scrollbar {
      width: 8px;
      height: 5px;
    }

    &::-webkit-scrollbar-track {
      background: rgb(239, 239, 239);
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: #bfbfbf;
      border-radius: 10px;
    }

    // &::-webkit-scrollbar-thumb:hover {
    //     background: #2789ff;
    // }
  }

  .list_page {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background: #fff;
    text-align: right;
  }
}
.list_table /deep/.el-table tr {
  color: #424142;
  font-size: 14px;
  font-family: '黑体';
  th {
    text-align: center;
    font-weight: bold;
    color: #666;
  }
  td {
    text-align: center;
    line-height: 1.3;
  }
}
</style>
