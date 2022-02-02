<template>
  <div class="reference">
    <h2> {{ formatReferenceDate(reference.month) }}</h2>
    <div class="expense" v-show="expenses.length">
      <table>
        <thead>
          <th>Dia</th>
          <th>Título</th>
          <th>Onde</th>
          <th>Valor</th>
          <th>Método</th>
        </thead>
        <tbody>
          <tr v-for="expense in expenses" :key="expense.id" :expense="expense">
            <td>{{ formatExpenseDate(expense.date) }}</td>
            <td>{{ expense.title }}</td>
            <td>{{ expense.where }}</td>
            <td>{{ expense.amount }}</td>
            <td>{{ expense.payment }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ExpensesService from "@/service/ExpensesService";
import dayjs from 'dayjs'

export default {
  name: 'Expenses',
  props: ['reference'],
  data() {
    return {
      expenses: []
    }
  },
  methods: {
    formatExpenseDate(date) {
      return dayjs(date).format('DD')
    },
    formatReferenceDate(date) {
      return dayjs(date).format('MMM/YY')
    }
  },
  async mounted() {
    const expenses = await ExpensesService.getExpensesByReferenceId(this.reference.id)
    const sortedExpenses = expenses.expenses.sort((a, b) => new Date(a.date) - new Date(b.date))
    this.expenses = sortedExpenses
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
</style>