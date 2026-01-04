import HttpService from "./http.service.";
export default class CrudService {

    static async get(endpoint){
        return await HttpService.get(endpoint)
    }

    static async create(endpoint, data, headers = {}){
        return await HttpService.post(endpoint, data, {
            headers
        })
    }
    
    static async patch(endpoint){
        return await HttpService.post(endpoint, {'_method':'PATCH'})
    }

    static async edit(endpoint, data, headers = {}){
        // data.append('_method', 'PUT')
        return await HttpService.put(endpoint, data, {
            headers
        })
    }

    static async delete(endpoint){ 
        return await HttpService.delete(endpoint)
    }

}