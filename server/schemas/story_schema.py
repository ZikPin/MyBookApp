from dataclasses import dataclass, field
from marshmallow import Schema, fields, post_load


# Model
@dataclass
class Section:
    section_title: str
    section_body: str


@dataclass
class Story:
    title: str
    author: str
    backgroundColor: str
    sections: list[Section]


# Schema
class SectionSchema(Schema):
    story_id = fields.Int()
    section_title = fields.Str()
    section_body = fields.Str()
 

class StorySchema(Schema):
    id = fields.Int()
    title = fields.Str()
    author = fields.Str()
    backgroundColor = fields.Str()
    sections = fields.List(fields.Nested(SectionSchema()))