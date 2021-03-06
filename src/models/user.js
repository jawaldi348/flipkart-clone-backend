const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trime: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'admin'
    },
    contactNumber: { type: String },
    profilePicture: { type: String }
}, { timestamps: true });

// buat field spesial untuk hash password karena lidak bisa dilakukan oleh mongodb
userSchema.virtual('password')
    .set(function (password) {
        this.hash_password = bcrypt.hashSync(password, 10);
    });

userSchema.methods = {
    authenticate: function () {
        return bcrypt.compare(password, this.hash_password);
    }
}

module.exports = mongoose.model('User', userSchema);