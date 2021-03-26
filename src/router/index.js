/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'


import HomeLayout from '@/Layouts/HomeLayout/HomeLayout.vue'




import List from '@/Views/listTask/listTask.vue'
import NewTask from '@/Views/addTask/addTask.vue'
import EditTask from '@/Views/editTask/editTask.vue'


Vue.use(Router)

export default new Router({
  routes: [
     {
        path: '*',
        redirect: {
          path: '/Index',
        }
    },

    {
        path: '/',
        redirect: {
          path: '/Index',
        }
    },
    {
      path: '/Index/',
      name: 'Index',
      component: HomeLayout,
      children: [
      {
          path: 'List',
          redirect: {
            path: 'List/All-Task',
          }
      },
      {
          path: '/',
          redirect: {
            path: 'List/All-Task',
          }
      },
       {
          path: 'List/:filter',
          name: 'List',
          component: List
      },
     	{
          path: '/EditTask/:id',
          name: 'EditTask',
          component: EditTask
      },
     	{
          path: '/NewTask',
          name: 'NewTask',
          component: NewTask
      },
       {
          path: '*',
          redirect: {
            path: '/Index',
          }
      },

      ]

    },
  ]
})
