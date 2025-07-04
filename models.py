from extensions import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first = db.Column(db.String(50), nullable=False)
    last = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(10), nullable=False)
    pan = db.Column(db.String(10), nullable=False)

    def as_dict(self):
        return {col.name: getattr(self, col.name) for col in self.__table__.columns}
