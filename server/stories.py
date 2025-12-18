from datetime import datetime
from flask import abort, make_response

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

STORIES = [
    {'id': 0, 'title': 'New Girl is OUT', 'author': 'Anne Aghadadash'},
    {'id': 1, 'title': 'Girly Man WILDING', 'author': 'John Bethlaham'},
    {'id': 2, 'title': 'Small Dirk PARTIES', 'author': 'Anne Bethlaham'},
    {'id': 3, 'title': 'New Girl PARTIES', 'author': 'Leyla Aghadadash'},
    {'id': 4, 'title': 'Old Apple is OUT', 'author': 'Aishe Aghadadash'},
    {'id': 5, 'title': 'Small Girl babysits', 'author': 'Nizami Snort'},
    {'id': 6, 'title': 'New Apple is OUT', 'author': 'Adam Aghadadash'},
    {'id': 7, 'title': 'Girly Dirk PARTIES', 'author': 'Adam Snort'},
    {'id': 8, 'title': 'Some Trumpie babysits', 'author': 'Aishe Bethlaham'},
    {'id': 9, 'title': 'Small Man WILDING', 'author': 'Nizami Aghadadash'},
    {'id': 10, 'title': 'New Man PARTIES', 'author': 'Adam Snort'},
    {'id': 11, 'title': 'Small Dirk is OUT', 'author': 'Nizami Snort'},
    {'id': 12, 'title': 'New Girl WILDING', 'author': 'Aishe Aghadadash'},
    {'id': 13, 'title': 'Small Dirk WILDING', 'author': 'Adam Snort'},
    {'id': 14, 'title': 'New Dirk PARTIES', 'author': 'Anne Smith'},
    {'id': 15, 'title': 'New Girl PARTIES', 'author': 'Nizami Aghadadash'},
    {'id': 16, 'title': 'Girly Trumpie PARTIES', 'author': 'Aishe Aghadadash'},
    {'id': 17, 'title': 'Old Trumpie babysits', 'author': 'John Smith'},
    {'id': 18, 'title': 'New Man PARTIES', 'author': 'Leyla Bethlaham'},
    {'id': 19, 'title': 'Small Girl PARTIES', 'author': 'Nizami Aghadadash'}
]

def read_all():
    return STORIES

def create(story):
    id = story.get("id")
    title = story.get("title")
    author = story.get("author")

    storyExists = False

    for s in STORIES:
        if s["id"] == story["id"]:
            storyExists = True

    if (storyExists):
        abort(
                406,
                f"Story with id {id} already exists"
            )
    else:
        STORIES.append({"id": id, "title": title, "author": author})
    
def read_one(id):
    for s in STORIES:
        if s["id"] == id: return s
    
    abort(404, f"Story with id {id} not found")

def update(id, story):
    for s in STORIES:
        if s["id"] == id:
            s["title"] = story.get("title", s["title"])
            s["author"] = story.get("author", s["author"])
            s["timestamp"] = get_timestamp()
            return s
    
    abort(404, f"Story with id {id} not found")

# not ready
def delete(id):
    for s in STORIES:
        if s["id"] == id:
            STORIES.remove(s)
            return make_response(
                f"{id} successfully deleted", 200
            )
    
    abort(404, f"Story with id {id} not found")