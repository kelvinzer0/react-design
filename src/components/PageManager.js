import React from 'react';
import { connect } from 'react-redux';
import * as pageActions from '../actions/pageActions';

const PageManager = ({ pages, activePageIndex, addPage, removePage, switchPage, updatePageName }) => {
  return (
    <div>
      <h3>Pages</h3>
      <ul>
        {pages.map((page, index) => (
          <li key={page.id} style={{ 
              fontWeight: index === activePageIndex ? 'bold' : 'normal',
              cursor: 'pointer',
              marginBottom: '5px'
            }}>
            <input
              type="text"
              value={page.name}
              onChange={(e) => updatePageName(index, e.target.value)}
              style={{ border: 'none', background: 'transparent', width: '100px' }}
            />
            <button onClick={() => switchPage(index)}>Select</button>
            {pages.length > 1 && <button onClick={() => removePage(index)}>X</button>}
          </li>
        ))}
      </ul>
      <button onClick={addPage}>Add Page</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  pages: state.layout.pages,
  activePageIndex: state.layout.activePageIndex,
});

const mapDispatchToProps = {
  addPage: pageActions.addPage,
  removePage: pageActions.removePage,
  switchPage: pageActions.switchPage,
  updatePageName: pageActions.updatePageName,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageManager);
