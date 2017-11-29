<template>
  <div class="list">
    <!-- 搜索 v-show="state.searchState.show"-->
    <Row class="search-filter" :class="{'active':searchState}">
      <Col>
      <Card>
        <Form :label-width="80" inline>
          <Form-item label="输入框">
            <Input v-model="formItem.input" placeholder="请输入" style="width:187px"></Input>
          </Form-item>
          <div class="clearfix" style="border-top:1px solid #eee;margin-top:-15px;padding-top:10px">
          <span class="pull-right">
              <Button type="primary" icon="ios-search" shape="circle">查询</Button>
              <Button type="primary" icon="ios-close-empty" shape="circle">清楚条件</Button>
              <Button type="primary" icon="ios-download-outline" shape="circle" @click="exportData(1)">导出原始数据</Button>
              <Button type="primary" icon="ios-download-outline" shape="circle"
                      @click="exportData(2)">导出排序和过滤后数据</Button>
            </span>

          </div>
        </Form>
      </Card>
      </Col>
    </Row>
    <!-- 搜索 /-->
    <Row>
      <Col>
      <Card>
        <div slot="title">
          <Button type="dashed" @click.native="fixedHeader=!fixedHeader">
            <Icon type="pin"></Icon>
          </Button>
          <Button type="success" @click.native="edit(-1)">
            <Icon type="trash-a"></Icon>
            新增
          </Button>
          <Button type="primary" @click="searchShow" shape="circle" ><Icon type="funnel"></Icon> 筛选</Button>
          <Button type="error" v-if="selection.length>0" @click="deleteTip=true">
            <Icon type="trash-a"></Icon>
            批量删除
          </Button>
        </div>

        <a href="#" slot="extra" @click.prevent="refresh">
          <Icon type="ios-loop-strong"></Icon>
        </a>
        <Table :loading="loading2" :show-header="showHeader" :height="fixedHeader ? 300 : ''" :size="tableSize"
               :data="listData"
               :columns="columns1" ref="table" @on-select="onSelect" @on-selection-change="onSelectionChange"></Table>
      </Card>
      </Col>
    </Row>
    <!--删除提示  -->
    <Modal v-model="deleteTip" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>此操作讲删除{{selection.length}}条数据,并不可恢复。</p>
        <p>是否继续删除？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="deleteBatch">删除</Button>
      </div>
    </Modal>
    <!--删除提示 / -->
    <!-- 编辑 -->
    <Modal v-model="editModal" v-if='DateReady'>
      <p slot="header" style="text-align:center">
        <Icon type="information-circled"></Icon>
        <span v-if="currIndex==-1">新增</span>
        <span v-if="currIndex!=-1">编辑</span>
      </p>
      <div style="text-align:center">
        <Form :model="formItem" :label-width="80">
          <Form-item label="商品名称">
            <Input v-model="currDate.title" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="外部编码">
            <Input v-model="currDate.external_code" placeholder="请输入"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" size="large" long @click.native="saveBatch" :loading="loading" :disabled="saveDisabled">
          保存
        </Button>
      </div>
    </Modal>
    <!-- 编辑/ -->
  </div>
</template>
<script>
  import elementResizeDetectorMaker from 'element-resize-detector'
  var erd = elementResizeDetectorMaker()
  export default {
    name: 'product',
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
          page: 1,
          limit: 10,
          category: 'Android'
        },
        selection: [], // 表格选中项
        listData: [], // @:data
        columns1: [
          // { // @:columns
          //   type: 'selection', // 开启checkbox
          //   width: 60,
          //   align: 'center'
          // },
          {
            title: '创建日期',
            key: 'created_at',
            sortable: true
          },
          {
            title: '名称',
            key: 'title'
          },
          {
            title: '外部编码',
            key: 'external_code'
          }, {
            title: '操作',
            key: 'action',
            width: 170,
            fixed: 'right',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#5cadff'
                  },
                  on: {
                    click: () => {
                      this.edit(params.index)
                    }
                  }
                }, '编辑'),
                // h('Button', {
                //   props: {
                //     type: 'text',
                //     size: 'small'
                //   },
                //   style: {
                //     marginRight: '5px',
                //     color: '#5cadff'
                //   },
                //   on: {
                //     click: () => {
                //       this.show(params.index)
                //     }
                //   }
                // }, '查看'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#ff3300'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ])
            }
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
        this.$api.productList(params).then((res) => {
          console.log(res)
          if (res) {
            this.listData = res
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
        this.params.page = page
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
        console.log(this.listData[index])
        var id = this.listData[index].id
        var params = {id}
        this.$api.productDelete(params).then((res) => {
          console.log(res)
        })
        this.listData.splice(index, 1)
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
        var params = this.currDate
        console.log('params')
        console.log(params)
        if (params.id) {
          this.updateData(params)
        } else {
          this.createData(params)
        }
      },
      createData (params) {
        this.$api.productCreate(params).then((res) => {
          console.log(res)
          this.loading = false
          this.$Message.info('保存成功')
          this.editModal = false
          this.refresh()
        })
      },
      updateData (params) {
        this.$api.productUpdate(params).then((res) => {
          console.log(res)
          this.loading = false
          this.$Message.info('更新成功')
          this.editModal = false
          this.refresh()
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
</style>

