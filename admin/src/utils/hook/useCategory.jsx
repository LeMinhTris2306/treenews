import categoryApi from "../../apis/categoryApi";

export const useCategory = () => {
    const getListCategoryHandler = async (n) => {
        const response = await categoryApi.getListCategory(n);
        return response;
    };

    const getCategoryHandler = async (urlDisplay) => {
        const response = await categoryApi.getCategory(urlDisplay);
        return response;
    };

    const updateCategoryHandler = async (categoryId, newData) => {
        const response = await categoryApi.updateCategory(categoryId, newData);
        return response;
    };

    const deleteCategoryHandler = async (categoryId) => {
        const response = await categoryApi.deleteCategory(categoryId);
        return response;
    };

    const createCategoryHandler = async (data) => {
        const response = await categoryApi.createCategory(data);
        return response;
    };

    return {
        getListCategory: getListCategoryHandler,
        getCategory: getCategoryHandler,
        updateCategory: updateCategoryHandler,
        deleteCategory: deleteCategoryHandler,
        createCategory: createCategoryHandler,
    };
};
