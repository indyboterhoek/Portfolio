import './App.css';
import { useState, useRef } from "react";

function ReturnOutputs(outputs) {
	let divs = []
	if (!outputs) return
	for (let i = 0; i < outputs.length; i++) {
		divs.push(
			<p className="outputs">{outputs[i]}</p>
		)
	}
	return divs
}

function ReturnTerminal(terminal) {
	let divs = []
	for (let i = 0; i < terminal.length; i++) {
		divs.push(
			<div className="line">
				<p className="account">indy@indyboterhoek.com</p>:<font color="red">~</font>$ {terminal[i].input}
				<br/>
				{ReturnOutputs(terminal[i].outputs)}
			</div>
		)
	}
	return divs
}

let projects = [
	{
		"name": "Password Generator",
		"command": "passwordgenerator",
		"url": "https://github.com/indyboterhoek/passwordgenerator",
		"description": [
			"		Do you ever forgot your password because those password requirements are so long?",
			"		Do you ever need to setup 20 different accounts and cyber says they need to be different?",
			"		Then this is the website for you! Just refresh the page and bam. Ready to go password.",
			"		All you need to do is click on the text and it puts it right in your clipboard."
		]
	},
	{
		"name": "Portfolio",
		"command": "portfolio",
		"url": "https://github.com/indyboterhoek/portfolio",
		"description": [
			"		Would you like to show off your work to the world?",
			"		Are you an avid linux user and want to show off your skills?",
			"		Then this is the website for you! Just update the projects array and bam. Ready to go portfolio.",
			"		Then you can just use the command 'project {projectCommand}' to open the project in a new tab."
		]
	},
]

function App() {
	const [input, setInput] = useState("");
	const [spin, setSpin] = useState(false);
	const [terminal, setTerminal] = useState([]);
	const ref = useRef();

	let commands = [
		{
			"name": "clear",
			"description": "clears the terminal back to its original state",
			"func": function() {
				setTerminal([]);
				window.location.reload();
			}
		},
		{
			"name": "help",
			"description": "lists all commands available to use",
			"func": function() {
				let newOutputs = [];
				newOutputs.push("Command List:");
				for (let i = 0; i < commands.length; i++) {
					if (!commands[i]["hidden"]) {
						newOutputs.push(`	${commands[i]["name"]} ${commands[i]["argument"] ? commands[i]["argument"] + ":" : ":"} ${commands[i]["description"]}`);
					}
				}
				return newOutputs;
			}
		},
		{
			"name": "spin",
			"hidden": true,
			"func": function() {
				setSpin(!spin);
			}
		},
		{
			"name": "project",
			"argument": "{projectCommand}",
			"description": "takes you to the project with that name",
			"func": function(projectName) {
				let newOutputs = []
				for (let i = 0; i < projects.length; i++) {
					if (projectName === projects[i]["command"]) {
						newOutputs.push("opening project: " + projectName);
						window.open(projects[i]["url"], "_blank");
						return newOutputs
					}
				}
				newOutputs.push("invalid project command");
				return newOutputs
			}
		},
		{
			"name": "projects",
			"description": "lists all the projects I have worked on / working on",
			"func": function() {
				let newOutputs = []
				newOutputs.push("Project List:");
				for (let i = 0; i < projects.length; i++) {
					newOutputs.push(`	- ${projects[i]["name"]} -`);
					newOutputs.push(`		cmd: ${projects[i]["command"]}`);
					let project = projects[i]["description"];
					for (let j = 0; j < project.length; j++) {
						newOutputs.push(project[j]);
					}
				}
				return newOutputs
			}
		}
	]

	function handleSubmit(e) {
		console.log(input, e)
			if (e.key === "Enter") {
				let newOutputs = [];
				let cmds = input.split(" ");
				let commandFound = false;
				let tempTerminal = terminal;

				for (let i = 0; i < commands.length; i++) {
					if (commands[i]["name"] === cmds[0] && !commandFound) {
						commandFound = true
						newOutputs = commands[i].func(cmds[1])
					}
				}

				if (!commandFound)
				{
					newOutputs.push("Command Not Found. Please use the help command to show a list of commands.");
				}

				tempTerminal.push({
					"input": input,
					"outputs": newOutputs
				})

				setTerminal(tempTerminal);

				setInput("");
				ref.current.focus();
			}
			if (e.key === "Tab") {

			}
	}

	return (
		<div className={`App ${spin ? "spin": ""}`}>
		<div className="terminal-header">
			<div className="ascii-art">
				██╗███╗   ██╗██████╗ ██╗   ██╗    ██████╗  ██████╗ ████████╗███████╗██████╗ ██╗  ██╗ ██████╗ ███████╗██╗  ██╗<br/>
				██║████╗  ██║██╔══██╗╚██╗ ██╔╝    ██╔══██╗██╔═══██╗╚══██╔══╝██╔════╝██╔══██╗██║  ██║██╔═══██╗██╔════╝██║ ██╔╝<br/>
				██║██╔██╗ ██║██║  ██║ ╚████╔╝     ██████╔╝██║   ██║   ██║   █████╗  ██████╔╝███████║██║   ██║█████╗  █████╔╝ <br/>
				██║██║╚██╗██║██║  ██║  ╚██╔╝      ██╔══██╗██║   ██║   ██║   ██╔══╝  ██╔══██╗██╔══██║██║   ██║██╔══╝  ██╔═██╗ <br/>
				██║██║ ╚████║██████╔╝   ██║       ██████╔╝╚██████╔╝   ██║   ███████╗██║  ██║██║  ██║╚██████╔╝███████╗██║  ██╗<br/>
				╚═╝╚═╝  ╚═══╝╚═════╝    ╚═╝       ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝<br/>                                                                                         
			</div>
			<br/>
			Thank you for visiting my website. Feel free to look around. If you get stuck remember to use the <b className="command" onClick={e => {
				let newOutputs = [];
				let commandFound = false;
				let tempTerminal = terminal
				
				for (let i = 0; i < commands.length; i++) {
					if (commands[i]["name"] === "help" && !commandFound) {
						commandFound = true
						newOutputs = commands[i].func()
					}
				}
				
				tempTerminal.push({
					"input": "help",
					"outputs": newOutputs
				})

				setTerminal(tempTerminal)

				setInput("help");

				setTimeout(() => {
					setInput("");
					ref.current.focus();
				}, 100)

			}}>help</b> command.
			<br/>
			<br/>
		</div>
		<div className="terminal">
			{ReturnTerminal(terminal)}
			<p className="account">indy@indyboterhoek.com</p>:<font color="red">~</font>$ {}
		</div>
		<input ref={ref} className="text-input" autoFocus type="text" value={input} onChange={e => setInput(e.target.value.toLowerCase())} onKeyDown={handleSubmit} onFocus={e => {  }}/>
		</div>
	);
}

export default App;
