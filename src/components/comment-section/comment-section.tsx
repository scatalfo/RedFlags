import classNames from 'classnames';
import styles from './comment-section.module.scss';
import { Comment, Header, Form, Button } from 'semantic-ui-react';

export interface CommentSectionProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */

export const CommentSection = ({ className }: CommentSectionProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <Comment.Group>
                <Header as="h3" dividing>
                    Comments
                </Header>
                <Form reply>
                    <Form.TextArea />
                    <Button content="Add Comment" labelPosition="left" icon="edit" primary />
                </Form>

                <Comment>
                    <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
                    <Comment.Content>
                        <Comment.Author as="a">Matt</Comment.Author>
                        <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>How artistic!</Comment.Text>
                    </Comment.Content>
                </Comment>

                <Comment>
                    <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
                    <Comment.Content>
                        <Comment.Author as="a">Elliot Fu</Comment.Author>
                        <Comment.Metadata>
                            <div>Yesterday at 12:30AM</div>
                        </Comment.Metadata>
                        <Comment.Text>
                            <p>This has been very useful for my research. Thanks as well!</p>
                        </Comment.Text>
                    </Comment.Content>
                </Comment>

                <Comment>
                    <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/joe.jpg" />
                    <Comment.Content>
                        <Comment.Author as="a">Joe Henderson</Comment.Author>
                        <Comment.Metadata>
                            <div>5 days ago</div>
                        </Comment.Metadata>
                        <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
                    </Comment.Content>
                </Comment>

            </Comment.Group>
        </div>
    );
};
