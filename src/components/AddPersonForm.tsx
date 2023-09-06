import { AppButton, AppInput } from "./ui";
import { useGlobalState } from "../context";
import { ChangeEvent, FormEvent, useState } from "react";

export const AddPersonForm = () => {
  const { addPerson, people } = useGlobalState();
  const [personName, setPersonName] = useState("");
  const [showNameError, setShowNameError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function submitHandler(e: FormEvent) {
    e.preventDefault();

    //check if person with same name exists
    if (
      people.map((p) => p.name.toLowerCase()).includes(personName.toLowerCase())
    ) {
      setShowNameError(true);
      return;
    } else {
      setShowNameError(false);
    }

    //fetch iban from api endpoint
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://63e3e2d765ae49317719e670.mockapi.io/api/v1/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: personName }),
        }
      );
      const resData = await res.json();
      addPerson(personName, resData.iban);
    } catch (e) {
      console.log("could not fetch IBAN");
      //set new person without iban
      addPerson(personName);
    } finally {
      setIsLoading(false);
      setPersonName("");
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="add-person-input" className="text-lg">
        Add person
      </label>
      <div className="flex gap-2 mt-1">
        <AppInput
          id="add-person-input"
          placeholder="John Doe"
          value={personName}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPersonName(e.target.value);
          }}
        />
        <AppButton type="submit" isLoading={isLoading}>
          Add
        </AppButton>
      </div>
      {showNameError && (
        <p className="text-red-400">
          Person with same name already exists.
          <br />
          Please use a different name.
        </p>
      )}
    </form>
  );
};
