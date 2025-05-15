import categoryApi from "../../API/categoryApi";

export const useCategory = () => {
    const getListCategoryHandler = async (n) => {
        const response = await categoryApi.getListCategory(n);
        return response;
    };

    const getCategoryHandler = async (urlDisplay) => {
        const response = await categoryApi.getCategory(urlDisplay);
        return response;
    };

    return {
        getListCategory: getListCategoryHandler,
        getCategory: getCategoryHandler,
    };
};
