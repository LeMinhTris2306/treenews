import React, { forwardRef, useEffect, useState } from "react";
import { useCategory } from "../../utils/hooks/useCategory";

const CategoryOption = forwardRef((props, ref) => {
    const { ...rest } = props;
    const [categories, setCategories] = useState([]);
    const { getListCategory } = useCategory();
    useEffect(() => {
        const fetchListCategory = async () => {
            try {
                const response = await getListCategory();
                setCategories(response.categories);
            } catch (error) {
                console.error("Error fetching category:", error);
            }
        };
        fetchListCategory();
    }, []);
    const { value } = props;
    return (
        <select ref={ref} value={value || ""} {...rest}>
            <option value="" disabled>
                Thể loại
            </option>
            {categories && categories.length > 0 ? (
                categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.categoryName}
                    </option>
                ))
            ) : (
                <option disabled>Loading...</option>
            )}
        </select>
    );
});

export default CategoryOption;
