const express = require('express');
const router = express.Router();

const Subscriber = require('../models/subscribers');

// create a subscriber
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        channel: req.body.channel
    })
    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// get all subscribers
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.status(200).json(subscribers);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


router.get('/:id', getId, (req, res) => {
    res.json(res.subscriber);
})

router.patch('/:id', getId, async (req, res) => {
    if(req.body.name != null){
        res.subscriber.name = req.body.name;
    }
    if(req.body.channel != null){
        res.subscriber.channel = req.body.channel;
    }
    try {
        const updated = await res.subscriber.save();
        res.status(200).json({message: updated})
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

router.delete('/:id', getId, async (req, res) => {
    try {
        await res.subscriber.remove();
        res.json({message: 'Deleted subscriber'});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

async function getId(req, res, next){
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if(subscriber == null)
        {
           return res.status(404).json({ message: 'Cannot find the subscriber'});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    res.subscriber = subscriber;
    next();
}

module.exports = router;