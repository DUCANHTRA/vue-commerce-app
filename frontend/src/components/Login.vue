<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>

            <!--Username Form-->
            <v-form ref="form" v-model="valid" @submit.prevent="login">
              <v-text-field
                v-model="username"
                label="Username"
                name="username"
                prepend-icon="mdi-account"
                type="text"
                :rules="[v => !!v || 'Username is required']"
                required
              ></v-text-field>

              <!--Password Form-->
              <v-text-field
                v-model="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                :rules="[v => !!v || 'Password is required']"
                required
              ></v-text-field>

            </v-form>
          </v-card-text>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login" :disabled="!valid">Login</v-btn>
          </v-card-actions>
          <v-alert v-if="error" type="error" class="ma-4">{{ error }}</v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { API_BASE_URL } from '@/config';

export default {
  name: 'Login',
  data() {
    return {
      valid: false,
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async login() {
      if (!this.$refs.form.validate()) return;

      try {
        const response = await fetch(`${API_BASE_URL}/api/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        const data = await response.json();
        
        if (data && data.success) {
          //localStorage isAuthenticated is set to true
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('user', JSON.stringify(data));

          // Emit the authenticated event to parent
          this.$emit('authenticated', true);
          
          this.$router.push({ name: 'dashboard' });
        } else {
          this.error = data.message || 'Invalid username or password';
        }
      } catch (error) {
        this.error = 'An error occurred during login';
        console.error('Login error:', error);
      }
    }
  }
}
</script> 