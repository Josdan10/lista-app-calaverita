<!-- eslint-disable -->
<template lang="html">
  <v-app id="inspire">
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
            content="3"
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
       hide-overlay
    >

      <h1>Collections</h1>


    <v-list dense>
      <!--v-list-item-group
        active-class="active"
         color="primary"
      >
        <v-list-item
          key="0"
        >
          <v-list-item-icon  style="background: #03A9F4"
            @click="updateSelected(collection.name,model)"
          >
            <v-icon dense color="white">mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>All Task</v-list-item-title>
          </v-list-item-content>
        </v-list-item>      

      </v-list-item-group-->


      <v-list-item-group
        active-class="active"
         color="primary"
          v-model="selected"
      >
        <v-list-item
          v-for="(all, j) in modelAll"
          :key="all.name"
          @click="updateSelected(all.name,selected)"
          :value="j"
        >
          <v-list-item-icon  :style="'background: '+all.color+'; color:#fff'">
            <v-icon dense color="white" v-text="all.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="all.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>




      <v-list-item-group
        active-class="active"
         color="primary"
          v-model="selectedColletion"
      >
        <v-list-item
          v-for="(collection, i) in collections"
          :key="collection.name"
          @click="updateSelected(collection.name,selectedColletion)"
          :value="i"

        >
          <v-list-item-icon  :style="'background: '+collection.color+'; color:#fff'">
            <v-icon dense color="white" v-text="collection.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="collection.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

    </v-list>



    </v-navigation-drawer>

    <v-main class="">
      <v-container>
        <v-row>

           <router-view></router-view>
        </v-row>

      </v-container>
    </v-main>

  </v-app>
</template>

<script lang="js">
/* eslint-disable */
  export default  {
    name: 'home-layout',
    props: [],
    mounted () {
      this.collections = this.$store.getters.collects

    },
    created(){
      console.log("Hola Calaverita")

    },
    data () {
      return {
        drawer: null,

        collections: [
        ],
        selectedColletion: null,
        selected: null,
        modelAll: [{
          name: 'All-Task',
          icon: 'mdi-view-grid-outline',
          color: '#03A9F4'
        }],



      }
    },
    methods: {
      updateSelected: function(selected,index) {
//        console.log(selected);
        if(selected=="All-Task"){
          this.selectedColletion = null
          this.selected = 0

        }else{

          let collIndex = this.collections.findIndex(t => t.name == selected)
//          console.log(collIndex)
          this.selectedColletion = collIndex
          this.selected = null
        }

//        console.log(this.$router.currentRoute.path)
        let actual = this.$router.currentRoute.path;
        let goto   = "/Index/List/"+selected;
        if(actual!=goto){
          this.$router.push({ path: goto})
        }

      }


    },
    computed: {

    }
}


</script>

<style scoped>
  .layouts-home-layout {

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

  .v-icon{
/*     color: #151515 !important;*/

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
