<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                {{ credientials }}
                <CForm>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <CInput
                    placeholder="Username"
                    v-model="credientials.username"
                    autocomplete="username email"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <CInput
                    v-model="credientials.password"
                    placeholder="Password"
                    type="password"
                    autocomplete="curent-password"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-lock-locked"
                    /></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton color="primary" class="px-4" @click="submitLogin"
                        >Login</CButton
                      >
                    </CCol>
                    <CCol col="6" class="text-right">
                      <CButton color="link" class="px-0"
                        >Forgot password?</CButton
                      >
                      <CButton color="link" class="d-lg-none"
                        >Register now!</CButton
                      >
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Sign up</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <CButton color="light" variant="outline" size="lg">
                  Register Now!
                </CButton>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "Login",
  data() {
    return {
      credientials: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({ login: 'user/login' }), 
    submitLogin() {
      this.loading = true;
      this.login(this.credientials)
        .then(res => {
          let role_name = "performance";
          try {
            role_name = res.result.user.roles[0].name;
          } catch (exp) {
            console.log(exp);
          }
          if (res.result.deadline) {
            this.$router.push({ name: "DeadlineForm" });
          } else {
            switch (role_name) {
              case "admin":
                this.$router.push({ name: "CustomerOrganization" });
                break;
            }
          }
        })
        .catch(err => {
          this.showLoginError(err);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>