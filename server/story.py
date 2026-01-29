from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for, jsonify
)
from werkzeug.exceptions import abort

from server.db import get_db

from server.schemas.story_schema import StorySchema, SectionSchema

bp = Blueprint('stories', __name__, url_prefix='/api/stories')
story_schema = StorySchema()
stories_schema = StorySchema(many=True)
sections_schema = SectionSchema(many=True)

@bp.route('/', methods=['GET', 'POST'])
def get_stories():
    if request.method == 'POST':
        print(request.get_json())
        title = request.get_json()['title']
        author = request.get_json()['author']
        backgroundColor = request.get_json()['backgroundColor']
        sections = request.get_json()['sections']

        error = None

        if not title:
            error = 'Title is required'
        if not author:
            error = 'Author is required'
        
        if error is not None:
            flash(error)
        else:
            backgroundColor = 'var(--p-violet-300)' if backgroundColor is None else backgroundColor
            db = get_db()
            cursor = db.cursor()

            cursor.execute(
                'INSERT INTO story (title, author, backgroundColor)'
                ' VALUES (?, ?, ?)',
                (title, author, backgroundColor,)
            )
            
            story_id = cursor.lastrowid

            for section in sections:
                # Sanitizing the section
                if 'section_title' not in section.keys(): section['section_title'] = ''
                if 'section_body' not in section.keys(): section['section_body'] = ''
                
                db.execute(
                    'INSERT INTO section (story_id, section_title, section_body)'
                    ' VALUES (?, ?, ?)',
                    (story_id, section['section_title'], section['section_body'],)
                )

            db.commit()
    
    db = get_db()
    stories_query = db.execute(
        'SELECT id, title, author, backgroundColor'
        ' FROM story'
    ).fetchall()
    stories = stories_schema.dump(stories_query)

    for story in stories:
        sections = db.execute(
            'SELECT story_id, section_title, section_body'
            ' FROM section WHERE story_id = ?',
            (story['id'],)
        ).fetchall()
        story['sections'] = sections

    print(stories_schema.dump(stories))
    return jsonify(stories_schema.dump(stories))

def get_story(id):
    db = get_db()
    story_query = db.execute(
            'SELECT id, title, author, backgroundColor'
            ' FROM story'
            ' WHERE story.id = ?',
            (id,)
        ).fetchone()
    print(story_query)
    if story_query is None:
        abort(404, f"Story id {id} doesn't exist")
    else:
        story = story_schema.dump(story_query)
        sections_query = db.execute(
            'SELECT story_id, section_title, section_body'
            ' FROM section WHERE story_id = ?',
            (story['id'],)
        )
        story['sections'] = sections_query
    return jsonify(story_schema.dump(story))

@bp.route('/<int:id>', methods=['PUT'])
def update(id):
    title = request.json['title']
    author = request.json['author']
    backgroundColor = request.json['backgroundColor']
    sections = request.json['sections']

    error = None

    if not title or not author:
        error = 'Please provide a valid input'

    if error is not None:
        flash(error)
    else:
        backgroundColor = 'var(--p-violet-300)' if backgroundColor is None else backgroundColor
        db = get_db()
        db.execute(
            'UPDATE story SET title = ?, author = ?, backgroundColor = ?'
            ' WHERE id = ?',
            (title, author, backgroundColor, id,)
        )
        db.execute(
            'DELETE FROM section WHERE story_id = ?', (id,)
        )
        for section in sections:
            db.execute(
                'INSERT INTO section (story_id, section_title, section_body)'
                ' VALUES (?, ?, ?)',
                (id, section['section_title'], section['section_body'],)
            ) 
        db.commit()
        return get_story(id)

@bp.route('/<int:id>', methods=['DELETE'])
def delete(id):
    story = get_story(id)
    db = get_db()
    db.execute('DELETE FROM section WHERE story_id = ?', (id,))
    db.execute('DELETE FROM story WHERE id = ?', (id,))
    db.commit()
    return story