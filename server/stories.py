from flask import abort, make_response, jsonify
from config import db
from models import Story, story_schema, stories_schema

def read_all():
    stories = Story.query.all()
    return stories_schema.dump(stories)

def create(story):
    id = story.get("id")
    existing_story = Story.query.filter(Story.id == id).one_or_none()

    if existing_story is None:
        new_story = story_schema.load(story, session = db.session)
        db.session.add(new_story)
        db.session.commit()

        return story_schema.dump(new_story), 201
    else:
        abort(
                406,
                f"Story with id {id} already exists"
            )
    
def read_one(id):
    story = Story.query.filter(Story.id == id).one_or_none()

    if story is not None:
        return story_schema.dump(story)
    else:
        abort(404, f"Story with id {id} not found")

def update(id, story):
    if id != story.get("id"):
        abort(400, f"Id mismatch. Expected story id {id}, but got {story.get("id")}")

    existing_story = Story.query.filter(Story.id == id).one_or_none()

    if existing_story:
        update_story = story_schema.load(story, session=db.session)
        existing_story.title = update_story.title
        existing_story.author = update_story.author
        existing_story.backgroundColor = update_story.backgroundColor

        db.session.merge(existing_story)
        db.session.commit()

        return story_schema.dump(existing_story), 201
    else:
        abort(404, f"Story with id {id} not found")

def delete(id):
    existing_story = Story.query.filter(Story.id == id).one_or_none()

    if existing_story:
        db.session.delete(existing_story)
        db.session.commit()

        return jsonify({"message": f"successfully deleted {id}"}), 200
    else:
        abort(404, f"Story with id {id} not found")