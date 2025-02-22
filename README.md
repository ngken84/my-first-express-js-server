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

## EJS
```
<p><%= name %></p>
```
Normal HTML and plain javascript
```
npm install --save ejs
npm install --save-dev @types/ejs
```

### Usage
Update the view engine in the app.ts file 
```
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'ejs'));
```
To render the page
```
res.render('shop', { pageTitle: "My Title", title: "Test Title" })
```
with shop revering to the /ejs/shop.ejs file

#### Text insertion
In the ejs file which is structured like an html file
```
<title><%= pageTitle %></title>
```

### Conditional
```
<% if(products.length > 0) { %>
  <div>output if products.length greater than 0 <div>
<% } else { %>
  <div>Array is empty</div>
<%  } %>
```

### Looping
<% for (let product of products) {  %>
  <div>
    <%= product.title %>
  </div>
<% } %>

### includes
For similar usage as templates you can create ejs files
```
<%- include('includes/nav.ejs') %>
```
Note that <%- does not escape html so be wary that you don't allow cross scripting attacks via it!

You can also pass local or data into your include using variables:
```
<%- include('includes/cart.ejs', {product: product}) %>
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


## Handlebars
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

# MVC (Model View Controller)

What is MVC? Model View Controller

- Models
Represents data and manipulates data. Saving and fetching data.

- Views
What users sees. Rendering the correct content in the HTML. Decoupled from application code

- Controllers
Connection point between model and views. Works with models to save and fetching data for the views. 

# Dynamic Routes & Advanced Models

## Passing Route Params

```
router.get('/products/:productId', routerHandler);
```
Remember that ordering matters!
```
router.get('/products/delete', routerHandler);
router.get('/products/:productId', otherHandler); // Will never get reached because the above fires first!
```
To retrieve the dynamic path segment
```
const getProduct = (req: Request, res: Response, next: () => void) {
  const productId = res.params.productId;
}
```

# Databases

Goal : Store data and make it easy to access
- fast
- effecient


## Kinds of Databases

### SQL

Structured Query Language

Examples : MySQL

Structured in Tables with fields/columns
  - Strong data Schema
  - All data in the table must fit in the table.
A entry of data is a row.

Allow you to relate data within different tables.
  - One to One
  - One to Many
  - Many to Many

Query is how we interact with the database

```
SELECT * FROM users WHERE age > 28
```


### NoSQL

Example: MongoDB

No schemas or relations

Databases are not tables they are COLLECTIONS but are similar to tables
Items in the Collection are DOCUMENTS

Documents are like Javascript objects. They do not have a strict structure or Schema.

No Relations! We go for duplicate data. If data changes then it must be updated in multiple places.

### Comparing SQL vs NoSQL

#### Horizontal Scaling

Adding more servers to hold database. Split data across all data. But requires you to query every database

Horizontal Scaling is almost impossible in SQL.
Horizontal Scaling is easy in NoSQL

#### Vertical Scaling

Adding more Server Capacity

It is limited!

Vertical Scaling is probably the only way to improve SQL
Vertical Scaling is ok in NoSQL

## Using MySQL

First install a dependancy
```
npm install --save mysql2
```