from langchain.text_splitter import CharacterTextSplitter


def doc2Chunk(text):
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size = 1000,
        chunk_overlap = 200,
        length_function = len,
    )
    texts = text_splitter.split_text(text)
    texts = [txt.replace('\n',' ') for txt in texts]
    return texts
