const express = require('express');
const path = require('path');
const helmet = require('helmet');

const app = express();

// Use Helmet, but configure CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "https://*.zoom.us", "wss://*.zoom.us"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://*.zoom.us", "https://appssdk.zoom.us"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://*.zoom.us"],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        mediaSrc: ["'self'", "https://*.zoom.us"],
        connectSrc: [
          "'self'", 
          "https://*.zoom.us", 
          "wss://*.zoom.us", 
          "https://api.wecreateproblems.com",
          "http://localhost:8080",
          "http://localhost:3000"
        ],
        frameSrc: ["'self'", "https://*.zoom.us"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
