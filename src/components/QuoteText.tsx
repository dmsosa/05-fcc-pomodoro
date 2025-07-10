function QuoteText({ quote, author }) {
    return ( 
        <div className="d-flex justify-content-center align-items-center gap-2">
            <h1>"</h1>
            <p className="">
                {quote}
            </p>
            <span className="order-3 flex-basis-100 flex-grow-1">{'- ' + author}</span>
        </div>

     );
}

export default QuoteText;