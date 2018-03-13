'use strict';

let Controller = require('../../utils/controller');
let Helper = require('../../utils/helper');
let co = require('co');
let mongoose = require('mongoose');
let _ = require('lodash');

module.exports = function(House){
    class HouseController extends Controller {
        constructor(){
          super(House);
        }
        getByPerson(req,res) {
            co(function* () {
                return yield this.Model.find({owner: req.params.id}).exec();
            }.bind(this))
                .then(Helper.respondWithResult(res))
                .catch(Helper.handleError(res));
        };

        create(req,res) {
            let owner = req.body["owner"];
            if (!owner){
                return res.status(400).send({ error: "Field 'owner' should not be empty."});
            }
            mongoose.model("Person").findById(owner).exec((err, person) => {
                if(!person){
                    return res.status(400).send({ error: "Owner with id {owner} doesn't exist."});
                }
                return super.create(req, res);
            });
        };

    }
  return HouseController;
}
