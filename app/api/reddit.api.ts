import api from './api';
import { PostType } from '../model';

class reddit {

    getSubReddit(subReddit: string): Promise<Array<PostType>> {
        return api.get(`/r/${subReddit}.json`).then((response: any) => {
            return response.data.data.children;
        });
    }

    getComments(id: string): Promise<any>{
        return api.get(`/comments/${id}.json`).then((response: any) => {
            return response.data;
        });
    }
}

export default new reddit();
