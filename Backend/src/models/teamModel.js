import mongoose, { Schema } from 'mongoose'

const teamSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true
    },
    recentTeamMates: {
        type: [Schema.Types.ObjectId],
        default: [],
        ref: "user"
    }
})

const teamModel = mongoose.model('teamMates', teamSchema);

export default teamModel;