let loginCache;
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
    isLogin() {
        let jwt = localStorage.getItem('jwt')
        //verify jwt
        loginCache = Date.now()
        return !!jwt
    },
    isLoginCached() {
        return Date.now() - loginCache < 15 * 60 * 1000;
    }
}