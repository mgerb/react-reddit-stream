import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import moment from 'moment';
import redditAPI from '../../api/reddit.api';
import { PostType } from '../../model';

import './Home.scss';

interface Props extends RouteComponentProps<any> {

}

interface State {
    posts: Array<PostType>;
    badSubReddit: boolean;
}

export default class Home extends React.Component<Props, State> {

    constructor(props: Props){
        super(props);
        this.state = {
            posts: [],
            badSubReddit: false,
        };
    }

    componentDidMount() {
        this.loadData(this.props.match.params.subreddit);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.match.params.subreddit !== nextProps.match.params.subreddit) {
            this.loadData(nextProps.match.params.subreddit);
        }
    }

    loadData(subreddit: string) {
        redditAPI.getSubReddit(subreddit).then((response) => {
            console.log(response);
            this.setState({
                posts: response,
                badSubReddit: false,
            });
        }).catch(() => {
            this.setState({
                badSubReddit: true,
            });
        });
    }

    insertPosts() {
        return this.state.posts.map((post: PostType, index: number) => {
            const createdTime = moment.unix(post.data.created_utc).fromNow();

            return (<div className={'post__container ' + (post.data.over_18 ? 'post__container--nsfw' : '')} key={index}>
                        <div className="thumbnail__container">
                            {post.data.score}
                        </div>
                        <div className="thumbnail__container">
                            { !post.data.thumbnail.match(/^default$|^image$|^self$|^nsfw$/) &&
                                <img src={post.data.thumbnail} className="thumbnail"/>
                            }
                        </div>

                        <div className="post__content__container">
                            <a href={post.data.url}>{post.data.title}</a>
                            <div className="font--small">({post.data.domain})</div>
                            <div className="font--small">submitted {createdTime} by
                                <a href={'https://www.reddit.com/u/' + post.data.author}> {post.data.author}</a> to
                                <Link to={post.data.subreddit}> r/{post.data.subreddit}</Link>
                            </div>
                            <Link to={`/comments/${post.data.id}`}>{post.data.num_comments} comments</Link>
                        </div>
                    </div>
            );
        });
    }

    render() {
        return (
            <div className="Home">
                {this.state.badSubReddit ?
                    <div>
                        You have entered an invalid subreddit!
                    </div>
                : this.insertPosts()}
            </div>
        );
    }
}

