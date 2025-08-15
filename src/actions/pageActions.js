import actionTypes from '../constants/actionTypes';

export const addPage = () => ({
  type: actionTypes.ADD_PAGE,
});

export const removePage = (pageIndex) => ({
  type: actionTypes.REMOVE_PAGE,
  pageIndex,
});

export const switchPage = (pageIndex) => ({
  type: actionTypes.SWITCH_PAGE,
  pageIndex,
});

export const updatePageName = (pageIndex, newName) => ({
    type: actionTypes.UPDATE_PAGE_NAME,
    pageIndex,
    newName,
});
