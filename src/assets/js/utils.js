import api from "./api";

let loginCache = 0;
export default {
    abs2rel(dateStr) {
        let now = Date.now() / 1000
        let ts = +new Date(dateStr) / 1000
        let diff = now - ts
        let day = Math.floor(diff / 86400)
        if (day > 30) {
            return dateStr.substring(5, 10)
        }
        if (day > 0) {
            return day + '天前'
        }
        let hour = Math.floor(diff / 3600)
        if (hour > 0) {
            return hour + '小时前'
        }
        let minute = Math.floor(diff / 60)
        if (minute > 0) {
            return minute + '分钟前'
        }
        return '刚刚'
    },
    numFlow(num) {
        return num > 1000 ? '999+' : num
    },
    async isLogin() {
        let jwt = localStorage.getItem('jwt')
        if (!jwt) return false
        await api.auth(jwt).then(rsp => {
            if (rsp.data['code'] === 0) {
                loginCache = Date.now()
                return true
            }
            return false
        })
    },
    isLoginCached() {
        if (Date.now() - loginCache < 15 * 60 * 1000) {
            return true
        }
        return this.isLogin()
    }
}