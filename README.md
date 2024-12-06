<h2 align="center"> Chatbot Widget testing project at Hexlet </h2>

<div align="center">
	<a href="https://github.com/meloshnikov/qa-auto-engineer-javascript-project-89/actions">
		<img src="https://github.com/meloshnikov/qa-auto-engineer-javascript-project-89/actions/workflows/hexlet-check.yml/badge.svg" />
	</a>
  <a href="https://github.com/meloshnikov/qa-auto-engineer-javascript-project-89/actions">
		<img src="https://github.com/meloshnikov/qa-auto-engineer-javascript-project-89/actions/workflows/ci.yml/badge.svg" />
	</a>
  <a href="https://codeclimate.com/github/meloshnikov/qa-auto-engineer-javascript-project-89/test_coverage">
    <img src="https://api.codeclimate.com/v1/badges/6021cbabef1ba9e8af5c/test_coverage" />
  </a>
</div>

Chatbot Widget is an npm package that exports a function with a chatbot configuration passed to it as a parameter and returns a React component representing part of the user interface. The configuration defines the user's interaction with the chatbot widget, describing different chatbot states in the form of chat messages and possible transitions between them in the form of buttons that the user can click.

Testing was done using React Testing Library as the testing library and Jest as the test run.

Testing covers the following cases:
* Displaying the widget in different states.
* Transitions between states.
* Integration of the widget into the application.
* Widget response to misconfigurations.

## Installation
>note: the current version of Chatbot Widget was tested using Node.js v20.11.1
* Clone this repository.
* Install required dependencies:
```
make install
```

## How to run tests
* Run Chatbot Widget:
```
make start
```
* Run tests:
```
make test
```
