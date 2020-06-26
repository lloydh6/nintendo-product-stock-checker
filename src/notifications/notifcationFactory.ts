import notifier from 'node-notifier'
import {Notification} from 'node-notifier/notifiers/notificationcenter'

interface NotificationFactory {
    (options: Notification): void
}

const createNotification: NotificationFactory = (options: Notification) => {
    notifier.notify({
        ...options,
        wait: true,
        sound: true,
        timeout: 30000000,
    })
}

export {NotificationFactory, createNotification}
