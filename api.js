// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = 'https://api-freedomlife.herokuapp.com/api';

// Guides
export const guides_today = () => `${API_URL}/guides/today`;
export const guides_by_month = (month, year) =>
  `${API_URL}/guides/${month}/${year}`;

// Users
export const current_user = () => `${API_URL}/users/current`;

// Bible
export const bible_get_by_chapter = (ver, book, chap) =>
  `${API_URL}/bible/${ver}/${book}/${chap}`;
export const bible_get_by_chapter_exclude = (ver, book, chap, min, max) =>
  `${API_URL}/bible/exclude/${ver}/${book}/${chap}/${min}/${max}`;

// Highlights
export const highlights_by_user = () => `${API_URL}/highlight/user`;
export const highlights_by_passage = (passage, chapter) =>
  `${API_URL}/highlight/chapter/${passage}/${chapter}`;
