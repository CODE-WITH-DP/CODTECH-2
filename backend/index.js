const express = require('express');
const server = express();
const  mongoose = require('mongoose');
const {blogSchema} = require('./blogModel');
const cors = require('cors');

server.use(cors({
  origin: '*',
  methods: ['GET', 'POST','DELETE','PUT'],
  credentials: false, // enables setting cross-origin cookies
}))
server.use(express.json());
server.get("/", (req, res, next) => {
  res.send("start server");
  next();
});

server.get("/blog-list", (req, res, next) => {
  const blog = new blogSchema()
  blogSchema.find({}).then((resData) =>{
    res.status(200).json({
      data:resData
    })
    next();
  })
  .catch((err) => {

    res.status(200).json({
      data: "blog not found!",
      "status":"404"
    })
  })
 
});

server.post("/add-blog", (req, res, next) => {
  //console.log('----res.body-----'+JSON.stringify(req.body));
  let blog = new blogSchema();
  blog.title = req.body.title;
  blog.content = req.body.description;

  blog.save().then(() => {
    res.status(200).json({
      data: "data add successfull!",
      "status":"200"
    })
    next();
  }).catch(err =>{
    res.status(200).json({
      data: "data not added successfull!",
      "status":"409"
    })
    next();

  });
});

server.put('/update-blog/:id', async(req, res, next) => {
  let filter = {_id:req.params.id};
  let update = {title:req.body.title,content:req.body.description}

  try {
    const result = await blogSchema.findOneAndUpdate(filter,update);
    res.status(200).json({
      data: "update data"
    })
    next()
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update blog' });
    next()
  }

})

server.delete('/delete-blog/:id', async(req, res, next) => {
  const result = await blogSchema.findByIdAndDelete(req.params.id);

  res.status(200).json({
    data:"delete data"
  })
})


const start = async() => {
  try {
    await mongoose.connect('mongodb+srv://dhairya2002:dhairya4971@prescription.oyf3g.mongodb.net/?retryWrites=true&w=majority&appName=Prescription');
    server.listen(8080, () => {
      console.log("Server is running");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start();
