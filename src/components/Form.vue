<template>
      <form @submit.stop.prevent v-show="displayForm" class="expense-form">
      <div class="expense-title">
        <div>
          <label for="title">Título</label>
          <input type="text" id="title" v-model="newExpense.title">
        </div>
        <div>
          <label for="where">Onde</label>
          <input type="text" id="where" v-model="newExpense.where">
        </div>
      </div>
      <div class="expense-values">
        <label for="date">Quando</label>
        <input
            type="date"
            id="date"
            v-model="newExpense.date"
            :min="formatDate(reference.month, 'YYYY-MM-DD')"
            :max="getLastDayMonth(reference.month)"
        >
        <label for="amount">Valor</label>
        <input type="number" step="0.01" id="amount" v-model="newExpense.amount">
      </div>
      <div class="expense-selects">
        <label for="payment">Como</label>
        <select id="payment" v-model="newExpense.payment">
          <option value="Bank">Bank</option>
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
        </select>
        <label for="categories">Categoria</label>
        <select id="categories" v-model="newExpense.category_id">
          <option v-for="category in getCategories" :key="category.id" value="category.id">{{ category.title }}</option>
        </select>
      </div>
      <button @click="checkNewExpense()">Submit</button>
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
      return dayjs(date).format(string)
    },


    getLastDayMonth(date) {
      return dayjs(date).endOf("month").format('YYYY-MM-DD')
    },

    async checkNewExpense() {
      this.newExpense.date = dayjs(this.newExpense.date).toDate()
      this.newExpense.amount = parseFloat(this.newExpense.amount)
      this.newExpense.reference_id = this.reference.id
      this.newExpense.user_id = '61faad3f234490dde088c094'
      await this.createNewExpense(this.newExpense)
      this.newExpense = {}
    },
  },

  async mounted() {
    !this.getCategories.length && this.initCategories();
  }
}
</script>

<style>

</style>