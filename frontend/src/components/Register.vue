<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="handleRegister">
              <v-text-field
                v-model="username"
                label="Username"
                name="username"
                prepend-icon="mdi-account"
                type="text"
                :rules="[v => !!v || 'Username is required']"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                label="Email"
                name="email"
                prepend-icon="mdi-email"
                type="email"
                :rules="[
                  v => !!v || 'Email is required',
                  v => /.+@.+\..+/.test(v) || 'Email must be valid'
                ]"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                :rules="[v => !!v || 'Password is required']"
                required
              ></v-text-field>

              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                prepend-icon="mdi-lock-check"
                type="password"
                :rules="[
                  v => !!v || 'Please confirm your password',
                  v => v === password || 'Passwords do not match'
                ]"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="handleRegister" :disabled="!valid">Register</v-btn>
          </v-card-actions>

          <v-alert v-if="error" type="error" class="ma-4">{{ error }}</v-alert>

          <v-card-text class="text-center">
            Already have an account? 
            <router-link to="/login" class="text-decoration-none">Login here</router-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { API_BASE_URL } from '../config';
import { toast } from '../utils/toast'

export default {
  name: 'Register',
  data() {
    return {
      valid: false,
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: ''
    }
  },
  methods: {
    async handleRegister() {
      if (!this.$refs.form.validate()) return;

      try {
        const response = await fetch(`${API_BASE_URL}/api/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password
          })
        });

        const data = await response.json();

        if (data.success) {
          toast.success("Registration successful! Please login.");
          this.$router.push('/login');
        } else {
          this.error = data.message || 'Registration failed';
        }
      } catch (error) {
        console.error('Registration error:', error);
        this.error = 'An error occurred during registration';
      }
    }
  }
}
</script>