import { ConfigClass } from '../classes/ConfigClass'
import axios from 'axios'

let path = `${ConfigClass.getUrlApi()}`

export default class CategoriesService {
    static async getCategoriesList() {
        return axios.get(`${path}/categories`).then(response => {
            return response.data.categories
        })
    }
}