import { marked } from "marked";

function MarkdownInput({ state, setState }) {

    const handleInputChange = (e) => {
      const value = e.currentTarget.value;
      setState({input: value, preview: marked(value)});
    }

    return ( 
        <textarea name="input" id="markdown-input" onChange={handleInputChange} value={state.input} ></textarea>
     );
}

export default MarkdownInput;