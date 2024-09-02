import { useEffect, useState } from 'react';
import './App.css';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase-config';

function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);

  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: newAge });
    fetchUsers();
  };

  const fetchUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const editUser = (id, name, age) => {
    setNewName(name);
    setNewAge(age);
    setCurrentUserId(id);
  };

  const updateUser = async () => {
    if (currentUserId) {
      const userDoc = doc(db, "users", currentUserId);
      await updateDoc(userDoc, { name: newName, age: newAge });
      setCurrentUserId(null); // Clear the current user ID
      fetchUsers(); // Refresh the user list
    }
  };

  const deleteUser = async(id) =>{
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);

    fetchUsers()
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Name..."
        value={newName}
        onChange={(event) => setNewName(event.target.value)}
      />
      <input
        type="number"
        placeholder="Age..."
        value={newAge}
        onChange={(event) => setNewAge(Number(event.target.value))}
      />
      <button onClick={createUser}>Create User</button>
      <button onClick={updateUser}>Update User</button>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button onClick={() => editUser(user.id, user.name, user.age)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
