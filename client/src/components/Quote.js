import React, {useState, useEffect} from "react";
import axios from "axios";


const Quote = (props) => {

    const [quote, setQuote] = useState("");

    useEffect(() => {
        axios.get("http://favqs.com/api/qotd")
        .then((res)=>{
            console.log(res.data);
            setQuote(res.data.quote)
            // setQuote(res.data.results);
        })
        .catch((err) => console.log(err))
    }, [])

    return(

        <div className="quote-box">
            <b> QUOTE OF THE DAY </b>
            <h4> " {quote.body} " - {quote.author} </h4>
        </div>
    )
}

export default Quote;