/* eslint-disable */
'use strict'
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const collects =  [
          { name: 'Personal',color: '#FFB74D',icon: 'mdi-account-outline' },
          { name: 'School',color: '#E53935',icon: 'mdi-book-open-page-variant-outline' },
          { name: 'Work',color: '#4DB6AC',icon: 'mdi-briefcase-outline' },
        ];

export const store = new Vuex.Store({
  state: {
    layout: 'home-layout',
    success: true,
    message: undefined,
    errorCode: 200,
    version: '1.0.0',
    data: new Array(),
    collects: collects

  },
  mutations: {
    SET_LAYOUT (state, payload) {
      state.layout = payload
    },

    addTask(state, task) {
       
       var idUltimo = state.data.length;
       if(idUltimo==0){
         task.id=1;
       }else if(idUltimo>1){

           let alls_short = state.data.sort(((a, b) => b.id - a.id))

          let taskUltimo = alls_short[0]
          console.log(alls_short,"SORT")

           task.id = (taskUltimo.id)+1



       }

         state.data.push(task)

         localStorage.removeItem('store');
         const parsed = JSON.stringify(state.data);
         localStorage.setItem('store', parsed);





    },

    editTask(state, task) {

        let taskIndex = state.data.findIndex(t => t.id == task.id)

        console.log(task)            
        if(taskIndex>=0){
  
           state.data[taskIndex] = task;
           localStorage.removeItem('store');
           const parsed = JSON.stringify(state.data);
           localStorage.setItem('store', parsed);
  
        }else{
          console.log("Task No Found")
        }




    },
    toCompleteTask(state, task) {
        let taskIndex = state.data.findIndex(t => t.id == task.id)
        task.status = true;    
            
        if(taskIndex>=0){
         state.data[taskIndex] = task;
         localStorage.removeItem('store');
         const parsed = JSON.stringify(state.data);
         localStorage.setItem('store', parsed);
        }else{
        console.log("Task No Found")

        }



    },removeTask(state, id) {


      let taskIndex = state.data.findIndex(t => t.id == id)
      if(taskIndex>=0){
  
         state.data.splice(taskIndex, 1);
  
         localStorage.removeItem('store');
         const parsed = JSON.stringify(state.data);
         localStorage.setItem('store', parsed);



      }else{
        console.log("Task No Found")
      }

//      taskIndex > -1 ? state.data.splice(taskIndex, 1) : new Error('Error en Parametros');



    },
    initialiseStore(state) {
       if(localStorage.getItem('store')) {
         try {
            state.data = JSON.parse(localStorage.getItem('store'));
//            console.log("Actializa",state.data)
          } catch(e) {
            console.log(e)
            localStorage.removeItem('store');
          }


     }else{
            localStorage.removeItem('store');
            localStorage.setItem('store', JSON.stringify(state.data));


     }
   },deleteAll(store){
        localStorage.removeItem('store');
        store.data = new Array()

   }




  },
    actions: {
      addTask(contex, task) {
         contex.commit('addTask', task);

      },
      editTask(contex, task) {
          contex.commit('editTask', task);
      },
      removeTask(context, id) {
          context.commit('removeTask', id)
      },
      toCompleteTask(context, task) {
          context.commit('toCompleteTask', task)
      }
  },
  getters: {
    layout (state) {
      return state.layout
    },
    tasks(state){
      console.log("--Buscar--")
      return state.data;

    },
    collects (state) {
      return state.collects
    },


  }

});
