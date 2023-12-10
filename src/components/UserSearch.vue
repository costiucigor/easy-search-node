<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import axios from 'axios';

const email = ref('');
const number = ref('');
const searchResult = ref([]);
const inputError = ref('');
const loading = ref(false);

async function submitForm() {
  try {
    loading.value = true;
    searchResult.value = [];
    const response = await axios.post('http://localhost:3000/api/search', {
      email: email.value,
      number: number.value,
    });

    searchResult.value = response.data;

    inputError.value = '';
  } catch (error) {
    console.error('Error during search:', error);
    inputError.value = 'No results found.';
  } finally {
    loading.value = false;
  }
}

console.log(searchResult.value)
</script>

<template>
  <div class="test-task">
    <div class="form">
      <form class="form" @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="email" required type="email" id="email" />
        </div>

        <div class="form-group">
          <label for="number">Number:</label>
          <input v-model="number" placeholder="Enter number" id="number" type="number"/>
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Loading...' : 'Submit' }}
        </button>
      </form>
    </div>
    <div>
      <div v-if="searchResult && searchResult.data && searchResult.data.length">
        <h2>Search Result:</h2>
        <ul>
          <li v-for="(user, index) in searchResult.data" :key="index">
            {{ user.email }} - {{ user.number }}
          </li>
        </ul>
      </div>
      <div v-if="inputError" class="error-message">
        {{ inputError }}
      </div>
    </div>
  </div>
</template>

<style scoped>

.test-task {
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: row;
  gap: 124px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  max-width: 160px;
  color: red;
  margin-top: 10px;
}
</style>