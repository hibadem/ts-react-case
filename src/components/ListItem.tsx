import { useState} from "react";
import User from "../types/User";

type IProps = {
  user: User,
  handleUpdateButtonClick: (user: User) => void,
  handleDeleteButtonClick: (id: number) => void
}

const ListItem: React.FC<IProps> = ({user,handleUpdateButtonClick, handleDeleteButtonClick}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  return (
    <li key={user.id}>
        <input type="text" name="name" id="user-name" value={name} onChange={(e) => setName(e.target.value)}/>
         - 
        <input type="email" name="email" id="user-email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <button onClick={() => handleUpdateButtonClick({id: user.id, name, email})}> Update</button>
        <button onClick={() => handleDeleteButtonClick(user.id)}> Delete</button>
      </li>
  )
}

export default ListItem