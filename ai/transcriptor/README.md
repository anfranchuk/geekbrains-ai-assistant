# Загрузка модели
```
python3 -m pip install \
  tensorflow-metal \
  tensorflow \
  transformers \
  datasets \
  soundfile \
  librosa
pip install git+https://github.com/openai/whisper.git 
curl -O https://openaipublic.azureedge.net/main/whisper/models/345ae4da62f9b3d59415adc60127b97c714f32e89e936602e85993674d08dcb1/medium.pt
```

# Test
```
python3 STT.py
```
