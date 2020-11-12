const { getAllProjectModel, getProjectByIdModel, createProjectModel, deleteProjectModel, updateProjectModel, updatePatchProjectModel } = require('../models/projects')

module.exports = {
  getAllProject: (req, res) => {
    let { search, limit, page } = req.query
    let searchKey = ''
    let searchValue = ''

    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'project_name'
      searchValue = search || ''
    }
    if (!limit) {
      limit = 10
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const offset = (page - 1) * limit

    getAllProjectModel(searchKey, searchValue, limit, offset, result => {
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'Project List',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Item project not found!'
        })
      }
    })
  },
  getProjectById: async (req, res) => {
    try {
      const { projectId } = req.params

      const result = await getProjectByIdModel(projectId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: `Project with id ${projectId}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          success: false,
          message: `Data project with id ${projectId} not found`
        })
      }
    } catch (error) {
      req.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  createProject: async (req, res) => {
    try {
      const { projectName, projectDesc, projectType } = req.body

      const result = await createProjectModel(projectName, projectDesc, projectType)

      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: 'Succes Add Project'
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Submit Project Failed'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: true,
        message: 'Internal Server Error!'
      })
    }
  },
  deleteProject: async (req, res) => {
    try {
      const { projectId } = req.params

      const results = await getProjectByIdModel(projectId)
      if (results.length) {
        const result = await deleteProjectModel(projectId)
        if (result.affectedRows) {
          res.status(200).send({
            succes: true,
            message: `Item Project id ${projectId} has been Delete`
          })
        } else {
          res.status(404).send({
            success: false,
            message: 'Item Project Failed to Delete'
          })
        }
      } else {
        res.status(404).send({
          success: false,
          message: 'Item Project Failed to Delete'
        })
      }
    } catch (error) {
      res.status(404).send({
        success: false,
        message: 'Data project not Found'
      })
    }
  },
  updateProject: async (req, res) => {
    try {
      const { projectId } = req.params
      const { projectName, projectDesc, projectType } = req.body

      if (projectName.trim() && projectDesc.trim() && projectType) {
        const result = await getProjectByIdModel(projectId)
        if (result.length) {
          const result = await updateProjectModel(projectId, projectName, projectDesc, projectType)
          if (result.affectedRows) {
            res.status(200).send({
              status: true,
              message: `Project With ID ${projectId} has been update`
            })
          } else {
            res.status(400).send({
              status: false,
              message: 'Failed to Update Data '
            })
          }
        } else {
          res.status(400).send({
            success: false,
            message: `Project with id ${projectId} not Found`
          })
        }
      } else {
        res.send({
          success: false,
          message: 'All Field must be filled!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  updatePatchProject: async (req, res) => {
    try {
      const { projectId } = req.params

      const {
        project_name = '',
        project_desc = '',
        project_type = ''
      } = req.body
      if (project_name.trim() || project_desc.trim() || project_type.trim()) {
        const result = await getProjectByIdModel(projectId)
        if (result.length) {
          const dataColumn = Object.entries(req.body).map(item => {
            // untuk melihat value akhir apakah int atau string, jika int maka tanpa kutip, jika string maka kutip
            const queryDynamic = parseInt(item[1]) > 0 ? `${item[0] = item[1]}` : `${item[0]} = '${item[1]}'`
            return queryDynamic
          })
          const result = await updatePatchProjectModel(projectId, dataColumn)
          if (result.affectedRows) {
            res.status(200).send({
              succes: true,
              message: 'Data Berhasil Di Update'
            })
          } else {
            res.status(400).send({
              succes: true,
              message: 'Failed To update Data '
            })
          }
        } else {
          res.status(404).send({
            succes: true,
            message: `Proejct with id ${projectId} not Found `
          })
        }
      } else {
        res.status(400).send({
          succes: true,
          message: 'Some Field must be filled'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  }
}
