import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import {
  current_user,
  guides_today,
  guides_by_month,
  bible_get_by_chapter,
  bible_get_by_chapter_exclude,
  highlights,
  highlights_by_chapter
} from './api';
import { errorHandler } from './utils/error';

const exampleInitialState = {
  // User
  currentUser: {},

  // Guide
  guideToday: {
    day: '',
    date: '',
    pl: '',
    pb1: '',
    pb2: ''
  },
  guideByMonth: [],

  // Bible
  chapters: [],
  verses: {},

  // Highlight
  highlightByChapter: [],

  message: '',
  snackbar: { type: '', message: '' },
  status: null
};

export const actionTypes = {
  // User
  FETCH_CURRENT_USER_SUCCESS: 'FETCH_CURRENT_USER_SUCCESS',
  FETCH_CURRENT_USER_FAILURE: 'FETCH_CURRENT_USER_FAILURE',
  // Guide
  FETCH_TODAY_GUIDE_SUCCESS: 'FETCH_TODAY_GUIDE_SUCCESS',
  FETCH_TODAY_GUIDE_FAILURE: 'FETCH_TODAY_GUIDE_FAILURE',
  FETCH_GUIDE_BY_MONTH_SUCCESS: 'FETCH_GUIDE_BY_MONTH_SUCCESS',
  FETCH_GUIDE_BY_MONTH_FAILURE: 'FETCH_GUIDE_BY_MONTH_FAILURE',
  // Bible
  FETCH_CHAPTER_SUCCESS: 'FETCH_CHAPTER_SUCCESS',
  FETCH_CHAPTER_FAILURE: 'FETCH_CHAPTER_FAILURE',
  // Highlight
  CREATE_HIGHLIGHT_SUCCESS: 'CREATE_HIGHLIGHT_SUCCESS',
  CREATE_HIGHLIGHT_FAILURE: 'CREATE_HIGHLIGHT_FAILURE',
  FETCH_HIGHLIGHT_BY_CHAPTER_SUCCESS: 'FETCH_HIGHLIGHT_BY_CHAPTER_SUCCESS',
  FETCH_HIGHLIGHT_BY_CHAPTER_FAILURE: 'FETCH_HIGHLIGHT_BY_CHAPTER_FAILURE'
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CURRENT_USER_SUCCESS:
      return { ...state, currentUser: { ...action.data } };
    case actionTypes.FETCH_CURRENT_USER_FAILURE:
      return { ...state, status: action.status, message: action.message };
    case actionTypes.FETCH_TODAY_GUIDE_SUCCESS:
      return { ...state, guideToday: { ...action.data } };
    case actionTypes.FETCH_TODAY_GUIDE_FAILURE:
      return { ...state, message: action.err };
    case actionTypes.FETCH_GUIDE_BY_MONTH_SUCCESS:
      return { ...state, guideByMonth: [...action.data] };
    case actionTypes.FETCH_GUIDE_BY_MONTH_FAILURE:
      return { ...state, message: action.err };
    case actionTypes.FETCH_CHAPTER_SUCCESS:
      return { ...state, chapters: [...action.data] };
    case actionTypes.FETCH_CHAPTER_FAILURE:
      return { ...state, message: action.err };
    default:
      return state;
  }
};

// ACTIONS
// User
export const fetchCurrentUser = () => dispatch => {
  return axios({
    method: 'GET',
    url: current_user(),
    withCredentials: true
  })
    .then(res =>
      dispatch({ type: actionTypes.FETCH_CURRENT_USER_SUCCESS, data: res.data })
    )
    .catch(err =>
      errorHandler(err, {
        actionFailure: dispatch({
          type: actionTypes.FETCH_CURRENT_USER_FAILURE,
          status: err.response.status,
          message: err.response.data
        })
      })
    );
};

// Guide
export const fetchTodayGuide = () => dispatch => {
  return axios({
    method: 'GET',
    url: guides_today()
  })
    .then(res =>
      dispatch({ type: actionTypes.FETCH_TODAY_GUIDE_SUCCESS, data: res.data })
    )
    .catch(err =>
      errorHandler(err, {
        actionFailure: dispatch({
          type: actionTypes.FETCH_TODAY_GUIDE_FAILURE,
          message: err.response.data
        })
      })
    );
};
export const fetchGuideByMonth = (month, year) => dispatch => {
  return axios({
    method: 'GET',
    url: guides_by_month(month, year)
  })
    .then(res =>
      dispatch({
        type: actionTypes.FETCH_GUIDE_BY_MONTH_SUCCESS,
        data: res.data
      })
    )
    .catch(err =>
      errorHandler(err, {
        actionFailure: dispatch({
          type: actionTypes.FETCH_GUIDE_BY_MONTH_FAILURE,
          message: err.response.data
        })
      })
    );
};

// Bible
export const fetchChapter = (ver, book, chap) => dispatch => {
  return axios({
    method: 'GET',
    url: bible_get_by_chapter(ver, book, chap)
  })
    .then(res =>
      dispatch({ type: actionTypes.FETCH_CHAPTER_SUCCESS, data: res.data })
    )
    .catch(err =>
      errorHandler(err, {
        actionFailure: dispatch({
          type: actionTypes.FETCH_CHAPTER_FAILURE,
          message: err.response.data
        })
      })
    );
};
export const fetchChapterExclude = (ver, book, chap, min, max) => dispatch => {
  return axios({
    method: 'GET',
    url: bible_get_by_chapter_exclude(ver, book, chap, min, max)
  })
    .then(res =>
      dispatch({ type: actionTypes.FETCH_CHAPTER_SUCCESS, data: res.data })
    )
    .catch(err =>
      errorHandler(err, {
        actionFailure: dispatch({
          type: actionTypes.FETCH_CHAPTER_FAILURE,
          message: err.response.data
        })
      })
    );
};

// Highlight
export const fetchHighlightByChapter = (passage, chapter) => dispatch => {
  return axios({
    method: 'GET',
    url: highlights_by_chapter(passage, chapter),
    withCredentials: true
  })
    .then(res =>
      dispatch({
        type: actionTypes.FETCH_HIGHLIGHT_BY_CHAPTER_SUCCESS,
        data: res.data
      })
    )
    .catch(err =>
      errorHandler(err, {
        actionFailure: dispatch({
          type: actionTypes.FETCH_HIGHLIGHT_BY_CHAPTER_FAILURE,
          message: err.response.data
        })
      })
    );
};
export const createHighlight = data => dispatch => {
  return axios({
    method: 'POST',
    url: highlights(),
    withCredentials: true,
    data
  })
    .then(res =>
      dispatch({
        type: actionTypes.CREATE_HIGHLIGHT_SUCCESS,
        data: { type: 'success', message: 'Marka Dibuat!' }
      })
    )
    .catch(err =>
      errorHandler(err, {
        actionFailure: dispatch({
          type: actionTypes.CREATE_HIGHLIGHT_FAILURE,
          message: err.response.data
        })
      })
    );
};

export const initStore = (initialState = exampleInitialState) => {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};
