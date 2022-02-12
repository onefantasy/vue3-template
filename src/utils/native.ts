// 按需注册全局组件
import {
  // create naive ui
  create,
  // component
  NCard,
  NMenu,
  NIcon,
  NForm,
  NInput,
  NButton,
  NLayout,
  NDropdown,
  NFormItem,
  NScrollbar,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NDialogProvider,
  NConfigProvider,
  NMessageProvider
} from 'naive-ui'

const naive = create({
  components: [
    NButton,
    NLayout,
    NLayoutContent,
    NLayoutHeader,
    NLayoutSider,
    NMenu,
    NConfigProvider,
    NIcon,
    NDropdown,
    NCard,
    NForm,
    NFormItem,
    NInput,
    NDialogProvider,
    NMessageProvider,
    NScrollbar
  ]
})

export { naive }
