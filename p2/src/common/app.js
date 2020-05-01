import Api from '@/common/api.js';

export const config = {
    firebase: {
        apiKey: 'AIzaSyDicFEnpNbOouuPcdpdPIERtl9PSnXwQss',
        projectId: 'e28-campaignmanager'
    }
}

export const api = new Api({
    apiKey: config.firebase.apiKey,
    projectId: config.firebase.projectId
});
