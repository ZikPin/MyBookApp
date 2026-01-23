DROP TABLE IF EXISTS story;
DROP TABLE IF EXISTS section;

CREATE TABLE story(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    backgroundColor TEXT NOT NULL
);

CREATE TABLE section(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    story_id INTEGER NOT NULL,
    section_title TEXT,
    section_body TEXT,
    FOREIGN KEY (story_id) REFERENCES story (id)
);