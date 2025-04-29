from typing import Optional, List, Union
from pydantic import ConfigDict, BaseModel, Field, model_validator
from bson import ObjectId
from pydantic.functional_validators import BeforeValidator
from typing_extensions import Annotated
import json

PyObjectId = Annotated[str, BeforeValidator(str)]

class ImageModel(BaseModel):
    imgTitle: str
    imgUrl: str
    type: str = "image"

class TextModel(BaseModel):
    detail: List[str]
    type: str = "text"

DetailModel = Union[TextModel, ImageModel]

class ArticleModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    title: str = Field(...)
    uploadDay: str = Field(...)
    details: List[DetailModel] = Field(...)
    displayName: str = Field(...)
    authorId: str = Field(...)
    categoryId: str = Field(...)
    record: Optional[str] = None
    
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "title": "Cuộc chiến chống ma túy khiến ông Duterte bị bắt",
                "uploadDay": "01/01/2025",
                "details": [
                    {
                        "detail": [
                            "Cuộc chiến mạnh tay trấn áp tội phạm ma túy từng được xem là di sản nhiệm kỳ của ông Duterte, nhưng cũng là nguyên nhân khiến ông lọt tầm ngắm của ICC.",
                            "Cựu tổng thống Philippines Rodrigo Duterte bị bắt ngày 11/3 theo lệnh của Tòa án Hình sự Quốc tế (ICC) với cáo buộc phạm ""tội ác chống lại loài người"" liên quan cuộc chiến chống ma túy khi còn đương nhiệm.",
                            "Cuộc chiến chống ma túy được xem là di sản nổi bật trong sự nghiệp chính trị của ông Duterte, từ khi ông còn là thị trưởng Davao, thành phố lớn thứ hai Philippines, trong giai đoạn 1988-2013.",
                            "Trong hơn hai thập kỷ lãnh đạo chính quyền Davao, ông Duterte điều hành cuộc chiến chống ma túy với những chính sách quyết liệt, nổi bật trong số đó là việc thành lập lực lượng có tên Biệt đội Tử thần Davao (DDS) từ năm 1993, với thành phần chính là các cựu phiến quân hoặc cựu cảnh sát ở thành phố.",
                            "Edgar Matobato, một cựu thành viên DDS, trong phiên điều trần trước Thượng viện Philippines năm 2016 cho hay chính thị trưởng Duterte đã cho xây dựng DDS với nhiệm vụ ""tiêu diệt những tên tội phạm như bọn bán lẻ ma túy, những kẻ hiếp dâm hay cướp giật"". ""Đó là những người bị chúng tôi bắn chết mỗi ngày"", Matobato cho biết."
                        ],
                        "type": "text"
                        
                    },
                    {
                        "imgTitle": "Ông Rodrigo Duterte cầm khẩu súng trường tại trụ sở của Cảnh sát Quốc gia Philippines ở thành phố Quezon tháng 4/2018. Ảnh: AP",
                        "imgUrl": "yourimgname.jpg",
                        "type": "image"
                    },
                    {
                        "imgTitle": "Ông Rodrigo Duterte cầm khẩu súng trường tại trụ sở của Cảnh sát Quốc gia Philippines ở thành phố Quezon tháng 4/2018. Ảnh: AP",
                        "imgUrl": "yourimgname.jpg",
                        "type": "image"
                    } 
                ],
                "displayName": "cuoc-chien-chong-ma-tuy-khien-ong-duterte-bi-bat",
                "authorId": "674869091328903d9b56a0a9",
                "categoryId": "6748701d1328903d9b56a0bb",
                "record": "file_record.wav"
            }
        },
    )
    @model_validator(mode='before')
    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value
    
class UpdateArticleModel(BaseModel):
    title: Optional[str] = None
    uploadDay: Optional[str] = None
    details: Optional[List[DetailModel]] = None
    displayName: Optional[str] = None
    authorId: Optional[str] = None
    categoryId: Optional[str] = None

    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str},
        json_schema_extra={
            "example": {
                "title": "HLV Kim Sang Sik: ĐT Việt Nam giờ không còn sợ Thái Lan",
                "uploadDay": "31/12/2024",
                "detail": [
                    {
                        "detail": [
                            "Cuộc chiến mạnh tay trấn áp tội phạm ma túy từng được xem là di sản nhiệm kỳ của ông Duterte, nhưng cũng là nguyên nhân khiến ông lọt tầm ngắm của ICC.",
                            "Cựu tổng thống Philippines Rodrigo Duterte bị bắt ngày 11/3 theo lệnh của Tòa án Hình sự Quốc tế (ICC) với cáo buộc phạm ""tội ác chống lại loài người"" liên quan cuộc chiến chống ma túy khi còn đương nhiệm.",
                            "Cuộc chiến chống ma túy được xem là di sản nổi bật trong sự nghiệp chính trị của ông Duterte, từ khi ông còn là thị trưởng Davao, thành phố lớn thứ hai Philippines, trong giai đoạn 1988-2013.",
                            "Trong hơn hai thập kỷ lãnh đạo chính quyền Davao, ông Duterte điều hành cuộc chiến chống ma túy với những chính sách quyết liệt, nổi bật trong số đó là việc thành lập lực lượng có tên Biệt đội Tử thần Davao (DDS) từ năm 1993, với thành phần chính là các cựu phiến quân hoặc cựu cảnh sát ở thành phố.",
                            "Edgar Matobato, một cựu thành viên DDS, trong phiên điều trần trước Thượng viện Philippines năm 2016 cho hay chính thị trưởng Duterte đã cho xây dựng DDS với nhiệm vụ ""tiêu diệt những tên tội phạm như bọn bán lẻ ma túy, những kẻ hiếp dâm hay cướp giật"". ""Đó là những người bị chúng tôi bắn chết mỗi ngày"", Matobato cho biết."
                        ],
                        
                    },
                    {
                        "detail": {
                            "imgTitle": "Ông Rodrigo Duterte cầm khẩu súng trường tại trụ sở của Cảnh sát Quốc gia Philippines ở thành phố Quezon tháng 4/2018. Ảnh: AP",
                            "imgUrl": "yourimgname.jpg"
                        },
                    },
                    {
                        "detail": {
                            "imgTitle": "Ông Rodrigo Duterte cầm khẩu súng trường tại trụ sở của Cảnh sát Quốc gia Philippines ở thành phố Quezon tháng 4/2018. Ảnh: AP",
                            "imgUrl": "yourimgname.jpg"
                        },
                    } 
                ],
                "displayName": "hlv-kim-sang-sik-noi-cung-truoc-chung-ket-aff-cup-voi-thai-lan",
                "authorId": "674869091328903d9b56a0a9",
                "categoryId": "6748701d1328903d9b56a0bb"
            }
        },
    )
    @model_validator(mode='before')
    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value

class ArticleCollection(BaseModel):
    articles: List[ArticleModel]