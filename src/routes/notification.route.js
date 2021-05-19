import express from 'express'

import { sendNotificationToUser } from '../controllers/notification.controller'

const router = express.Router()

router.get('/send-notification-to-user', sendNotificationToUser)

export default router