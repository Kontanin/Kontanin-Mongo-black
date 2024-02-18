const BlogActivation = require('../model/Blog');

const CreateBlog = async (req, res) => {
  const { title, username, tag, content } = req.body;
  const blob = await BlogActivation.create({ title, username, tag, content });
  return res.status(200).send(blob);
};

const EditBlog = async (req, res) => {
  const id = req.params.id;
  const { title, username, tag, content } = req.body;
  const blob = await BlogActivation.findByIdAndUpdate(
    id,
    { title, username, tag, content },
    { new: true }
  );
  return res.status(200).send(blob);
};

const DeleteBlog = async (req, res) => {
  try {
    const id = req.params.id;

    await BlogActivation.deleteOne({ _id: id });

    return res.status(200).send({ message: 'deleted' });
  } catch (error) {
    res.status(500).send({ message: String(error) });
  }
};
const BlogList = async (res, req) => {
  const blob = await BlogActivation.find({});
  return res.status(200).send(blob);
};
const Blog = async (req, res) => {
  const id = req.params.id;
  const blob = await BlogActivation.findById(id);
  return res.status(200).send(blob);
};
module.exports = {
  CreateBlog,
  EditBlog,
  DeleteBlog,
  BlogList,
  Blog,
};
