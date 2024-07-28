import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';
import SuggestionList from './SuggestionList';
import debounce from 'lodash/debounce';

const AutoComplete = ({
    staticData,
    fetchSuggestions,
    placeholder = '',
    dataKey = '',
    customLoading = 'Loading...',
    onSelect = () => {},
    onChange = () => {},
    onBlur = () => {},
    onFocus = () => {},
    customStyles = {}
}) => {
    const [inputValue, setInputvalue] = useState('');
    const [isLoadSuggestionList, setisLoadSuggestionList] = useState(true);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        setisLoadSuggestionList(true);
        setInputvalue(event.target.value);
        onChange(event.target.value);
    };

    const handleOnBlur = (event) => {
        if (event.target.value.length) return;

        setError(null);
        setLoading(false);
        setSuggestions([]);
        onBlur();
    }

    const getSuggestions = async (searchQuery) => {
        setError(null);
        setLoading(true);

        try {
            let result = [];

            if (typeof staticData != 'undefined') {
                result = staticData.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
            } else if (typeof fetchSuggestions != 'undefined') {
                result = await fetchSuggestions(searchQuery);
            }

            setSuggestions(result);
        } catch (error) {
            setError("Failed to fetch suggestions");
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    }

    const getSuggestionsDebounced = useCallback(debounce(getSuggestions, 2000), []);

    const handleOnSuggestionClick = suggestion => {
        setisLoadSuggestionList(false);
        setInputvalue(dataKey ? suggestion[dataKey] : suggestion);
        onSelect(suggestion);
        setSuggestions([]);
    }

    useEffect(() => {
        if (!(inputValue.length > 1 && isLoadSuggestionList)) {
            setSuggestions([]);
            return;
        }

        setError(null);
        setLoading(true);
        getSuggestionsDebounced(inputValue);
    }, [inputValue])

    return (
        <div className="container">
            <input
                type="text"
                styles={customStyles}
                placeholder={placeholder}
                value={inputValue}
                onBlur={(e) => handleOnBlur(e)}
                onFocus={onFocus}
                onChange={(e) => handleInputChange(e)}
            />

            {(suggestions || loading || error) && (
                <ul className='suggestion-list'>
                    {error && <div className='error'>{error}</div>}
                    {loading && <div className='loading'>{customLoading}</div>}

                    <SuggestionList
                        suggestions={suggestions}
                        dataKey={dataKey}
                        highlight={inputValue}
                        onSuggestionClick={handleOnSuggestionClick}
                    />
                </ul>
            )}
        </div>
    )
}

export default AutoComplete;
