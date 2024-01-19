const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    let repeat_user = users.filter((usersingle) => usersingle.user === username);
    if(repeat_user.length < 1) {
        return true;
    }
    return false;
}

const authenticatedUser = (username,password)=>{ //returns boolean
    let usersearch = users.filter((usersingle) => usersingle.user === username);
    if(usersearch.length == 1) {
        if(usersearch[0].pass === password) {
            return true;
        }
    }
    
    return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const user = req.body.user;
    const pass = req.body.pass;

    if (user && pass && authenticatedUser(user, pass)) {
        let accessToken = jwt.sign({
            data: user
          }, 'access', { expiresIn: 60 * 60 });
          req.session.authorization = {
            accessToken
        }
        return res.status(200).send("User successfully logged in");
    }
    
    return res.status(300).json({message: "Failed to Login"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {

    const isbn = req.body.isbn;
    const recommend = req.body.recommend;
    const review = req.body.review;

    books[isbn].reviews.push(jwt.user, recommend, review);

    return res.status(300).json({message: "Yet to be implemented"});

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
