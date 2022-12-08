const mongoose = require("mongoose");

const userBlogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "userData", // reference to user model
    },
    title: {
      type: String,
      required: true,
    },
    blog: {
      type: String,
      required: true,
    },
    image: [
      {
        public_id: {
          type: String,
          required: true,
        },

        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true } // add createdAt and updatedAt fields
);

module.exports = mongoose.model("Blog", userBlogSchema);
