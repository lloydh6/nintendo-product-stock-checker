import notifier from 'node-notifier';


const createNotification = options => {
  notifier.notify({
    ...options,
    wait: true,
    sound: true,
    timeout: 30000000,
  });
}

export default createNotification;
