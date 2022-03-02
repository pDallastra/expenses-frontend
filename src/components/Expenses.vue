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
      :expenses="getExpenses"
      @setDisplayForm="setDisplayForm"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Table from './Table.vue'
import Form from './Form.vue'
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'Expenses',
  props: ['reference'],
  components: {
    Table,
    Form
  },
  data() {
    return {
      displayForm: false
    }
  },

  computed: {
    ...mapGetters(['getExpenses'])
  },

  methods: {
    ...mapActions(['initExpenses', 'createNewExpense']),
    async checkNewExpense(newExpense) {
      await this.createNewExpense(newExpense)
    },

    formatDate(date, string) {
      return dayjs(date).format(string)
    },

    setDisplayForm() {
      this.displayForm = !this.displayForm
    },
  },
  mounted() {
    !this.getExpenses.length && this.initExpenses(this.reference.id);
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
  margin-bottom: 12px;
}

.expense {
  color: #fff;
  padding: 12px;
  border-radius: 8px;
  width: 80%;
  margin: 0 10%;
}
</style>