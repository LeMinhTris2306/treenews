import articleApi from "../../API/articleApi";

export const useArticle = () => {
  const getArticleHandler = async (id) => {
    const response = await articleApi.getArticle(id);
    return response;
  };

  const createArticleHanlder = async (data, files) => {
    const response = await articleApi.createArticle(data, files);
    return response;
  };

  return {
    getArticle: getArticleHandler,
    createArticle: createArticleHanlder,
  };
};
