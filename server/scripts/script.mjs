const inquirer = require('inquirer');

const questions = [
    {
        type: 'input',
        name: 'email',
        message: 'Email: \n'
    },{
        type: 'input',
        name: 'username',
        message: 'Username: \n'
    },{
        type: 'input',
        name: 'password',
        message: 'Password: \n'
    },
];

inquirer.prompt(questions).then(answers => {
    console.log(`Hi ${answers.name}!`);
  });

