from config import app, db
from models import Story, Section

STORIES_SECTIONS = [
    {
        "id": 0,
        "title": "Xemse",
        "author": "Nizami Gencevi",
        "sections": [
            ("Leyli ve Mecnun", "Bir zamanlar Nizami leyli ve mecnunu yazdi"),
            ("Xosrov ve Shirin", "Amma sonra Xosrov ve Shirini de yazmaq isteyine dushdu"),
            ("7 Gozel", "Bu eser esasinda hem de opera yaradiblarmish...")
        ]
    },
    {
        "id": 1,
        "title": "Matilda",
        "author": "Ronald Dahl",
        "sections": [
            ("Ogey Ana", "Bir gun oger ana, nese elemek isteyirdi amma teessuf alinmadi")
        ]
    },
    {
        "id": 2,
        "title": "Xeste",
        "author": "Anadolu Bashibelalinski",
        "sections": [
            ("Bele de kitab olarmish", "Anadolu namusu ile bolushmek istedi"),
            ("Bu metne bir bax", "Camaat amma anadolunu basha dushmedi...")
        ]
    }
]

with app.app_context():
    db.drop_all()
    db.create_all()
    for data in STORIES_SECTIONS:
        new_story = Story(id=data.get('id'), title=data.get('title'), author=data.get('author'))
        for section_title, section_body in data.get('sections', []):
            new_story.sections.append(
                Section(
                    section_title=section_title,
                    section_body=section_body
                )
            )
        db.session.add(new_story)
    db.session.commit()