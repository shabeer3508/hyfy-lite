import { useState } from "react";
import { Button } from "./components/ui/button";

import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div className="card text-3xl font-bold underline">
				<Button onClick={() => setCount((count) => count + 1)}>
					Clicked {count} times
				</Button>
			</div>
		</>
	);
}

export default App;
