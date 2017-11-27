<template>
  <div class="index">
    <Row :gutter="8">
     
      <Col :md='{span:16}'>
      <Card>
        <p slot="title">
          本周排行
        </p>
        <a href="#" slot="extra" @click.prevent="refresh">
          <Icon type="ios-loop-strong"></Icon>
        </a>
        <Rate show-text v-model="valueText" :disabled="true">
          <span style="color: #f5a623">{{ valueCustomText }}</span>
        </Rate>
        <Progress :percent="85" status="active"></Progress>
        <Progress :percent="45" status="active"></Progress>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {
    name: 'index',
    data () {
      return {
        params: {
          page: 1,
          limit: 10
        },
        valueText: 5,
        valueCustomText: '隔壁老王',
        cardMessage: [
          {
            icon: 'ios-heart',
            name: '收藏',
            count: '344'
          },
          {
            icon: 'ios-cart',
            name: '订单量',
            count: '2111'
          },
          {
            icon: 'ios-email',
            name: '未读邮件',
            count: '23'
          },
          {
            icon: 'filing',
            name: '归档',
            count: '12'
          }
        ],
        columns1: [
          {
            key: 'name'
          },
          {
            key: 'age'
          },
          {
            key: 'address'
          }
        ],
        data1: [
          {
            name: '王小明',
            age: 18,
            address: '北京市朝阳区芍药居'
          },
          {
            name: '张小刚',
            age: 25,
            address: '北京市海淀区西二旗'
          },
          {
            name: '李小红',
            age: 30,
            address: '上海市浦东新区世纪大道'
          },
          {
            name: '周小伟',
            age: 26,
            address: '深圳市南山区深南大道'
          },
          {
            name: '赵小钱',
            age: 27,
            address: '武汉市武昌区区关山大道'
          }
        ]

      }
    },
    computed: {},
    methods: {
      /**
       * 刷新页面请求
       * */
      refresh () {

      }
    },
    created () {

    }
  }
</script>
<style lang="less" scoped>
  .cardMessage {
    .ivu-icon {
      font-size: 38px;
    }
    .subText {
      color: #9ea7b4;
    }
  }
</style>
