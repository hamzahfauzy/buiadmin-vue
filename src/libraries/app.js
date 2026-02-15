import { defineStore } from "pinia";
import Auth from "./auth";
import HttpService from "./services/http.service.";

export const useAppStore = defineStore('app', {
    state: () => ({
        isAuthChecked: false,
        isAuthenticated: false,
        token: Auth.getToken(),
        isLoading: false,
        defaultPage: '/dashboard',
        ui: null
    }),

    actions: {
        async fetchUi(){
            this.isLoading = true
            try {
                const {data} = await HttpService.get('/ui/bootstrap')
                this.ui = data.data

                const pages = this.ui.pages
                const defaultPage = Object.values(pages).find(p => p.isDefault)
                this.defaultPage = defaultPage ? '/page/' + defaultPage.path : this.defaultPage
                this.isAuthenticated = true
            } catch (error) {
                this.isAuthenticated = false
            }
            this.isAuthChecked = true
            this.isLoading = false
        },
        getPages(){
            return this.ui.pages
        },
        getPageByPath(path){
            const pages = Object.values(this.getPages())
            return pages.find(page => page.path == path)
        },
        hasPermission(permission) {
            const permissions = Object.values(this.ui.user.permissions)
            if (permissions.includes("*")) return true
            return permissions.includes(permission)
        },
        updateAccount(data){
            this.ui.user = data
        },
        getPicUrl(){
            return this.ui.user.pic_url && this.ui.user.pic_url != '' ? this.ui.user.pic_url : '/src/assets/images/avatar.jpeg'
        }
    }
})