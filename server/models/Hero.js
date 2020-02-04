const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  title: {
    type: String
  },
  categories: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  }],
  difficulty: {
    type: Number,
    default: 0
  },
  scores: {
    carry: {
      type: Number,
      default: 0
    },
    support: {
      type: Number,
      default: 0
    },
    nuker: {
      type: Number,
      default: 0
    },
    disabler: {
      type: Number,
      default: 0
    },
    jungler: {
      type: Number,
      default: 0
    },
    durable: {
      type: Number,
      default: 0
    },
    escape: {
      type: Number,
      default: 0
    },
    pusher: {
      type: Number,
      default: 0
    },
    initiator: {
      type: Number,
      default: 0
    }, 
  },
  skills: [{
    name: {
      type: String
    },
    icon: {
      type: String
    },
    description: {
      type: String,
      default: ''
    },
    tips: {
      type: String,
      default: ''
    }
  }],
  items: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Item'
  }],
  talentTree: {
    l10: {
      type: String,
      default: ''
    },
    r10: {
      type: String,
      default: ''
    },
    l15: {
      type: String,
      default: ''
    },
    r15: {
      type: String,
      default: ''
    },
    l20: {
      type: String,
      default: ''
    },
    r20: {
      type: String,
      default: ''
    },
    l25: {
      type: String,
      default: ''
    },
    r25: {
      type: String,
      default: ''
    },
  },
  scepter: {
    type: String,
    default: ''
  },
  brief: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.model('Hero', schema)