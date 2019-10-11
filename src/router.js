import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
  routes: [
    
    {
      path: '/',
      name: 'show2dTopo',
      component: r => require.ensure([], () => r(require('@/components/show2dTopo.vue')))
    },
    {
      path: '/graph',
      name: 'graph',
      component: r => require.ensure([], () => r(require('@/components/graph.vue')))
    },
    {
      path: '/topo',
      name: 'topo',
      component: r => require.ensure([], () => r(require('@/components/topo.vue')))
    },
    {
      path: '/staticTopo',
      name: 'staticTopo',
      component: r => require.ensure([], () => r(require('@/components/staticTopo.vue')))
    },
    {
        path: '/3dGraph',
        name: '3dGraph',
        component: r => require.ensure([], () => r(require('@/components/3dGraph.vue')))
    },
    {
        path: '/3dGraph2',
        name: '3dGraph2',
        component: r => require.ensure([], () => r(require('@/components/3dGraph2.vue')))
    },
    {
    path: '/show3dTopo',
    name: 'show3dTopo',
    component: r => require.ensure([], () => r(require('@/components/show3dTopo.vue')))
    },
    {
    path: '/show3dTopoTest',
    name: 'show3dTopoTest',
    component: r => require.ensure([], () => r(require('@/components/show3dTopoTest.vue')))
    },
    {
    path: '/testVis',
    name: 'testVis',
    component: r => require.ensure([], () => r(require('@/components/testVis.vue')))
    },
    {
    path: '/testDracula',
    name: 'testDracula',
    component: r => require.ensure([], () => r(require('@/components/testDracula.vue')))
    }
    /* {
        path: '/',
        name: 'home',
        component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( './views/About.vue')// webpackChunkName: "about" 
    } */
  ]
})
