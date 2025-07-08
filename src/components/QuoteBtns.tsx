import { useEffect } from "react";
import NewQuoteBtn from "./NewQuoteBtn";
import { getRandomQuote, getRandomQuoteWithFetch } from "../service/quotesService";
import { FaTumblr, FaTwitter } from "react-icons/fa";

function QuoteBtns() {
    useEffect(() => {
        const quote = getRandomQuoteWithFetch();
        console.log(quote, 'in btnsssssssss')
    }, [])
    return ( 
        <div className="d-flex flex-justify-between">
            <div className="d-flex justify-content-center align-items-center gap-2">
                <FaTwitter></FaTwitter>
                <FaTumblr></FaTumblr>
            </div>
            <NewQuoteBtn/>
        </div>

     );
}

export default QuoteBtns;