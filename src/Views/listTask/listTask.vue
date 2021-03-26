<!-- eslint-disable -->
<template lang="html" 
  id="list-task" 
>
  <v-container fluid fill-height>
    <v-row no-gutters
        justify="center">

          <p class="font-weight-black headline mb-1 title">
              {{ getParams }} for today - {{date}}
            </p>

                <v-menu

                  v-model="menu1"
                  :close-on-content-click="false"
                  max-width="290"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                      :value="computedDateFormattedMomentjs"
                      v-bind="attrs"
                      v-on="on"
                      @click:clear="editTask.date = null"
                      outlined
                      fab
                      class="ma-2"
                      color="teal"
                      x-small

                    >  <v-icon>mdi-calendar</v-icon></v-btn>
                  </template>
                  <v-date-picker
                    v-model="date"
                    @change="menu1 = false"
                  ></v-date-picker>
                </v-menu>
    </v-row >
    <v-row no-gutters

    >
      <v-col
        md="8"
        offset-md="2"
      >
        <v-list
          rounded
          >
            <v-subheader color="red">
              <p v-if="taskSelected.length>0" 
                 class=" link"
                 @click="deleteAll()"
                 >
              delete all selected
            </p>
          </v-subheader>
            <v-subheader color="red" v-if="listTask.length==0"><p class="font-weight-medium headline mb-3">
               No Task 
            </p></v-subheader>
            <v-list-item-group
                
                v-model="taskSelected"
                multiple

                class="rounded-xl"

          >
              <v-list-item
                     v-for="task in listTask"
                    :key="task.id"
                    :value="task.id"
                    color="primary"                
                    class="rounded-xl task"
                    active-class="rounded-xl active"

              >


                      <template v-slot:default="{ active }">

                        <v-list-item-action>
                          <v-checkbox :input-value="active"

                            :key="task.id"
                            color="primary"
                          ></v-checkbox>
                        </v-list-item-action>

                        <v-list-item-content
                        >
                          <v-list-item-title>({{task.id}}) {{task.name}} - <strong :class= "task.status ? 'complete' : 'incomplete'">{{task.status ? 'Completed' : 'Incompleted'}}</strong></v-list-item-title>
                          <v-list-item-subtitle>{{ task.date}} - {{task.description}}</v-list-item-subtitle>
                        </v-list-item-content>
                          <v-list-item-action>
                            <v-btn icon @click="taskToComplete(task)">
                              <v-icon :color="task.status ? 'blue lighten-2' : 'red lighten-2'">{{task.status ? 'mdi-check-all' : 'mdi-check'}}</v-icon>
                            </v-btn>


                          </v-list-item-action>

                          <v-list-item-action>
                            <v-btn icon @click="taskEdit(task.id)">
                              <v-icon color="green lighten-2">mdi-pencil-outline</v-icon>
                            </v-btn>
                          </v-list-item-action>
                          <v-list-item-action>
                            <v-btn icon @click="taskDelete(task.id)">
                              <v-icon  color="red lighten-2">mdi-delete-outline</v-icon>
                            </v-btn>
                          </v-list-item-action>
                          <v-list-item-action>
                              <v-icon color="black lighten-2">{{getIcon(task.collection)}}</v-icon>
                          </v-list-item-action>
                      </template>

              </v-list-item>
            </v-list-item-group>
          </v-list>
          

      </v-col>


    </v-row>
    <v-row 
        justify="center"
        no-gutters>
      <v-col
        md="4"
        offset-md="4"
      >                         
        <v-btn
          color="pink"
          fab
          dark
          large
  
          @click="newTask()"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>



<v-snackbar
    v-model="snackbar"
    :timeout="timeout"
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="blue"
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>



  </v-container>




</template>
<script lang="js">
/* eslint-disable */

 import moment from 'moment'
 import { format, parseISO } from 'date-fns'

  export default  {
    name: 'list-task',
    props: [],
    mounted () {
    },
    created(){
      this.listTask = this.$store.getters.tasks;
      console.log(this.$store.getters.tasks,"TAKS CREATED")

    },
    data () {
      return {
         snackbar: false,
         text: '',
          timeout: 3000,



          date: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),

//        date: new Date().toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu1: false,

        tipo: 'All-Task',

        listTask:[
        ],

        taskSelected: [],
      }
    },
    methods: {
      taskToComplete:function (tsk) {
        if(!tsk.status){
          this.$store.dispatch('toCompleteTask', tsk)
           this.snackbar= false
           this.text= 'Task Completed'
           this.snackbar= true

        }
      },
      taskDelete:function (id) {
        this.$store.dispatch('removeTask', id)
         this.snackbar= false
         this.text= 'Task Deleted'
         this.snackbar= true

      },
      taskEdit:function(idEdit) {
        this.$router.push({ path: '/EditTask/'+idEdit })

      },
      newTask:function() {
        this.$router.push({ path: '/NewTask' })

      },
      deleteAll:function() {
//        this.$store.commit('deleteAll');
          let to_delte = this.taskSelected
          for (var i = 0; i < to_delte.length; i++) {
            let _task_delete = to_delte[i]
            this.taskDelete(_task_delete)
         }


      }



    },
    computed: {
      computedDateFormattedMomentjs () {
        let x = this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
        let y = this.date ? moment(this.date).format('yyyy-MM-DD') : ''

//        console.log(y)
        let filter = this.listTask.filter(task_f => task_f.date == y )
//        console.log(filter)

//        this.listTask = filter

        return x;
      },
      getIcon: (app)=> (salut)=> {
        let colls = app.$store.getters.collects;
        console.log(colls[0].name)
        let coll = colls.find(t => t.name.toLowerCase() == salut.toLowerCase())
              
        return coll.icon;
      },
      getParams: function(){
        this.active=null
        let filter = this.$route.params.filter
        if(filter!="All-Task"){
          let all_tasks = this.$store.getters.tasks;
          let filters_taks = all_tasks.filter(task_f => task_f.collection == filter );
          this.listTask = filters_taks
        }else{
          this.listTask = this.$store.getters.tasks;
        }
        this.tipo = filter
        return filter
      }


    }
}


</script>

<style scoped>
  .list-task {

  }

  .v-list-item{
    text-align: left;
    background: #fff;

    margin: 15px;
  }

  .task{
    -webkit-box-shadow: 0px 9px 5px 0px rgba(0,0,0,0.15);
    -moz-box-shadow: 0px 9px 5px 0px rgba(0,0,0,0.15);
    box-shadow: 0px 9px 5px 0px rgba(0,0,0,0.15);
  }


.title{
  color: #50;
  font-size: 20px !important;
  margin: 10px;
  text-align: center;

}

.link{
  cursor: pointer;
  color: #E53935;
}

.link:hove,.link:focus, .link:active {
  color: #B71C1C !important;
  text-decoration: underline !important;
}


.incomplete{
  color: red;
}
.complete{
  color: green;

}

</style>
