import SaveContext, { SaveData } from "./SaveContext";
import TestComp from "./TestComp";

function App() {
	return (
		<SaveContext.Provider value={SaveData}>
			<TestComp />
		</SaveContext.Provider>
	);
}

export default App;
