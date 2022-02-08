import { ConfigClass } from '../classes/ConfigClass'
import axios from 'axios'

let path = `${ConfigClass.getUrlApi()}`

export default class BudgetService {
    static async getBudgetList() {
        return axios.get(`${path}/categories`).then(response => response.data)
    }
}