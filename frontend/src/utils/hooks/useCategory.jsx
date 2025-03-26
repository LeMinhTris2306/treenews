import categoryApi from "../../API/categoryApi";

export const useCategory = () => {
  const getListCategoryHandler = async () => {
    const response = await categoryApi.getListCategory();
    return response;
  };

  return {
    getListCategory: getListCategoryHandler,
  };
};
