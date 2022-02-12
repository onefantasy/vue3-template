import Layout from '@/layout/index.vue'

export default {
  path: '/page',
  name: 'page',
  component: Layout,
  meta: { title: 'route.page', icon: 'page' },
  redirect: '/page/index',
  children: [
    {
      path: 'index',
      name: 'pageIndex',
      component: () => import('@/views/page/page.vue'),
      meta: { hidden: true }
    }
  ]
}
