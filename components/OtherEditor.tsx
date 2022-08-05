import React from 'react';

import MonacoEditor from './MonacoEditor';

class OtherEditor extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      code: '// type your code...',
    };
  }
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true,
    };

    return (
      <MonacoEditor width="800" height="600" language="javascript" theme="vs-dark" value={code} options={options} />
    );
  }
}

// eslint-disable-next-line import/no-default-export
export default OtherEditor;
