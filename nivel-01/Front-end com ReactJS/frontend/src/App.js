import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import api from "./services/api";

export default function App() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		api.get("/projects").then((res) => {
			setProjects(res.data);
		});
	}, []);

	function handleAddProject() {
		setProjects([...projects, `Novo projeto - ${new Date()}`]);

		api
			.post("/projects", {
				title: "Projeto Novo React Native",
				owner: "Alisson Kohatsu",
			})
			.then((res) => {
				setProjects([...projects, res.data]);
			});
	}

	return (
		<>
			<Header title='Projects' />
			<ul>
				{projects.map((p) => (
					<li key={p.id}>{p.title}</li>
				))}
			</ul>
			<button type='button' onClick={handleAddProject}>
				ADICIONAR
			</button>
		</>
	);
}
