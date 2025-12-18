class Section:
    title: str
    body: str

    def __init__(self, title: str = '', body: str = ''):
        self.title = title
        self.body = body

class Story:
    id: int
    author: str
    title: str
    tags: list[str]
    backgroundColor: str
    text: list[Section]

    def __init__(self, 
                 id: int,
                 author: str, 
                 title: str, 
                 tags: list[str] = [], 
                 backgroundColor: str = 'var(--p-violet-300)',
                 text: list[Section] = []):
        self.id = id
        self.title = title
        self.author = author
        self.tags = tags
        self.backgroundColor = backgroundColor
        self.text = text