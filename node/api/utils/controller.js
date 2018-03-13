let _  = require('lodash');
let co = require('co');
let mongoose = require('mongoose');
let Helper = require('./helper');

class Controller {
  constructor(Model) {
    this.Model = Model;
  };
  create(req,res) {
    co(function* () {
      let empty_model = new this.Model({_id: new mongoose.Types.ObjectId()});
      for (let prop in req.body){
        if(req.body[prop] instanceof Array){
          empty_model[prop] = req.body[prop].map(entity=>{return entity})
          delete req.body[prop];
        }
      }
      let filled_model = _.extend(empty_model,req.body);
      return yield filled_model.save();
    }.bind(this))
    .then(Helper.respondWithResult(res,201))
    .catch(Helper.handleError(res));
  };
  show(req,res) {
    co(function* () {
      return yield this.Model.findById(req.params.id).exec();
    }.bind(this))
    .then(Helper.respondWithResult(res))
    .catch(Helper.handleError(res));
  };
  get(req,res) {
    co(function* () {
      return yield this.Model.find().exec();
    }.bind(this))
    .then(Helper.respondWithResult(res))
    .catch(Helper.handleError(res));
  };
  update(req,res) {
    co(function* () {
      if (req.body._id) delete req.body._id;
      let object = yield this.Model.findById(req.params.id).exec();
      let props = [];
      for (let prop in req.body){
        props.push(prop);
        if(req.body[prop] instanceof Array){
          object[prop] = req.body[prop].map(entity=>{return entity})
          delete req.body[prop];
        }
      }
      let updated = _.extend(object,req.body);
      for (let prop in props) updated.markModified(prop);
      return yield updated.save();
    }.bind(this))
    .then(Helper.respondWithResult(res))
    .catch(Helper.handleError(res));
  };
  remove(req,res) {
    co(function* () {
      let object = yield this.Model.findById(req.params.id).exec();
      yield object.remove();
      return {message: `Removed ${req.params.id}`}
    }.bind(this))
    .then(Helper.respondWithResult(res))
    .catch(Helper.handleError(res));
  };
}

module.exports = Controller;
