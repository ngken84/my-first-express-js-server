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
```
npm install --save ejs
npm install --save-dev @types/ejs
```

## Pug (Jade)
Uses minimized HTML
```
p #{name}
```
 custom templating language

### Installation
```
npm install --save pug
npm install --save-dev @types/pug
```

### Usage
In our app.js
```
const app = express();
app.set('view engine', 'pug'); // used to set global config value for express application
app.set('views', path.join(__dirname, 'pug'));
```
Then to render a pug view
```
res.render('shop');
```
Now to add dynamic content we just add the objects we wish to use in our template in the render call as a javascript object:
```
res.render('shop', { title: "Test Title" })
```
Then in the pug file
```
h1 #{title}
```
https://pugjs.org/api/getting-started.html
#### Loops
Then to create a loop:
```
each product in products
```
### Conditionals
Ifs are also just as easy:
```
if products.length > 0
  h1 display this code
else
  h1 display if false
```

### Layouts
An example: 
```
head
  <...>
  block styles
body
  <...>
  block content
```
styles and content provide two "hooks" that can be used in later layouts

```
extends layouts/main-layout.pug

block styles
  link(rel="stylesheet", href="/css/forms.css")

block content
  main
    h1 content
```
Dynamic classes
```
h1(class=(path==='/' ? 'active' : ''))
```


#### Handlebars
```
<p>{{ name }}</p>
```
Use normal HTML and custom template language
```
npm install --save express-handlebars
npm install --save-dev @types/express-handlebars
```
In the app js we set up handlebars
```
import { engine } from 'express-handlebars';
...
const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'hbs'));
```
We create a directory in the dist folder called 'hbs' which we referenced in the views setting above. Create a folder within that folder called 'layouts' and put a file called main.handlebars in it with the code:
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Example App</title>
</head>
<body>

    {{{body}}}

</body>
</html>
```
Then we can create our templates like usual with the filename .handlebars

### Loops
```
{{#each products}}
  <h1 class="product__title">{{../prefix}}{{title}}</h1>
{{/each}}
```

### Conditionals
```
{{#if products.length}}
  <h1>Display text here!</h1>
{{ else }}
  <h1>Don't display text</h1>
{{/if}}
```

