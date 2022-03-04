<template>
  <form @submit.stop.prevent v-show="displayForm" class="expense-form">
    <div class="close-form" @click="$emit('displayForm')">X</div>
    <div class="title">Olá</div>
    <div class="subtitle">Adicione a Dispesa</div>
    <div class="input-container ic1">
      <input
        id="title"
        class="input"
        type="text"
        placeholder=" "
        v-model="newExpense.title"
      />
      <div class="cut"></div>
      <label for="title" class="placeholder">Título</label>
    </div>
    <div class="input-container ic2">
      <input
        id="where"
        class="input"
        type="text"
        placeholder=" "
        v-model="newExpense.where"
      />
      <div class="cut"></div>
      <label for="where" class="placeholder">Onde</label>
    </div>
    <div class="input-container ic1">
      <input
        id="amount"
        class="input"
        type="number"
        placeholder=" "
        v-model="newExpense.amount"
      />
      <div class="cut cut-short"></div>
      <label for="amount" class="placeholder">Quanto</label>
    </div>
    <div class="input-container ic2">
      <input
          id="date"
          class="input"
          type="date"
          placeholder=" "
          :min="formatDate(reference.month, 'YYYY-MM-DD')"
          :max="getLastDayMonth(reference.month)"
          v-model="newExpense.date"
      />
      <div class="cut"></div>
      <label for="date" class="placeholder">Quando</label>
    </div>
    <div class="input-container ic1">
      <select
        id="payment"
        class="input"
        type="number"
        placeholder=" "
        v-model="newExpense.payment"
      >
        <option value="Bank">Bank</option>
        <option value="Credit">Credit</option>
        <option value="Debit">Debit</option>
      </select>
      <div class="cut cut-short"></div>
      <label for="payment" class="placeholder">Como</label>
    </div>
    <div class="input-container ic2">
      <select
        id="categories"
        class="input"
        type="text"
        placeholder=" "
        v-model="newExpense.category_id"
      >
        <option
          v-for="category in getCategories"
          :key="category.id"
          value="category.id"
        >{{ category.title }}
        </option>
      </select>
      <div class="cut"></div>
      <label for="categories" class="placeholder">Categoria</label>
    </div>
    <button type="text" class="submit" @click="checkNewExpense()">Enviar</button>
  </form>
</template>

<script>
import dayjs from 'dayjs'
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'Form',
  props: ['reference', 'displayForm'],
  data: () => {
    return {
      newExpense: {},
      categories: [],
    }
  },

  computed: {
    ...mapGetters(['getCategories'])
  },
  methods: {
    ...mapActions(['initCategories', 'createNewExpense']),

    formatDate(date, string) {
      return dayjs(date).format(string);
    },


    getLastDayMonth(date) {
      return dayjs(date).endOf("month").format('YYYY-MM-DD');
    },

    async checkNewExpense() {
      this.newExpense.date = dayjs(this.newExpense.date).toDate();
      this.newExpense.amount = parseFloat(this.newExpense.amount);
      this.newExpense.reference_id = this.reference.id;
      this.newExpense.user_id = '61faad3f234490dde088c094';
      await this.createNewExpense(this.newExpense);
      this.newExpense = {};
      this.$emit('displayForm');
    },
  },

  async mounted() {
    !this.getCategories.length && await this.initCategories();
  }
}
</script>

<style>
.close-form {
  cursor: pointer;
}
.expense-form {
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: auto;
  padding: 20px;
  width: 30%;
  margin: 5% 35%;
}
.title {
  color: #eee;
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 600;
  margin-top: 30px;
}

.subtitle {
  color: #eee;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
}

.input-container {
  height: 50px;
  position: relative;
  width: 100%;
}

.ic1 {
  margin-top: 40px;
}

.ic2 {
  margin-top: 30px;
}

.input {
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  height: 100%;
  outline: 0;
  padding: 4px 20px 0;
  width: 100%;
}

.cut {
  background-color: #15172b;
  border-radius: 10px;
  height: 20px;
  left: 20px;
  position: absolute;
  top: -20px;
  transform: translateY(0);
  transition: transform 200ms;
  width: 76px;
}

.cut-short {
  width: 50px;
}

.input:focus ~ .cut,
.input:not(:placeholder-shown) ~ .cut {
  transform: translateY(8px);
}

.placeholder {
  color: #65657b;
  font-family: sans-serif;
  left: 20px;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  transition: transform 200ms, color 200ms;
  top: 20px;
}

.input:focus ~ .placeholder,
.input:not(:placeholder-shown) ~ .placeholder {
  transform: translateY(-30px) translateX(10px) scale(0.75);
}

.input:not(:placeholder-shown) ~ .placeholder {
  color: #808097;
}

.input:focus ~ .placeholder {
  color: #dc2f55;
}

.submit {
  background-color: #08d;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 38px;
  outline: 0;
  text-align: center;
  width: 100%;
}

.submit:active {
  background-color: #06b;
}
</style>