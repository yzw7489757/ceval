import Demo from './demo/index'

export default [
  {
    title: '测试',
    icon: 'folder-open',
    subPath: '/sample',
    menuItems: [
      {
        label: '普通表单',
        path: '/',
        app: Demo,
      },
    ],
  },
];
