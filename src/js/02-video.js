import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const KEY_NAME = 'videoplayer-current-time';

player.on('timeupdate', throttle(getTime, 1000));

function getTime() {
  player
    .getCurrentTime()
    .then(function (seconds) {
      localStorage.setItem(KEY_NAME, JSON.stringify(seconds));
    })
    .catch(function (error) {
      console.log(error);
    });
}
const currentTime = localStorage.getItem(KEY_NAME);
player
  .setCurrentTime(JSON.parse(currentTime))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
