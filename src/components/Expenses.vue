<template>
  <div class="reference">
    <h2> {{ formatDate(reference.month, 'MMM/YY') }}</h2>
    <Form 
      :displayForm="displayForm" 
      :reference="reference" 
      @newExpense="checkNewExpense(newExpense)"
    />
    
    <Table 
      class="expense" 
      v-show="expenses.length" 
      :expenses="expenses" 
      @setDisplayForm="setDisplayForm"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'

import ExpensesService from "@/service/ExpensesService";

import Table from './Table.vue'
import Form from './Form.vue'

export default {
  name: 'Expenses',
  props: ['reference'],
  components: {
    Table,
    Form
  },
  data() {
    return {
      expenses: [],
      displayForm: true
    }
  },

  methods: {
    async checkNewExpense(newExpense) {
      this.expenses.push(newExpense)
      this.sortExpenses()
      this.setDisplayForm()
    },

    formatDate(date, string) {
      return dayjs(date).format(string)
    },

    sortExpenses() {
      this.expenses = this.expenses.sort((a, b) => new Date(a.date) - new Date(b.date))
    },

    setDisplayForm() {
      this.displayForm = !this.displayForm
    },
  },
  async mounted() {
    await ExpensesService.getExpensesByReferenceId(this.reference.id).then((response) => {
      this.expenses = response
      this.sortExpenses()
    })
  }
}
</script>

<style scoped>

.reference {
  width: 100%;
  display: flex;
  flex-flow: column;
}

h2 {
  margin-bottom: 0;
}

.expense {
  display: flex;
  width: 90%;
  height: auto;
  margin: 2% 4%;
  background-color: #2D4263;
  color: #fff;
  border-radius: 5px;
  padding: 1%;
}

.expense table {
  width: 100%;
}

.expense td {
  padding: 0.5%;
}

.expense th {
  padding: 1%;
  font-size: 18px;
}

.expense-form {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  padding: 1% 0;
  margin: 2% 35%;
  background-color: #11468F;
  color: #fff;
}

.expense-title {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.expense-title div {
  width: 46%;
  margin: 0 1%;
}

.expense-title div label {
  margin: 0 2%;
}

.expense-values {
  display: flex;
  width: 90%;
  justify-content: space-between;
}
</style>