
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Projects').truncate()
  .then( () => knex('Resources').truncate())
  .then( () => knex('Tasks').truncate())
  .then( () => knex('PR_Manager').truncate())
    .then(function () {
      // Inserts seed entries
      return knex('Projects').insert([
        {id: 1, completed: false, project_description: 'a static article page where html5, css3, and javascript was used to create a reusable class based component using the data attribute ', project_name: 'Lambda Times'},
        {id: 2, completed: false, project_description: 'An App that allows users to log in and schedule uplifting messages to their cellphone in specified intervals depending on their mood.  Users can select predefined messages or create their own.  Built with React.js', project_name: 'SafeSpace'},
        {id: 3, completed: false, project_description: 'A landing page built in html,css, and javascript, that is promoting an app that allows users to organize their notes in a centralized dashboard', project_name: 'PinteReach'}
      ]);
    })
    .then( () => {
      return knex('Resources').insert([
        {id : 1, resource_name: 'Front End Developer', resource_description: 'Specializes in React Front End Development'},
        {id : 2, resource_name: 'Data Engineer', resource_description: 'Specializes in Hadoop, Spark, and Scala'},
        {id : 3, resource_name: 'UX Designer', resource_description: 'Specializes in Designing Wire Frames for Landing Pages and Applications'}
      ])
    })
    .then(() => {
      return knex('Tasks').insert([
        {id: 1, project_id: 2, task_description: 'Design Wireframe', task_notes: 'Contact the UX Designer', completed: false},
        {id: 2, project_id: 2, task_description: 'Devise Message Templates', task_notes: 'Google Research', completed: false},
        {id: 3, project_id: 2, task_description: 'Integrate TWILIO API for text messaging', task_notes: 'Register for a free account', completed: false}
      ])
    });
};
