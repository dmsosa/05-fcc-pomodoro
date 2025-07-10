import { useEffect } from "react";
import NewQuoteBtn from "./NewQuoteBtn";
import { getRandomQuote } from "../service/quotesService";
import { FaTumblr, FaTwitter } from "react-icons/fa";

function QuoteBtns({ setQuote, setStatus }) {
    return ( 
        <div className="d-flex flex-justify-between">
            <div className="d-flex justify-content-center align-items-center gap-2">
                <FaTwitter></FaTwitter>
                <FaTumblr></FaTumblr>
            </div>
            <NewQuoteBtn setQuote={setQuote} setStatus={setStatus}/>
        </div>

     );
}

export default QuoteBtns;