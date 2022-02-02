import { ConfigClass } from '../classes/ConfigClass'
import axios from 'axios'

let path = `${ConfigClass.getUrlApi()}`

export default class ExpensesService {
    static async getExpensesByReferenceId(referenceId) {
        return axios.get(`${path}/expenses/${referenceId}`).then(response => response.data)
    }
}