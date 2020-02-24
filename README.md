# URSA

## Introduction:
This is a MERN stack application designed to let people ask questions for anything they want to ask. Whether it's getting someone's opinion, or deciding what to eat, you can do it on this application.

![Landing page](https://i.imgur.com/CSz33gh.png)
From the landing page a user can either sign up or log in if they already have an account.

![Dashboard](https://i.imgur.com/h1YU1Gv.png)
Upon successful login, the user is greeted with a welcome message and can see all the polls that have been created so far.

They can also create a new poll, view/edit their profile, or view all the accounts within the application.

The user is also able to interact with other logged in users through the chatroom (to be implemented)!

![Poll details](https://i.imgur.com/8b4z4Np.png)
Once a user clicks into a poll, the full details are now visible - the question being asked, the creator and the available options. Upon casting a vote, the user will then be able to see the results and the number of votes that have been casted per option.

Visit the link to the live demo: https://lp-ursa.herokuapp.com/

## Technologies Used:
- HTML5
- CSS3
- JavaScript (ES6)
- React
- Node
- Express
- MongoDB
- Mongoose
- Socket.IO
- JSON Web Tokens

## Getting Started:
Clone the repository and run `npm install`. Afterwards, start the server using `nodemon server.js`, and then the client with `npm start`. Head to http://localhost:3000 to see the application in action!

## Unsolved Problems:
- chatroom does not work in production deployment

## Future Enhancements:
- update for polls
- user avatar upload
- multiple selection polls (can choose more than 1 answer)
- private polls (groups)
- time limits
- image selections
- geolocation
- poll searching
- tags/keywords
- email confirmation
- AAU, I want to (un)follow people
- AAU, I want to like and comment on polls and other comments
