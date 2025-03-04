import { useEffect, useRef, useState } from "react";
import { itemModel } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./DropDown.module.scss";

interface DropDownProps {
  items: itemModel[];
  onSelect: (id: string) => void
}

function DropDown(props: DropDownProps) {
  const [showDrop, setShowDrop] = useState(false)
  const { items, onSelect } = props;
  const selectedItems = items.filter((item) => item.selected).map((item) => item.label)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClickOutSide = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setShowDrop(false)
    }
  }

  const handleLoseFocus = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide);
    return () => { document.removeEventListener('mousedown', handleClickOutSide) }
  }, [])

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          readOnly={true}
          value={selectedItems.join(", ")}
          placeholder="Click to select an item"
          onClick={() => setShowDrop(true)}
          className={styles.inputField}
        />
        <div className={`${styles.icon} ${showDrop ? styles.rotate : ''}`}>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
      </div>
      {showDrop &&
        <div
          onMouseDown={handleLoseFocus}
          className={styles.dropdownMenu}
        >
          {items.map((item) => {
            return (
              <div
                className={`${styles.dropdownItem} ${item.selected && styles.selected}`}
                key={item.id}
                onClick={() => onSelect(item.id)}
              >
                <span>{item.item}</span>
                <span className={styles.checkmark}>{item.selected ? "✔" : ""}</span>
              </div>
            )
          })}
        </div>
      }
    </div>
  );
}

export default DropDown;
