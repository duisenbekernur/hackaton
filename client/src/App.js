import "./App.css";
import ProductCard from "./components/Card";
import Navbar from "./components/Navbar";

function App() {
  const [isLogged, setIsLogged] = useState(true);
  const [registerStore, setRegisterStore] = useState(false);
  return (
    <>
      <Navbar />
      <ProductCard />
    </>
  );
}

export default App;
