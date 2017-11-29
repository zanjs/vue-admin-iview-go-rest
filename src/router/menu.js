const menu = [
  {
    path: '/index',
    name: '控制台',
    icon: 'icon-dynamic_fill',
    level: 1,
    sort: 1,
    children: [],
    fixed: false
  },
  {
    path: '/product',
    name: '产品',
    level: 1,
    children: [],
    fixed: false
  },
  {
    path: '/wareroom',
    name: '仓库',
    icon: 'icon-shop_fill',
    level: 1,
    children: [],
    fixed: false
  },
  {
    path: '/record_excel',
    name: '最新库存',
    icon: 'icon-shop_fill',
    level: 1,
    children: [],
    fixed: false
  },
  {
    path: '/record',
    name: '库存记载',
    icon: 'icon-shop_fill',
    level: 1,
    children: [],
    fixed: false
  },
  {
    path: '/',
    name: '布局',
    icon: 'icon-createtask_fill',
    level: 0,
    fixed: false,
    children: [
      {
        path: '/chart',
        name: 'chart',
        icon: 'icon-dynamic_fill',
        level: 1,
        children: [],
        fixed: false
      },
      {
        path: '/userInfo',
        name: '用户信息',
        icon: 'icon-addpeople_fill',
        children: [],
        fixed: false,
        level: 1
      },
      {
        level: 1,
        path: '/table',
        name: 'table',
        children: [],
        fixed: false,
        hidden: true
      },
      {
        level: 1,
        path: '/icon',
        name: 'icon',
        children: [],
        fixed: false,
        icon: 'icon-emoji_fill'
      },
      {
        level: 1,
        path: '/filter',
        name: 'filter',
        children: [],
        fixed: false,
        icon: 'icon-emoji_fill'
      }
    ]
  },
  {
    path: '/index',
    name: '123',
    icon: 'icon-wujiaoxing',
    // hidden: true,
    level: 0,
    sort: 1,
    children: [],
    fixed: false
  },
  {
    path: '/index',
    name: '123',
    icon: 'icon-wujiaoxing',
    // hidden: true,
    level: 0,
    sort: 1,
    children: [],
    fixed: false
  }
]

export default menu
