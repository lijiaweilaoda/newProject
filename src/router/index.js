import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import User from "@/components/User"
import Home from '@/components/Home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path:'/User',
      name:'User',
      component:User
    },{
      path:'/Home',
      name:'Home',
      component:Home
    }
  ]
})
