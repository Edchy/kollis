import Button from "../Button/Button";
import { FaTrash } from "react-icons/fa6";

import "./userlistitem.css";

// Rendera en <li> för varje objekt som användaren lägger till
export default function UserListItem({ item, onDelete, className }) {
  return (
    // tar class som prop för att dynamiskt kunna lägga till class
    <li className={`user-list-item ${className}`}>
      <div>
        <h4>
          {item.name} <span>{item.serving_size_g}g</span>
        </h4>
        <p className={`item-carbs`}>{item.carbohydrates_total_g.toFixed(1)}</p>
      </div>
      {/* varje objekt får en knapp, där funktionen för delete skickas in som prop. Funktionen tar objektet som parameter och filtrerar bort detta i handleDelete funktionen */}
      <Button className="delete-btn" onClick={() => onDelete(item)}>
        <FaTrash />
      </Button>
    </li>
  );
}
