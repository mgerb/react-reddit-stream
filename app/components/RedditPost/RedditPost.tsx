import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import moment from 'moment';
import { PostType } from '../../model';

import './RedditPost.scss';

interface Props extends RouteComponentProps<any> {
    post: PostType;
    index?: number;
}

interface State {
}

export default class Comments extends React.Component<any, State> {

    constructor(props: Props) {
        super(props);
    }    

    componentDidMount() {
    }

    render() {
        const post = this.props.post;
        const createdTime = moment.unix(post.data.created_utc).fromNow();

        return (
            <div className={'post__container ' + (post.data.over_18 ? 'post__container--nsfw' : '')}>
                {this.props.index &&
                    <div className="item__container item__container--index">
                        {this.props.index}
                    </div>
                }
                <div className="item__container item__container--thumbnail">
                    {post.data.score}
                </div>
                <div className="item__container item__container--thumbnail">
                    { !post.data.thumbnail.match(/^default$|^image$|^self$|^nsfw$|^spoiler$/) &&
                        <img src={post.data.thumbnail} className="thumbnail"/>
                    }
                </div>

                <div className="post__content__container">
                    <a href={post.data.url}>{post.data.title}</a>
                    <div className="font--small">({post.data.domain})</div>
                    <div className="font--small">submitted {createdTime} by
                        <a href={'https://www.reddit.com/u/' + post.data.author}> {post.data.author}</a> to
                        <Link to={`/r/${post.data.subreddit}`}> r/{post.data.subreddit}</Link>
                    </div>
                    <Link to={`/comments/${post.data.id}`}>{post.data.num_comments} comments</Link>
                </div>

            </div>
        );
    }
}

