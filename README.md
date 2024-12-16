# My First Express NodeJS Server

## What is Express.js?
Server Side Code is complex! Just handling data in a previous example was difficult and that was just one type of data! 

- It allows us to install a package that will help us parse the data.
- It handles a lot of the nitty gritty detail of server side code
- It is a framework that has helper functions and tools & rules of how to structure your code

### Alternatives
- Vanilla NodeJS : 
  Just write everything yourself
- Adonis.js: 
  Laravel inspired.
- Koa
- Salis.js
- More!

Express is still the most popular and most used. It is highly flexible and extensible. Lots of 3rd Party Packages have been built for it. 

### Middleware

With middleware, we ditch the one request handler and instead adopt a system where the request passes between middlewares with next() to indicate it must continue and res.send() to indicate it is over.

This allows you to split your code into chunks and pieces and add multiple 3rd party packages to add functionalities

## Installation

1. Install express
```
npm install --save express
```
2. Install types/express
```
npm install --save-dev types/express
```
3. Import it to the app
```
import express from 'express'
```
4. Create an express app
```
const app = express();
```
This is a constant that has a lot of functions and is a valid request handler.
```
const server = http.createServer(app);
```

## Usage

To add listeners and middleware to you app:
```
const app = express();
app.use((req, res, next) => {});
app.listen(3000);
```
The function passed in use will be run on every incoming request. req and res are the usual with some extra features. next must be executed for the request to travel on to the next middleware.

Note that the middlewares are executed in the order that they are put in there so this is important because:

```
app.use('/', (req: Request, res: Response) => {
  ...
})
```
The path '/' only checks if the path CONTAINS a '/' so if it is added first, then all pages will be handled by it.

### Sending Response

Express adds:
```
res.send(... html code);
```
Automaticallys set the header 'html/text'. We no longer need to do all these writes.

### Parsing request bodies

We want to add a 3rd party library to parse the request body, so we install it:
```
npm install --save body-parser
npm install --save-dev @types/body-parser
```
Then import it:
```
import bodyParser from 'body-parser'
```
and use it BEFORE all routes:
```
app.use(bodyParser.urlencoded({extended: false}));
```

### Handling paths cleaner:
We could use __dirname, but a cleaner way to get the root directory of the file is:
```
import path from 'path';

const rootDir = path.dirname(require!.main!.filename);

export default rootDir;
```
Then retrieving files can look like this:
```
res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
```

## Serving Files Statically

Generally create a public folder.

We register a middleware to serve files publically:
```
app.use(express.static(path.join(__dirname, 'public')));
```
Place the file in a folder in /public/css and in the HTML file:
```
<link rel="stylesheet" href="/css/main.css">
```

## Templating Engine

Engines that take HTMLish code, injects content dynamically created by NodeJS and turns it into pure HTML content. The HTML is generated on the fly based on dynamic content. 

### Available Templating Engines

- EJS
- Pug (Jade)
- Handlebars

#### EJS
```
<p><%= name %></p>
```
Normal HTML and plain javascript

#### Pug (Jade)
Uses minimized HTML
```
p #{name}
```
 custom templating language

#### Handlebars
```
<p>{{ name }}</p>
```

Use normal HTML and custom template language

