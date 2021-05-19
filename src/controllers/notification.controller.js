import request from 'request-promise'

import User from '../models/user.model'

export const sendNotificationToUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId })
    const notification = {
      title: 'Updated statistics for these countries:',
      body: user.countries.join(', ')
    }

    //client fcm token
    const fcm_tokens = [process.env.FCM_TOKEN]

    const notification_body = {
      notification,
      registration_ids: fcm_tokens
    }

    await request('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Authorization': 'key=' + process.env.SERVER_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notification_body)
    })
    
    res.status(200).send({ success: true, msg: 'Notification send successfully' })
  } catch (err) {
    res.status(500).send({ success: false, msg: 'Somethins was wrong', err })
  }
}