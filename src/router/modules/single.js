export default [
    {
      path: '/single',
      name: 'single',
      meta: {
        index: 2
      },
      component: () => import('@/views/single/index.vue')
    }
  ]