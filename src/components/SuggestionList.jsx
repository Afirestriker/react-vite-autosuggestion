import React from "react";

const SuggestionList = ({
    suggestions = [],
    dataKey,
    highlight,
    onSuggestionClick,
}) => {
    const getHighlightedText = (text, textToHightlight) => {
        // split text with capturing the text to highlited
        const parts = text.split(new RegExp(`(${textToHightlight})`, "gi"));

        return parts.map(part => {
            return (part.toLowerCase() === textToHightlight.toLowerCase())
                    ? <b>{part}</b>
                    : part;
        });
    }

    return (
        <>
            {
                suggestions.map((suggestion, index) => {
                    const suggestionItem = dataKey ? suggestion[dataKey] : suggestion;
                    const id = dataKey ? suggestion.id : index;

                    return (
                        <li
                            key={id}
                            className="suggestion-item"
                            onClick={() => onSuggestionClick(suggestion)}
                        >
                            {getHighlightedText(suggestionItem, highlight)}
                        </li>
                    )
                })
            }
        </>
    )
};

export default SuggestionList;
