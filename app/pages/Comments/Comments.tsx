import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import moment from 'moment';
import redditAPI from '../../api/reddit.api';
import { PostType, CommentType } from '../../model';

import './Comments.scss';

interface Props extends RouteComponentProps<any> {
    
}

interface State {
    comments: Array<CommentType>;
    post?: PostType;
}

export default class Comments extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            comments: [],
        };
    }    

    componentDidMount() {
        redditAPI.getComments(this.props.match.params.id).then((response: any) => {
            this.setState({
                comments: response[1].data.children,
                post: response[0].data.children[0],
            });

            console.log(this.state);
        });
    }

    insertComments(comments: Array<CommentType>): any {

        return comments.map((comment: CommentType, index: number) => {
            if (!comment.data.author) {
                return;
            }
            return (
                <div key={index} className="comment__container">
                    <div className="font--small">
                        <span>{comment.data.author} </span>
                        <span>{comment.data.score} {comment.data.score !== 1 ? 'points' : 'point'}</span>
                        <span> {moment.unix(comment.data.created_utc).fromNow()}</span>
                    </div>
                    <div>{comment.data.body}</div>

                    {comment.data.replies && comment.data.replies.data.children.length > 0 && this.insertComments(comment.data.replies.data.children)}
                </div>
            );
        });
    }

    render() {
        return (
            <div style={{padding:'10px'}}>
                {this.insertComments(this.state.comments)}
            </div>
        );
    }
}

