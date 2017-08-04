const Joi = require('joi');

schema = Joi.object().keys({
	lastName: Joi.string(),
	managerId: Joi.string(),
	deptNumber: Joi.string(),
	userActive: Joi.string(),
	firstName: Joi.string(),
	jobTitle: Joi.string(),
	emailAddress: Joi.string(),
	siteNumber: Joi.string(),
	userDn: Joi.string(),
	userId: Joi.string(),
	fullName: Joi.string()
	
	
	
})
arrayJoi = Joi.array().items(schema)

module.exports = arrayJoi;