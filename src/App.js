import Tree from "./Home";
import data from "./data.json"
import ParentProvider from "./context/ParentContext";

function App() {
  return (
    <div className="App">
      <ParentProvider>
        <Tree data={data} />
      </ParentProvider>
      
    </div>
  );
}

export default App;
