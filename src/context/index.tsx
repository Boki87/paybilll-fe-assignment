import { ReactNode, createContext, useContext, useState } from "react";
import { Person } from "../types/Person";
import { Item } from "../types/Item";

type AppState = {
  people: Person[];
  items: Item[];
  updateItemPrice: (itemId: number, val: number) => void;
  updateItemPeople: (itemId: number, people: number[]) => void;
  addItem: () => void;
  removeItem: (itemId: number) => void;
  addPerson: (name: string, iban?: string) => void;
  removePerson: (personId: number) => void;
};

const initialState: AppState = {
  people: [],
  items: [],
  updateItemPrice: () => {},
  updateItemPeople: () => {},
  addItem: () => {},
  removeItem: () => {},
  addPerson: () => {},
  removePerson: () => {},
};

const GlobalStateContext = createContext(initialState);

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalState = ({ children }: { children: ReactNode }) => {
  const [people, setPeople] = useState<Person[]>([
    { id: 1, name: "Person 1", iban: "BR5837002880063780060020080C7" },
    { id: 2, name: "Person 2", iban: "ME29007007170007007457" },
    { id: 3, name: "Person 3", iban: "NL82UMYD2098076009" },
  ]);
  const [items, setItems] = useState<Item[]>([
    { id: 1, price: 10, people: [1, 2] },
    { id: 2, price: 5, people: [2, 3] },
  ]);

  function updateItemPrice(itemId: number, val: number) {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.id === itemId) {
          item.price = val;
        }
        return item;
      });
    });
  }

  function updateItemPeople(itemId: number, people: number[]) {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.id === itemId) {
          item.people = people;
        }
        return item;
      });
    });
  }

  function addItem() {
    const nextId = items.reduce((maxId, obj) => Math.max(maxId, obj.id), 0) + 1;
    const newItem = { id: nextId, price: 1, people: [] };
    const newItems = [...items, newItem];
    setItems(newItems);
  }

  function removeItem(itemId: number) {
    setItems((prev) => {
      return prev.filter((p) => p.id !== itemId);
    });
  }

  function addPerson(name: string, iban?: string) {
    const nextId =
      people.reduce((maxId, obj) => Math.max(maxId, obj.id), 0) + 1;
    setPeople((prev) => [...prev, { id: nextId, name, iban }]);
  }

  function removePerson(personId: number) {
    setPeople((prev) => prev.filter((p) => p.id !== personId));
    //also remove person from any items previously added
    setItems((prev) => {
      return prev.map((item) => {
        return { ...item, people: item.people.filter((p) => p !== personId) };
      });
    });
  }

  return (
    <GlobalStateContext.Provider
      value={{
        people,
        items,
        updateItemPrice,
        updateItemPeople,
        addItem,
        removeItem,
        addPerson,
        removePerson,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
