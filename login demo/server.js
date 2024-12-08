const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();



//Middleware for nocache
const nocache = (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
};

// Middleware for no-cache
app.use(nocache);

app.use(bodyParser.urlencoded({ extended: true }));



// Middleware for session handling
app.use(
  session({
    secret: "my_secret_key",
    resave: false,
    saveUninitialized: false,
     cookie: { secure: false, maxAge: 300000 }, 
  })
);



app.set('view engine', 'ejs');


// Predefined credentials
const USERNAME = 'admin';
const PASSWORD = 'pass123';

// Dummy datas:
const data = [
    {
      "albumId": 1,
      "id": 1,
      "title": "TITLE",
      "url": "https://via.placeholder.com/600/92c952",
      "thumbnailUrl": "https://via.placeholder.com/150/92c952"
    },
    {
      "albumId": 1,
      "id": 2,
      "title": "TITLE",
      "url": "https://via.placeholder.com/600/771796",
      "thumbnailUrl": "https://via.placeholder.com/150/771796"
    },
    {
      "albumId": 1,
      "id": 3,
      "title": "TITLE",
      "url": "https://via.placeholder.com/600/24f355",
      "thumbnailUrl": "https://via.placeholder.com/150/24f355"
    },
    {
      "albumId": 1,
      "id": 4,
      "title": "TITLE",
      "url": "https://via.placeholder.com/600/d32776",
      "thumbnailUrl": "https://via.placeholder.com/150/d32776"
    },
    {
      "albumId": 1,
      "id": 5,
      "title": "TITLE",
      "url": "https://via.placeholder.com/600/f66b97",
      "thumbnailUrl": "https://via.placeholder.com/150/f66b97"
    },
    {
      "albumId": 1,
      "id": 6,
      "title": "TITLE",
      "url": "https://via.placeholder.com/600/56a8c2",
      "thumbnailUrl": "https://via.placeholder.com/150/56a8c2"
    },
    {
      "albumId": 1,
      "id": 7,
      "title": "TITLE",
      "url": "https://via.placeholder.com/600/b0f7cc",
      "thumbnailUrl": "https://via.placeholder.com/150/b0f7cc"
    },
    {
      "albumId": 1,
      "id": 8,
      "title": "TITLE",
      "url": "https://via.placeholder.com/600/54176f",
      "thumbnailUrl": "https://via.placeholder.com/150/54176f"
    },
    {
      "albumId": 1,
      "id": 9,
      "title": "TITLE",
      "url": "https://via.placeholder.com/600/51aa97",
      "thumbnailUrl": "https://via.placeholder.com/150/51aa97"
    },
    {
      "albumId": 1,
      "id": 10,
      "title": "TITLE",
      "url": "https://via.placeholder.com/600/810b14",
      "thumbnailUrl": "https://via.placeholder.com/150/810b14"
    },
    {
      "albumId": 1,
      "id": 11,
      "title": "TITLE",
      "url": "https://via.placeholder.com/600/1ee8a4",
      "thumbnailUrl": "https://via.placeholder.com/150/1ee8a4"
    },
]


// Routes
app.get('/', (req, res) => {
    if (req.session.isAuthenticated) {
        res.redirect('/home');
    } else {
        res.render('login',{ error: null });
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === USERNAME && password === PASSWORD) {
        req.session.isAuthenticated = true; // Set session as authenticated
        req.session.save(() => {
            res.redirect('/home');
        })
    } else {
        res.render('login', { error: 'Incorrect username or password' });
    }
});

app.get('/home', (req, res) => {
  if (req.session.isAuthenticated) {
      res.render('home',{data, data}); // render home page
  } else {
      res.redirect('/'); 
  }
});


app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log("Error destroying session:", err);
            return res.status(500).send("Logout failed");
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});




// Start server

app.listen(8080, () => {
    console.log("Server started at 8080");
});


