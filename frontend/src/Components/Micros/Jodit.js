import React, { useCallback, useState } from 'react';
import JoditEditor from 'jodit-react';

const Form = () => {
  const [isSource, setSource] = useState(false);
  const [config, setConfig] = useState({
    readonly: false,
    toolbar: true,
  });
  const [textAreaValue, setTextAreaValue] = useState('Test');
  const [inputValue, setInputValue] = useState('');
  const [spin, setSpin] = useState(1);

  const toggleToolbar = useCallback(() => {
    setConfig((config) => ({
      ...config,
      toolbar: !config.toolbar,
    }));
  }, []);

  const toggleReadOnly = useCallback(() => {
    setConfig((config) => ({
      ...config,
      readonly: !config.readonly,
    }));
  }, []);

  const handleBlurAreaChange = useCallback((value) => {
    console.log('handleBlurAreaChange', value);
  }, []);

  const handleWYSIWYGChange = useCallback((value) => {
    console.log('handleWYSIWYGChange', value);
    setTextAreaValue(value);
    setInputValue(value);
  }, []);

  const handleNativeTextAreaChange = useCallback((event) => {
    const { value } = event.target;
    console.log('handleNativeTextAreaChange', value);
    setTextAreaValue(value);
    setInputValue(value);
  }, []);

  const handleInputChange = useCallback((event) => {
    const { value } = event.target;
    setInputValue(value);
    handleWYSIWYGChange(value);
  }, [handleWYSIWYGChange]);

  const handleSpin = useCallback(() => {
    setSpin((spin) => spin + 1);
  }, []);

  const onSourceChange = useCallback((event) => {
    setSource(event.target.checked);
  }, []);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          onChange={onSourceChange}
          checked={isSource}
        />{' '}
        Source
      </label>

      {!isSource ? (
        <JoditEditor
          config={config}
          onChange={handleWYSIWYGChange}
          onBlur={handleBlurAreaChange}
          value={textAreaValue}
        />
      ) : (
        <textarea
          className="simple-textarea"
          onChange={handleNativeTextAreaChange}
          value={textAreaValue}
        />
      )}

      <input
        onChange={handleInputChange}
        placeholder="Enter some text"
        type="text"
        value={inputValue}
      />

      <button onClick={toggleReadOnly} type="button">
        Toggle Read-Only
      </button>

      <button onClick={toggleToolbar} type="button">
        Toggle Toolbar
      </button>

      <button type="button" onClick={handleSpin}>
        Spin {spin}
      </button>
    </div>
  );
};

export default Form;
