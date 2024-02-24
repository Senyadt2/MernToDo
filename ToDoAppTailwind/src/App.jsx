import "./App.css";
import ResetProvider from "./GlobalContext/ResetProvider";
import MyRouter from "./MyRouter";
function App() {
  return (
    <ResetProvider>
      <MyRouter />
    </ResetProvider>
  );
}

export default App;
