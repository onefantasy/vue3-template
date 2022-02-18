<template>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    :mask-closable="false"
    :show-icon="false"
    class="my-font-family"
  >
    <template #header>
      <n-icon size="25" class="mr-1" :class="iconColor">
        <SvgIcon :icon-class="form.id === 0 ? 'task-add' : 'task-view'" class="align-baseline" />
      </n-icon>
      <span> Task </span>
    </template>

    <n-form ref="task" :model="form" :rules="rules" label-placement="left" label-width="auto">
      <!-- title -->
      <n-form-item path="title" label="Task Title" :first="true">
        <n-input v-model:value="form.title" placeholder="Task Title" :disabled="!isEditable" />
      </n-form-item>

      <!-- content -->
      <n-form-item path="content" label="Task Content" :first="true">
        <n-input
          v-model:value="form.content"
          placeholder="Task Content"
          type="textarea"
          :disabled="!isEditable"
        />
      </n-form-item>

      <!-- plan start time -->
      <n-form-item path="planStartTime" label="Plan Start" :first="true">
        <n-date-picker
          v-model:value="form.planStartTime"
          type="datetime"
          class="w-full"
          :disabled="!isEditable"
        />
      </n-form-item>

      <!-- plan end time -->
      <n-form-item path="planEndTime" label="Plan End" :first="true">
        <n-date-picker
          v-model:value="form.planEndTime"
          type="datetime"
          class="w-full"
          :disabled="!isEditable"
        />
      </n-form-item>

      <!-- create time -->
      <n-form-item v-show="!isNew" path="createTime" label="Create Time">
        <n-input :value="form.createdTime" disabled />
      </n-form-item>

      <!-- actual start time -->
      <n-form-item v-show="!isNew" path="actualStartTime" label="Actual Start">
        <n-input :value="form.actualStartTime" disabled placeholder="" />
      </n-form-item>

      <!-- actual end time -->
      <n-form-item v-show="!isNew" path="actualEndTime" label="Actual End">
        <n-input :value="form.actualEndTime" disabled placeholder="" />
      </n-form-item>
    </n-form>

    <template #action>
      <n-button @click="handleCancel"> Cancel </n-button>
      <n-button type="primary" @click="handleConfirm"> Confirm </n-button>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
  import type { toDoListItemType } from '@/views/page/components/types'
  import { taskStatusEnum } from './enums'
  import { ref, reactive, computed } from 'vue'

  const emits = defineEmits(['addNewTask'])

  // form
  const formDto: toDoListItemType = {
    id: 0,
    title: '',
    content: '',
    createdTime: '',
    planStartTime: null,
    planEndTime: null,
    actualStartTime: '',
    actualEndTime: '',
    status: 0
  }
  const form = ref<toDoListItemType>({
    id: 0,
    title: '',
    content: '',
    createdTime: '',
    planStartTime: null,
    planEndTime: null,
    actualStartTime: '',
    actualEndTime: '',
    status: 0
  })
  const task = ref()
  // form data origin backup
  let targetBackup: toDoListItemType | null
  const rules = computed(() => ({
    title: [{ required: true, message: 'Title not be empty !', trigger: 'blur' }],
    content: [{ required: true, message: 'Content not be empty !', trigger: 'blur' }],
    planStartTime: [
      { type: 'number', required: true, message: 'Start time not be empty !', trigger: 'blur' }
    ],
    planEndTime: [
      { type: 'number', required: true, message: 'End time not be empty !', trigger: 'blur' }
    ]
  }))

  // icon color
  const colorArray = reactive<Array<String>>([
    'text-red-600',
    'text-yellow-500',
    'text-green-500',
    'text-indigo-500'
  ])
  const iconColor = computed((): string => {
    if (form.value.id === 0) {
      return 'text-orange-500'
    }
    return colorArray[form.value.status] as string
  })

  // if task in pending or progess, so this task can be edit
  const isEditable = computed(
    (): boolean =>
      form.value.status === taskStatusEnum.pending || form.value.status === taskStatusEnum.progress
  )
  const isNew = computed((): boolean => form.value.id === 0)

  // show modal
  const showModal = ref<boolean>(false)
  const show = (target: null | toDoListItemType): void => {
    showModal.value = true
    targetBackup = target
    form.value = JSON.parse(JSON.stringify(target || formDto))
    // new task, init time
    if (form.value.id === 0) {
      const date: number = Date.now()
      form.value.planStartTime = date
      form.value.planEndTime = date
    }
  }

  // handle cancel
  const handleCancel = (): void => {
    showModal.value = false
  }

  // handle confirm
  const handleConfirm = async (): Promise<void> => {
    let flag = false
    await task.value
      .validate()
      .then(() => (flag = true))
      .catch(() => (flag = false))
    if (!flag) {
      return
    }
    if (targetBackup) {
      // edit existing task
      for (const key in form.value) {
        targetBackup[key] = form.value[key]
      }
    } else {
      // create new task
      const date = new Date()
      form.value.createdTime = date.toLocaleString().replace(/\//g, '-')
      form.value.id = date.getTime()
      emits('addNewTask', form.value)
    }
    // close modal
    handleCancel()
  }

  // expose
  defineExpose({ show })
</script>
