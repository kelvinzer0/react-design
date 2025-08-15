import actionTypes from "../constants/actionTypes";
import blocks from "../views/blocks/";
import {v4 as uuidv4} from 'uuid';

const initialState = {
  pages: [
    {
      id: 'document1',
      name: 'Page 1',
      blocks: [],
      templateId: 'document1',
    },
  ],
  activePageIndex: 0,
  selectedBlockUuid: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PUSH_BLOCK: {
      const activePage = state.pages[state.activePageIndex];
      const newBlock = {
        uuid: uuidv4(),
        blockId: action.blockId,
        data: {
          ...blocks[action.blockId].defaultData
        }
      };
      const newPages = [...state.pages];
      newPages[state.activePageIndex] = {
        ...activePage,
        blocks: [...activePage.blocks, newBlock]
      };
      return {
        ...state,
        pages: newPages
      };
    }
    case actionTypes.SET_SELECTED_BLOCK:
      return {
        ...state,
        selectedBlockUuid: action.blockUuid
      }
    case actionTypes.REORDER_LAYOUT: {
      const activePage = state.pages[state.activePageIndex];
      const newPages = [...state.pages];
      newPages[state.activePageIndex] = {
        ...activePage,
        blocks: [...action.newBlocksLayout]
      };
      return {
        ...state,
        pages: newPages
      };
    }
    case actionTypes.CHANGE_BLOCK_DATA: {
      const activePage = state.pages[state.activePageIndex];
      const blockIndex = activePage.blocks.findIndex(el => el.uuid === action.blockUuid);
      const newPages = [...state.pages];
      const newBlocks = [...activePage.blocks];
      newBlocks[blockIndex].data[action.key] = action.value;
      newPages[state.activePageIndex] = {
        ...activePage,
        blocks: newBlocks
      };
      return {
        ...state,
        pages: newPages
      };
    }
    case actionTypes.DELETE_BLOCK: {
      const activePage = state.pages[state.activePageIndex];
      const newBlocks = activePage.blocks.filter(block => block.uuid !== action.blockUuid);
      const newPages = [...state.pages];
      newPages[state.activePageIndex] = {
        ...activePage,
        blocks: newBlocks
      };
      return {
        ...state,
        pages: newPages,
        selectedBlockUuid: ''
      };
    }
    case actionTypes.ADD_PAGE: {
      const newPage = {
        id: uuidv4(),
        name: `Page ${state.pages.length + 1}`,
        blocks: [],
        templateId: 'document1', // Default template for new pages
      };
      return {
        ...state,
        pages: [...state.pages, newPage],
        activePageIndex: state.pages.length,
      };
    }
    case actionTypes.REMOVE_PAGE: {
      const newPages = state.pages.filter((page, index) => index !== action.pageIndex);
      return {
        ...state,
        pages: newPages,
        activePageIndex: 0, // Or some other logic to reset the active page
      };
    }
    case actionTypes.SWITCH_PAGE: {
      return {
        ...state,
        activePageIndex: action.pageIndex,
        selectedBlockUuid: '',
      };
    }
    case actionTypes.UPDATE_PAGE_NAME: {
        const { pageIndex, newName } = action;
        const newPages = [...state.pages];
        newPages[pageIndex] = {
            ...newPages[pageIndex],
            name: newName,
        };
        return {
            ...state,
            pages: newPages,
        };
    }
    default:
      return state;
  }
}
