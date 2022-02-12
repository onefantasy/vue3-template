<template>
  <n-config-provider :theme-overrides="theme" :locale="locale" :date-locale="date">
    <n-dialog-Provider>
      <n-message-provider>
        <RouterView v-slot="{ Component }">
          <transition name="app">
            <component :is="Component" />
          </transition>
        </RouterView>
      </n-message-provider>
    </n-dialog-Provider>
  </n-config-provider>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useAppStore } from '@/store/modules/app'
  // 引入自定义主题
  import theme from '@/style/naive-ui-theme-overrides.json'
  // 引入多语言
  import { zhCN, dateZhCN, enUS, dateEnUS } from 'naive-ui'

  const appStore = useAppStore()
  // 初始化语言
  appStore.initI18n()
  // 语言列表
  const language = {
    zh: { locale: zhCN, date: dateZhCN },
    en: { locale: enUS, date: dateEnUS }
  }
  const locale = computed(() => language[appStore.i18n].locale)
  const date = computed(() => language[appStore.i18n].date)
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    overflow: hidden;
  }
</style>
