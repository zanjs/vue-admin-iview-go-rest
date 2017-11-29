<template>
  <div class="list">
    <Row>
      <Col>
      <Card>
        <div slot="title">
          <Button type="primary" @click="refresh" shape="circle" ><Icon type="ios-loop-strong"></Icon> 刷新</Button>
        </div>

        <a href="#" slot="extra" @click.prevent="refresh">
          <Icon type="ios-loop-strong"></Icon>
        </a>
        <div class="table-box">
          <table class="excel-table exportCsv">
            <tr>
              <th>
                产品/分仓
              </th>
              <th v-for="wareroom in warerooms" :key="wareroom.id">
                {{ wareroom.title }}
              </th>
            </tr>
            <tr v-for="product in products" :key="product.id">
              <td>
                {{ product.product_title }}
              </td>
              <td v-for="excel in product.product_excel_quantity" :key="excel.quantity">
                  （{{ excel.quantity }} / {{ excel.sales}} ）
                  
              </td>
            </tr>
          </table>
        </div>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
  import elementResizeDetectorMaker from 'element-resize-detector'
  var erd = elementResizeDetectorMaker()
  export default {
    name: 'record_excel',
    components: {},
    data () {
      return {
        formItem: {
          input: '',
          select: '',
          date: '',
          time: '',
          radio: '',
          checkbox: []
        },
        searchState: false,
        editModal: false,
        detailModal: false,
        deleteTip: false,
        showHeader: true, // 是否显示表头 @:show-header
        loading2: false, // 分页loading
        fixedHeader: false, // 是否固定表头 @:height
        tableSize: 'small', // @:size
        DateReady: false, // 判断异步数据加载完成，避免报错
        loading: false, // save
        currDate: {}, // 当前编辑和新增的行数据
        currIndex: 0, // 当前编辑和新增的行号
        saveDisabled: false,
        params: {
          offset: 0,
          limit: 10
        },
        count: 0,
        warerooms: [],
        products: [],
        selection: [], // 表格选中项
        listData: [], // @:data
        columns1: [
          { // @:columns
            type: 'selection', // 开启checkbox
            width: 60,
            align: 'center'
          },
          {
            title: '创建日期',
            key: 'created_at',
            sortable: true
          },
          {
            title: '产品信息',
            // key: 'product.title',
            render: function (h, params) {
              return h('div', params.row.product.title)
            },
            className: 'min-width',
            sortable: true
          },
          {
            title: '仓库Id',
            key: 'wareroom_id',
            sortable: true
          },
          {
            title: '仓库信息',
            // key: 'wareroom',
            render: function (h, params) {
              return h('div', params.row.wareroom.title)
            },
            sortable: true
          },
          {
            title: '库存',
            key: 'quantity',
            sortable: true
          },
          {
            title: '销量',
            key: 'sales',
            sortable: true
          }
        ]
      }
    },
    watch: {
      /**
       * @params 监听参数变化重新获取数据
       * */
      params: {
        handler (val) {
          this.getData(val)
        },
        deep: true
      },
      fixedHeader: {
        handler (val) {
          if (val) {
            this.$Message.info('表头已固定')
          }
        }
      },
      currDate: {
        handler (val) {
          console.log(val)
          for (let i = 0; i < Object.values(val).length; i++) {
            if (Object.values(val)[i] === '') {
              this.saveDisabled = true
              return
            } else {
              this.saveDisabled = false
            }
          }
        },
        deep: true
      }
    },
    computed: {
      state () {
        return this.$store.state.app
      }
    },
    methods: {
      searchShow () {
        this.searchState = !this.searchState
      },
      /**
       * 刷新页面请求
       * */
      refresh () {
        this.getData(this.params)
      },
      /**
       * @params:category 分类 page：页码 limit:条数
       * */
      getData (params) {
        this.loading2 = true
        this.$api.recordExcelList(params).then((res) => {
          console.log(res)
          if (res.warerooms) {
            this.warerooms = res.warerooms
            this.products = res.products
            this.DateReady = true
            this.loading2 = false
          } else {
            this.$Message.error(res.msg)
            this.loading2 = false
          }
        })
      },
      /**
       * @on-change 页码改变的回调，返回改变后的页码
       * */
      pageChange (page) {
        this.params.offset = page - 1
      },
      /**
       * @on-page-size-change 切换每页条数时的回调，返回切换后的每页条数
       * */
      PageSizeChange (limit) {
        this.params.limit = limit
      },
      /**
       * 删除
       */
      remove (index) {
        this.$Message.error('开发中')
        // console.log(this.listData[index])
        // var id = this.listData[index].id
        // var params = {id}
        // this.$api.productDelete(params).then((res) => {
        //   console.log(res)
        // })
        // this.listData.splice(index, 1)
      },
      edit (index) {
        this.editModal = true
        this.currIndex = index
        if (index === -1) { // 新增
          this.currDate = {
            title: '',
            external_code: ''
          }
        } else { // 编辑
          this.currDate = this.listData[index]
        }
      },
      /**
       * 批量删除
       */
      deleteBatch () {
        this.deleteTip = false
        // ...
      },
      saveBatch () {
        this.loading = true
        var vm = this
        var params = this.currDate
        this.$api.productCreate(params).then((res) => {
          console.log(res)
          this.loading = false
          this.$Message.info('保存成功')
          this.editModal = false
          vm.refresh()
        })
      },
      /**
       * 数据导出
       * @ type 1 原始数据 2过滤数据
       */
      exportData (type) {
        if (type === 1) {
          this.$refs.table.exportCsv({
            filename: '原始数据'
          })
        } else if (type === 2) {
          this.$refs.table.exportCsv({
            filename: '排序和过滤后的数据',
            original: false
          })
        }
      },
      /**
       * 多选
       * selection：已选项数据 row：刚选择的项数据
       */
      onSelect (selection, row) {
        // console.log(selection,row)
      },
      onSelectionChange (selection) {
        this.selection = selection
      }
    },
    created () {
      this.getData(this.params)
    },
    mounted () {
      erd.listenTo(window, 'resize', this.handleResize)
    }
  }
</script>
<style lang="less" scoped>
  .search-filter {
    opacity: 0;
    display: none;
    overflow: hidden;
    transition: all 0.28s ease-out;
    &.active {
      opacity: 1;
      display: block;
    }
  }
  .excel-table{
    width: 100%;
    border-collapse:collapse;
    border-spacing:0;
    th{
      background-color: #f5f7f9;
      padding:10px 16px;
      border: 1px solid #ccc;
      border-left: none;
      border-right: none;
      border-top: none;
      white-space: nowrap;
      // text-align: center;
    }
    td{
      padding: 10px;
      border: 1px solid #ccc;
      border-left: none;
      border-right: none;
       white-space: nowrap;  
    }
    tr:nth-child(odd){
      // background: #ccc;
    }
    tr{
      &:hover{
        background-color: #dddddd;
      }
    }
    tr:nth-child(even){
      // background: rebeccapurple;
    }
  }
  .table-box{
    overflow-y: auto;
  }
</style>

