<img height="128px" width="128px" align="right" />

# _kerplow!_

> Project configuration that self-destructs!

<table>
	<thead>
		<tr>
			<th align="center"><strong>Contents</strong></th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
				<ol>
					<li><a href="#getting-started">Getting Started</a></li>
					<ol>
						<li><a href="#prerequisites">Prerequisites</a></li>
						<li><a href="#installation">Installation</a></li>
						<li><a href="#example">Example</a></li>
					</ol>
					<li><a href="#license">License</a></li>
				</ol>
			</td>
		</tr>
	</tbody>
</table>

### Getting Started

#### Prerequisites

-	[Node.js](https://nodejs.org/en/download/)

#### "Installation"

```bash
npx brianjenkins94/kerplow [--update|-u] [--yes|-y]
```

_or_

```bash
npm install brianjenkins94/kerplow --production
```

### Example

```bash
$ npx brianjenkins94/kerplow
...
About to write to /Users/bjenks/Desktop/foo/package.json:

{
  "name": "foo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes) 

> TypeScript
> ==========
>
>     TypeScript is a strict syntactical superset of JavaScript that adds
>     optional static typing to the language.
>
> Pros:
> =====
>     - Compile time type checking
>     - Great tooling
>
> Cons:
> =====
>     - People will think you like Microsoft, when you really just like Anders
>       Hejlsberg.

TypeScript? [Y/n] 

> Visual Studio Code
> ==================
>
>     Visual Studio Code is a code editor with support for debugging, source
>     control, and IDE-like code navigation and project management.
>
> Pros:
> =====
>     - IntelliSense
>     - Better debugging than you thought possible
>     - Extraordinary extensibility
>
> Cons:
> =====
>     - People will think you like Microsoft
>     - Depending on who you're working with, you will semi-frequently have to
>       say: "No, not Visual Studio, /Visual Studio Code/."

VS Code? [Y/n] 

> Express
> =======
>
>     Express is a web application framework for Node.js.
>
> Pros:
> =====
>     - De facto standard server framework for Node.js
>
> Cons:
> =====
>     - "Middleware" can be a confusing concept for beginners
>     - Adds boilerplate

Express? [Y/n] 

> EJS
> ===
>
>     Embedded JavaScript templates.
>
> Pros:
> =====
>     - De facto standard Node.js templating
>
> Cons:
> =====
>     - None

EJS? [Y/n] 

> Sass
> ====
>
>     Sass is a CSS pre-processor and CSS superset (SCSS) that makes writing CSS
>     easier.
>
> Pros:
> =====
>     - Nesting
>     - Variables
>     - Inheritance
>
> Cons:
> =====
>     - Adds a compilation step

Sass? [Y/n] 

> CSSComb
> =======
>
>     CSScomb is a coding style formatter for CSS.
>
> Pros:
> =====
>     - Keeps your (S)CSS uniform and consistent
>
> Cons:
> =====
>     - Might be a dead project?

CSSComb? [Y/n] 

> npm install cross-env typescript ts-node convict express helmet morgan nodemon ejs
...
> npm install --save-dev cross-env typescript ts-node convict express helmet morgan nodemon ejs
...
```

### License

`kerplow` is licensed under the [MIT License](https://github.com/brianjenkins94/kerplow/blob/master/kerplow/LICENSE).

All files located in the `node_modules` directory are externally maintained libraries used by this software which have their own licenses; it is recommend that you read them, as their terms may differ from the terms in the MIT License.
