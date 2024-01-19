const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const user = req.body.user;
    const pass = req.body.pass;

    if (user && pass && isValid(user)) {
        
        users.push({"user":user,"pass":pass});
        return res.status(200).send({message: "A new account has been successfully registered."});
        
    }

    return res.status(200).send({message: "Failed to register user."});
    
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {

    //PROMISE
    let myPromise = new Promise((resolve,reject) => {
        res.send(JSON.stringify(books,null,4));
    })
    
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    //PROMISE
    let myPromise = new Promise((resolve,reject) => {
    res.send(JSON.stringify(books[req.params.isbn],null,4));
    })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    //PROMISE
    let myPromise = new Promise((resolve,reject) => {
    const author = req.params.author;
    let filtered_books = Object.values(books).filter((book) => book.author === author);
    res.send(filtered_books);
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    //PROMISE
    let myPromise = new Promise((resolve,reject) => {
    const title = req.params.title;
    let filtered_books = Object.values(books).filter((book) => book.title === title);
    res.send(filtered_books);
    })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    //PROMISE
    let myPromise = new Promise((resolve,reject) => {
    res.send(JSON.stringify(books[req.params.isbn].reviews,null,4));
    })
});

module.exports.general = public_users;
