import userApi from "../../apis/userApi";

export const useAdmin = () => {
    const getDashboardInfo = async () => {
        const response = await userApi.getDashboardInfo();
        return response;
    };

    return {
        getDashboardInfo,
    };
};
