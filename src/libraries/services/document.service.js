import HttpService from "./http.service.";
export default class DocumentService {

    static async singleUpload(file){
        const upload = await this.uploads([file]);

        return upload[0]
    }
    
    static async uploads(files, headers = {}){
        const fd = new FormData
        files.forEach(file => {
            fd.append('files', file)
        })
        const endpoint = import.meta.env.VITE_DOCUMENT_UPLOAD_URL + '/uploads'
        const doUpload = await HttpService.post(endpoint, fd, {
            headers
        })

        return doUpload.data.data
    }

}