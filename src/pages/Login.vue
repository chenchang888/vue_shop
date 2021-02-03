<template>
  <!--on表示显示，off表示关闭-->
  <div class="off">
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">互联智库</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:current}" @click="current=true">短信登录</a>
            <a href="javascript:;" :class="{on:!current}" @click="current=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form>
            <!-- 验证码登录 -->
            <!-- <div :class="current?'':'on'">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号">
                <button disabled="disabled" class="get_verification">获取验证码</button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码">
              </section>
              <section class="login_hint">
                温馨提示：未注册帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div> -->
            <!-- 密码登录 -->
            <div :class="current?'on':''">
              <section>
                <ValidationProvider rules="admin" v-slot="{ errors }">
                  <section class="login_message">
                    <input type="tel" v-model="name" maxlength="30" placeholder="手机/邮箱/用户名">
                  </section>
                  <span>{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider rules="pwd" v-slot="{ errors }">
                  <section class="login_verification">
                    <input :type="move?'text':'password'" v-model="pwd" maxlength="15" placeholder="密码">
                    <div :class="{switch_button:true, off: move, on: !move}" @click="move = !move">
                      <div :class="{switch_circle:true, switch_move: move}"></div>
                      <span :class="{switch_text:true, switch_dian: move}">...</span>
                    </div>
                  </section>
                  <span>{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider rules="verification" v-slot="{ errors }">
                  <section class="login_message">
                    <input type="text" maxlength="11" v-model="captcha" placeholder="验证码">
                    <img ref="img" class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getImg">
                  </section>
                  <span>{{ errors[0] }}</span>
                </ValidationProvider>
              </section>
            </div>
            <button class="login_submit" @click.prevent="handleLoginPwd">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
          <router-link class="about_us" :to="'/home'">首页</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
import { extend } from 'vee-validate';
import { requestLogin } from '../api/index'
extend('admin', {
  validate(value) {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1
    };
  },
  computesRequired: true,
  message: '账号不能为空',
});
extend('pwd', {
  validate(value) {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1
    };
  },
  computesRequired: true,
  message: '密码不能为空',
});
extend('verification', {
  validate(value) {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1
    };
  },
  computesRequired: true,
  message: '验证码不能为空',
});
export default {
  data() {
    return {
      current: true,
      move: false
    }
  },
  components: {
    ValidationProvider,
  },
  methods: {
    mesLogin() {
      this.current = true
    },
    passwordLogin() {
      this.current = false
    },
    // 更换验证码
    getImg() {
      console.log(this);
      this.$refs.img.src = "http://localhost:4000/captcha?" + Date.now()
    },
    // 账号密码登录
    async handleLoginPwd() {
      const res = await requestLogin(this.$store.state)
      console.log(res);
      if(res.data.code===0){
        this.$router.push('/Home')
      }
    },
  },
  computed: {
    name: {
      get() {
        return this.$store.state.name
      },
      set(value) {
        this.$store.commit('useLogin', value)
      }
    },
    pwd: {
      get() {
        return this.$store.state.pwd
      },
      set(value) {
        this.$store.commit('use_pwd', value)
      }
    },
    captcha: {
      get() {
        return this.$store.state.captcha
      },
      set(value) {
        this.$store.commit('use_verification', value)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.off {
  .loginContainer {
    .loginInner {
      .login_header {
        text-align: center;
        .login_logo {
          color: var(--themeColor);
          font-size: 80px;
          font-weight: 700;
        }
        .login_header_title {
          display: flex;
          justify-content: space-evenly;
          padding: 30px;
          font-size: 30px;
          .on {
            display: block;
            border-bottom: 5px solid var(--themeColor);
            padding-bottom: 5px;
            font-weight: 700;
            color: var(--themeColor);
          }
        }
      }
      .login_content {
        text-align: center;
        font-size: 16px;
        .on {
          display: none;
        }
        .login_message {
          display: flex;
          align-items: center;
          width: 600px;
          margin: 0 auto;
          padding: 20px 10px;
          border: 1px solid #999;
          border-radius: 10px;
          .get_verification {
            width: 80px;
            height: 60px;
          }
          input {
            width: 100%;
            height: 100%;
            font-size: 30px;
          }
          .get_verification {
            width: 100%;
            text-align: right;
            font-size: 30px;
          }
        }
        .login_verification {
          display: flex;
          width: 600px;
          margin: 30px auto;
          padding: 20px 10px;
          border: 1px solid #999;
          border-radius: 10px;
          input {
            width: 100%;
            height: 100%;
            font-size: 30px;
          }
          .switch_button {
            position: relative;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            width: 100px;
            height: 40px;
            border: 1px solid #999;
            border-radius: 30px;
            .switch_circle {
              position: absolute;
              top: -2px;
              left: -1px;
              width: 40px;
              height: 40px;
              border: 1px solid #999;
              border-radius: 50%;
              font-size: 24px;
              background: #fff;
              transition: all 0.3s;
            }
            .switch_dian {
              display: none;
            }
            .switch_move {
              left: 44px;
            }
            .switch_text {
              margin: 10px;
              font-size: 24px;
              color: #999;
            }
          }
          .off {
            background: var(--themeColor);
            border: 1px solid var(--themeColor);
            transition: all 1s;
          }
          .on {
            background: #fff;
            transition: all 1s;
          }
        }
        .login_hint {
          width: 600px;
          margin: 30px auto;
          font-size: 28px;
          color: #999;
          a {
            color: var(--themeColor);
          }
        }
        .login_submit {
          width: 600px;
          margin: 30px auto;
          padding: 25px;
          border-radius: 10px;
          background: var(--themeColor);
          color: #fff;
          font-size: 30px;
        }
        .about_us {
          font-size: 30px;
          color: #999;
        }
      }
    }
  }
}
</style>
