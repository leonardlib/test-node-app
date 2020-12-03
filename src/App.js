import './App.css';
import {useState} from "react";
import axios from 'axios';

function App() {
    const [members, setMembers] = useState([]);
    const [filterText, setFilterText] = useState('');

    const getMembers = async () => {
        try {
            const data = await axios.get('http://localhost:3000/api/v1/members?q=' + filterText);
            setMembers(data.data);
        } catch (e) {
            console.log(e);
        }
    };

    useState(() => {
        getMembers();
    }, []);

    const onChange = event => {
        setFilterText(event.target.value);
        getMembers();
    };

    return (
        <div className="App">
            <div className="container">
                <div className="title">
                    <h1>Members Filter</h1>
                </div>
                <div className="search">
                    <input type="text"
                           className="search-input"
                           onChange={onChange}/>
                </div>
                <div className="list">
                    {
                        members.map((m, key) =>
                            <div className="member" key={key}>
                                <span>{m.name}</span>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
