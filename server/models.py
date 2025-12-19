from config import db, ma

class Story(db.Model):
    __tablename__ = "story"
    id = db.Column(db.Integer, primary_key = True)
    author = db.Column(db.String(32))
    title = db.Column(db.String(32))

class StorySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Story
        load_instance = True
        sqla_session = db.session

story_schema = StorySchema()
stories_schema = StorySchema(many=True)