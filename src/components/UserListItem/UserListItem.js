import Button from "../Button/Button";
import "./userlistitem.css";

export function UserListItem({ item, onHandleDelete, className }) {
  return (
    <li className={`user-list-item ${className}`}>
      <div>
        <h4>
          {item.name} <span>{item.serving_size_g}g</span>
        </h4>
        <p className="item-carbs">{item.carbohydrates_total_g.toFixed(1)}</p>
      </div>
      {/* varje objekt får en knapp, där funktionen för delete skickas in som prop. Funktionen tar objektet som parameter och filtrerar bort detta i handleDelete funktionen */}
      <Button className="delete-btn" onClick={() => onHandleDelete(item)}>
        ❌
      </Button>
    </li>
  );
}
