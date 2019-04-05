function findById(id) {
    return db('projects')
    .where({ id }) 
    .first()
    .then(project => {
        if (project) {
            return getProjectActions(id).then(actions => {
                projects.actions = actions;

                return project; 
            }); 
        } else {
            return null;
        }
    });
} 

function getProjectActions(projectId) {
    return db('actions')
      .where({ project_id: projectId })
      .then(actions => {
        return actions;
      });
  }
  