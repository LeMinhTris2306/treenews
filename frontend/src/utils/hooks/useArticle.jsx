import articleApi from "../../API/articleApi";

export const useArticle = () => {
  const getArticleHandler = async (id) => {
    const response = await articleApi.getArticle(id);
    return response;
  };

  const getListArticleHandler = async (n, skip, args = null) => {
    const response = await articleApi.getListArticle(n, skip, args);
    return response;
  };

  const createArticleHanlder = async (data, files) => {
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
  return {
    getArticle: getArticleHandler,
    getListArticle: getListArticleHandler,
    createArticle: createArticleHanlder,
    updateArticle: updateArticleHandler,
    deleteArticle: deleteArticleHandler,
  };
};
