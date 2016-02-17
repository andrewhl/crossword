import React, { Component } from 'react';

import Crossword from '../Crossword/Crossword.jsx';
import { generateCrosswordPattern } from '../../../lib/crossword_utils';

class IndexComponent extends Component {
  render() {
    return (
      <Crossword crossword={generateCrosswordPattern()} />
    );
  }
}

export default IndexComponent;
