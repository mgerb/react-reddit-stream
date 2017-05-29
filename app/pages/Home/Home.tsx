import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import inView from 'in-view';
import redditAPI from '../../api/reddit.api';
import { PostType } from '../../model';
import RedditPost from '../../components/RedditPost/RedditPost';

import './Home.scss';

interface Props extends RouteComponentProps<any> {

}

interface State {
    posts: Array<PostType>;
    badSubReddit: boolean;
}

export default class Home extends React.Component<Props, State> {

    private postsLoaded: boolean = false;

    constructor(props: Props){
        super(props);
        this.state = {
            posts: [],
            badSubReddit: false,
        };
    }

    componentDidMount() {
        this.loadPosts(this.props.match.params.subreddit, this.props.location.search);
        console.log(this.props);


        inView('.in-view').on('enter', () => {
            if (this.postsLoaded) {
                this.loadMorePosts(this.props.match.params.subreddit, this.state.posts[this.state.posts.length-1].data.name);
            }
        });
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.match.params.subreddit !== nextProps.match.params.subreddit ||
            this.props.location.search !== nextProps.location.search) {
            this.loadPosts(nextProps.match.params.subreddit, nextProps.location.search);
        }
    }

    loadPosts(subreddit: string, search: string) {
        redditAPI.getPosts(subreddit, search).then((response) => {
            console.log(response);
            this.setState({
                posts: response,
                badSubReddit: false,
            });
            this.postsLoaded = true;
        }).catch(() => {
            this.setState({
                badSubReddit: true,
            });
        });
    }

    loadMorePosts(subreddit: string, after: string) {
        redditAPI.getPosts(subreddit, this.props.location.search, after).then((response) => {
            this.setState({
                posts: [...this.state.posts, ...response],
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
            return (<RedditPost key={index} index={index + 1} post={post}/>);
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

                <div className="in-view"></div>
            </div>
        );
    }
}

