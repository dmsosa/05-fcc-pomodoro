import { useEffect, useState } from "react";
import QuoteBtns from "./QuoteBtns";
import QuoteText from "./QuoteText";

const themes = ['dark', 'light', 'neon', 'cyan', 'orange', 'red', 'blue', 'violet', 'green', 'yellow', 'mustard', 'pistach', 'wine'];
function RandomQuotes() {
    const [ quote, setQuote ] = useState(undefined);
    const [ status, setStatus ] = useState("loading");
    useEffect(() => {

    }, [])

    return status === 'loading' ? 
        <div>Loading</div>
        :
        status === 'error' ?
        <div>Error </div>
        : 
        <div className="container">
            <QuoteText quote={quote} author={author}></QuoteText>
            <QuoteBtns setQuote={setQuote} setStatus={setStatus}></QuoteBtns>
        </div>;
}

export default RandomQuotes; 