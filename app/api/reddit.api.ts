import api from './api';
import { PostType } from '../model';

class reddit {

    getPosts(subReddit: string, search?: string, after?: string): Promise<Array<PostType>> {
        let url = `/r/${subReddit}`;

        url += search ? `/top/.json${search}&` : '.json?';
        url += after ? `after=${after}&count=25` : '';

        return api.get(url).then((response: any) => {
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
