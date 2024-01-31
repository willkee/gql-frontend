import { useState } from "react";

import CreateUser from "./components/CreateUser";
import DisplayUsers from "./components/DisplayUsers";
import DynamicUserQuery from "./components/DynamicUserQuery";

function App() {
	const [active, setActive] = useState("all");
	return (
		<div className="App">
			<form onSubmit={(e) => e.preventDefault()}>
				<fieldset>
					<legend>Set active component:</legend>
					<div>
						<input
							type="radio"
							name="active"
							checked={active === "all"}
							onChange={() => setActive("all")}
						/>
						<label htmlFor="active">All user data:</label>
						<input
							type="radio"
							name="active"
							checked={active === "add"}
							onChange={() => setActive("add")}
						/>
						<label htmlFor="active">Create user:</label>
						<input
							type="radio"
							name="active"
							checked={active === "dynamic"}
							onChange={() => setActive("dynamic")}
						/>
						<label htmlFor="active">Dynamic user query</label>
					</div>
				</fieldset>
			</form>
			{active === "all" ? (
				<DisplayUsers />
			) : active === "add" ? (
				<CreateUser />
			) : (
				<DynamicUserQuery />
			)}
		</div>
	);
}

export default App;
