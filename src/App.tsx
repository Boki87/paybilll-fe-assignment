import { AddPersonForm } from "./components/AddPersonForm";
import { Items } from "./components/Items";
import { PeopleOverview } from "./components/PeopleOverview";
import { Footer } from "./components/Footer";
import { BsGithub } from "react-icons/bs";

function App() {
  return (
    <div className="max-w-2xl m-auto px-4 py-6 min-h-screen flex flex-col">
      <a
        className="text-4xl w-10"
        href="https://github.com/Boki87/paybilll-fe-assignment"
        target="_blank"
      >
        <BsGithub />
      </a>
      <h1 className="text-center text-4xl font-bold text-gray-800 italic mb-6">
        PayBill
      </h1>
      <AddPersonForm />
      <hr className="my-6" />
      <Items />
      <PeopleOverview />
      <div className="flex-1"></div>
      <Footer />
    </div>
  );
}

export default App;
