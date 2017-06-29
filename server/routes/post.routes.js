import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
import * as WelcomeController from '../controllers/welcome.controller';
import * as UserController from '../controllers/user.controller';

const router = new Router();

router.route('/content').get(WelcomeController.getContent);

router.route('/user').get(UserController.getUser);

router.route('/user').post(UserController.addNewUser);


/**
 * will be remove
 */
// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(PostController.deletePost);

export default router;
