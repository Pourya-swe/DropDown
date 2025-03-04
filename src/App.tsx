import { useState } from "react";
import DropDown from "./components/drop-down/DropDown";
import Card from "./ui/Card/Card";
import FormAddItem from "./components/form-add-item/FormAddItem";

export interface itemModel {
  id: string;
  label: string;
  item: string;
  selected: boolean;
}

const initialValues = [
  { id: crypto.randomUUID(), label: "Education", item: "Education 🎓", selected: false },
  { id: crypto.randomUUID(), label: "Science", item: "Yeeeah, science 📚", selected: false },
  { id: crypto.randomUUID(), label: "Art", item: "Art 🎨", selected: false },
  { id: crypto.randomUUID(), label: "Sport", item: "Sport ⚽", selected: false },
  { id: crypto.randomUUID(), label: "Games", item: "Games 🎮", selected: false },
  { id: crypto.randomUUID(), label: "Health", item: "Health 💊", selected: false },
];

function App() {
  const [options, setOptions] = useState<itemModel[]>(initialValues);

  function handleAddItem(newItem: itemModel) {
    setOptions((prev) => [...prev, newItem])
  }

  function handleToggleItem(id: string) {
    setOptions((options) => 
      options.map(option => option.id === id ? {...option, selected: !option.selected} : option)
    )
  }

  return (
    <Card>
      <DropDown items={options} onSelect={handleToggleItem} />
      <FormAddItem onAddItem={handleAddItem} />
    </Card>
  );
}

export default App;
