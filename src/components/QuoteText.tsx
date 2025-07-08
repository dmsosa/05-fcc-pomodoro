function QuoteText({ text, author }) {
    return ( 
        <div>
            <p>
                {'" ' + text}
            </p>
            <span>{'- ' + author}</span>
        </div>

     );
}

export default QuoteText;