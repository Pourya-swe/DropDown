import { useState } from "react";
import { itemModel } from "../../App";
import styles from './FormAddItem.module.scss'

interface FormProps {
  onAddItem: (newItem: itemModel) => void;
}

function FormAddItem(props: FormProps) {
  const [item, setItem] = useState("");
  const [label, setLabel] = useState("");
  const { onAddItem } = props

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (!item || !label) return;

    const id = crypto.randomUUID()
    const newItem = { id, label, item, selected: false }

    onAddItem(newItem)

    setItem('')
    setLabel('')
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.addForm} onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="item">Add an item</label>
        <input
          id="item"
          type="text"
          value={item}
          className={styles.inputField}
          placeholder="Add an item"
          onChange={(e) => setItem(e.target.value)}
          required
        />
        <label htmlFor="label">Add a label for the item</label>
        <input
          id="label"
          type="text"
          value={label}
          className={styles.inputField}
          placeholder="Add a label"
          onChange={(e) => setLabel(e.target.value)}
          required
        />
        <button type="submit" style={{ display: 'none' }} />
      </form>
    </div>
  )
}

export default FormAddItem;