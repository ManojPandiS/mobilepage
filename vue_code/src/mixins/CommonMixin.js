export const CommonMixin = {
    data() {
        return {

        }
    },

    methods: {
        getFormatedTime( date ) {
            let seconds = Math.floor((new Date().getTime() - date) / 1000);
    
            let interval = seconds / 86400;
            if (interval > 1) {
                if (interval > 365) {
                    return Math.floor(interval / 365) + " Years ago";
                }
                if (interval > 30) {
                    return Math.floor(interval / 30) + " Months ago";
                }
                return Math.floor(interval) + " days ago";
            }
            return "Just now";
        },
        
        getPhotoURL( url ) {
            return 'https://message-list.appspot.com' + url;
        }
    }
}

export default 'defaulttext';