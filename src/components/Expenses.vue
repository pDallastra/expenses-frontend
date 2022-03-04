<template>
  <div class="reference">
    <Form
      :displayForm="displayForm" 
      :reference="reference" 
      @newExpense="checkNewExpense(newExpense)"
      @displayForm="displayForm = !displayForm"
    />

    <div v-show="getExpenses.length" class="items-container">
      <div class="item-header">
        <button @click="displayForm = !displayForm">+</button>
        <h2> {{ formatDate(reference.month, 'MMM/YY') }}</h2>
        <button @click="displayExpenses = !displayExpenses">{{ displayExpenses ? 'Esconder' : 'Mostrar'}}</button>
      </div>
      <div v-show="displayExpenses">
        <div class="item-titles">
          <p class="w-10">Dia</p>
          <p class="w-30">Título</p>
          <p class="w-20">Onde</p>
          <p class="w-25">Valor</p>
          <p class="w-15">Método</p>
        </div>
        <div class="item-desc" v-for="expense in getExpenses" :key="expense.id">
          <p class="w-10">{{ formatDate(expense.date, 'DD') }}</p>
          <p class="w-30">{{ expense.title }}</p>
          <p class="w-20">{{ expense.where }}</p>
          <p class="w-25">{{ formatToCurrency(expense.amount) }}</p>
          <p class="w-15">{{ expense.payment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Form from './Form.vue'
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'Expenses',
  props: ['reference'],
  components: {
    Form
  },
  data() {
    return {
      displayForm: false,
      displayExpenses: true,
    }
  },

  computed: {
    ...mapGetters(['getExpenses'])
  },

  methods: {
    ...mapActions(['initExpenses', 'createNewExpense']),
    async checkNewExpense(newExpense) {
      await this.createNewExpense(newExpense);
    },

    formatDate(date, string) {
      return dayjs(date).format(string);
    },

    formatToCurrency(amount) {
      return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(amount)
    },
  },
  mounted() {
    !this.getExpenses.length && this.initExpenses(this.reference.id);
  }
}
</script>

<style scoped>

.w-10 {
  width: 10%;
}

.w-15 {
  width: 15%;
}

.w-20 {
  width: 20%;
}

.w-25 {
  width: 25%;
}

.w-30 {
  width: 30%;
}

.item-header {
  display: flex;
  justify-content: space-around;
  margin: 16px;
}

.items-container {
  display: flex;
  flex-flow: column;
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  width: 70%;
  margin: 0 15%;
  padding: 0.8%;
}

.item-titles, .item-desc {
  display: flex;
  flex-flow: row;
  justify-content: center;
  text-align: center;
  align-items: center;
}

.item-titles {
  font-size: 24px;
  font-weight: 900;
  margin: 8px 0;
}

.item-desc {
  background-color: #303245;
  border-radius: 6px;
  width: 98%;
  margin: 0.4% 1%;
}

.item-desc p {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  padding: 0.4%;
}

.reference {
  width: 100%;
  display: flex;
  flex-flow: column;
}

button {
  color: #eee;
  background-color: #08d;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 18px;
  height: 40px;
  outline: 0;
  text-align: center;
  width: 10%;
}

button:active {
  background-color: #06b;
}
</style>