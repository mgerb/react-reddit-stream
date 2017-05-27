export interface PostType {
    data: {
        id: string;
        author: string;
        created: number;
        created_utc: number;
        domain: string;
        num_comments: number;
        permalink: string;
        over_18: boolean;
        score: number;
        subreddit: string;
        subreddit_id: string;
        subreddit_name_prefixed: string;
        thumbnail: string;
        title: string;
        url: string;
        upds: number;
    };
};

export interface CommentType {
    data: {
        author: string;
        body: string;
        created_utc: number;
        id: string;
        replies: {
            data: {
                children: Array<CommentType>;
            };
        };
        score: number;
        subreddit: string;
    }
}
