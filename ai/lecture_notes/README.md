# Install llama.cpp
```
git clone https://github.com/ggerganov/llama.cpp.git 
cd llama.cpp 
pip install -r requirements.txt
curl -L https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGML/resolve/main/llama-2-7b-chat.ggmlv3.q4_K_M.bin --output ./models/llama-2-7b-chat.ggmlv3.q4_K_M.bin
LLAMA_METAL=1 make      
./convert-llama-ggml-to-gguf.py --eps 1e-5 -i ./models/llama-2-7b-chat.ggmlv3.q4_K_M.bin -o ./models/llama-2-7b-chat.
ggmlv3.q4_K_M.gguf.bin
```

# Test
```
./main -m ./models/llama-2-7b-chat.ggmlv3.q4_K_M.gguf.bin -n 1024 -ngl 1 -p "Give me 5 things to do in NYC"
```
