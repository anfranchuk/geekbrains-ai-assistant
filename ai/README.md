# sound_to_text
sudo apt update && sudo apt install ffmpeg
pip install --upgrade --no-deps --force-reinstall git+https://github.com/openai/whisper.git

pip install git+https://github.com/openai/whisper.git


uvicorn main:app --reload

python -m uvicorn ai.server:app --reload 
