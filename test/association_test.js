const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/Comment');
const BlogPost = require('../src/BlogPost');

describe('Associations', () => {
	let joe, blogPost, comment;
	beforeEach((done) => {
		joe = new User({ name: 'Joe' });
		blogPost = new BlogPost({ title: 'JS is Great', content: 'Yes it really is.' });
		comment = new Comment({ content: 'Congrats on a great post.' });

		joe.blogPosts.push(blogPost);
		blogPost.comments.push(comment);
		comment.user = joe;

		Promise.all([joe.save(), blogPost.save(), comment.save()])
			.then(() => done());
	});

	it.only('saves a relation between a user and a blogpost', (done) => {
		User.findOne({ name: 'Joe' })
			.then((user) => {
				console.log(user);
				done();
			});
	});
});
