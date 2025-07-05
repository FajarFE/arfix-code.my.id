import { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
const Add = (props) => {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />
    </div>
  );
};

export default Add;
