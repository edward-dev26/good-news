import {setIdInArrayObjects} from "../helpers/redux-helpers";
import {topHeadlinesAPI} from "../api/newsApi";
import {commonAsyncHandler, initializePage} from "./common";
import {toggleIsInitialized} from "./app-reducer";

const SET_TOP_ARTICLES = 'good-news/articles/SET_TOP_ARTICLES';
const SET_CATEGORY_ARTICLES = 'good-news/articles/SET_CATEGORY_ARTICLES';

const initialState = {
    topArticles: [],
    categoryArticles: []
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOP_ARTICLES:
            return {
                ...state,
                topArticles: setIdInArrayObjects(action.articles)
            };
        case SET_CATEGORY_ARTICLES:
            return {
                ...state,
                categoryArticles: action.articles
            };
        default:
            return state;
    }
};

//actions

export const setTopArticles = (articles) => ({
    type: SET_TOP_ARTICLES,
    articles
});

const setCategoryArticles = (articles) => ({
    type: SET_CATEGORY_ARTICLES,
    articles
});

// thunks

export const initializeHomePage = (topArticlesArg, categoryArticlesArg) => (dispatch, getState) => {
    const promise1 = dispatch(getTopArticles(...topArticlesArg));
    const promise2 = dispatch(getCategoryArticles(...categoryArticlesArg));

    initializePage(dispatch, getState, [promise1, promise2]);
};

export const getTopArticles = (pageSize, category = 'general') => async (dispatch) => {
    await commonAsyncHandler(async () => {
        let response = await topHeadlinesAPI.getArticles({pageSize, category});

        dispatch(setTopArticles(response.articles));
    }, dispatch);
};


export const getCategoryArticles = (categories, pageSize) => async (dispatch) => {
    await commonAsyncHandler(async () => {
        let articles = [];
        let response;

        for (let i = 0; i < categories.length; i++) {
            response = await topHeadlinesAPI.getArticles({pageSize, category: categories[i]});

            articles = [...articles, {category: categories[i], data: setIdInArrayObjects(response.articles)}]
        }

        dispatch(setCategoryArticles(articles));

        return Promise.reject('Error');
    }, dispatch);
};

export default homeReducer;
