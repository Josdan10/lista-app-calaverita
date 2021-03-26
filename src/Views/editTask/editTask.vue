<!-- eslint-disable -->
<template lang="html">
<v-container 
  fluid fill-height
>
    <v-row no-gutters
        justify="center">
          <p class="font-weight-black headline mb-1 title">
            Edit Task {{id}}
          </p>

    </v-row>
    <v-row no-gutters
        justify="center">
        <v-col 
          cols="12"
          md="5"
        >

        <form>


            <v-row>
                <v-col>
                <p class="font-weight-bold label">
                      Task Name.
                </p>
                <v-text-field
                  rounded

                  class="campo"
                  v-model="editTask.name"
                  :error-messages="nameErrors"
                  label="What are you goin to do?"

                  required
                  @input="$v.editTask.name.$touch()"
                  @blur="$v.editTask.name.$touch()"
                ></v-text-field>
              </v-col>

            </v-row>

            <v-row>
                <v-col>
                <p class="font-weight-bold label">
                      Description.
                </p>
                <v-text-field
                  rounded

                  class="campo"
                  v-model="editTask.description"
                  :error-messages="descriptionErrors"
                  label="Add description"

                  required
                  @input="$v.editTask.description.$touch()"
                  @blur="$v.editTask.description.$touch()"
                ></v-text-field>
              </v-col>

            </v-row>
            <v-row>
             <v-col>
                <p class="font-weight-bold label">
                      Collection.
                </p>


            <v-select
              
              rounded

              class="campo"
              v-model="editTask.collection"
              :items="collections"
              :error-messages="collectionsErrors"
              label="Select collection"
              item-text="name"
              item-label="name"
              required
              @change="$v.editTask.collection.$touch()"
              @blur="$v.editTask.collection.$touch()"
            ></v-select>
             </v-col>
            </v-row>
  
            <v-row>
              <v-col
              >

                <p class="font-weight-bold label">
                      Date.
                </p>

                <v-menu

                  v-model="menu1"
                  :close-on-content-click="false"
                  max-width="290"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="computedDateFormattedMomentjs"
                      :error-messages="dateErrors"
                      @change="$v.editTask.date.$touch()"
                      @blur="$v.editTask.date.$touch()"

                      rounded
                      clearable
                      class="campo"
                      label="Select a date for your task. "
                      v-bind="attrs"
                      v-on="on"
                      @click:clear="editTask.date = null"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="editTask.date"
                    @change="menu1 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-row>
              <v-col
              >

                <p class="font-weight-bold label">
                      Status.
                </p>


                <v-radio-group
                  v-model="status"
                  row
                >
                  <v-radio
                    label="Incompleted"
                    value="incompleted"
                  ></v-radio>
                  <v-radio
                    label="Completed"
                    value="completed"
                  ></v-radio>
                </v-radio-group>


              </v-col>
            </v-row>








            <v-row 
                align="center"
            >
             <v-col>
                  <v-btn

                    class="saveBtn"
                    rounded
                    color="warning"
                    @click="cancel()"
                  >
                    <v-icon
                        color="white"
                        >
                      mdi-backup-restore
                    </v-icon>
                      <span style="font-weight:  bold; text-transform: none;"  >  
                          Cancel
                      </span>
                  </v-btn>
                  <v-btn

                    class="saveBtn"
                    rounded
                    :loading="loading"
                    :disabled="loading"
                    color="primary"
                    @click="submit()"
                  >
                    <v-icon
                        color="white"
                        >
                      mdi-content-save-edit-outline
                    </v-icon>
                      <span style="font-weight:  bold; text-transform: none;"  >  
                          Edit Task
                      </span>
                  </v-btn>
              </v-col>

            </v-row>

          </form>


              

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
import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

 import moment from 'moment'
  import { format, parseISO } from 'date-fns'


  export default  {
    name: 'edit-task',

    props: [],
    mixins: [validationMixin],

    validations: {
      editTask:{
        name: { required },
        description: { required },
        collection: { required },
        date: { required },
      }




    },

    mounted () {
      this.collections = this.$store.getters.collects
      //console.log(this.$route.params.id)
      this.id = this.$route.params.id;
      let listTask = this.$store.getters.tasks;
      let to_edit = listTask.filter(task_f => task_f.id == this.id );
      if(to_edit.length>0){
        this.editTask = to_edit[0];
        if(this.editTask.status){
          this.status="completed"
        }
      }else{
        this.$router.push({ path: '/Index/'})
      }



    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 1000)

        this.loader = null
      },
    },    
    data () {
      return {
         snackbar: false,
         text: '',
         timeout: 3000,


        loader: null,
        loading: false,
        menu1: false,

        id: 0,
        status: "incompleted",

        editTask: {
          id:   null,
          name: '',
          description: '',
          collection: '',
          date: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
          status: false,
        },


        collections: [

        ],


      }
    },
    methods: {
      cancel(){
            this.$router.push({ path: '/Index' })

      },
      submit () {

        this.$v.$touch()
        if (this.$v.$invalid) {

        } else {

          let cnt = this.$store.getters.tasks.length;

          this.editTask.status = false;
          if(this.status=="completed"){
            this.editTask.status = true;
          }


          this.$store.dispatch('editTask', this.editTask)
  
           this.snackbar= false
           this.text= 'Task Edit'
           this.snackbar= true
            this.$router.push({ path: '/Index' })

          }



       },//SUBMIT
        clear () {
          this.$v.$reset()
        },

      },
     computed: {
      computedDateFormattedMomentjs () {
        return this.editTask.date ? moment(this.editTask.date).format('dddd, MMMM Do YYYY') : ''
      },

      collectionsErrors () {
        const errors = []
        if (!this.$v.editTask.collection.$dirty) return errors
        !this.$v.editTask.collection.required && errors.push('')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.editTask.name.$dirty) return errors
        !this.$v.editTask.name.required && errors.push('')
        return errors
      },
      descriptionErrors () {
        const errors = []
        if (!this.$v.editTask.description.$dirty) return errors
        !this.$v.editTask.description.required && errors.push('')
        return errors
      },
      dateErrors () {
        const errors = []
        if (!this.$v.editTask.date.$dirty) return errors
        !this.$v.editTask.date.required && errors.push('')
        return errors
      },

    }
}



</script>

<style scoped>
  .edit-task {

  }


  .campo{
    -webkit-box-shadow: 0px 9px 5px 0px rgba(0,0,0,0.20);
    -moz-box-shadow: 0px 9px 5px 0px rgba(0,0,0,0.20);
    box-shadow: 0px 9px 5px 0px rgba(0,0,0,0.20);
    border: 1px solid rgba(0,0,0,0.10);
    margin-bottom: 10px;

  }

  .label{
    padding-left: 20px;
    padding-bottom: 0px;
    margin-bottom: 0px;
  }


.title{
  color: #50;
  font-size: 20px !important;
  margin: 10px;
  text-align: center;

}


  /**GUARDAR*/

  .saveBtn{
    padding: 25px !important;
  }

  .custom-loader {
      animation: loader 1s infinite;
      display: flex;
    }
    @-moz-keyframes loader {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }
    @-webkit-keyframes loader {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }
    @-o-keyframes loader {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }
    @keyframes loader {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }
    /* FIN DE GUARDAR*/

</style>
