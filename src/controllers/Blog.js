const BlogActivation = require('../model/Blog');
const CustomError = require('../errors');

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
    res.status(500).send({ message: error });
  }
};

async function BlogList(req, res) {
  console.log(req.user);
  const blob = await BlogActivation.find({});
  if (!blob) {
    throw new CustomError.BadRequestError(
      'Please provide tax and shipping fee'
    );
  }
  return res.status(200).send(blob);
}

const Blog = async (req, res) => {
  try {
    console.log(req.params.id);
    const id = req.params.id;
    const blob = await BlogActivation.findById(id);
    return res.status(200).send(blob);
  } catch (e) {
    return res.status(400).send({ msg: e });
  }
};
module.exports = {
  CreateBlog,
  EditBlog,
  DeleteBlog,
  BlogList,
  Blog,
};
