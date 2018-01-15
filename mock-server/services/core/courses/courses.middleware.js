const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

	router.get('/courses', (req, res, next) => {
		let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
			from = query.start,
			to = +query.start + +query.count,
			sort = query.sort,
			queryStr = query.query,
			courses = server.db.get('courses').sortBy('date').value();

		if (courses.length < to) {
			to = courses.length;
		}
		courses = courses.slice(from, to);
		
		res.json(courses);
	});

	router.get('/courses/find', (req, res, next) => {
		const url_parts = url.parse(req.originalUrl, true);
		const query = url_parts.query;
		const	courseName = query.course;
		let	courses = server.db.getState().courses;
		let foundCourses = courses.filter((course) => 
			course.name.toLowerCase().indexOf(courseName.toLowerCase()) > -1
		);
		if(!foundCourses.length) {
			foundCourses = server.db.getState().courses.slice(0, 10);
		}
		res.json(foundCourses);
	});

	router.get('/courses/delete', (req, res, next) => {
		const url_parts = url.parse(req.originalUrl, true);
		const query = url_parts.query;
		const	id = query.id;
		server.db.get('courses').remove({id: +id}).write();
		res.json({
			deleted: id
		});
	});

	router.post('/courses/new', (req, res, next) => {
		const course = req.body.course;
		const id = server.db.getState().courses.length + 8324;
		course.id = id;
		server.db.get('courses').push(course).write()
		res.json({
			id: id
		});
	});

	router.post('/courses/update', (req, res, next) => {
		const course = req.body.course;
		server.db.get('courses').find({id: +course.id}).assign(course).write();
		res.json({
			id: course.id
		});
	});
	
	return router;
};
