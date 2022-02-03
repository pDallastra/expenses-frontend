<template>
  <div class="reference">
    <h2> {{ formatReferenceDate(reference.month) }}</h2>
    <div class="expense" v-show="expenses.length">
      <form @submit.stop.prevent>
        <label for="title">Título</label>
        <input type="text" id="title" value="" v-model="newExpense.title">
        <label for="where">Onde</label>
        <input type="text" id="where" v-model="newExpense.where">
        <label for="date">Quando</label>
        <input
            type="date"
            id="date"
            v-model="newExpense.date"
            :min="getFirstDayMonth(reference.month)"
            :max="getLastDayMonth(reference.month)"
        >
        <label for="amount">Quanto</label>
        <input type="number" step="0.01" id="amount" v-model="newExpense.amount">
        <label for="payment">Como</label>
        <select id="payment" v-model="newExpense.payment">
          <option value="Bank">Bank</option>
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
        </select>
        <button @click="checkNewExpense()">Submit</button>
      </form>
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
        <button >+</button>
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
      expenses: [],
      newExpense: {
        title: String,
        where: String,
        date: Date,
        amount: Number,
        payment: String,
        category_id: String,
        user_id: String,
        reference_id: String
      }
    }
  },
  methods: {
    formatExpenseDate(date) {
      return dayjs(date).format('DD')
    },
    formatReferenceDate(date) {
      return dayjs(date).format('MMM/YY')
    },
    getLastDayMonth(date) {
      return dayjs(date).endOf("month").format('YYYY-MM-DD')
    },
    getFirstDayMonth(date) {
      return dayjs(date).format('YYYY-MM-DD')
    },
    async checkNewExpense() {
      this.newExpense.date = dayjs(this.newExpense.date).toDate()
      this.newExpense.amount = parseFloat(this.newExpense.amount)
      this.newExpense.category_id = '61faaed9f862d19f2c53299a'
      this.newExpense.user_id = '61faad3f234490dde088c094'
      this.newExpense.reference_id = '61fab91b17e9909801911938'
      const created = await ExpensesService.createExpense(this.newExpense)
      console.log(created)
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

.expense td {
  padding: 0.5%;
}

.expense th {
  padding: 1%;
  font-size: 18px;
}
</style>