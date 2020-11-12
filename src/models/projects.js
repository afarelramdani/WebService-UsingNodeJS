const db = require('../helpers/db')

module.exports = {
  getAllProjectModel: (searchKey, searchValue, limit, offset, callback) => {
    db.query(`SELECT * FROM android WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, _fields) => {
      if (!err) {
        callback(result)
      } else {
        callback(err)
      }
    })
  },
  getProjectByIdModel: (projectId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM android WHERE project_id = ${projectId}`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  createProjectModel: (projectName, projectDesc, projectType) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO android (project_name, project_desc, project_type) VALUES ('${projectName}', '${projectDesc}', '${projectType}')`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  deleteProjectModel: (projectId) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM android WHERE project_id = ${projectId} `, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateProjectModel: (projectId, projectName, projectDesc, projectType) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE android SET project_name = '${projectName}', project_desc = '${projectDesc}', project_type = '${projectType}' WHERE 
      project_id = '${projectId}'`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updatePatchProjectModel: (projectId, dataColumn) => {
    return new Promise((resolve, reject) => {
      const tes = `UPDATE android SET ${dataColumn} WHERE project_id = ${projectId}`
      db.query(tes, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }

}
