from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from server.db import get_db

bp = Blueprint('stories', __name__, url_prefix='/api/stories')

@bp.route('/', methods=['GET', 'POST'])
def get_stories():
    if request.method == 'GET':
        db = get_db()
        stories = db.execute(
            'SELECT story.id, story.title, story.author, story.backgroundColor, section.section_title, section.section_body'
            ' FROM story JOIN section ON section.story_id = story.id'
        ).fetchall()

        print(stories)
        return stories
    elif request.method == 'POST':
        print(request.get_json())
        id = request.get_json()['id']
        title = request.get_json()['title']
        author = request.get_json()['author']
        backgroundColor = request.get_json()['backgroundColor']
        sections = request.get_json()['sections']

        error = None

        if not title:
            error = 'Title is required'
        if not author:
            error = 'Autho is required'
        
        if error is not None:
            flash(error)
        else:
            backgroundColor = 'var(--p-violet-300)' if backgroundColor is None else backgroundColor
            db = get_db()
            db.execute(
                'INSERT INTO story (id, title, author, backgroundColor)'
                ' VALUES (?, ?, ?, ?)',
                (id, title, author, backgroundColor,)
            )
            db.commit()
            return [get_post(id), sections]

def get_post(id):
    post = get_db().execute(
            'SELECT story.id, story.title, story.author, story.backgroundColor, section.section_title, section.section_body'
            ' FROM story JOIN section ON section.story_id = story.id'
            ' WHERE story.id = ?',
            (id,)
        ).fetchone()
    
    if post is None:
        abort(404, f"Story id {id} doesn't exist")
    
    return post

@bp.route('/<int:id>', methods=['PUT'])
def update(id):
    post = get_post(id)

    title = request.form['title']
    author = request.form['author']
    backgroundColor = request.form['backgroundColor']

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
            (title, author, backgroundColor, id)
        )
        db.commit()
        return get_post(id)

@bp.route('/<int:id>', methods=['DELETE'])
def delete(id):
    post = get_post(id)
    db = get_db()
    db.execute('DELETE FROM story WHERE id = ?', (id,))
    db.commit()
    return post