from API.articleAPI import router as article_router
from API.userAPI import router as user_router
from API.commentAPI import router as comment_router
from API.categoryAPI import router as category_router
from API.voiceApi import router as voice_router
from API.admin.adminAPI import router as admin

__all__ = ["article_router", "user_router", "comment_router", "category_router", "voice_router", "admin"]