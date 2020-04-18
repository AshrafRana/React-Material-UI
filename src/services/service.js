import configUrl from "services/constant";
import axios from 'axios';

export default class service {

 getList(query) {
        return axios.get(configUrl+query)            
  }

 postRecord(query,data) {
    return axios.post(configUrl+query,data)            
}

putRecord(query,data) {
    return axios.put(configUrl+query,data)            
}

deleteRecord(query,data) {
    return axios.delete(configUrl+query,data)            
}

}
// export default getList , postRecord