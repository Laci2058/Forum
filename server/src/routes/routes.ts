import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import { PassportStatic } from 'passport';
import { Post } from '../models/post';
import { Comment } from '../models/comment'
import { Category } from '../models/category'



export const configureRoutes = (passport: PassportStatic, router: Router): Router => {

  router.post('/createComment', (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      res.status(401).send('Unauthorized');
    }

    const { post_id, creator_id, creator_nickname, text } = req.body;

    if (!post_id || !creator_id || !creator_nickname || !text) {
      res.status(400).send('Missing required fields');
    }

    const comment = new Comment({
      post_id,
      creator_id,
      creator_nickname,
      text
    });

    comment.save()
      .then(savedComment => {
        res.status(201).json(savedComment);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Failed to create comment.');
      });
  });

  router.post('/getCommentsByPostId', (req: Request, res: Response) => {

    const postId = req.body.postId;

    Comment.find({ post_id: postId })
      .then(comments => res.status(200).json(comments))
      .catch(error => {
        console.error('Error fetching comments by post ID:', error);
        res.status(500).send('Failed to fetch comments.');
      });
  });


  router.post('/getPostById', (req: Request, res: Response) => {

    const postId = req.body.postId;

    Post.findById(postId)
      .then(post => {
        if (!post) {
          res.status(404).send('Post not found');
        }
        res.status(200).json(post);
      })
      .catch(error => {
        console.error('Error fetching post by ID:', error);
        res.status(500).send('Failed to fetch post.');
      });
  });


  router.post('/getPostsByCategory', (req: Request, res: Response) => {

    const categoryId = req.body.categoryId;

    Post.find({ category_id: categoryId })
      .then(posts => res.status(200).json(posts))
      .catch(error => {
        console.error('Error fetching posts by category:', error);
        res.status(500).send('Failed to fetch posts.');
      });
  });


  router.get('/getAllCategories', (req: Request, res: Response) => {
    Category.find()
      .then(categories => {
        res.status(200).json(categories);
      })
      .catch(error => {
        console.error('Hiba a kategóriák lekérdezésekor:', error);
        res.status(500).send('Hiba történt a kategóriák lekérdezése közben.');
      });
  });

  router.post('/getUserById', (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      res.status(401).send('Unauthorized');
    }

    const userId = req.body.userId;

    User.findById(userId)
      .then(user => {
        if (!user) {
          res.status(404).send('User not found');
        }
        res.status(200).json(user);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Failed to fetch user.');
      });
  });

  router.post('/createComment', (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      res.status(401).send('Unauthorized');
    }
    const post_id = req.body.post_id;
    const creator_id = req.body.creator_id;
    const creator_nickname = req.body.creator_nickname;
    const text = req.body.text;

    const comment = new Comment({
      post_id: post_id,
      creator_id: creator_id,
      creator_nickname: creator_nickname,
      text: text
    });

    comment.save()
      .then(savedComment => {
        res.status(201).json(savedComment);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Failed to create comment.');
      });
  });

  router.post('/createPost', (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      res.status(401).send('Unauthorized');
    }
    const creator_id = req.body.creator_id;
    const creator_nickname = req.body.creator_nickname;
    const category_id = req.body.category_id;
    const title = req.body.title;
    const text = req.body.text;

    const newPost = new Post({
      creator_id: creator_id,
      creator_nickname: creator_nickname,
      category_id: category_id,
      title: title,
      text: text,
    });

    newPost.save()
      .then(savedPost => {
        res.status(201).json(savedPost);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Failed to create post.');
      });
  });

  router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (error: string | null, user: typeof User) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      } else {
        if (!user) {
          res.status(400).send('User not found.');
        } else {
          req.login(user, (err: string | null) => {
            if (err) {
              console.log(err);
              res.status(500).send('Internal server error.');
            } else {
              res.status(200).send(user);
            }
          });
        }
      }
    })(req, res, next);
  });

  router.post('/register', (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const address = req.body.address;
    const nickname = req.body.nickname;
    const user = new User({ email: email, password: password, name: name, address: address, nickname: nickname });
    user.save().then(data => {
      res.status(200).send(data);
    }).catch(error => {
      res.status(500).send(error);
    })
  });

  router.post('/logout', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      req.logout((error) => {
        if (error) {
          console.log(error);
          res.status(500).send('Internal server error.');
        }
        res.status(200).send('Successfully logged out.');
      })
    } else {
      res.status(500).send('User is not logged in.');
    }
  });

  router.get('/getAllUsers', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const query = User.find();
      query.then(data => {
        res.status(200).send(data);
      }).catch(error => {
        console.log(error);
        res.status(500).send('Internal server error.');
      })
    } else {
      res.status(500).send('User is not logged in.');
    }
  });

  router.get('/checkAuth', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      res.status(200).send(true);
    } else {
      res.status(500).send(false);
    }
  });

  router.delete('/deleteUser', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const id = req.query.id;
      const query = User.deleteOne({ _id: id });
      query.then(data => {
        res.status(200).send(data);
      }).catch(error => {
        console.log(error);
        res.status(500).send('Internal server error.');
      })
    } else {
      res.status(500).send('User is not logged in.');
    }
  });

  return router;
}