const News = require('../models/newsModel');
const mongoose = require('mongoose');


// @route   GET /api/v1/news
exports.getNews = async (req, res, next) => {
  try {
    const news = await News.find();
    
    return res.status(200).json({
      success: true,
      count: news.length,
      data: news
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @route   POST /api/v1/news

exports.addNews =  async (req, res, next) => {
  console.log(req.file)
  try {
    // const { district, newsTitle, newsContent} = req.body;
    const news = await new News({
      _id: new mongoose.Types.ObjectId(),
      ProjectTitle: req.body.ProjectTitle,
      IFBNo: req.body.IFBNo,
      Procurement : req.body.Procurement,
      // imageFile: req.file.path
      PublicEntity : req.body.PublicEntity,
      PublicAddress : req.body.PublicAddress,
      noticepubdate : req.body.noticepubdate,
      bidsubdate : req.body.bidsubdate,
      status : req.body.status,
      dateAD: req.body.dateAD
      
    });
    await news.save();
    // const news = await News.create(req.body);
    // const imageFile = req.file.path;
    // news.imageFile = imageFile;
    // await news.save();

    return res.status(201).json({
      success: true,
      data: news
    }); 
  } catch (err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).reduce((obj,val) => ( {...obj, [val.path]:val.message}),{}) 

      console.log(messages);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
}

exports.updateStatus =  async (req, res, next) => {
  try {
    // const { district, newsTitle, newsContent} = req.body;
    const id = req.body.id;
    const status = req.body.status;
    await News.findByIdAndUpdate(id,{"status": status});

    return res.status(201).json({
      success: true,
      data: {}
    }); 
  } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    
  }
}

exports.updateNews = async (req,res,next)=>{
  try {
    const news = await News.findById(req.params.id);
    if(!news) {
      return res.status(404).json({
        success: false,
        error: 'No News found'
      });
    }

    return res.status(200).json({
      success: true,
      data: news
    });
  }
  catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @route   DELETE /api/v1/news/:id
exports.deleteNews = async (req, res, next) => {
  try {
    const news = await News.findById(req.params.id);

    if(!news) {
      return res.status(404).json({
        success: false,
        error: 'No News found'
      });
    }

    await news.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}