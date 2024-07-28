import "./App.css";
import AutoComplete from './components/AutoComplete';

function App() {
    const staticData = [
        "Apple",
        "Banana",
        "Chocalate",
        "Derry Milk",
        "Elphanso",
        "Fruites",
        "Grapes"
    ];

    const fetchSuggestions = async (searchQuery = '') => {
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${searchQuery}`)

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const result = await response.json();

        return result.recipes
    };

    return (
        <div>
            <h1>Autocomplete / Typeahead</h1>
            <AutoComplete
                placeholder="Enter Recipe"
                // staticData={staticData}
                fetchSuggestions={fetchSuggestions}
                dataKey="name"
                customLoading={<div>Loading Recipes...</div>}
                onSelect={res => {/* console.log(res) */}}
                onChange={input => {/* console.log(input) */}}
                onBlur={() => {}}
                onFocus={() => {}}
                customStyles={{}}
            />
        </div>
    );
}

export default App;
