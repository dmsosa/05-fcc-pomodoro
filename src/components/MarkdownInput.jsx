function MarkdownInput({ state, setState }) {

    const handleInputChange = (e) => {
      const value = e.currentTarget.value;
      setState((prevState) => ({...prevState, input: value }))
    }

    return ( 
        <textarea name="input" id="markdown-input" onChange={handleInputChange} value={state.input} ></textarea>
     );
}

export default MarkdownInput;