import mongoose from 'mongoose';

const feedSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    }
},
{
    timestamps: true
}
);

const Feed = mongoose.model("Feed", feedSchema);

export default Feed;