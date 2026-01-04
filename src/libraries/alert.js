// stores/alert.js
import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
  state: () => ({
    alerts: [], // { id, type, title, message }
  }),
  actions: {
    addAlert({ type = "info", title = "", message = "", flash = true }) {
      const id = Date.now();
      this.alerts.push({ id, type, title, message, flash });

      if(flash)
      {
        setTimeout(() => {
            this.removeAlert(id);
        }, 5000);
      }
    },
    removeAlert(id) {
      this.alerts = this.alerts.filter((a) => a.id !== id);
    },
    clearAlerts() {
      this.alerts = [];
    },
    consumeFlash() {
      this.alerts = this.alerts.filter((a) => !a.flash);
      this.alerts = this.alerts.map(alert => {
        alert.flash = true
        return alert
      })

      setTimeout(e=> {
        this.clearAlerts()
      }, 5000)
    },
  },
});
