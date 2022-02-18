// 按需注册全局组件
import {
  // create naive ui
  create,
  // component
  NCard,
  NMenu,
  NIcon,
  NForm,
  NList,
  NInput,
  NImage,
  NModal,
  NButton,
  NLayout,
  NTooltip,
  NDropdown,
  NFormItem,
  NListItem,
  NSkeleton,
  NScrollbar,
  NDatePicker,
  NPopconfirm,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NDialogProvider,
  NConfigProvider,
  NMessageProvider,
  NNumberAnimation
} from 'naive-ui'

const naive = create({
  components: [
    NCard,
    NMenu,
    NIcon,
    NForm,
    NList,
    NInput,
    NImage,
    NModal,
    NButton,
    NLayout,
    NTooltip,
    NDropdown,
    NFormItem,
    NListItem,
    NSkeleton,
    NScrollbar,
    NDatePicker,
    NPopconfirm,
    NLayoutSider,
    NLayoutHeader,
    NLayoutContent,
    NDialogProvider,
    NConfigProvider,
    NMessageProvider,
    NNumberAnimation
  ]
})

export { naive }
