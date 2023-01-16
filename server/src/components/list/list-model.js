import mongoose from 'mongoose'

const { Schema } = mongoose

const listSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
}, {
  timestamps: true
})

listSchema.static({
  findByUserId(userId) {
      return this.find({ user: userId })
  }
})

const List = mongoose.model('List', listSchema)

export default List

