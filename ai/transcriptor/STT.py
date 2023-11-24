import whisper

def transcribe_with_whisper(audio_file):
    model_type_stt = "medium"
    # # Load the Whisper model
    model = whisper.load_model(model_type_stt,  device='cpu')
    # Transcribe the audio
    return model.transcribe(audio_file)

def speech2text(audio_file):
    data = transcribe_with_whisper(audio_file)
    return {
        'timecode_with_text': [[x['start'], x['end'], x['text']] for x in data['segments']],
        'text': data['text']
    }

"""def main():
    path_to_mp3 = './audio1.mp3'
    data = speech2text(path_to_mp3)
    print(data)"""

#main()
