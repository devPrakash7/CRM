const Department = require('../../models/department.model')


exports.Departmentsave = data => new Department(data).save();