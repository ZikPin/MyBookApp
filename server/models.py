from config import db, ma
from marshmallow_sqlalchemy import fields


class Section(db.Model):
    __tablename__="section"
    id = db.Column(db.Integer, primary_key=True)
    story_id = db.Column(db.Integer, db.ForeignKey("story.id"))
    section_title = db.Column(db.String, nullable=False)
    section_body = db.Column(db.String, nullable=False)


class SectionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Section
        load_instance = True
        sqla_session = db.session
        include_fk = True


class Story(db.Model):
    __tablename__ = "story"
    id = db.Column(db.Integer, primary_key = True)
    author = db.Column(db.String(32))
    title = db.Column(db.String(32))
    backgroundColor = db.Column(db.String)
    sections = db.relationship(
        Section,
        backref="story",
        cascade="all, delete, delete-orphan",
        single_parent=True,
        order_by="desc(Section.id)"
    )


class StorySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Story
        load_instance = True
        sqla_session = db.session
        include_relationships=True

    sections = fields.Nested(SectionSchema, many=True)


story_schema = StorySchema()
stories_schema = StorySchema(many=True)

section_schema = SectionSchema()