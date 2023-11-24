import torch
from transformers import pipeline

device = "cuda:0" if torch.cuda.is_available() else "cpu"

pipe = pipeline(
  "automatic-speech-recognition",
  model="openai/whisper-medium",
  chunk_length_s=30,
  device=device,
)
path_to_mp3 = '/home/tommy/git-projects/geekbrains-ai-assistant/ai/python_term_example.mp3'
#sample = pipe(path_to_mp3, batch_size=8)["text"]
#prediction = pipe(sample.copy(), batch_size=8)["text"]

# we can also return timestamps for the predictions
data = pipe(path_to_mp3, batch_size=8, return_timestamps=True)["chunks"]

print(data)

a = {
        'timecode_with_text': [[x['start'], x['end'], x['text']] for x in data['segments']],
        'text': data['text']
    }

print(a)