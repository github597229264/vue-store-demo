import Vue from 'vue'
import Router from 'vue-router'
import chart from '@/components/chart.vue'
import user from '@/components/user.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'chart',
      component: chart
    },
    {
      path: '/user',
      name: 'user',
      component: user
    }
  ]
})
