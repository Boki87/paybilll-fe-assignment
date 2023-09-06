import { ChangeEvent, useMemo } from "react";
import { Item } from "../types/Item";
import { Person } from "../types/Person";
import { AppButton, AppInput } from "./ui";
import Select from "react-select";
import { MdDelete } from "react-icons/md";

interface ItemFormProps {
  item: Item;
  people: Person[];
  onChange?: (newArr: number[]) => void;
  onPriceChange?: (newPrice: number) => void;
  onDelete?: (itemId: number) => void;
}

export const ItemForm = ({
  item,
  people,
  onChange,
  onPriceChange,
  onDelete,
}: ItemFormProps) => {
  const peopleFormatted = useMemo(() => {
    return people.map((person) => ({
      value: person.id,
      label: person.name,
      selected: true,
    }));
  }, [people]);

  const defaultPeopleFormatted = useMemo(() => {
    return item.people
      .map((p) => {
        const person = people.filter((person) => person.id === p)[0];
        return person;
      })
      .map((person) => ({
        value: person.id,
        label: person.name,
        selected: true,
      }));
  }, [item, people]);

  function onSelectChange(newArr) {
    onChange && onChange(newArr.map((p) => p.value));
  }

  return (
    <div className="flex gap-2 w-full my-4 flex-wrap">
      <div className="flex flex-col flex-2">
        <span>Price</span>
        <AppInput
          value={item.price}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onPriceChange && onPriceChange(+e.target.value);
          }}
        />
      </div>
      <div className="flex gap-2 flex-wrap flex-1">
        <div className="flex flex-col flex-1 min-w-[220px]">
          <span>People</span>
          <Select
            isMulti
            name={`people${item.id}`}
            defaultValue={defaultPeopleFormatted}
            options={peopleFormatted}
            onChange={onSelectChange}
          />
        </div>
        <div className="flex items-end">
          <AppButton
            onClick={() => {
              onDelete && onDelete(item.id);
            }}
          >
            <MdDelete />
          </AppButton>
        </div>
      </div>
    </div>
  );
};
