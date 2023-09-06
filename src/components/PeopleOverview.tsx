import { useGlobalState } from "../context";

export const PeopleOverview = () => {
  const { people, items } = useGlobalState();

  const peopleOverviewList = people.map((p) => {
    let personPaySum = 0;
    items.forEach((item) => {
      if (item.people.includes(p.id)) {
        personPaySum += Math.round((item.price / item.people.length) * 10) / 10;
      }
    });
    return { ...p, pay: personPaySum };
  });

  return (
    <div className="w-full min-h-[200px] border border-gray-200 rounded-xl my-6">
      <div className="w-full h-full overflow-y-auto">
        <div className="flex border-b border-gray-200 h-10 items-center">
          <div className="w-auto flex-1 sm:flex-none sm:w-[150px] pl-4">
            Name
          </div>
          <div className="w-[120px] sm:w-[80px] text-center">Pay</div>
          <div className="flex-1 min-w-[200px] text-center truncate hidden sm:block">
            IBAN
          </div>
        </div>
        {peopleOverviewList.map((person) => (
          <div key={person.id} className="flex h-10 items-center">
            <div className="w-auto flex-1 sm:flex-none sm:w-[150px] pl-4">
              {person.name}
            </div>
            <div className="w-[120px] sm:w-[80px] text-center">
              {person.pay} $
            </div>
            <div className="flex-1 min-w-[200px] text-center truncate hidden sm:block">
              {person.iban ?? "n/a"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
