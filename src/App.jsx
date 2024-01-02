import { add } from "./utils";

const App = () => {

    const res = add(1, 2);

    return (
        <>
            <h1>my react-bootstrap</h1>
            {res}  
        </>
    );
};

export default App;
