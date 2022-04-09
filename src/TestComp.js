import { useContext } from "react";
import SaveContext from "./SaveContext";

function TestComp() {
    const save = useContext(SaveContext);
    return (
        <div>
            {JSON.stringify(save, null, 2)}
        </div>
    );
}

export default TestComp;
