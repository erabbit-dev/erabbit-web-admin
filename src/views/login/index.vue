<script setup lang="ts">
import { loginService } from '@/service/user'
import { useUserStore } from '@/stores'
import LayoutFooter from '@/views/layout/components/LayoutFooter.vue'
import LayoutTranslate from '@/views/layout/components/LayoutTranslate.vue'
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const formModel = ref({
  username: 'admin',
  password: '123456'
})

const formRules = {
  username: [{ required: true, message: '用户名必填' }],
  password: [{ required: true, message: '密码必填' }]
}

const isAgree = ref(true)

const loading = ref(false)
const userStore = useUserStore()
const router = useRouter()
const onSubmit = async () => {
  try {
    const { username, password } = formModel.value
    loading.value = true
    const res = await loginService(username, password)
    userStore.setToken(res.data.token)
    message.success('登录成功')
    router.push('/')
  } catch (err) {
    loading.value = false
    message.error('登录失败')
  }
}
</script>

<template>
  <a-layout class="login-page">
    <a-layout-header>
      <LayoutTranslate></LayoutTranslate>
    </a-layout-header>
    <a-layout-content>
      <a-form :model="formModel" :rules="formRules" size="large" @finish="onSubmit" class="form">
        <img class="logo" src="@/assets/login-logo.png" alt="" />
        <a-form-item name="username">
          <a-input v-model:value="formModel.username">
            <template #prefix><UserOutlined /> </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input-password v-model:value="formModel.password" autocomplete="off">
            <template #prefix> <LockOutlined /> </template>
          </a-input-password>
        </a-form-item>
        <div class="agree">
          <a-checkbox v-model:checked="isAgree">{{ $t('login.agreement') }}</a-checkbox>
          <a href="javascript:;">{{ $t('login.forgot') }}？</a>
        </div>
        <a-form-item>
          <a-button :loading="loading" type="primary" html-type="submit" block>
            {{ $t('login.login') }}
          </a-button>
        </a-form-item>
      </a-form>
    </a-layout-content>
    <LayoutFooter></LayoutFooter>
  </a-layout>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background: #f0f2f5 url('@/assets/login-bg.svg') no-repeat center / contain;

  .ant-layout-header {
    display: flex;
    justify-content: flex-end;
    background-color: transparent;
  }

  .form {
    width: 330px;
    margin: 0 auto;

    .logo {
      display: block;
      width: 140px;
      height: 140px;
      margin: 50px auto 30px;
    }

    .agree {
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;

      > a {
        color: var(--er-primary);
      }
    }
  }
}
</style>
