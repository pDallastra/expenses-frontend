import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import {ConfigClass} from "@/classes/ConfigClass.js";

Vue.use(Vuex);

let path = `${ConfigClass.getUrlApi()}`;

export default new Vuex.Store({
  state: {
    references: [],
    expenses: [],
    categories: [],
    budgetTypes: []
  },
  mutations: {
    initReferences(state, references) {
      state.references = references;
    },

    initExpenses(state, expenses) {
      state.expenses = expenses;
    },

    initCategories(state, categories) {
      state.categories = categories;
    },

    initBudgetTypes(state, budgetTypes) {
      state.budgetTypes = budgetTypes
    },

    addNewExpense(state, newExpense) {
      state.expenses.push((newExpense))
    }
  },
  actions: {
    async initReferences({ commit }, id = '61faad3f234490dde088c094') {
      await axios.get(`${path}/references/${id}`).then(response => commit('initReferences', response.data.references));
    },

    async initExpenses({ commit }, referenceId) {
      await axios.get(`${path}/expenses/${referenceId}`).then(response => commit('initExpenses', response.data.expenses));
    },

    async initCategories({ commit }) {
      await axios.get(`${path}/categories`).then(response => commit('initCategories', response.data.categories));
    },

    async initBudgetTypes({ commit }) {
      await axios.get(`${path}/budget`).then(response => commit('initBudgetTypes', response.data));
    },

    async createNewExpense({ commit }, newExpense) {
      try {
        commit('addNewExpense', newExpense);
        await axios.post(`${path}/expenses`, newExpense);
      }
      catch (e) {
        console.log(e);
      }
    }
  },
  modules: {
  },
  getters: {
    getReferences(state) {
      return state.references;
    },

    getExpenses(state) {
      return state.expenses.length ?
          state.expenses.sort((a, b) => new Date(a.date) - new Date(b.date)) :
          state.expenses;
    },

    getCategories(state) {
      return state.categories;
    }
  }
})
