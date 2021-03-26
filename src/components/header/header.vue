<template lang="html">
 <v-app>
  <v-app-bar 

  color="white"

  elevate
  scroll-target="#scrolling-techniques-1"
  app
  >
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <span class="titleApp">
            My Task List
          </span>
        </v-toolbar-title>
        
        <v-spacer></v-spacer>


        <div class="btnNavBar">
          
          <v-btn icon>
            <v-icon 
              medium
              color="black"
            >mdi-magnify</v-icon>
          </v-btn>



          <v-btn icon>
           <v-badge
            color="pink"
            content="6"
            left
            overlap >
              <v-icon 
                medium
                color="black"
              >mdi-bell-outline</v-icon>
            </v-badge>
          </v-btn>



  
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
              <v-avatar>
                <img
                  src="https://www.calaverita.tech/calaverita.png"
                  alt="Calaverita"
                >
              </v-avatar>


              </v-btn>
            </template>
            <span>Hola Calaverita</span>
          </v-tooltip>





        </div>


    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >

      <h1>Collections</h1>
      <!--v-list >
        <v-list-item-group
          v-model="modelAll"
        >
            <v-list-item
              key="all"
              @click="updateSelected('all')"
              active-class="deep-blue--text text--accent-4"

            >
              <v-list-item-content>
                <v-list-item-title>
                  All Talks
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
      </v-list >
      <v-list >
        <v-list-item-group
          v-model="model"
          multiple
        >


          <template v-for="(item, i) in items">

            <v-divider
              v-if="!item"
              :key="`divider-${i}`"
            ></v-divider>
            <v-list-item
              v-else
              :key="`item-${i}`"
              :value="item"
              active-class="deep-blue--text text--accent-4"
              @click="updateSelected(item.name,)"


            >
                <template v-slot:default="{ active }">

                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list-->

    <v-list dense>
      <v-list-item-group
        active-class="active"
         color="primary"
      >
        <v-list-item
          key="0"
        >
          <v-list-item-icon  style="background: #03A9F4">
            <v-icon dense color="white">mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>All Task</v-list-item-title>
          </v-list-item-content>
        </v-list-item>      

      </v-list-item-group>

      <v-list-item-group
        active-class="active"
         color="primary"
          v-model="model"
          multiple


      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-icon  :style="'background: '+item.color+'; color:#fff'">
            <v-icon dense color="white" v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>



    </v-navigation-drawer>

 </v-app>

</template>

<script lang="js">
/* eslint-disable */
  export default  {
    name: 'header',
    props: [],
    mounted () {

    },
    data () {
      return {

        drawer: null,
        selectedItem: 1,
        items: [
          { name: 'Personal',color: '#FFB74D',icon: 'mdi-account-outline' },
          { name: 'School',color: '#E53935',icon: 'mdi-book-open-page-variant-outline' },
          { name: 'Work',color: '#4DB6AC',icon: 'mdi-briefcase-outline' },
        ],

        model: 1,
        modelAll: [{
          name: 'all',
          icon: 'view-grid-outline'

        }],


      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped>
  .header {

  }
 .titleApp{
    font-weight: bold;
  }
 .btnNavBar{
    padding-right: 25px;
  }

  img{
    width: 40px;
    height: 40px;
  }

    .v-list-item{
    text-align: left;
  }

  .v-list-item__icon{
    background: #d4d4d4;
    padding: 15px 5px;
    border-radius: 10px;
    font-weight: bold;
    color: #fff !important;
    margin-right: 15px !important;
  }
  .active{
    background: #eaeffe;
  }

  .active > .v-list-item__content > .v-list-item__title{
    font-weight: bold;
  }

  .v-list-item__title{
    color: #000;
  }


</style>
