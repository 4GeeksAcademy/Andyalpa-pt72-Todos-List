import React from "react";
import TodoForm from "./TodoForm";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import Todos from "./TodoForm";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<TodoForm/>
		</div>
	);
};

export default Home;
