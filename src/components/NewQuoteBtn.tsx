import { getRandomQuote } from "../service/quotesService";

function NewQuoteBtn({ setQuote, setStatus }) {
    const handleClick = () => {
        setStatus('loading');

        getRandomQuote().then((data) => {
            setQuote(data);
            setStatus('fulfilled');
        })
        .catch((error) => {
            console.log(error);
            setStatus('error');
        })
    }
    return ( 
        <button className="btn btn-primary" onClick={handleClick}>New quote</button>

     );
}

export default NewQuoteBtn;