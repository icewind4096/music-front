<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>风之谷</q-toolbar-title>
        <q-space/>
        <q-avatar color="teal" text-color="white" >{{nicknameFirstWord}}</q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list padding class="text-primary">
        <q-item
            clickable
            v-ripple
            @click="link = 'inbox'"
            active-class="menu-activate"
            v-for="item in menuRoutes"
            :key="item.meta.title"
            :active="item.name === route.name"
            :to="item.path"
        >
          <q-item-section avatar>
            <q-icon :name=item.meta.icon />
          </q-item-section>

          <q-item-section>{{item.meta.title}}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import {computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { menuRoutes} from "../router";

export default {
  name: "Layout",
  setup () {
    const leftDrawerOpen = ref(false);

    const store = useStore()

    const route = useRoute();

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      route,
      menuRoutes,
      nicknameFirstWord: computed(() => {
        return store.getters['user/nicknameFirstWord'];
      })
    }
  }
}
</script>

<style scoped lang="sass">
.menu-activate
  color: white
  background-color: #F2C037
</style>
