import { useCallback, useEffect, useState } from 'react';
import './App.css';
import ListItem from './components/ListItem';
import User from './types/User';

const App: React.FC = () => {
  
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
        ;
      } catch (error) {
        console.error('fetching users error:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleButtonClick = useCallback(() => {
    const filteredUsers = users.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  }, [searchQuery, users]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    if (value === '') {
      setQuery('');
      setFilteredUsers(users);
    }
  }, [users]); 

  // const handleUserUpdate = (updatedUser: User) => {
  //   setUsers((prevUsers) => {
  //     const updatedUsers = prevUsers.map((prevUser) => {
  //       if (prevUser.id === updatedUser.id) {
  //         return {
  //           ...prevUser,
  //           name: updatedUser.name,
  //           email: updatedUser.email
  //         };
  //       }
  //       return prevUser;
  //     });
  //     return updatedUsers;
  //   });
  // };

  // parametre vermezsen bu fonksiyondaki stateler update edilmeyecek eski state ele alır.
  const handleUpdateButtonClick = useCallback((user: User) => {
    console.log(user);
    setUsers(users.map(prevUser => {
      if (prevUser.id === user.id) {
       return user;
      }
      return prevUser;
    }));
    
  }, [users]);
  
  const handleDeleteButtonClick = useCallback((id: number) => {
    setUsers(users.filter(user => user.id !== id));
    console.log(users, id);
    
  }, [users]);

  return (
    <div className="App">
    <h1>user list</h1>
    <input type="search" id="site-search" name="search" value={searchQuery} onChange={handleInputChange}/>

    <button onClick={handleButtonClick}>Search</button>
    <ul>
     {filteredUsers.map((user) => (
      <ListItem user={user}
       handleUpdateButtonClick={handleUpdateButtonClick}
       handleDeleteButtonClick={handleDeleteButtonClick}/>
     ))}
     </ul>

    <h2>users state</h2>
    <ul>
     {users.map((user) => {
      return (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      );
     })}
     </ul>
    </div>
  );
}

export default App;
