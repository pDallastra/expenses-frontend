import { ConfigClass } from '../classes/ConfigClass'
import axios from 'axios'

let path = `${ConfigClass.getUrlApi()}`

export default class ReferenceService {
  static async getReferencesById(id = '61faad3f234490dde088c094') {
    return axios.get(`${path}/references/${id}`).then(response => response.data)
  }
}