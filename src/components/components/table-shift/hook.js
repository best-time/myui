import { reactive, ref } from 'vue'

export default function useShiftSelect(tableData) {
  const tableRef = ref(null)
  const state = reactive({
    lastSelectedIndex: null,
    selectedRows: []
  })

  const handleSelectionChange = (val) => {
    state.selectedRows = val
  }

  const handleRowClick = (row, column, event) => {
    const rowIndex = tableData.indexOf(row)

    if (event.shiftKey && state.lastSelectedIndex !== null) {
      const start = Math.min(state.lastSelectedIndex, rowIndex)
      const end = Math.max(state.lastSelectedIndex, rowIndex)

      const rowsToSelect = tableData.slice(start, end + 1)
      tableRef.value.toggleRowSelection(rowsToSelect, true)
    } else {
      tableRef.value.toggleRowSelection(row)
    }

    state.lastSelectedIndex = rowIndex
  }

  return {
    tableRef,
    state,
    handleSelectionChange,
    handleRowClick
  }
}
