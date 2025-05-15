from mongodb.mongodb import MongoDB
from pymongo import ReturnDocument
from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import Response
from models.category import *

router = APIRouter()

mongo = MongoDB("mongodb+srv://chebiche:admin@atlascluster.q8ewu8y.mongodb.net/", "treenews")
cat_collection = mongo.get_collection('categories')

@router.post(
    "/",
    response_description="Add new category",
    response_model=CategoryModel,
    status_code=status.HTTP_201_CREATED,
    response_model_by_alias=False
)
async def create_category(cat: CategoryModel = Body(...)):
    cat_info = cat.model_dump(by_alias=True, exclude=["id"])

    if (category:= cat_collection.find_one({"categoryName": cat_info['categoryName']})) is not None:
        raise HTTPException(status_code=409, detail=f"Category {cat_info['categoryName']} already exists")
    
    if (category:= cat_collection.find_one({"urlDisplay": cat_info['urlDisplay']})) is not None:
        raise HTTPException(status_code=409, detail=f"Category {cat_info['urlDisplay']} already exists")
    
    new_cat = cat_collection.insert_one(
        cat_info
    )
    created_cat = cat_collection.find_one(
        {"_id": new_cat.inserted_id}
    )
    return created_cat

@router.get(
    "/",
    response_description="List all categories",
    response_model=CategoryCollection,
    response_model_by_alias=False,
)
async def get_list_categories(n: int = 100):
    cats = cat_collection.find().to_list(n)
    return CategoryCollection(categories=cats)

@router.get(
    "/{urlDisplay}",
    response_description="Get a single category",
    response_model=CategoryModel,
    response_model_by_alias=False,
)
async def show_category(urlDisplay: str):
    """
    Get the record for a specific category, looked up by `id`.
    """
    if (
        cat := cat_collection.find_one({"urlDisplay": urlDisplay})
    ) is not None:
        return cat

    raise HTTPException(status_code=404, detail=f"category {id} not found")

@router.put(
    "/{id}",
    response_description="Update a category",
    response_model=CategoryModel,
    response_model_by_alias=False
)
async def update_category(id: str, cat: UpdateCategoryModel = Body(...)):
    category = {
        k: v for k, v in cat.model_dump(by_alias=True).items() if v is not None
    }
    if len(category) >= 1:
        update_result = cat_collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": category},
            return_document=ReturnDocument.AFTER,
        )
        if update_result is not None:
            return update_result
        else:
            raise HTTPException(status_code=404, detail=f"Category {id} not found")
        
@router.delete("/{id}", response_description="Delete a category")
async def delete_category(id: str):
    """
    Remove a single category record from the database.
    """
    delete_result = cat_collection.delete_one({"_id": ObjectId(id)})

    if delete_result.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"category {id} not found")