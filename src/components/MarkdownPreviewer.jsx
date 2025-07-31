//Der Ziel ist, Input zu erstellen, und Markdown zu rendern
import { marked } from 'marked';
import * as React from 'react';
import MarkdownInput from './MarkdownInput';
import MarkdownPreview from './MarkdownPreview';



export function MarkdownPreviewer () {
    const [ markdownState, setMarkdownState ] = React.useState({ input: '', preview: ''});

    React.useEffect(() => {
      setMarkdownState((prevState) => ({...prevState, preview: marked.parse(markdownState.input) })); 
    })

  return (
    <>
        <MarkdownInput state={markdownState} setState={setMarkdownState} />
        <MarkdownPreview state={markdownState} />
    </>
  );
}
