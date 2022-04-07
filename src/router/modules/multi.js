export default [
    {
      path: '/multi',
      name: 'multi',
      meta: {
        index: 2
      },
      component: () => import('@/views/multi/index.vue')
    }
  ]