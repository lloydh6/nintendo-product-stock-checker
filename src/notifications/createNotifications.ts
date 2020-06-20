import notifier from 'node-notifier'
import {Notification} from 'node-notifier/notifiers/notificationcenter'

const createNotification = (options: Notification) => {
    notifier.notify({
        ...options,
        wait: true,
        sound: true,
        timeout: 30000000,
    })
}

export default createNotification
