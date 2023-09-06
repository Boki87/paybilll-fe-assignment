import { useGlobalState } from "../context";
import { ItemForm } from "./ItemForm";
import { AppButton } from "./ui";

export const Items = () => {
  const {
    items,
    people,
    updateItemPeople,
    updateItemPrice,
    addItem,
    removeItem,
  } = useGlobalState();

  function onChangeHandler(itemId: number, people: number[]) {
    updateItemPeople(itemId, people);
  }

  function onPriceChangeHandler(itemId: number, newPrice: number) {
    updateItemPrice(itemId, newPrice);
  }

  return (
    <div>
      {items.length === 0 ? (
        <p className="my-4 text-center text-lg">
          No items to split. Add some and split the 💰
        </p>
      ) : (
        items.map((item) => (
          <ItemForm
            item={item}
            people={people}
            key={item.id}
            onChange={(newArr) => {
              onChangeHandler(item.id, newArr);
            }}
            onPriceChange={(newPrice) => {
              onPriceChangeHandler(item.id, newPrice);
            }}
            onDelete={(itemId) => {
              removeItem(itemId);
            }}
          />
        ))
      )}
      <AppButton onClick={addItem}>Add item</AppButton>
    </div>
  );
};
