<template>
  <a-modal :title="title" :width="width" :visible="visible" @ok="handleOk" :okButtonProps="{ class: { 'jee-hidden': disableSubmit } }" @cancel="handleCancel" cancelText="取消">
    <BkCollaboratorEmployeeForm ref="registerForm" @ok="submitCallback" :formDisabled="disableSubmit" :formBpm="false"></BkCollaboratorEmployeeForm>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, nextTick, defineExpose } from 'vue';
import BkCollaboratorEmployeeForm from './BkCollaboratorEmployeeForm.vue'

const title = ref<string>('');
const width = ref<number>(800);
const visible = ref<boolean>(false);
const disableSubmit = ref<boolean>(false);
const registerForm = ref();
const emit = defineEmits(['register', 'success']);

/**
 * 新增
 */
function add(record) {
  title.value = '新增';
  visible.value = true;
  nextTick(() => {
    registerForm.value.add(record);
  });
}

/**
 * 修改
 * @param record
 */
function edit(record) {
  title.value = disableSubmit.value ? '修改' : '详情';
  visible.value = true;
  nextTick(() => {
    registerForm.value.edit(record);
  });
}

/**
 * 确定
 */
function handleOk() {
  registerForm.value.submitForm();
}

/**
 * 提交后方法
 */
function submitCallback() {
  handleCancel();
  emit('success');
}

/**
 * 取消
 */
function handleCancel() {
  visible.value = false;
}

defineExpose({
  add,
  edit,
  disableSubmit,
});
</script>

<style>
.jee-hidden {
  display: none !important;
}
</style>
