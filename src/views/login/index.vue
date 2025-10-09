<template>
    <div class="login-container">
      <div class="login-box">
        <div class="logo">整个LOGO</div>
        
        <h1 class="title">登录到</h1>
        <h2 class="subtitle">小米市场营销管理系统数据后台</h2>
        
        <p class="help-text">没有账号吗？请联系小米对接人</p>
        
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
          <el-form-item prop="username">
            <el-input 
              v-model="loginForm.username" 
              placeholder="请输入手机/邮箱账号"
              prefix-icon="User"
            />
          </el-form-item>
          
          <el-form-item prop="password">
            <el-input 
              v-model="loginForm.password" 
              type="password" 
              placeholder="请输入密码"
              prefix-icon="Lock"
              show-password
            />
          </el-form-item>
          
          <el-form-item prop="verificationCode" class="verification-code-item">
            <el-input 
              v-model="loginForm.verificationCode" 
              placeholder="请输入验证码"
              prefix-icon="Lock"
              class="verification-input"
            />
            <el-button 
              type="primary" 
              class="verification-button"
              @click="getVerificationCode"
            >
              {{ codeButtonText }}
            </el-button>
          </el-form-item>
          
          <el-form-item>
            <el-button 
              type="primary" 
              class="login-button" 
              :loading="loading"
              @click="handleLogin"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import { User, Lock } from '@element-plus/icons-vue'
  import { ElMessage } from 'element-plus'

  // Form data
  const loginForm = reactive({
    username: '',
    password: '',
    verificationCode: ''
  })
  
  // Form validation rules
  const loginRules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, message: '密码长度至少为6个字符', trigger: 'blur' }
    ],
    verificationCode: [
      { required: true, message: '请输入验证码', trigger: 'blur' },
      { min: 4, max: 6, message: '验证码长度在4到6个字符之间', trigger: 'blur' }
    ]
  }
  
  const loginFormRef = ref(null)
  const loading = ref(false)
  const codeButtonText = ref('获取验证码')
  const countdown = ref(60)
  let timer = null
  
  // Get verification code
  const getVerificationCode = () => {
    if (loginFormRef.value) {
      loginFormRef.value.validateField('username', (valid) => {
        if (valid) {
          // Start countdown
          codeButtonText.value = `${countdown.value}秒后重试`
          timer = setInterval(() => {
            countdown.value--
            codeButtonText.value = `${countdown.value}秒后重试`
            if (countdown.value <= 0) {
              clearInterval(timer)
              codeButtonText.value = '获取验证码'
              countdown.value = 60
            }
          }, 1000)
          
          // Mock API call to get verification code
          ElMessage.success('验证码已发送，请查收')
        } else {
          ElMessage.error('请先输入有效的手机号或邮箱')
        }
      })
    }
  }
  
  // Handle login
  const handleLogin = () => {
    if (loginFormRef.value) {
      loginFormRef.value.validate((valid) => {
        if (valid) {
          loading.value = true
          // Mock API call for login
          setTimeout(() => {
            loading.value = false
            ElMessage.success('登录成功')
            // Redirect to dashboard or home page
            // router.push('/dashboard')
          }, 1500)
        } else {
          ElMessage.error('请正确填写登录信息')
          return false
        }
      })
    }
  }
  </script>
  
  <style scoped lang="less">
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f7fa;
  }
  
  .login-box {
    width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;
  }
  
  .logo {
    margin-bottom: 20px;
    font-size: 16px;
    color: #606266;
  }
  
  .title {
    font-size: 24px;
    margin-bottom: 10px;
    font-weight: 500;
  }
  
  .subtitle {
    font-size: 18px;
    margin-bottom: 20px;
    font-weight: 400;
  }
  
  .help-text {
    font-size: 14px;
    color: #909399;
    margin-bottom: 20px;
  }
  
  .login-form {
    margin-top: 20px;
  }
  
  .verification-code-item {
    display: flex;
  }
  
  .verification-input {
    flex: 1;
    margin-right: 10px;
  }
  
  .verification-button {
    width: 120px;
  }
  
  .login-button {
    width: 100%;
    margin-top: 10px;
  }
  </style>