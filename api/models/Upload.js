/**
* File.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

 var Upload = {
  // schema: true,

  attributes: {
    title : { type: 'string', defaultsTo: 'No name'},
    fd : { type: 'string' },
    path : { type: 'string' },

  }

  // beforeDestroy: function(values, cb) {
  //
  // }
};

module.exports = Upload;
