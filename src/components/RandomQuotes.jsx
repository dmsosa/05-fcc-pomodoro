import { useEffect, useState } from "react";
import { getRandomQuote } from "../service/quotesService";
import { FaTumblr, FaTwitter } from "react-icons/fa";


function RandomQuotes() {
    const [ quote, setQuote ] = useState(undefined);
    const [ status, setStatus ] = useState("loading");
    useEffect(() => {
        setStatus('loading');

        getRandomQuote().then((data) => {
            setQuote(data);
            setStatus('fulfilled');
        })
        .catch((error) => {
            console.log(error);
            setStatus('error');
        })
    }, [])

    return status === 'loading' ? 
        <div>Loading</div>
        :
        status === 'error' ?
        <div>Error </div>
        : 
        <div id="quote-box" className="container bg-2 border border-width-1 box-shadow-1">
            {/* Texte */}
            <div className="">
                <span className="fs-1">"</span>
                <p id="text" className="">
                    {quote.text}
                </p>
                <span  id="author" className="order-3 flex-basis-100 flex-grow-1">{'- ' + quote.author}</span>
            </div>
            {/* Knopfe */}
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-center align-items-center gap-2">
                    <FaTwitter id="tweet-quote" className="twitter-share-button" target="_blank" href={`https://twitter.com/intent/tweet?text=${`"${encodeURI(quote.text)}" -${quote.author}`}&hashtags=quotes,fccQuotes,quotesAPI`}></FaTwitter>
                    <FaTumblr id="tumblr-quote" className="tumblr-share-button" target="_blank" href={`https://tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,fccQuotes,quotesAPI&content=${encodeURI(quote.text)}&caption=${quote.author}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons`}></FaTumblr>
                </div>
                <button id="new-quote" className="btn btn-primary" onClick={() => setStatus('loading')}>New quote</button>
            </div>
        </div>;
}

export default RandomQuotes; 