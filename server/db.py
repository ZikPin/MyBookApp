from flask import current_app, g
import click

import sqlite3
from datetime import datetime

from server.example_data import STORIES_SECTION

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.execute("PRAGMA foreign_keys = ON")
        g.db.row_factory = sqlite3.Row

    return g.db

def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_db():
    db = get_db()

    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))

@click.command('init-db')
def init_db_command():
    init_db()
    click.echo('Initialized the database')

@click.command('fill-mock-data')
def fill_db_command():
    init_db()
    click.echo('Initialized the database')

    db = get_db()
    for story in STORIES_SECTION:
        db.execute(
            'INSERT INTO story (id, title, author, backgroundColor)'
            ' VALUES (?, ?, ?, ?)',
            (story['id'], story['title'], story['author'], story['backgroundColor'],)
        )
        for section in story['sections']:
            db.execute(
                'INSERT INTO section (story_id, section_title, section_body)'
                ' VALUES (?, ?, ?)',
                (story['id'], section['section_title'], section['section_body'],)
            ) 
        
    db.commit()

sqlite3.register_converter(
    'timestamp', lambda x: datetime.fromisoformat(x.decode())
)

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
    app.cli.add_command(fill_db_command)