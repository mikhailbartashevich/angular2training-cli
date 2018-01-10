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
			courses = server.db.getState().courses;
		console.log(sort);
		console.log(queryStr);
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
		const foundCourse = courses.find((course) => 
			course.name.toLowerCase().startsWith(courseName.toLowerCase())
		);
		courses = foundCourse ? [foundCourse] : [];
		if(!courses.length) {
			courses = server.db.getState().courses.slice(0, 10);
		}
		res.json(courses);
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
	
	return router;
};
