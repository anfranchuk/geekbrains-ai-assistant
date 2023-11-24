import uvicorn
from .settings import settings


# Контролируем перезагрузку сервера
uvicorn.run(
    'ai_backend.app:app',
    host=settings.server_host,
    port=settings.server_port,
    reload=True
)
