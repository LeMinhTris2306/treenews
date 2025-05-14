import articleApi from "../../apis/articleApi";

export const useArticle = () => {
    const getArticleHandler = async (id) => {
        const response = await articleApi.getArticle(id);
        return response;
    };

    const getListArticleHandler = async (n, skip, args = null) => {
        const response = await articleApi.getListArticle(n, skip, args);
        return response;
    };

    const getListArticleInfoHandler = async (n, skip) => {
        const response = await articleApi.getListArticleInfo(n, skip);
        return response;
    };
    const getCategoryArticlesHandler = async (n) => {
        const response = await articleApi.getCategoryArticles(n);
        return response;
    };
    const createArticleHanlder = async (data, files) => {
        console.log(data);
        const response = await articleApi.createArticle(data, files);
        return response;
    };

    const updateArticleHandler = async (data, files, id) => {
        const response = await articleApi.updateArticle(data, files, id);
        return response;
    };
    const deleteArticleHandler = async (id) => {
        const response = await articleApi.deleteArticle(id);
        return response;
    };

    const addRecordHandler = async (id) => {
        const response = await articleApi.createRecord(id);
        return response;
    };
    return {
        getArticle: getArticleHandler,
        getListArticle: getListArticleHandler,
        getListArticleInfo: getListArticleInfoHandler,
        getCategoryArticles: getCategoryArticlesHandler,
        createArticle: createArticleHanlder,
        updateArticle: updateArticleHandler,
        deleteArticle: deleteArticleHandler,
        addRecord: addRecordHandler,
    };
};
