import Demo from "../components/Demo";
import Header from "../components/Header";
import Counter from "../store/slices/Counter";

const App = function () {
  return (
    <div className="container min-h-screen mx-auto pt-2">
      <Header />
      <Counter />
      <Demo />
    </div>
  );
};

export default App;
