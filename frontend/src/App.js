import { FormProvider } from "./context/FormContext";
import Main from "./pages/Main";

function App() {
  return (
    <FormProvider>
      <Main />
    </FormProvider>
  );
}

export default App;
