const { Router } = require('express')
const { getAllProject, getProjectById, createProject, deleteProject, updateProject, updatePatchProject } = require('../controllers/projects')

const router = Router()

router.get('/', getAllProject)
router.get('/:projectId', getProjectById)
router.post('/', createProject)
router.put('/:projectId', updateProject)
router.patch('/:projectId', updatePatchProject)
router.delete('/:projectId', deleteProject)

module.exports = router
