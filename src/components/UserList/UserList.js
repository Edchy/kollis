import { useEffect, useState, useRef } from "react";
import UserListItem from "../UserListItem/UserListItem";
import "./userlist.css";

export default function UserList({ userList, onHandleDelete }) {
  // LONG COMMENT ALERT!
  // Jag ville på något sätt öka UX genom att låta användaren få feedback på när man lägger till objet i listan eller när ett objekt som redan finns i listan uppdateras. En visuell markering som visar vad det är som händer när "lägga till knappen" klickas. Visste inte riktigt hur jag skulle göra detta och jag provade olika lösningar utan större framgång. Tillslut efter massa googlande, stack overflowande och dividerande med chatGPT hittade jag en lösning som fungerade. Jag kan inte säga att jag helt och hållet förstår lösningen, då den introducerade, för mig, nya koncept som useRef-hooken och Set().
  // Min tanke var att varje gång den här komponenten renderas (vilket den gör varje gång ett objekt uppdateras eller läggs till i userList) så ska den tidigare userList jämföras med den nya. Om något har ändrats så ska det elementet få ett klassnamn och en animation via klassnamnet.
  const [newOrUpdated, setNewOrUpdated] = useState(new Set());
  const prevUserList = usePrev(userList);
  function usePrev(val) {
    const ref = useRef();
    useEffect(() => {
      ref.current = val;
    });
    return ref.current;
  }
  useEffect(() => {
    if (prevUserList) {
      const newNewOrUpdated = new Set();

      userList.forEach((item) => {
        const prevItem = prevUserList.find((prev) => prev.name === item.name);

        if (!prevItem || prevItem.serving_size_g !== item.serving_size_g) {
          newNewOrUpdated.add(item.name);
        }
      });

      if (newNewOrUpdated.size > 0) {
        setNewOrUpdated(newNewOrUpdated);
      }
    }
    const timer = setTimeout(() => setNewOrUpdated(new Set()), 500);
    return () => clearTimeout(timer);
  }, [userList, prevUserList]);

  return (
    <ul className="user-list">
      {/* om det finns något i listan - "mappar ut" varje objekt till en komponent som tar in objektet som prop */}
      {userList.length > 0 ? (
        userList.map((item) => (
          <UserListItem
            onHandleDelete={onHandleDelete}
            item={item}
            key={item.name}
            // Kolla om item.name finns i changedItems, isf ge klass.
            className={newOrUpdated.has(item.name) ? "highlight" : ""}
          />
        ))
      ) : (
        <p className="empty-text">🍌 🍉 🥝 🍋</p>
      )}
    </ul>
  );
}
